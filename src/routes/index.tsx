import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  NAV, TIMELINE, SKILLS, METRICS, SEGMENTS, CASE_STUDIES, EDUCATION, PARTNERSHIPS,
  PARTNERSHIP_INFO, CERTIFICATIONS, whatsappUrl, EMAIL, LINKEDIN, PHONE_DISPLAY, PHOTO_URL, RESUME_URL,
  type CasePrint,
} from "@/content/site";

const TITLE = "Marcelo Mozart | Gestor de Tráfego Pago Sênior — Meta Ads";
const DESC =
  "Conheça Marcelo Mozart, gestor de tráfego pago com atuação em Meta Ads desde 2018. Experiência em geração de leads e parcerias PJ com agências.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://marcelomozart.com.br/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Marcelo Mozart",
          jobTitle: "Gestor de Tráfego Pago Sênior",
          url: "https://marcelomozart.com.br",
          email: `mailto:${EMAIL}`,
          sameAs: [LINKEDIN],
          address: { "@type": "PostalAddress", addressLocality: "Novo Hamburgo", addressRegion: "RS", addressCountry: "BR" },
        }),
      },
    ],
  }),
  component: Index,
});

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Btn({ href, children, variant = "primary", external }: { href: string; children: ReactNode; variant?: "primary" | "ghost" | "light"; external?: boolean }) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "border border-ink-border text-ink-foreground hover:bg-ink-foreground/10",
    light: "border border-border text-foreground hover:bg-secondary",
  }[variant];
  return (
    <a href={href} {...(external ? ext : {})} className={`inline-flex min-h-12 items-center justify-center rounded-md px-6 text-sm font-semibold transition-colors ${styles}`}>
      {children}
    </a>
  );
}

