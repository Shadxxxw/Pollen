'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { Button } from '@/components/Button';
import { PollenLogo } from '@/components/PollenLogo';

type Account = {
  id: number;
  typeCompte: string;
  prenom: string;
  nom: string;
  classe?: { libelle?: string };
};

type LoginResult =
  | { ok: true; accounts: Account[] }
  | { ok: false; message: string };

export function LoginCard() {
  const [identifiant, setIdentifiant] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LoginResult | null>(null);

  const canSubmit = useMemo(() => identifiant.trim().length > 0 && motdepasse.length > 0 && !loading, [identifiant, motdepasse, loading]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/ecoledirecte/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifiant, motdepasse })
      });

      const json = (await res.json()) as LoginResult;

      if (!res.ok) {
        setResult({ ok: false, message: 'message' in json ? json.message : 'Connexion impossible.' });
        return;
      }

      setResult(json);
    } catch {
      setResult({ ok: false, message: "Impossible d'atteindre le serveur. Réessaie." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute -inset-0.5 rounded-[28px] bg-gradient-to-b from-white/60 to-white/10 blur" />

      <div className="relative rounded-[28px] border border-black/10 bg-white/55 p-6 shadow-soft backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-honey-100">
            <PollenLogo className="h-9 w-9" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold tracking-tight text-neutral-900">Pollen</h1>
            <p className="text-sm text-neutral-700">Connexion via EcoleDirecte</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-black/10 bg-pollen-cream/60 p-4">
          <p className="text-sm leading-relaxed text-neutral-700">
            Tes identifiants restent entre toi et EcoleDirecte : la connexion est faite côté serveur et le token est stocké dans un cookie
            <span className="font-medium"> httpOnly</span>.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-neutral-800">Identifiant</span>
            <input
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              autoComplete="username"
              className="mt-1 w-full rounded-xl border border-black/10 bg-white/75 px-3 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-honey-300 focus:ring-4 focus:ring-honey-200/50"
              placeholder="ex: 1234567"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-neutral-800">Mot de passe</span>
            <input
              type="password"
              value={motdepasse}
              onChange={(e) => setMotdepasse(e.target.value)}
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-black/10 bg-white/75 px-3 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-honey-300 focus:ring-4 focus:ring-honey-200/50"
              placeholder="••••••••"
            />
          </label>

          <div className="pt-1">
            <Button type="submit" disabled={!canSubmit} className="w-full">
              {loading ? 'Connexion…' : 'Se connecter'}
            </Button>
          </div>
        </form>

        {result && (
          <div className="mt-5 rounded-2xl border border-black/10 bg-white/70 p-4">
            {result.ok ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-neutral-900">Connexion réussie</p>
                <p className="text-sm text-neutral-700">Comptes détectés :</p>
                <ul className="space-y-1 text-sm text-neutral-800">
                  {result.accounts.map((a) => (
                    <li key={a.id} className="flex items-center justify-between rounded-xl bg-pollen-cream/70 px-3 py-2">
                      <span className="font-medium">
                        {a.prenom} {a.nom}
                      </span>
                      <span className="text-xs text-neutral-600">
                        {a.typeCompte}
                        {a.classe?.libelle ? ` · ${a.classe.libelle}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <form
                    action="/api/ecoledirecte/logout"
                    method="post"
                    onSubmit={() => {
                      setResult(null);
                      setIdentifiant('');
                      setMotdepasse('');
                    }}
                  >
                    <Button type="submit" variant="ghost" className="w-full">
                      Se déconnecter
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-medium text-neutral-900">Connexion impossible</p>
                <p className="text-sm text-neutral-700">{result.message}</p>
              </div>
            )}
          </div>
        )}

        <p className="mt-5 text-center text-xs text-neutral-600">
          Pollen n’est pas affilié à EcoleDirecte. Utilise tes identifiants officiels.
        </p>
      </div>
    </div>
  );
}
