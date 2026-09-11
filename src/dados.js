// Conteúdo do portfólio, nos dois idiomas lado a lado.
//
// Os prints entram em public/shots/<slug>.jpg, proporção 4:3.
// O que está marcado com RASCUNHO foi escrito por mim e é pra Helo reescrever.

export const SOBRE = {
  nome: 'heloisa pimentel',
  chamada: {
    pt: ['eu gosto', 'de criar'],
    en: ['i like', 'creating'],
  },
  // texto dela, o mesmo do perfil do github
  corpo: {
    pt: [
      'Às vezes o que eu crio resolve um problema real, às vezes é só uma ideia que eu quis tirar do papel.',
      'Trabalho principalmente com IA, dados, automação e desenvolvimento web. Estudo Ciência da Computação na UNIFAL-MG, faço freelance e pesquiso aprendizado de máquina.',
    ],
    en: [
      "Sometimes what I build solves a real problem, sometimes it's just an idea I wanted to bring to life.",
      'I mainly work with AI, data, automation and web development. I study Computer Science at UNIFAL-MG, freelance, and do machine learning research.',
    ],
  },
  contatos: [
    { rotulo: 'github', href: 'https://github.com/helo-labs' },
    { rotulo: 'linkedin', href: 'https://www.linkedin.com/in/heloisa-pimentel-s/' },
  ],
}

export const STACKS = {
  titulo: { pt: 'com o que eu construo', en: 'what i build with' },
  faixa: ['ai', 'data', 'automation', 'web'],
  grupos: [
    { rotulo: { pt: 'linguagem', en: 'language' }, itens: ['Python', 'JavaScript', 'TypeScript'] },
    { rotulo: { pt: 'interface', en: 'interface' }, itens: ['React', 'Next.js', 'Vite'] },
    { rotulo: { pt: 'dados', en: 'data' }, itens: ['pandas', 'Plotly', 'Streamlit', 'SQL', 'PostgreSQL'] },
    { rotulo: { pt: 'serviço', en: 'backend' }, itens: ['FastAPI', 'SQLite'] },
    { rotulo: { pt: 'modelos', en: 'models' }, itens: ['OpenAI', 'Claude', 'Gemini', 'Transformers'] },
    { rotulo: { pt: 'automação', en: 'automation' }, itens: ['n8n', 'Make'] },
  ],
}