function Section({ id, eyebrow, title, intro, children, alt }: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode; alt?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className={`py-20 md:py-28 ${alt ? "bg-secondary" : ""}`}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-t`} className="mt-3 max-w-3xl text-3xl font-bold md:text-4xl">{title}</h2>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function Header() {
  const [active, setActive] = useState("inicio");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);
  const dark = !scrolled && !open;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${dark ? "bg-transparent text-ink-foreground" : "border-b bg-background/95 text-foreground backdrop-blur"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#inicio" className="font-display text-base font-extrabold tracking-tight">Marcelo Mozart</a>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex gap-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} aria-current={active === n.id ? "true" : undefined}
                  className={`rounded px-3 py-2 text-sm transition-opacity ${active === n.id ? "font-semibold opacity-100" : "opacity-70 hover:opacity-100"}`}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button type="button" className="flex h-11 w-11 items-center justify-center lg:hidden" aria-expanded={open} aria-controls="mnav" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>
      {open && (
        <nav id="mnav" aria-label="Principal (celular)" className="border-t bg-background lg:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={() => setOpen(false)} className={`block py-3 text-base ${active === n.id ? "font-semibold text-primary" : ""}`}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/** Galeria de prints do gerenciador de anúncios: miniatura + ampliação em modal. */
function PrintGallery({ prints, client }: { prints: CasePrint[]; client: string }) {
  const [open, setOpen] = useState<CasePrint | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!prints.length) return null;

  const alt = (p: CasePrint) =>
    `Print do gerenciador de anúncios da Meta — ${client}${p.caption ? `: ${p.caption}` : ""}`;

  return (
    <div className="mt-6 space-y-4">
      {prints.map((p) => (
        <figure key={p.src} className="overflow-hidden rounded-lg border bg-secondary">
          <button type="button" onClick={() => setOpen(p)} aria-label={`Ampliar print de ${client}`} className="relative block w-full cursor-zoom-in">
            <span aria-hidden className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-semibold text-ink-foreground md:hidden">ampliar</span>
            <img src={p.src} alt={alt(p)} loading="lazy" className="w-full" />
          </button>
          {p.caption && <figcaption className="border-t px-4 py-2 text-xs text-muted-foreground">{p.caption}</figcaption>}
        </figure>
      ))}
      {open && (
        <div role="dialog" aria-modal="true" aria-label={`Print ampliado — ${client}`} onClick={() => setOpen(null)} className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4">
          <button type="button" onClick={() => setOpen(null)} aria-label="Fechar imagem ampliada" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-ink-border text-2xl text-ink-foreground">
            &times;
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-full w-full max-w-5xl overflow-auto text-center">
            <img src={open.src} alt={alt(open)} className="mx-auto block max-h-[85vh] min-w-[700px] rounded-lg bg-background object-contain md:min-w-0" />
            <p aria-hidden className="mt-2 text-xs text-ink-muted md:hidden">Arraste para percorrer o print</p>
            {open.caption && <figcaption className="mt-3 text-sm text-ink-muted">{open.caption}</figcaption>}
          </figure>
        </div>
      )}
    </div>
  );
}

function Index() {
  const showPhoto = PHOTO_URL || import.meta.env.DEV;
  return (
    <>
      <a href="#sobre" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-background focus:p-3">Pular para o conteúdo</a>
      <Header />
      <main>
        {/* HERO */}
        <section id="inicio" className="relative overflow-hidden bg-ink text-ink-foreground">
          <div aria-hidden className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
          <svg aria-hidden viewBox="0 0 400 200" className="absolute -right-10 bottom-10 hidden w-[520px] text-primary opacity-60 md:block">
            <polyline fill="none" stroke="currentColor" strokeWidth="2" points="0,170 60,150 110,158 170,110 230,120 290,70 350,80 400,30" />
            {[[60,150],[170,110],[290,70],[400,30]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="4" fill="currentColor" />)}
          </svg>
          <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
            <p className="reveal font-display text-sm font-bold tracking-[0.25em] text-ink-muted">MARCELO MOZART</p>
            <h1 className="reveal mt-6 max-w-4xl text-4xl font-extrabold leading-[1.08] md:text-6xl">
              Gestor de Tráfego Pago Sênior
              <span className="mt-3 block w-fit highlight-ink">Especialista em Meta Ads</span>
            </h1>
            <ul className="reveal mt-8 flex flex-wrap gap-3">
              {CERTIFICATIONS.map((c) => (
                <li key={c} className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-foreground/5 px-4 py-2 text-sm font-semibold text-ink-foreground/90">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ink-accent" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-ink-foreground/85">
              Atuo com marketing digital desde 2006 e com Meta Ads desde 2018, apoiando operações de aquisição de leads por meio de planejamento, execução, acompanhamento e otimização de campanhas.
            </p>
            <p className="reveal mt-4 max-w-2xl text-ink-muted">Disponível para parcerias PJ com agências de marketing digital, em atuação 100% remota.</p>
            <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row">
              <Btn href={whatsappUrl} external>Conversar sobre uma parceria</Btn>
              <Btn href="#experiencia" variant="ghost">Conhecer minha experiência</Btn>
            </div>
            <a href={LINKEDIN} {...ext} className="mt-8 inline-block text-sm text-ink-muted underline-offset-4 hover:text-ink-foreground hover:underline">LinkedIn ↗</a>
          </div>
        </section>

        {/* SOBRE */}
        <Section id="sobre" eyebrow="Sobre" title="Experiência que conecta estratégia e execução">
          <div className={showPhoto ? "md:grid md:grid-cols-[1fr_280px] md:gap-12" : ""}>
            {showPhoto && (
              <div className="float-left mb-4 mr-5 w-[42%] max-w-[160px] md:float-none md:order-2 md:mb-0 md:mr-0 md:w-full md:max-w-[280px]">
                {PHOTO_URL ? (
                  <img src={PHOTO_URL} alt="Marcelo Mozart" className="aspect-[4/5] w-full rounded-lg object-cover" />
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center rounded-lg border-2 border-dashed bg-secondary p-3 text-center text-[10px] leading-tight text-muted-foreground md:p-6 md:text-sm">
                    Foto temporária — aguardando fotografia oficial (visível apenas em desenvolvimento)
                  </div>
                )}
              </div>
            )}
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground md:order-1">
              <p>Sou Marcelo Mozart, profissional de marketing digital com trajetória iniciada em 2006, quando atuava na implantação de operações de telemarketing integradas a ações de e-mail marketing.</p>
              <p>Desde 2018, trabalho com Meta Ads, desenvolvendo e gerenciando campanhas de mídia paga, especialmente para geração de leads.</p>
              <p>Minha experiência combina planejamento, execução operacional, acompanhamento de indicadores e organização de projetos.</p>
              <p>Atuo como prestador de serviços independente e busco parcerias com agências que precisam de um profissional experiente para integrar suas operações de tráfego pago.</p>
              <p className="pt-2 text-base text-foreground">Novo Hamburgo, RS · Atuação 100% remota</p>
            </div>
          </div>
        </Section>

        {/* EXPERIÊNCIA */}
        <Section id="experiencia" eyebrow="Trajetória" title="Trajetória profissional" alt>
          <ol className="relative border-l border-border pl-8 md:pl-12">
            {TIMELINE.map((t) => (
              <li key={t.org} className="relative pb-12 last:pb-0">
                <span aria-hidden className={`absolute -left-[37px] top-1.5 h-3 w-3 rounded-full ring-4 ring-secondary md:-left-[53px] ${t.current ? "bg-primary" : "bg-muted-foreground/50"}`} />
                <p className="font-display text-sm font-bold text-primary">{t.period}{t.current && <span className="ml-3 rounded-full bg-accent px-2.5 py-0.5 text-xs text-accent-foreground">Atual</span>}</p>
                <h3 className="mt-2 text-xl font-bold">{t.org}</h3>
                <p className="mt-1 font-medium text-foreground/80">{t.role}</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* COMPETÊNCIAS */}
        <Section id="competencias" eyebrow="Competências" title="Competências em gestão de tráfego e performance">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((s, i) => (
              <article key={s.title} className="rounded-lg border bg-card p-6 transition-shadow hover:shadow-md">
                <p className="font-display text-xs font-bold text-muted-foreground">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {s.items.map((it) => <li key={it} className="flex gap-2"><span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{it}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        {/* RESULTADOS */}
        <Section id="resultados" eyebrow="Resultados" title="Experiência prática em operações de Meta Ads"
          intro="Minha experiência envolve campanhas de geração de leads para diferentes perfis de público e operações comerciais, com atenção à estruturação, ao acompanhamento e à otimização das campanhas." alt>
          <div className="grid gap-5 md:grid-cols-3">
            {METRICS.map((m) => (
              <div key={m.value} className="rounded-lg border bg-card p-7">
                <p className="font-display text-3xl font-extrabold text-primary">{m.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.caption}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-foreground">Segmentos atendidos</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SEGMENTS.map((s) => <li key={s} className="rounded-full border bg-card px-4 py-2 text-sm">{s}</li>)}
            </ul>
          </div>
          {CASE_STUDIES.length > 0 && (
            <div className="mt-12 space-y-6">
              {CASE_STUDIES.map((c, i) => (
                <article key={`${c.client}-${i}`} className="rounded-lg border bg-card p-6 md:p-8">
                  <header className="flex flex-wrap items-center gap-4">
                    {c.clientLogo && (
                      <img src={c.clientLogo} alt={`Logo ${c.client}`} className="h-16 w-auto max-w-[170px] rounded-md border bg-secondary p-2 object-contain" />
                    )}
                    <div>
                      {c.segment && <p className="eyebrow">{c.segment}</p>}
                      <h3 className="mt-1 text-xl font-bold">{c.client}</h3>
                    </div>
                  </header>
                  {c.objective && <p className="mt-4 max-w-3xl text-sm"><strong>Objetivo:</strong> {c.objective}</p>}
                  {c.strategy && <p className="mt-2 max-w-3xl text-sm"><strong>Estratégia:</strong> {c.strategy}</p>}
                  {!!c.activities?.length && (
                    <ul className="mt-2 max-w-3xl list-disc pl-5 text-sm text-muted-foreground">{c.activities.map((a) => <li key={a}>{a}</li>)}</ul>
                  )}
                  {c.results && <p className="mt-3 max-w-3xl text-sm"><strong>Resultados:</strong> {c.results}</p>}
                  <PrintGallery prints={c.prints} client={c.client} />
                </article>
              ))}
            </div>
          )}
        </Section>

        {/* FORMAÇÃO */}
        <Section id="formacao" eyebrow="Formação" title="Formação e desenvolvimento profissional">
          <div className="grid gap-5 md:grid-cols-2">
            {EDUCATION.map((e) => (
              <article key={e.title} className="rounded-lg border bg-card p-7">
                <p className="eyebrow">{e.kind}</p>
                <h3 className="mt-3 text-xl font-bold">{e.title}</h3>
                <p className="mt-2 text-muted-foreground">{e.institution} · {e.period}</p>
                <p className="mt-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium">{e.status}</p>
                {e.verifyUrl && <a href={e.verifyUrl} {...ext} className="ml-3 text-sm text-primary underline">Verificar</a>}
              </article>
            ))}
          </div>
        </Section>

        {/* PARCERIAS */}
        <Section id="parcerias" eyebrow="Parcerias" title="Como posso contribuir com sua agência"
          intro="Atuo como profissional independente, oferecendo suporte especializado em Meta Ads para agências que precisam ampliar sua capacidade de atendimento sem necessariamente expandir a equipe interna." alt>
          <div className="grid gap-5 md:grid-cols-2">
            {PARTNERSHIPS.map((p) => (
              <article key={p.title} className="flex flex-col rounded-lg border bg-card p-8">
                <p className="eyebrow">{p.tag}</p>
                <h3 className="mt-3 text-2xl font-bold">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{p.text}</p>
                <ul className="mt-6 grid grid-cols-2 gap-2 border-t pt-6 text-sm">
                  {p.items.map((it) => <li key={it} className="flex gap-2"><span aria-hidden className="text-primary">✓</span>{it}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            {PARTNERSHIP_INFO.map((i) => <li key={i} className="flex items-center gap-2"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />{i}</li>)}
          </ul>
          <div className="mt-10"><Btn href={whatsappUrl} external>Vamos conversar sobre sua operação?</Btn></div>
        </Section>

        {/* CONTATO */}
        <section id="contato" aria-labelledby="contato-t" className="bg-ink py-20 text-ink-foreground md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <p className="font-display text-xs font-bold tracking-[0.18em] text-ink-muted">CONTATO</p>
            <h2 id="contato-t" className="mt-3 max-w-3xl text-3xl font-bold md:text-4xl">Vamos conversar sobre uma parceria?</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-foreground/80">
              Se sua agência busca um profissional experiente em Meta Ads para apoiar a gestão de campanhas e operações de geração de leads, entre em contato para conversarmos sobre o modelo de trabalho.
            </p>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                { label: "WhatsApp", value: PHONE_DISPLAY, href: whatsappUrl, external: true },
                { label: "E-mail", value: EMAIL, href: `mailto:${EMAIL}`, external: false },
                { label: "LinkedIn", value: "in/marcelo-mozart", href: LINKEDIN, external: true },
              ].map((c) => (
                <a key={c.label} href={c.href} {...(c.external ? ext : {})} className="group rounded-lg border border-ink-border p-6 transition-colors hover:bg-ink-foreground/5">
                  <p className="text-sm text-ink-muted">{c.label}</p>
                  <p className="mt-2 break-all font-display text-lg font-bold">{c.value} <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span></p>
                </a>
              ))}
            </div>
            {RESUME_URL && (
              <div className="mt-8"><Btn href={RESUME_URL} variant="ghost">Baixar currículo</Btn></div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-ink-border bg-ink text-ink-muted">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="font-display font-bold text-ink-foreground">Marcelo Mozart</p>
            <p>Gestor de Tráfego Pago | Meta Ads</p>
          </div>
          <nav aria-label="Rodapé" className="flex gap-6">
            <a href={LINKEDIN} {...ext} className="hover:text-ink-foreground">LinkedIn</a>
            <a href={whatsappUrl} {...ext} className="hover:text-ink-foreground">WhatsApp</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-ink-foreground">E-mail</a>
          </nav>
          <p>© {new Date().getFullYear()} Marcelo Mozart</p>
        </div>
      </footer>
    </>
  );
}
