import { HoneycombPattern } from '@/components/HoneycombPattern';
import { LoginCard } from '@/components/LoginCard';

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <HoneycombPattern
        patternId="honeycomb-left"
        className="pointer-events-none absolute -left-12 top-24 h-[520px] w-[520px] rotate-6 text-honey-300/25"
      />
      <HoneycombPattern
        patternId="honeycomb-right"
        className="pointer-events-none absolute -right-16 -top-16 h-[540px] w-[540px] -rotate-12 text-honey-400/20"
      />

      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-14">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr,420px]">
          <section className="hidden lg:block">
            <h2 className="text-4xl font-semibold tracking-tight text-neutral-900">
              Une connexion douce,
              <br />
              comme du miel.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-700">
              Pollen t’ouvre la porte de ton espace scolaire avec un design clair, moderne et apaisant.
            </p>

            <div className="mt-8 grid max-w-md grid-cols-2 gap-3 text-sm text-neutral-700">
              <div className="rounded-2xl border border-black/10 bg-white/45 p-4 backdrop-blur">
                <p className="font-medium text-neutral-900">Propre</p>
                <p className="mt-1">Couleurs chaudes, contrastes doux, sans éblouir.</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white/45 p-4 backdrop-blur">
                <p className="font-medium text-neutral-900">Simple</p>
                <p className="mt-1">Une seule action : se connecter via EcoleDirecte.</p>
              </div>
            </div>
          </section>

          <section className="flex justify-center lg:justify-end">
            <LoginCard />
          </section>
        </div>
      </div>
    </main>
  );
}
