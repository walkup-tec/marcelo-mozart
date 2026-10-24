// Todo o conteúdo do portfólio fica aqui para facilitar atualizações.
// As imagens do case ficam em public/ para o site publicado servir sem o proxy da Lovable.
export const WHATSAPP_NUMBER = "5551999666841";
export const WHATSAPP_MESSAGE =
  "Olá, Marcelo! Gostaria de conversar sobre uma possível parceria PJ em gestão de tráfego Meta Ads.";
export const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
export const EMAIL = "mozart@marcelomozart.com.br";
export const LINKEDIN = "https://www.linkedin.com/in/marcelo-mozart";
export const PHONE_DISPLAY = "(51) 99966-6841";

/** Selos exibidos no destaque inicial. */
export const CERTIFICATIONS = [
  "Especialista em Meta Ads",
  "Gerente de tráfego certificado Meta",
  "Tech Provider Meta",
];

/** Foto da seção Sobre. Arquivo em public/. Null oculta o espaço na publicação. */
export const PHOTO_URL: string | null = "/marcelo-mozart.jpg";
/** Defina o caminho do PDF real (ex.: "/marcelo-mozart-curriculo.pdf"). Enquanto null, o botão não aparece. */
export const RESUME_URL: string | null = null;

export const NAV = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
  { id: "competencias", label: "Competências" },
  { id: "resultados", label: "Resultados" },
  { id: "formacao", label: "Formação" },
  { id: "parcerias", label: "Parcerias" },
  { id: "contato", label: "Contato" },
];

export const TIMELINE = [
  {
    period: "2006",
    org: "Início no marketing digital",
    role: "Marco complementar",
    text: "Primeiro contato com ferramentas de marketing digital, por meio da integração de operações de telemarketing com campanhas de e-mail marketing.",
    current: false,
  },
  {
    period: "2006 – 2013",
    org: "Agência SP2B",
    role: "Gerente de Projetos",
    text: "Atuação em gerenciamento de projetos, organização de processos empresariais e operações, desenvolvendo experiência em planejamento, coordenação e acompanhamento de atividades.",
    current: false,
  },
  {
    period: "Desde 2018",
    org: "Agência Digital Corban",
    role: "Gestor de Tráfego Pago — Prestador de Serviços Autônomo",
    text: "Gestão de campanhas Meta Ads com foco em geração de leads, especialmente para produtos financeiros e prestadores de serviços. Responsável por planejamento de campanhas, segmentação de públicos, desenvolvimento de criativos, copywriting, acompanhamento de métricas, otimização e integração com operações comerciais.",
    current: true,
  },
];

export const SKILLS = [
  { title: "Estratégia e planejamento", items: ["Planejamento de campanhas Meta Ads", "Definição de objetivos", "Pesquisa e segmentação de públicos", "Estruturação de campanhas de geração de leads", "Análise de desempenho"] },
  { title: "Operação de mídia paga", items: ["Configuração de campanhas", "Gerenciamento de contas Meta Ads", "Monitoramento de anúncios", "Otimização contínua", "Gestão simultânea de contas", "Elaboração de relatórios"] },
  { title: "Criativos e conversão", items: ["Desenvolvimento de criativos publicitários", "Copywriting para anúncios", "Desenvolvimento de landing pages", "Estratégias de captação de leads"] },
  { title: "Rastreamento e mensuração", items: ["Meta Pixel", "Configuração de eventos", "API de Conversões da Meta (CAPI)", "Acompanhamento de conversões", "Análise de indicadores"] },
  { title: "Gestão e operação", items: ["Organização de processos", "Gestão de projetos", "Relacionamento com clientes", "Integração com equipes de agências", "Acompanhamento operacional"] },
];

export const METRICS = [
  { value: "Desde 2018", caption: "Atuação profissional com Meta Ads." },
  { value: "Até 15 contas", caption: "Quantidade máxima de contas de anúncios administradas simultaneamente em sua experiência profissional." },
  { value: "Desde 2006", caption: "Experiência com ferramentas e operações de marketing digital." },
];

export const SEGMENTS = ["Produtos financeiros e crédito", "Prestadores de serviços"];

/** Print do gerenciador de anúncios da Meta, com os indicadores da campanha. */
export type CasePrint = {
  /** URL ou import do arquivo da imagem. */
  src: string;
  /** Legenda curta sob o print, ex.: "Geração de leads — 30 dias". */
  caption?: string;
};

export type CaseStudy = {
  /** Nome do cliente, exibido ao lado da logo. */
  client: string;
  /** Logo do cliente. Enquanto null, o espaço fica oculto. */
  clientLogo?: string | null;
  /** Segmento ou tipo de operação, ex.: "Produtos financeiros e crédito". */
  segment?: string;
  /** Estratégia da campanha, ex.: "Leads via WhatsApp · Otimização de CPA". */
  strategy?: string;
  /** Resultado exibido no card, ex.: "Investimento diário de R$ 20,00 com 40 leads por dia." */
  results?: string;

  /** Prints do gerenciador de anúncios. Só entram com autorização do cliente e com dados internos mascarados. */
  prints: CasePrint[];
};

/** Adicione apenas cases autorizados pelo cliente. Lista vazia = seção oculta. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    client: "Sinal Verde",
    clientLogo: "/sinal-verde-logo.png",
    segment: "Crédito pessoal · Consignado",
    strategy: "Leads via WhatsApp · Otimização de CPA",
    results: "Investimento diário de R$ 20,00 com 40 leads por dia.",
    prints: [
      {
        src: "/sinal-verde-print.png",
        caption:
          "Últimos 30 dias (16 de set a 15 de out de 2026) — 167 conversas iniciadas, R$ 17,27 por conversa.",
      },
    ],
  },
];

export const EDUCATION = [
  { kind: "Formação acadêmica", title: "Análise e Desenvolvimento de Sistemas para Web", institution: "Faculdade Uninove/SP", period: "2018 – 2019", status: "Ensino superior incompleto", verifyUrl: null as string | null },
  { kind: "Curso", title: "Gestão de Tráfego", institution: "Expert Agência de Marketing/SP", period: "2019", status: "Concluído com certificado", verifyUrl: null as string | null },
  { kind: "Partner", title: "Tech Provider - META", institution: "Meta Platforms, Inc.", period: "2026", status: "Programa Ativo", verifyUrl: null as string | null },
];

export const PARTNERSHIPS = [
  {
    tag: "Gestão operacional",
    title: "Execução e otimização de campanhas",
    text: "A agência define o direcionamento estratégico e eu assumo as atividades operacionais de configuração, acompanhamento e otimização das campanhas.",
    items: ["Implementação de campanhas", "Segmentação", "Monitoramento", "Otimização", "Relatórios", "Alinhamento com a equipe"],
  },
  {
    tag: "Gestão estratégica e operacional",
    title: "Planejamento e operação de mídia paga",
    text: "Atuação desde o planejamento das campanhas até a execução, análise de indicadores e otimizações, em alinhamento com os objetivos definidos pela agência.",
    items: ["Planejamento de mídia", "Estruturação de campanhas", "Execução", "Análise de desempenho", "Otimizações", "Acompanhamento de resultados"],
  },
];

export const PARTNERSHIP_INFO = [
  "Modelo PJ/Freelancer",
  "Atuação 100% remota",
  "Integração à equipe da agência",
  "Relacionamento com o cliente final, conforme a operação",
  "Condições comerciais sob negociação",
];
