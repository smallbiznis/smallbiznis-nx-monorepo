import type { ReactNode } from 'react';
type UniversalAuthShellProps = {
  hero: ReactNode;
  children: ReactNode;
  rightClassName?: string;
};

export function UniversalAuthShell({ hero, children, rightClassName }: UniversalAuthShellProps) {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen w-full lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-40 bg-white/10 blur-3xl lg:block" />
          <div className="relative mx-auto flex min-h-full w-full max-w-2xl items-center justify-center px-6 py-12 lg:px-12">
            {hero}
          </div>
        </section>

        <section
          className={`flex min-h-screen items-center justify-center bg-white px-6 py-12 ${rightClassName ?? ''}`}
        >
          <div className="w-full max-w-md space-y-6">{children}</div>
        </section>
      </div>
    </main>
  );
}
