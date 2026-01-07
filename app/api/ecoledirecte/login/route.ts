import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ecoleDirecteLogin } from '@/lib/ecoledirecte';

const schema = z.object({
  identifiant: z.string().min(1),
  motdepasse: z.string().min(1)
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: 'Champs manquants.' }, { status: 400 });
  }

  try {
    const { token, accounts } = await ecoleDirecteLogin(parsed.data);

    const res = NextResponse.json({ ok: true, accounts });
    res.cookies.set({
      name: 'ed_token',
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return res;
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
