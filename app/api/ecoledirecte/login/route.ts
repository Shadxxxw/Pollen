import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ecoleDirecteLogin, ecoleDirecteAnswerSecurityQuestion } from '@/lib/ecoledirecte';

const loginSchema = z.object({
  identifiant: z.string().min(1),
  motdepasse: z.string().min(1)
});

const questionAnswerSchema = z.object({
  identifiant: z.string().min(1),
  motdepasse: z.string().min(1),
  questionId: z.string().min(1),
  reponse: z.string().min(1)
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);

  try {
    if (json?.questionId && json?.reponse) {
      const parsed = questionAnswerSchema.safeParse(json);

      if (!parsed.success) {
        return NextResponse.json({ ok: false, message: 'Champs manquants.' }, { status: 400 });
      }

      const { token, accounts } = await ecoleDirecteAnswerSecurityQuestion(parsed.data);

      const res = NextResponse.json({ ok: true, accounts });
      res.cookies.set('ed_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });

      return res;
    } else {
      const parsed = loginSchema.safeParse(json);

      if (!parsed.success) {
        return NextResponse.json({ ok: false, message: 'Champs manquants.' }, { status: 400 });
      }

      const result = await ecoleDirecteLogin(parsed.data);

      if (result.requiresSecurityQuestion) {
        return NextResponse.json({
          ok: false,
          requiresSecurityQuestion: true,
          question: result.question
        });
      }

      const token = result.token;
      const res = NextResponse.json({ ok: true, accounts: result.accounts });
      res.cookies.set('ed_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });

      return res;
    }
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        message: e instanceof Error ? e.message : 'Connexion impossible.'
      },
      { status: 401 }
    );
  }
}