export const CAPITULOS = [
  {
    id: 'automacao',
    numero: '01',
    titulo: { pt: 'automação e ia', en: 'automation & ai' },
    projetos: [
      {
        slug: 'alo',
        prints: 2,
        nome: 'alô',
        etiquetas: ['openai realtime', 'webrtc', 'voz'],
        ano: '2026',
        texto: {
          pt: 'Monte, teste e leve embora um agente de voz sem escrever código. A pessoa descreve quem é o agente em linguagem comum e conversa com ele ali mesmo, pelo microfone do navegador.',
          en: 'Build, test and take away a voice agent without writing code. You describe who the agent is in plain language and talk to it right there, through the browser microphone.',
        },
        link: 'https://alo-voice-agents-kit.pages.dev',
        linkRotulo: { pt: 'abrir o site', en: 'open site' },
      },
      {
        slug: 'catalead',
        prints: 3,
        nome: 'catalead',
        etiquetas: ['graph api', 'regras', 'sem ia'],
        ano: '2026',
        texto: {
          pt: 'Acha quem está pedindo preço ou contato nos comentários do Instagram. A classificação inteira é um JSON que a pessoa abre e edita, e os dois motores, um em JS e outro em Python, são verificados um contra o outro.',
          en: 'Finds who is asking about prices or contact in Instagram comments. The whole classification is a JSON file you can open and edit, and the two engines, one in JS and one in Python, are checked against each other.',
        },
        link: 'https://catalead.pages.dev',
        linkRotulo: { pt: 'abrir o site', en: 'open site' },
      },
    ],
  },
  {
    id: 'dados',
    numero: '02',
    titulo: { pt: 'dados', en: 'data' },
    projetos: [
      {
        slug: 'hipnos',
        prints: 4,
        nome: 'hipnos',
        etiquetas: ['react', 'dados', 'narrativa'],
        ano: '2026',
        texto: {
          pt: 'O sono de 58 mamíferos virou uma narrativa que se lê rolando a página. Cada gráfico entra na hora em que a frase precisa dele, em vez de todos de uma vez num painel.',
          en: 'How 58 mammals sleep, told as a story you read by scrolling. Each chart arrives exactly when the sentence needs it, instead of all at once on a dashboard.',
        },
        link: 'https://hipnos.pages.dev',
        linkRotulo: { pt: 'abrir o site', en: 'open site' },
      },
      {
        slug: 'coffee-insight',
        prints: 1,
        nome: 'coffee insight',
        etiquetas: ['python', 'pandas', 'plotly', 'streamlit'],
        ano: '2026',
        texto: {
          pt: 'Treze meses de vendas de uma máquina de café, do arquivo cru às perguntas que ele responde. O que vende de manhã não é o que vende à tarde, e o dado mostra em que ponto do dia isso vira.',
          en: 'Thirteen months of vending machine sales, from the raw file to the questions it answers. What sells in the morning is not what sells in the afternoon, and the data shows exactly when that flips.',
        },
        link: 'https://github.com/helo-labs/coffee-insight',
        linkRotulo: { pt: 'ver o repositório', en: 'view repository' },
      },
    ],
  },
  {
    id: 'web',
    numero: '03',
    titulo: { pt: 'web', en: 'web' },
    projetos: [
      {
        slug: 'salmos-contabilidade',
        prints: 1,
        nome: 'salmos contabilidade',
        etiquetas: ['react', 'vite', 'cliente'],
        ano: '2026',
        texto: {
          pt: 'Site institucional entregue para cliente.',
          en: 'Institutional website delivered for a client.',
        },
        link: 'https://www.salmoscontabilidade.com.br/',
        linkRotulo: { pt: 'abrir o site', en: 'open site' },
      },
      {
        slug: 'meu-hacktown',
        prints: 0,
        nome: 'meu hacktown',
        etiquetas: ['html', 'edge', 'sem build'],
        ano: '2026',
        texto: {
          pt: 'A programação inteira do HackTown 2026 num arquivo só, com filtro por tema e o cronograma salvo no navegador. Sem build, sem conta, e com cache na borda pra abrir rápido no meio do evento.',
          en: 'The whole HackTown 2026 schedule in a single file, filtered by topic and saved in the browser. No build, no account, cached at the edge so it opens fast in the middle of the event.',
        },
        link: 'https://meu-hacktown.pages.dev',
        linkRotulo: { pt: 'abrir o site', en: 'open site' },
      },
    ],
  },
]

export const DESENVOLVIMENTO = {
  numero: '04',
  titulo: { pt: 'em desenvolvimento', en: 'in progress' },
  itens: [
    {
      nome: 'Pertin',
      estado: { pt: 'em pré-incubação', en: 'in pre-incubation' },
      texto: {
        pt: 'Transformando localização em uma informação mais útil para imóveis e hospedagens.',
        en: 'Turning location into more useful information for real estate and short stays.',
      },
    },
    {
      nome: 'ESG Extractor',
      estado: { pt: 'em processo de licenciamento de software', en: 'in software licensing' },
      texto: {
        pt: 'Extrai indicadores ESG de relatórios em PDF. O pré-filtro pontua cada página por evidência de dado quantitativo e manda ao modelo só as melhores, o que cortou 91,2% dos tokens no relatório da H&M sem perder nenhuma das 6 páginas-alvo.',
        en: 'Extracts ESG indicators from PDF reports. A pre-filter scores each page for quantitative evidence and sends only the best ones to the model, cutting 91.2% of tokens on the H&M report without missing any of the 6 target pages.',
      },
    },
    {
      nome: 'Foodie Vision',
      estado: { pt: 'melhorando o treinamento com imagens', en: 'improving image training' },
      texto: {
        pt: 'Explorando visão computacional aplicada a alimentos, rodando o modelo no próprio navegador.',
        en: 'Exploring computer vision applied to food, running the model in the browser itself.',
      },
    },
  ],
}

