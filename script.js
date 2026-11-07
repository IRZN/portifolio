/* =========================================================
   PROJETOS
   Para adicionar um projeto, copie um bloco { ... } e troque os dados.
   - tipo: "Projeto pessoal", "Projeto da faculdade" etc.
   - repositorio: link do GitHub (deixe "" se for privado)
   - site: link do projeto no ar (deixe "" se não tiver)
   - contaTeste: opcional, só para projetos com login
   ========================================================= */
const projetos = [
  {
    titulo: "Gerenciamento Financeiro",
    tipo: "Projeto pessoal",
    descricao:
      "Sistema web para controlar gastos pessoais. Registra gastos normais, parcelados e mensais recorrentes; as parcelas são distribuídas sozinhas entre os meses, e um painel mostra o total e a divisão por categoria de cada mês.",
    tecnologias: ["HTML", "CSS", "JavaScript", "Supabase"],
    repositorio: "", // repositório privado
    site: "https://financeirogerenciamento.vercel.app/login.html",
    contaTeste: { email: "teste@gmail.com", senha: "tester" },
  },
  {
    titulo: "Portfólio pessoal",
    tipo: "Projeto pessoal",
    descricao:
      "Este site. Feito do zero com HTML, CSS e JavaScript, sem frameworks, e publicado no GitHub Pages.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    repositorio: "https://github.com/IRZN/IRZN.github.io",
    site: "",
  },
  // Exemplo de como adicionar outro projeto:
  // {
  //   titulo: "Nome do projeto",
  //   tipo: "Projeto da faculdade",
  //   descricao: "O que ele faz, em uma ou duas frases.",
  //   tecnologias: ["Java", "Python"],
  //   repositorio: "https://github.com/IRZN/nome-do-repositorio",
  //   site: "",
  // },
];

const githubPerfil = "https://github.com/IRZN?tab=repositories";

function criarCardProjeto(projeto) {
  const card = document.createElement("article");
  card.className = "projeto";

  const titulo = document.createElement("h3");
  titulo.textContent = projeto.titulo;

  const tipo = document.createElement("p");
  tipo.className = "projeto-tipo";
  tipo.textContent = projeto.tipo || "";

  const descricao = document.createElement("p");
  descricao.textContent = projeto.descricao;

  const tecnologias = document.createElement("ul");
  tecnologias.className = "etiquetas";
  tecnologias.setAttribute("aria-label", "Tecnologias usadas");
  projeto.tecnologias.forEach((tec) => {
    const item = document.createElement("li");
    item.textContent = tec;
    tecnologias.appendChild(item);
  });

  const links = document.createElement("div");
  links.className = "projeto-links";
  if (projeto.site) links.appendChild(criarLink("Abrir projeto", projeto.site));
  if (projeto.repositorio) links.appendChild(criarLink("Ver código", projeto.repositorio));

  card.append(titulo);
  if (projeto.tipo) card.append(tipo);
  card.append(descricao, tecnologias);
  if (projeto.contaTeste) card.append(criarContaTeste(projeto.contaTeste));
  card.append(links);
  return card;
}

function criarContaTeste(conta) {
  const caixa = document.createElement("div");
  caixa.className = "conta-teste";

  const titulo = document.createElement("p");
  titulo.className = "conta-teste-titulo";
  titulo.textContent = "Conta de teste";

  const dados = document.createElement("dl");
  [["E-mail", conta.email], ["Senha", conta.senha]].forEach(([rotulo, valor]) => {
    const linha = document.createElement("div");
    const dt = document.createElement("dt");
    dt.textContent = rotulo;
    const dd = document.createElement("dd");
    dd.textContent = valor;
    linha.append(dt, dd);
    dados.appendChild(linha);
  });

  caixa.append(titulo, dados);
  return caixa;
}

function criarLink(texto, url) {
  const link = document.createElement("a");
  link.href = url;
  link.textContent = texto;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}

function criarCardMaisProjetos() {
  const card = document.createElement("article");
  card.className = "projeto projeto-mais";

  const titulo = document.createElement("h3");
  titulo.textContent = "Mais no GitHub";

  const descricao = document.createElement("p");
  descricao.textContent = "Todos os meus repositórios, incluindo trabalhos da faculdade.";

  const links = document.createElement("div");
  links.className = "projeto-links";
  links.appendChild(criarLink("Ver repositórios", githubPerfil));

  card.append(titulo, descricao, links);
  return card;
}

function renderizarProjetos() {
  const lista = document.getElementById("lista-projetos");
  projetos.forEach((projeto) => lista.appendChild(criarCardProjeto(projeto)));
  lista.appendChild(criarCardMaisProjetos());
}

/* ---------- Copiar e-mail ---------- */
function configurarCopiaEmail() {
  const botao = document.getElementById("copiar-email");
  const aviso = document.getElementById("aviso-copia");
  let temporizador;

  botao.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(botao.dataset.email);
      aviso.textContent = "E-mail copiado";
    } catch {
      aviso.textContent = "Não deu para copiar. Selecione o e-mail e copie manualmente.";
    }
    clearTimeout(temporizador);
    temporizador = setTimeout(() => (aviso.textContent = ""), 3000);
  });
}

/* ---------- Ano no rodapé ---------- */
document.getElementById("ano").textContent = new Date().getFullYear();

renderizarProjetos();
configurarCopiaEmail();