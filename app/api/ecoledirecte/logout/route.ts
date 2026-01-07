import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL('/', req.url), 303);
  res.cookies.set('ed_token', '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  });
  return res;
}