export const ACADEMICO = {
  numero: '05',
  titulo: { pt: 'pesquisa', en: 'research' },
  itens: [
    {
      tipo: { pt: 'trabalho de conclusão de curso', en: 'undergraduate thesis' },
      nome: 'Aplicação de Aprendizado de Máquina na análise do nível de Sustentabilidade na indústria da Moda',
      meta: {
        pt: 'UNIFAL-MG · defesa em dezembro de 2026 · orientação de Angela Leite Moreno e Mariane Moreira de Souza',
        en: 'UNIFAL-MG · defense in December 2026 · advised by Angela Leite Moreno and Mariane Moreira de Souza',
      },
      texto: {
        pt: 'Construção de um dataset aberto e padronizado de indicadores ESG de marcas de moda, extraídos de relatórios públicos, para aplicar modelos de aprendizado de máquina que classifiquem nível de sustentabilidade. Mais de 100 marcas no banco até agora.',
        en: 'Building an open, standardized dataset of ESG indicators for fashion brands, extracted from public reports, to train machine learning models that classify sustainability level. More than 100 brands recorded so far.',
      },
    },
    {
      tipo: { pt: 'inicia\u00e7\u00e3o cient\u00edfica \u00b7 trabalho mais recente', en: 'undergraduate research \u00b7 latest work' },
      nome: 'Quando o relato deixa de ser obrigat\u00f3rio: auditoria ESG automatizada, supervis\u00e3o humana e resili\u00eancia profissional',
      meta: {
        pt: 'VII CoBICET, 2026, ampliado em cap\u00edtulo \u00b7 com Angela Leite Moreno e Mariane Moreira de Souza',
        en: 'VII CoBICET, 2026, expanded into a book chapter \u00b7 with Angela Leite Moreno and Mariane Moreira de Souza',
      },
      texto: {
        pt: 'Entre fevereiro e maio de 2026 as tr\u00eas maiores jurisdi\u00e7\u00f5es de mercado de capitais recuaram da divulga\u00e7\u00e3o obrigat\u00f3ria de sustentabilidade, enquanto punir alega\u00e7\u00e3o sem base endureceu. Quando relatar deixa de ser exig\u00eancia e mentir continua pun\u00edvel, o \u00f4nus da credibilidade migra do regulador para quem verifica.',
        en: 'Between February and May 2026 the three largest capital market jurisdictions retreated from mandatory sustainability disclosure, while punishing unfounded claims got stricter. When reporting stops being required and lying stays punishable, the burden of credibility moves from the regulator to whoever verifies.',
      },
    },
    {
      tipo: { pt: 'resumo apresentado \u00b7 trabalho pontual', en: 'conference abstract \u00b7 one-off' },
      nome: 'Conservação de energia em integradores numéricos: quando um método de ordem 1 supera o RK4',
      meta: {
        pt: 'XI Workshop de Matemática e Matemática Aplicada · Alfenas, 2026 · com Pamela Oliveira',
        en: 'XI Workshop on Mathematics and Applied Mathematics · Alfenas, 2026 · with Pamela Oliveira',
      },
      texto: {
        pt: 'Escolher integrador pela ordem de consistência descreve o erro num horizonte fixo e não diz nada sobre integrar a mesma trajetória por milhões de passos, que é o caso de motor de física, simulação orbital e dinâmica molecular.',
        en: 'Picking an integrator by consistency order describes the error over a fixed horizon and says nothing about integrating the same trajectory for millions of steps, which is the case in physics engines, orbital simulation and molecular dynamics.',
      },
    },
  ],
}

export const SEM_PRINT = {
  pt: 'print a caminho',
  en: 'screenshot coming',
}

// convite pra passar o mouse. sem isso ninguém descobre que a imagem reage.
export const CONVITE = {
  uma: { pt: 'passe o mouse para ver em cor', en: 'hover to see it in colour' },
  varias: {
    pt: (n) => `${n} imagens · passe o mouse`,
    en: (n) => `${n} images · hover`,
  },
}

export const RODAPE = {
  pt: 'heloisa pimentel · 2026',
  en: 'heloisa pimentel · 2026',
}
