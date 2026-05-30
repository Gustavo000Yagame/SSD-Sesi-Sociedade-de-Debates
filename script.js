(function(){
'use strict';
const K = {
  u: 'ssd_current_user_v1',
  admin: 'ssd_admin_profile_v1',
  d: 'ssd_debaters_v1',
  e: 'ssd_events_v1',
  a: 'ssd_accounts_v1'
};
const AUTH_VERSION=2;
const ADMIN_EMAIL='admin@ssd.com';
const ADMIN_PASSWORD='SSDadmin2026!';
const SUPABASE_URL = 'https://cpfsxrpmaktsugbdrpfh.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable__HoVtpGTWDnq4gVbhPJV-g_wJwhllKy';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window.supabaseClient = supabaseClient;

let adminProfile=safeParse(localStorage.getItem(K.admin),null);
if(!adminProfile||typeof adminProfile!=='object')adminProfile={name:'Admin SSD'};
adminProfile.name=String(adminProfile.name||'Admin SSD').trim()||'Admin SSD';
const roles=['1º Governo','2º Governo','3º Governo','Reply Governo','1º Oposição','2º Oposição','3º Oposição','Reply Oposição'];
const uid=()=>window.crypto&&crypto.randomUUID?crypto.randomUUID():String(Date.now())+String(Math.random());
const manual=[
{id:'intro',tab:'Introdução',title:'Introdução ao World Schools',text:`O World Schools é um formato de debate escolar competitivo em que duas equipes tentam convencer um juiz imparcial de que uma moção deve ser aprovada ou rejeitada. O foco não é decorar respostas prontas, mas construir raciocínio público: explicar problemas, provar mecanismos, responder ao outro lado e comparar impactos.

No WSDC, bons debatedores pensam como construtores de caso. Eles definem o terreno do debate, explicam por que seu mundo é melhor, escolhem quais choques importam e mostram ao juiz como avaliar a rodada. A fala persuasiva combina conteúdo, estilo e estratégia: o que é dito, como é dito e por que aquilo foi priorizado.

Esta apostila em português foi adaptada e traduzida a partir do WSDC Handbook 2025 e do material de Judge Training 2024. Ela serve como guia prático para alunos, juízes e treinadores da SSD, com linguagem mais direta para consulta dentro do site.`},
{id:'gloss',tab:'Glossário',title:'Glossário essencial',text:`Argumento é uma razão estruturada para provar que a moção deve passar ou cair. Um argumento forte explica uma conclusão, o caminho lógico até ela e por que essa conclusão importa.

Caracterização é a descrição persuasiva do contexto: quem são os atores, como funcionam os incentivos, quais tendências existem e por que o problema acontece daquele jeito.

Choque é uma discordância central entre Governo e Oposição. Bons discursos não listam tudo; eles identificam quais choques decidem o debate e organizam a fala ao redor deles.

Mecanismo é a explicação de como ou por que algo acontece. Sem mecanismo, a fala vira afirmação solta. Impacto é a consequência relevante do argumento. Pesagem compara impactos, probabilidade, escala, reversibilidade e prioridade moral.

Framing é o enquadramento que orienta o juiz sobre quais critérios importam. Rebuttal é resposta direta ao material adversário. Set-up é a preparação inicial do debate: definição, modelo, contexto, métricas e visão de mundo. POI é uma pergunta curta oferecida durante discursos construtivos.`},
{id:'formato',tab:'Formato',title:'Formato WSDC',text:`Cada equipe pode ter até cinco integrantes preparando juntos, mas apenas três fazem discursos construtivos na rodada. As equipes são Governo ou Proposição e Oposição. A ordem é: 1º Governo, 1º Oposição, 2º Governo, 2º Oposição, 3º Governo, 3º Oposição, Reply da Oposição e Reply do Governo.

Os discursos construtivos têm 8 minutos. Os replies têm 4 minutos. O reply só pode ser feito pelo 1º ou 2º debatedor da equipe. Depois do tempo final há uma pequena tolerância, mas o material relevante deve estar dentro da fala.

POIs são permitidos apenas nos discursos construtivos, entre o fim do 1º minuto e o início do último minuto. Não há POIs nos replies. Uma fala competitiva normalmente aceita de 1 a 2 POIs, sem deixar que eles destruam a estrutura principal.

A equipe deve funcionar como unidade. Cada orador tem responsabilidades próprias, mas o caso precisa manter consistência: mesma visão de mundo, mesma métrica de vitória e evolução clara dos argumentos ao longo da rodada.`},
{id:'def',tab:'Definições',title:'Definições, modelos e desafios',text:`O 1º Governo deve definir a moção de forma razoável, próxima ao sentido comum e capaz de gerar debate justo. Definir não é procurar uma brecha para vencer por truque; é estabelecer o terreno em que a disputa será avaliada.

Uma definição justa respeita o texto da moção, dá espaço real para a Oposição discordar e não restringe artificialmente o debate. Em moções de política, o Governo pode apresentar um modelo: quem implementa, onde, quando, por quais meios e com quais limites. O modelo deve esclarecer o caso, não substituir a defesa moral e prática da política.

Definições injustas incluem squirreling, quando a equipe foge do sentido óbvio; truísmo, quando torna a moção impossível de negar; tautologia, quando a conclusão já está embutida na definição; definição restritiva demais; e definição ampla demais, que impede análise concreta.

Se a definição for injusta, o 1º Oposição deve desafiar cedo: explicar por que a definição é injusta, oferecer uma definição alternativa razoável e debater nesse terreno. Juízes não devem premiar abuso de definição, mas também não devem aceitar desafios artificiais quando o debate ainda é razoável.`},
{id:'motions',tab:'Moções',title:'Como abordar tipos de moção',text:`Moções de política normalmente aparecem como Esta Casa faria X. O Governo precisa defender a implementação da política, mostrar por que ela melhora o mundo e responder custos previsíveis. A Oposição pode defender o status quo, uma alternativa ou um contra-modelo quando isso for competitivo.

Moções de agente aparecem como Esta Casa, enquanto X, faria Y. O debate deve ser avaliado do ponto de vista daquele agente: seus objetivos, deveres, restrições e incentivos. Não basta dizer o que seria bom para todos; é preciso explicar por que aquele agente deveria agir assim.

Moções de análise, como Esta Casa acredita que X, pedem prova de uma tese. Moções de apoio ou oposição avaliam fenômenos, instituições, narrativas ou práticas. Moções de arrependimento exigem comparação com um contrafactual plausível. Moções de preferência comparam dois mundos, valores ou estratégias.

Antes de criar argumentos, a equipe deve perguntar: qual é a mudança defendida, quem é afetado, qual métrica decide a rodada e qual mundo comparativo estamos oferecendo ao juiz?`},
{id:'roles1',tab:'1ºs',title:'Papéis dos primeiros oradores',text:`O 1º Governo abre o debate. Ele define termos importantes, apresenta o contexto, constrói o modelo quando necessário, explica a métrica de avaliação e anuncia a divisão do caso. Sua função é deixar claro qual mundo o Governo defende e por que esse mundo é preferível.

Um bom 1º Governo não apenas lista argumentos: ele faz set-up. Isso inclui caracterizar o problema, explicar quem sofre, por que o status quo falha e qual lógica sustenta a intervenção. O juiz deve sair da fala entendendo o mapa do debate.

O 1º Oposição responde ao terreno colocado pelo Governo. Se houver abuso de definição, deve desafiar. Se não houver, deve aceitar o terreno geral e mostrar por que a proposta falha, é desnecessária, gera danos maiores ou perde para alternativa/status quo.

O 1º Oposição também precisa construir caso próprio. Uma fala só defensiva tende a deixar o Governo com iniciativa. O ideal é combinar refutação direta com uma visão positiva da Oposição.`},
{id:'roles2',tab:'2ºs e 3ºs',title:'Papéis dos segundos e terceiros oradores',text:`Os 2ºs debatedores aprofundam o debate. Eles respondem ao material adversário, reconstroem o próprio caso e acrescentam camadas de análise. Podem trazer novos argumentos quando isso respeita a divisão anunciada, mas não devem parecer uma equipe nova entrando no meio da rodada.

Um bom 2º orador mostra evolução: responde respostas, melhora mecanismos, adiciona exemplos relevantes e explica por que seus impactos continuam de pé. Ele também começa a comparar os mundos, preparando o terreno para o 3º.

Os 3ºs debatedores têm foco em choques. Sua tarefa central é organizar o debate, identificar as principais discordâncias e provar que seu lado venceu essas áreas. Eles podem desenvolver material já apresentado e responder material novo do adversário, mas não devem salvar a rodada com um argumento independente totalmente novo.

O 3º Oposição pode responder ao 3º Governo e ao caso inteiro do Governo. O 3º Governo, por falar antes do 3º Oposição, precisa antecipar áreas prováveis de comparação e estruturar a rodada de modo que o reply consiga fechar bem.`},
{id:'reply',tab:'Replies',title:'Replies',text:`Reply é uma fala de síntese comparativa, não um quarto discurso construtivo. Ele deve contar a história da rodada do ponto de vista da sua equipe: quais eram os principais choques, o que cada lado precisava provar e por que seu lado foi mais persuasivo.

Replies não devem trazer argumento independente novo. Podem, porém, reorganizar material antigo, destacar comparações que já estavam implícitas, responder à forma como o debate terminou e explicar por que certos argumentos se tornaram mais importantes.

O reply da Oposição fala primeiro; o reply do Governo encerra a rodada. Isso significa que o reply do Governo pode responder à síntese adversária, mas não deve abusar trazendo material impossível de ser respondido.

Um bom reply evita repetir a fala inteira. Ele escolhe dois ou três temas decisivos, compara mecanismos e impactos, reconhece onde houve disputa real e mostra por que, mesmo concedendo alguns pontos menores, sua equipe vence a avaliação global.`},
{id:'pois',tab:'POIs',title:'Points of Information',text:`POIs são intervenções curtas oferecidas pela equipe adversária durante discursos construtivos. Devem ser oferecidos entre o 1º e o último minuto. A pessoa que oferece deve ser breve e respeitosa; a intervenção deve durar cerca de 15 segundos.

POIs não são mini-discursos. Eles servem para testar uma premissa, apontar contradição, pedir explicação de mecanismo ou introduzir pressão estratégica. Um POI bom atinge o centro do argumento adversário.

O orador pode aceitar ou recusar. Competitivamente, aceitar de 1 a 2 POIs demonstra domínio e engajamento. Recusar todos pode gerar pressão negativa em estratégia; aceitar demais pode quebrar estrutura.

A etiqueta importa. Não se deve oferecer POIs em sequência imediata para intimidar, nem anunciar o conteúdo antes de ser aceito. O juiz avalia tanto a qualidade do POI quanto a qualidade da resposta quando isso afeta conteúdo e estratégia.`},
{id:'content',tab:'Conteúdo',title:'Conteúdo: argumentos, análise e refutação',text:`Conteúdo é o que está sendo apresentado. Inclui argumentos, mecanismos, exemplos, refutação, respostas a POIs e pesagem analítica. No WSDC, conteúdo vale 40% da nota.

Boa análise não é apenas declarar uma consequência. É explicar por que a consequência acontece, quem é afetado, qual cadeia causal liga ação e resultado, por que o impacto importa e por que é mais provável no mundo da sua equipe.

Exemplos ajudam quando são relevantes e generalizáveis. Um exemplo isolado não prova tudo; ele deve ilustrar uma lógica mais ampla. Exemplos muito específicos, anedóticos ou desconectados podem enfraquecer o argumento.

Refutação boa ataca o argumento real, não uma versão distorcida. Dizer que algo é falso não basta; é preciso quebrar premissas, mostrar elos ausentes, comparar probabilidade ou explicar por que o impacto adversário é menor do que parece.

Juízes não devem preencher lacunas. Se uma equipe sugeriu uma ideia, mas não explicou o mecanismo, o juiz não deve completar por conhecimento próprio.`},
{id:'style',tab:'Estilo',title:'Estilo: clareza e persuasão',text:`Estilo é como o conteúdo é apresentado. Também vale 40% da nota. Estilo não avalia sotaque, roupa, familiaridade cultural, timbre natural de voz ou preferência pessoal do juiz. Avalia a capacidade de tornar o raciocínio compreensível e persuasivo.

Elementos de estilo incluem ritmo, volume, pausas, contato visual, escolha de palavras, organização verbal, linguagem corporal e capacidade de destacar o que importa. Um estilo forte ajuda o juiz a acompanhar a lógica e sentir o peso do impacto.

Estilo não é teatro vazio. Uma fala emocional sem análise continua fraca em conteúdo. Mas caracterização bem feita pode aumentar a persuasão: explicar o medo de um grupo, a urgência de um problema ou a injustiça de uma estrutura pode tornar o argumento mais claro.

Problemas comuns de estilo incluem falar rápido demais, gritar, ler sem conexão, usar jargão sem explicar, perder estrutura ou esconder respostas importantes dentro de frases longas.`},
{id:'strategy',tab:'Estratégia',title:'Estratégia: escolhas para vencer a rodada',text:`Estratégia é a soma das decisões feitas para ganhar o debate. Vale 20% da nota. Envolve escolher quais argumentos priorizar, quanto tempo dedicar a cada choque, quando aceitar POIs, como estruturar a fala e como explicar a relevância do material.

Uma fala estratégica não tenta responder tudo com o mesmo peso. Ela identifica o que decide a rodada. Se o debate gira em torno de segurança versus liberdade, por exemplo, a equipe precisa explicar por que sua métrica deve guiar o juiz.

Estratégia também aparece na consistência entre discursos. Uma equipe perde força quando cada orador muda o enquadramento ou abandona argumentos centrais sem explicar.

Boa estratégia inclui pesagem: magnitude, probabilidade, urgência, irreversibilidade, número de pessoas afetadas, importância moral e exclusividade. Um argumento menor mas certo pode superar um impacto enorme mas improvável, dependendo da análise apresentada.

O juiz deve avaliar estratégia como escolha competitiva, não como gosto pessoal por formatos de fala.`},
{id:'judge',tab:'Julgamento',title:'Modelo de juiz WSDC',text:`O juiz WSDC deve atuar como uma pessoa comum, inteligente, informada, imparcial e aberta ao convencimento. Ele possui conhecimento geral sobre o mundo, mas não usa expertise específica para derrubar ou completar argumentos.

O juiz avalia o debate que aconteceu, não o debate que gostaria de ter visto. Não deve punir uma equipe por não trazer seu argumento favorito, nem deve criar refutações que o outro lado não apresentou. Também não deve preencher lacunas de análise por concordar com a conclusão.

O juiz deve ser diligente: prestar atenção, tomar notas, rastrear argumentos, respostas, POIs e evolução dos choques. Antes de decidir, deve ser capaz de resumir o debate de modo justo.

A decisão é holística e comparativa. Role fulfilment importa, mas não é o único critério. O juiz pergunta qual equipe foi mais persuasiva, por argumentos razoáveis dentro das regras, para aprovar ou rejeitar a moção.`},
{id:'process',tab:'Processo',title:'Processo de julgamento e deliberação',text:`O processo de julgamento começa com anotações boas. O juiz deve separar argumentos, respostas, exemplos, POIs e comparações. Depois, identifica áreas de choque: quais perguntas realmente dividem as equipes?

Passo 1: enquadrar os choques. Exemplo: a política funciona? Ela é justa? Os danos colaterais superam os benefícios? Passo 2: resolver cada choque com base no material apresentado. Passo 3: pesar os choques entre si para chegar a uma chamada provisória. Passo 4: atribuir notas aproximadas coerentes com a decisão.

Em painéis, a deliberação não é disputa de autoridade. Cada juiz deve explicar sua visão, ouvir os demais e estar disposto a mudar se outro juiz mostrar leitura mais fiel do debate. O chair deve organizar a conversa, garantir que todos falem e conduzir para uma decisão clara.

Ao final, a OA deve explicar por que um lado venceu, quais choques foram decisivos e como o material das equipes foi comparado. Feedback individual deve ser concreto, respeitoso e útil para melhora.`},
{id:'score',tab:'Notas',title:'Pontuação WSDC',text:`A pontuação WSDC divide a fala em Conteúdo 40%, Estilo 40% e Estratégia 20%. Discursos construtivos costumam usar Conteúdo 24-32, Estilo 24-32 e Estratégia 12-16, totalizando uma faixa comum de 60 a 80. Replies usam metade da escala.

Notas não são prêmios por concordância. Um juiz pode discordar pessoalmente de um argumento e ainda reconhecê-lo como bem desenvolvido. Também pode concordar com a conclusão e dar nota baixa se a equipe não provou o caminho.

Pressão para cima ocorre quando uma ação melhora a avaliação: bom enquadramento, análise rigorosa, resposta precisa, estilo claro, pesagem forte. Pressão para baixo ocorre quando há falhas: strawman, ausência de mecanismo, exemplos ruins, fala confusa, má alocação de tempo ou falta de engajamento.

As notas devem conversar com a decisão. Uma equipe pode vencer por margem pequena mesmo com falas parecidas, ou vencer por margem grande se dominou choques centrais. O importante é manter coerência entre justificativa, ballot e escala.`},
{id:'feedback',tab:'Feedback',title:'Feedback e evolução de treino',text:`Feedback bom separa decisão da orientação. Na decisão, o juiz explica por que a equipe venceu ou perdeu naquele debate. Na orientação, pode sugerir argumentos, estruturas ou melhorias que não foram parte da chamada.

Feedback deve ser concreto. Em vez de dizer “faltou análise”, diga qual elo faltou: por que o ator agiria assim, por que o impacto ocorreria, por que era maior que o do outro lado ou por que o exemplo não provava a regra.

Para debatedores, a melhor forma de evoluir é revisar a rodada por choques. Pergunte: quais eram as três perguntas centrais? Em qual delas perdemos? Foi por mecanismo, exemplo, refutação, estilo ou estratégia?

Para juízes em treino, a prioridade é justificar chamadas sem depender de opinião própria. Escreva a razão da vitória em uma frase, depois liste o material que sustenta essa frase. Se a justificativa depende de algo que ninguém disse, ela não pode decidir a rodada.

A SSD deve usar a apostila como ciclo: estudar conceito, aplicar em debate, receber feedback, revisar fala e repetir.`}
];

const defaultDebaters=[
  {id:'d_demo',name:'Aluno SSD',className:'1º E.M',status:'Ativo',photo:'',banner:'',roles:['judge']}
];
const defaultEvents=[];
const defaultAccounts=[
  {id:'a_demo',name:'Aluno SSD',email:'aluno@ssd.com',password:'ssd123',className:'1º E.M',debaterId:'d_demo',role:'student',authVersion:AUTH_VERSION}
];

let D = [];
let E = [];
let A = [];
let storageWarningShown=false;

const state = {
  debaters: [],
  events: [],
  accounts: []
};

async function loginComGoogle() {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + window.location.pathname,
      queryParams: {
        prompt: 'select_account'
      }
    }
  });

  if (error) {
    alert(error.message);
  }
}

window.loginComGoogle = loginComGoogle;

async function carregarUsuario() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error || !data.user) {
    return false;
  }

  const user = data.user;
  const email = normalizeEmail(user.email);
  const fallbackName = user.user_metadata.full_name || user.user_metadata.name || email;

  let { data: profile, error: profileError } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError) {
    console.error('Erro buscando profile:', profileError);
  }

  if (!profile) {
    const novoProfile = {
      id: user.id,
      name: fallbackName,
      class_name: '',
      photo: user.user_metadata.avatar_url || user.user_metadata.picture || '',
      banner: '',
      role: 'student'
    };

    const { data: criado, error: insertError } = await supabaseClient
      .from('profiles')
      .insert(novoProfile)
      .select('*')
      .single();

    if (insertError) {
      console.error('Erro criando profile:', insertError);
      profile = novoProfile;
    } else {
      profile = criado;
    }
  }

  const mapped = mapProfileRow(profile);
  D = D.some(d => d.id === mapped.id)
    ? D.map(d => d.id === mapped.id ? mapped : d)
    : [...D, mapped];

  currentUser = {
    id: user.id,
    role: profile.role || 'student',
    name: profile.name || fallbackName,
    email,
    debaterId: user.id,
    authVersion: AUTH_VERSION
  };

  safeStore(K.u, JSON.stringify(currentUser));
  return true;
}


async function sair() {
  await supabaseClient.auth.signOut();
  location.reload();
}

async function loadDebaters() {
  const { data, error } =
    await window.supabaseClient
      .from('profiles')
      .select('*');

  if (error) {
    console.error(error);
    return;
  }

  D = Array.isArray(data) ? data : [];

  render();
}

async function loadEvents() {
  const { data, error } =
    await window.supabaseClient
      .from('debates')
      .select('*');

  if (error) {
    console.error(error);
    return;
  }

  E = Array.isArray(data) ? data : [];

  render();
}

async function loadAccounts() {
  const { data, error } =
    await window.supabaseClient
      .from('profiles')
      .select('*');

  if (error) {
    console.error(error);
    return;
  }

  A = Array.isArray(data) ? data : [];

  render();
}
async function loadAll(){
  D = readArray(K.d, defaultDebaters);
  E = readArray(K.e, defaultEvents);
  A = readArray(K.a, defaultAccounts);
}

loadAll();

let currentUser = safeParse(localStorage.getItem(K.u), null);

if (currentUser && currentUser.authVersion !== AUTH_VERSION) {
  localStorage.removeItem(K.u);
  currentUser = null;
}

const localPreviewAdmin = location.protocol === 'file:';

if (localPreviewAdmin) {

currentUser = {
  id: 'u_admin',
  role: 'admin',
  name: adminProfile.name,
  email: ADMIN_EMAIL,
  debaterId: '',
  authVersion: AUTH_VERSION
};

safeStore(K.u, JSON.stringify(currentUser));
}

normalizeCurrentUser();

let viewDate=new Date();
let selectedDate=new Date().toISOString().slice(0,10);
function safeParse(value,fallback){try{return JSON.parse(value)}catch(e){return fallback}}
function cloneArray(items){return (Array.isArray(items)?items:[]).map(item=>({...item}))}
function readArray(key,fallback){
  const parsed=safeParse(localStorage.getItem(key),fallback);
  if(Array.isArray(parsed))return parsed;
  const restored=cloneArray(fallback);
  safeStore(key,JSON.stringify(restored));
  return restored;
}
function ensureArrays(){
  if(!Array.isArray(D))D=cloneArray(defaultDebaters);
  if(!Array.isArray(E))E=cloneArray(defaultEvents);
  if(!Array.isArray(A))A=cloneArray(defaultAccounts);
}
function $(s){return document.querySelector(s)}
function $$(s){return Array.from(document.querySelectorAll(s))}
function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
async function saveAll(){
  return save();
}
function safeStore(key,value){
  try{localStorage.setItem(key,value);return true}catch(e){console.warn('Não foi possível salvar no navegador.',e);return false}
}
function save(){
  ensureArrays();
  let okD=safeStore(K.d,JSON.stringify(D));
  let okE=safeStore(K.e,JSON.stringify(E));
  let okA=saveAccounts();
  if(okD&&okE&&okA)return true;

  // Recuperação automática: o erro mais comum no protótipo HTML é excesso de imagem/base64 no localStorage.
  // Primeiro remove banners, que costumam ser maiores. Se ainda falhar, remove fotos também.
  D=D.map(d=>({...d,banner:''}));
  okD=safeStore(K.d,JSON.stringify(D));
  okE=safeStore(K.e,JSON.stringify(E));
  okA=saveAccounts();
  if(okD&&okE&&okA){
    if(!storageWarningShown){
      storageWarningShown=true;
      alert('O navegador estava sem espaço. Removi banners pesados para conseguir salvar.');
    }
    return true;
  }

  D=D.map(d=>({...d,photo:'',banner:''}));
  okD=safeStore(K.d,JSON.stringify(D));
  okE=safeStore(K.e,JSON.stringify(E));
  okA=saveAccounts();
  if(okD&&okE&&okA){
    if(!storageWarningShown){
      storageWarningShown=true;
      alert('O navegador estava sem espaço. Removi imagens pesadas para conseguir salvar.');
    }
    return true;
  }

  alert('Não consegui salvar no navegador. Entre como admin e abra Configurações para fazer a manutenção do app.');
  return false;
}
function sectionParagraphs(text){
  return String(text||'').split(/\n{2,}/).map(block=>{
    const lines=block.split('\n').map(s=>s.trim()).filter(Boolean);
    if(!lines.length)return '';
    if(lines.every(line=>line.startsWith('- '))){return '<ul>'+lines.map(line=>'<li>'+esc(line.slice(2))+'</li>').join('')+'</ul>'}
    return '<p>'+esc(lines.join(' '))+'</p>';
  }).join('')
}
function panelHTML(item,i){return '<div class="card panel '+(i===0?'on':'')+'" id="p-'+esc(item.id)+'"><h3>'+esc(item.title)+'</h3>'+sectionParagraphs(item.text)+'</div>'}

const tabs = $('#tabs');

if (tabs) {
  tabs.innerHTML = manual.map((item, i) =>
    '<button class="' + (i === 0 ? 'on' : '') +
    '" data-p="' + esc(item.id) + '">' +
    esc(item.tab || item.title) +
    '</button>'
  ).join('');
} else {
  console.error('Elemento #tabs não encontrado');
}

const manualPanels = $('#manualPanels');

if (manualPanels) {
  manualPanels.innerHTML = manual.map(panelHTML).join('');
} else {
  console.error('Elemento #manualPanels não encontrado');
}

window.toggleFullManual=function(){const box=$('#fullManual');const open=!box.classList.contains('on');box.classList.toggle('on',open);box.innerHTML=open?'<h3>Apostila completa em português</h3><div class="manual-source">Material traduzido e adaptado para a SSD<small>Base: WSDC Handbook 2025 e Judge Training 2024.</small></div>'+manual.map(x=>'<h4>'+esc(x.title)+'</h4>'+sectionParagraphs(x.text)).join(''):'';if(open)box.scrollIntoView({behavior:'smooth',block:'start'})};

function currentDebaterForAuth(){return D.find(d=>currentUser&&d.id===currentUser.debaterId)}
function currentRoles(){if(!currentUser)return[];if(currentUser.role==='admin')return['admin'];const d=currentDebaterForAuth();const roles=['student','debater'];if(d&&Array.isArray(d.roles)&&d.roles.includes('judge'))roles.push('judge');return roles}
function hasRole(role){return currentRoles().includes(role)}
function roleLabel(){if(isAdmin())return'Admin';return hasRole('judge')?'Aluno + Juiz':'Aluno'}
function isAdmin(){return currentUser&&currentUser.role==='admin'}
function canManageEvents(){return !!isAdmin()}
function canManageDebaters(){return !!isAdmin()}
function requireAdmin(action){if(isAdmin())return true;alert('Para '+action+', entre com a conta de administrador.');return false}
function canJudge(){return isAdmin()||hasRole('judge')}
function allowedSections(){if(!currentUser)return[];if(isAdmin())return['overview','performance','manual','judge','calendar','settings'];const sections=['student','manual','calendar','performance','settings'];if(canJudge())sections.push('overview','judge');return sections}
function requireSection(id){
  const allowed=allowedSections();
  if(allowed.includes(id))return id;
  if(currentUser)return allowed[0]||'student';
  return 'student';
}
window.toggleNav=function(){
  const app=$('.app'),btn=$('.menu-toggle');
  if(!app)return;
  const open=app.classList.toggle('nav-open');
  if(btn){
    btn.setAttribute('aria-label',open?'Fechar abas':'Abrir abas');
    btn.title=open?'Fechar abas':'Abrir abas';
    btn.textContent=open?'×':'☰';
  }
};
function normalizeEmail(email){return String(email||'').trim().toLowerCase()}
function normalizeCurrentUser(){
  if(!currentUser)return null;
  currentUser={...currentUser,email:normalizeEmail(currentUser.email),authVersion:AUTH_VERSION};
  if(currentUser.role!=='admin'){
    const account=accountByEmail(currentUser.email);
    if(account){
      currentUser={...currentUser,id:account.id,role:account.role||'student',name:account.name,debaterId:account.debaterId||'',authVersion:AUTH_VERSION};
      ensureDebaterForAccount(account);
    }
  }
  safeStore(K.u,JSON.stringify(currentUser));
  return currentUser;
}
window.normalizeCurrentUser=normalizeCurrentUser;
function setAuthMessage(id,message){
  const box=$(id);
  if(!box)return;
  box.textContent=message||'';
  box.style.display=message?'block':'none';
}
window.switchAuth=function(mode){
  const login=mode!=='signup';
  $('#loginBox').classList.toggle('on',login);
  $('#signupBox').classList.toggle('on',!login);
  if($('#loginTab'))$('#loginTab').classList.toggle('on',login);
  if($('#signupTab'))$('#signupTab').classList.toggle('on',!login);
  setAuthMessage('#loginError','');
  setAuthMessage('#signupError','');
};
function loginWithFields(){
  const email=normalizeEmail($('#loginEmail').value);
  const password=$('#loginPassword').value;
  setAuthMessage('#loginError','');
  if(email===normalizeEmail(ADMIN_EMAIL)&&password===ADMIN_PASSWORD){
    currentUser={id:'u_admin',role:'admin',name:adminProfile.name,email,debaterId:'',authVersion:AUTH_VERSION};
    safeStore(K.u,JSON.stringify(currentUser));
    applyPermissions();
    window.show('overview');
    return;
  }
  const account=accountByEmail(email);
  if(!account||account.password!==password){
    setAuthMessage('#loginError','E-mail ou senha inválidos.');
    return;
  }
  ensureDebaterForAccount(account);
  currentUser={id:account.id,role:account.role||'student',name:account.name,email:account.email,debaterId:account.debaterId,authVersion:AUTH_VERSION};
  safeStore(K.u,JSON.stringify(currentUser));
  save();
  applyPermissions();
  window.show('student');
}
window.loginWithFields=loginWithFields;
function registerWithFields(){
  const name=$('#signupName').value.trim();
  const email=normalizeEmail($('#signupEmail').value);
  const password=$('#signupPassword').value;
  const confirm=$('#signupConfirm').value;
  const selected=$('[name="signupClass"]:checked');
  setAuthMessage('#signupError','');
  if(name.length<3){setAuthMessage('#signupError','Digite seu nome completo.');return}
  if(password.length<4){setAuthMessage('#signupError','A senha precisa ter pelo menos 4 caracteres.');return}
  if(password!==confirm){setAuthMessage('#signupError','As senhas não conferem.');return}
  if(accountByEmail(email)||email===normalizeEmail(ADMIN_EMAIL)){setAuthMessage('#signupError','Este e-mail já está cadastrado.');return}
  const debater={id:uid(),name,className:selected?selected.value:'',status:'Ativo',photo:'',banner:'',roles:[]};
  const account={id:uid(),name,email,password,className:debater.className,debaterId:debater.id,role:'student',authVersion:AUTH_VERSION};
  D=[...D,debater];
  A=[...A,account];
  currentUser={id:account.id,role:'student',name,email,debaterId:debater.id,authVersion:AUTH_VERSION};
  safeStore(K.u,JSON.stringify(currentUser));
  save();
  applyPermissions();
  window.show('student');
}
window.registerWithFields=registerWithFields;
window.hardResetSession=function(){
  localStorage.removeItem(K.u);
  currentUser=null;
  applyPermissions();
  window.switchAuth('login');
};
window.logout=function(){
  localStorage.removeItem(K.u);
  currentUser=null;
  applyPermissions();
  window.switchAuth('login');
  render();
};
window.clearHeavyImages=function(){
  D=D.map(d=>({...d,photo:'',banner:''}));
  save();
  render();
  alert('Imagens pesadas removidas.');
};
function applyPermissions(){
  const allowed=allowedSections();
  $$('.nav button').forEach(btn=>btn.classList.toggle('hidden',!allowed.includes(btn.dataset.s)));
  $$('.admin-only').forEach(el=>el.classList.toggle('hidden-by-role',!isAdmin()));
  if(currentUser){
    $('#loginScreen').classList.add('hide');
    $('#sessionName').textContent=currentUser.name;
    $('#sessionRole').textContent=roleLabel();
    if($('#settingsSessionName'))$('#settingsSessionName').textContent=currentUser.name;
    if($('#adminName'))$('#adminName').value=adminProfile.name;
  }else{
    $('#loginScreen').classList.remove('hide');
  }
}

async function loadDebaters() {

  const { data, error } =
    await window.supabaseClient
      .from('debaters')
      .select('*');

  if(error){
    console.error(error);
    return;
  }

  D = Array.isArray(data) ? data : [];
  render();
}

// Dados persistem localmente; chamadas remotas ficam desativadas para evitar falhas 401 no protótipo.

async function loadEvents() {

  const { data, error } =
    await window.supabaseClient
      .from('debates')
      .select('*');

  if(error){
    console.error(error);
    return;
  }

  E = Array.isArray(data) ? data : [];
  render();
}

// Dados persistem localmente; chamadas remotas ficam desativadas para evitar falhas 401 no protótipo.

async function loadAccounts() {

  const { data, error } =
    await window.supabaseClient
      .from('profiles')
      .select('*');

  if(error){
    console.error(error);
    return;
  }

  A = Array.isArray(data) ? data : [];
}

// Dados persistem localmente; chamadas remotas ficam desativadas para evitar falhas 401 no protótipo.


function accountByEmail(email){
  ensureArrays();
  return A.find(a =>
    a.email === String(email||'').trim().toLowerCase()
  );
}


function saveAccounts(){
  ensureArrays();
  return safeStore(K.a, JSON.stringify(A));
}


function saveAdminProfile(){
  return safeStore(K.admin, JSON.stringify(adminProfile));
}


function ensureDebaterForAccount(account){

  let debater = D.find(d => d.id === account.debaterId);

  if(!debater){

    debater = {
      id: account.debaterId || uid(),
      name: account.name || 'Aluno SSD',
      className: account.className || '',
      status: 'Ativo',
      photo: '',
      banner: '',
      roles: []
    };

    account.debaterId = debater.id;

    D = [...D, debater];
    save();
  }

  return debater;
}
$('#loginForm').addEventListener('submit',e=>{e.preventDefault();loginWithFields()});
if($('#signupForm'))$('#signupForm').addEventListener('submit',e=>{e.preventDefault();registerWithFields()});
if($('#adminProfileForm'))$('#adminProfileForm').addEventListener('submit',e=>{e.preventDefault();if(!isAdmin())return;const name=$('#adminName').value.trim();if(name.length<3){alert('Digite um nome com pelo menos 3 caracteres.');return}adminProfile.name=name;saveAdminProfile();currentUser={...currentUser,name};safeStore(K.u,JSON.stringify(currentUser));applyPermissions();alert('Nome do admin atualizado.')});
if($('#loginTab'))$('#loginTab').addEventListener('click',()=>window.switchAuth('login'));
if($('#signupTab'))$('#signupTab').addEventListener('click',()=>window.switchAuth('signup'));
window.show=function(id){id=requireSection(id);$$('.sec').forEach(x=>x.classList.toggle('on',x.id===id));$$('.nav button').forEach(x=>x.classList.toggle('on',x.dataset.s===id));$('.app').classList.remove('nav-open');const btn=$('.menu-toggle');if(btn){btn.setAttribute('aria-label','Abrir abas');btn.title='Abrir abas';btn.textContent='☰'}render()};
$('#nav').addEventListener('click',e=>{if(e.target.dataset.s)window.show(e.target.dataset.s)});
$('#tabs').addEventListener('click',e=>{if(!e.target.dataset.p)return;openManual(e.target.dataset.p)});
document.addEventListener('click',function(e){
  const delEventBtn=e.target.closest('.js-delete-event');
  if(delEventBtn){e.preventDefault();e.stopPropagation();window.delEvent(delEventBtn.dataset.id);return}
  const editEventBtn=e.target.closest('.js-edit-event');
  if(editEventBtn){e.preventDefault();e.stopPropagation();window.editEvent(editEventBtn.dataset.id);return}
  const delDebaterBtn=e.target.closest('.js-delete-debater');
  if(delDebaterBtn){e.preventDefault();e.stopPropagation();window.delDebater(delDebaterBtn.dataset.id);return}
  const editDebaterBtn=e.target.closest('.js-edit-debater');
  if(editDebaterBtn){e.preventDefault();e.stopPropagation();window.editDebater(editDebaterBtn.dataset.id);return}
});
function stats(id){const items=[];E.forEach(ev=>(ev.lineup||[]).forEach(l=>{if(l.debaterId===id)items.push({ev,score:(ev.scores||{})[id]})}));const scored=items.filter(x=>x.score&&x.score.total!==undefined);const av=a=>a.length?a.reduce((s,x)=>s+Number(x),0)/a.length:0;return{debates:items.length,scored:scored.length,content:av(scored.map(x=>x.score.content)),style:av(scored.map(x=>x.score.style)),strategy:av(scored.map(x=>x.score.strategy)),total:av(scored.map(x=>x.score.total))}}
function metric(a,b,c,p){const cls=(a==='Minha média'||a==='Média geral')?'metric-overall':a==='Conteúdo'?'metric-content':a==='Estilo'?'metric-style':'metric-overall';return '<div class="card metric '+cls+'"><small>'+esc(a)+'</small><b>'+esc(b)+'</b><span class="muted">'+esc(c)+'</span><div class="bar"><i style="--w:'+Math.max(5,Math.min(100,Number(p)||5))+'%"></i></div></div>'}
function avg(a){return a.length?a.reduce((s,x)=>s+Number(x),0)/a.length:0}
function sortEvent(a,b){return (a.date+a.time).localeCompare(b.date+b.time)}
function weekday(date){return new Date(date+'T00:00').toLocaleDateString('pt-BR',{weekday:'long'})}
function eventCard(ev){const lineup=(ev.lineup||[]).map(l=>{const d=D.find(x=>x.id===l.debaterId);return d?l.role+': '+d.name:''}).filter(Boolean),actions=canManageEvents()?'<div><button type="button" class="btn2 js-edit-event" data-id="'+esc(ev.id)+'">Editar</button> <button type="button" class="danger js-delete-event" data-id="'+esc(ev.id)+'">Excluir</button></div>':'';return '<div class="event" data-event-id="'+esc(ev.id)+'"><div class="time">'+esc(ev.time)+'</div><div><b>'+esc(ev.motion)+'</b><br><small class="muted">'+esc(weekday(ev.date))+' · '+esc(ev.format)+' · '+esc(ev.place||'Sem local')+'</small><div>'+(lineup.length?lineup.map(x=>'<span class="pill">'+esc(x)+'</span>').join(''):'<span class="pill red">Sem escalação</span>')+'</div></div>'+actions+'</div>'}
function currentDebater(){if(!currentUser)return D[0];return D.find(d=>d.id===currentUser.debaterId)||D[0]}
let profileDraft={photo:'',banner:''};
function renderStudent(){
  const d=currentDebater();if(!d)return;
  const s=stats(d.id),ini=d.name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
  $('#studentPhoto').innerHTML=d.photo?'<img src="'+esc(d.photo)+'" alt="'+esc(d.name)+'">':esc(ini);
  $('#studentBanner').innerHTML=d.banner?'<img src="'+esc(d.banner)+'" alt="Banner de perfil">':'';
  $('#studentName').textContent=d.name;
  $('#studentInfo').textContent=(d.className||'Sem turma')+' • '+d.status+' • '+roleLabel()+' • '+s.debates+' debate(s)';
  $('#studentMetrics').innerHTML=[metric('Minha média',s.total?s.total.toFixed(1):'—','Debates avaliados: '+s.scored,s.total?s.total/80*100:5),metric('Conteúdo',s.content?s.content.toFixed(1):'—','Linha de conteúdo',s.content?s.content/32*100:5),metric('Estilo',s.style?s.style.toFixed(1):'—','Clareza e persuasão',s.style?s.style/32*100:5)].join('');
  const myEvents=E.filter(ev=>(ev.lineup||[]).some(l=>l.debaterId===d.id)).sort(sortEvent);
  $('#studentEvents').innerHTML=myEvents.map(eventCard).join('')||'<div class="empty">Você ainda não está escalado em debates.</div>';
  $('#studentScores').innerHTML=myEvents.map(ev=>{const sc=(ev.scores||{})[d.id];return '<p><b>'+esc(ev.motion)+'</b><br><small class="muted">'+esc(ev.date+' '+ev.time)+'</small><br>'+(sc?'<span class="pill green">Total: '+esc(sc.total)+'</span><span class="pill">Conteúdo: '+esc(sc.content)+'</span><span class="pill">Estilo: '+esc(sc.style)+'</span><span class="pill">Estratégia: '+esc(sc.strategy)+'</span>':'<span class="pill yellow">Sem nota ainda</span>')+'</p>'}).join('')||'<div class="empty">Sem notas registradas.</div>';
}
window.editMyProfile=function(){const d=currentDebater();if(!d)return;profileDraft={photo:d.photo||'',banner:d.banner||''};$('#studentProfileEditor').classList.add('on');show('student')}
window.cancelMyProfile=function(){const d=currentDebater();profileDraft={photo:d.photo||'',banner:d.banner||''};$('#studentProfileEditor').classList.remove('on');renderStudent()}
window.saveMyProfile=function(){const d=currentDebater();if(!d)return;d.photo=profileDraft.photo||'';d.banner=profileDraft.banner||'';save();$('#studentProfileEditor').classList.remove('on');render()}
window.removeMyAvatar=function(){profileDraft.photo='';const d=currentDebater();if(d){d.photo='';save();renderStudent()}}
window.removeMyBanner=function(){profileDraft.banner='';const d=currentDebater();if(d){d.banner='';save();renderStudent()}}
function readImageFile(file,callback,maxMb=1.2){if(!file)return;if(!file.type.startsWith('image/')){alert('Escolha um arquivo de imagem.');return}const limit=maxMb*1024*1024;if(file.size>limit){alert('Imagem muito pesada. Use uma imagem/GIF com até '+String(maxMb).replace('.',',')+' MB.');return}const reader=new FileReader();reader.onload=()=>callback(reader.result);reader.readAsDataURL(file)}
window.loadStudentAvatar=function(event){const file=event.target.files&&event.target.files[0];readImageFile(file,function(result){const img=new Image();img.onload=function(){const canvas=document.createElement('canvas');const size=420;canvas.width=size;canvas.height=size;const ctx=canvas.getContext('2d');const side=Math.min(img.width,img.height);const sx=(img.width-side)/2;const sy=(img.height-side)/2;ctx.drawImage(img,sx,sy,side,side,0,0,size,size);profileDraft.photo=canvas.toDataURL('image/jpeg',0.86);const d=currentDebater();if(d)d.photo=profileDraft.photo;renderStudent()};img.src=result})}
function setDraftBanner(result){profileDraft.banner=result;const d=currentDebater();if(d)d.banner=result;renderStudent()}
window.loadStudentBanner=function(event){const file=event.target.files&&event.target.files[0];readImageFile(file,function(result){const img=new Image();img.onload=function(){const maxW=1600,maxH=600,scale=Math.min(1,maxW/img.width,maxH/img.height),w=Math.max(1,Math.round(img.width*scale)),h=Math.max(1,Math.round(img.height*scale)),canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.fillStyle='#0f3f83';ctx.fillRect(0,0,w,h);ctx.drawImage(img,0,0,w,h);setDraftBanner(canvas.toDataURL('image/jpeg',0.86))};img.onerror=function(){setDraftBanner(result)};img.src=result},10)}
function render(){
  ensureArrays();
  applyPermissions();
  renderStudent();
  const st=D.map(d=>Object.assign({d},stats(d.id))),rank=[...st].sort((a,b)=>(b.total||0)-(a.total||0)),rated=st.filter(x=>x.scored),active=D.filter(d=>d.status==='Ativo').length,up=E.filter(e=>new Date(e.date+'T'+e.time)>=new Date()).length,av=rated.length?avg(rated.map(x=>x.total)):0;
  $('#metrics').innerHTML=[metric('Debatedores',D.length,'Membros cadastrados',100),metric('Ativos',active,'Disponíveis para escalação',D.length?active/D.length*100:0),metric('Média avaliada',av?av.toFixed(1):'—','Somente debates avaliados',av?av/80*100:5),metric('Próximos',up,'Debates agendados',up?80:10)].join('');
  $('#upcoming').innerHTML=[...E].filter(e=>new Date(e.date+'T'+e.time)>=new Date()).sort(sortEvent).slice(0,3).map(eventCard).join('')||'<div class="empty">Nenhum debate futuro.</div>';
  $('#top').innerHTML=rank.slice(0,5).map((x,i)=>'<p><b>'+(i+1)+'. '+esc(x.d.name)+'</b> <span class="pill green">'+(x.total?x.total.toFixed(1):'sem média')+'</span><br><small class="muted">'+x.debates+' debate(s), '+x.scored+' avaliado(s)</small></p>').join('')||'<div class="empty">Sem debatedores.</div>';
  const q=($('#q')&&$('#q').value||'').toLowerCase();
  $('#debaterCards').innerHTML=D.filter(d=>(d.name+' '+d.status+' '+(d.className||'')).toLowerCase().includes(q)).map(d=>{const s=stats(d.id),ini=d.name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase(),avatar=d.photo?'<img src="'+esc(d.photo)+'" alt="'+esc(d.name)+'">':esc(ini);return '<div class="debater-card"><div class="debater-main"><div class="avatar">'+avatar+'</div><div><b>'+esc(d.name)+'</b><br><small class="muted">'+esc(d.className||'Sem turma')+'</small><br><span class="pill '+(d.status==='Ativo'?'green':d.status==='Reserva'?'yellow':'black')+'">'+esc(d.status)+'</span><div class="role-badges"><span class="pill">Aluno</span>'+((d.roles||[]).includes('judge')?'<span class="pill">Juiz</span>':'')+'</div></div></div><div><div class="score-big">'+(s.total?s.total.toFixed(1):'—')+'</div><small class="muted">'+s.debates+' debate(s)</small><br><button type="button" class="btn2 js-edit-debater" data-id="'+esc(d.id)+'">Editar perfil</button> <button type="button" class="danger js-delete-debater" data-id="'+esc(d.id)+'">Excluir</button></div></div>'}).join('')||'<div class="empty">Nenhum debatedor encontrado.</div>';
  $('#perf').innerHTML=[['Conteúdo',avg(rated.map(x=>x.content)),32],['Estilo',avg(rated.map(x=>x.style)),32],['Estratégia',avg(rated.map(x=>x.strategy)),16]].map(x=>metric(x[0],x[1]?x[1].toFixed(1):'—','média dos debates avaliados',x[1]?x[1]/x[2]*100:5)).join('');
  $('#rank').innerHTML=rank.map((x,i)=>'<tr><td>'+ (i+1) +'</td><td><b>'+esc(x.d.name)+'</b><br><small class="muted">'+esc(x.d.className||'')+'</small></td><td>'+x.debates+'</td><td>'+(x.content?x.content.toFixed(1):'—')+'</td><td>'+(x.style?x.style.toFixed(1):'—')+'</td><td>'+(x.strategy?x.strategy.toFixed(1):'—')+'</td><td><b>'+(x.total?x.total.toFixed(1):'—')+'</b></td><td><button type="button" class="btn2" onclick="viewDebaterProfile(\''+esc(x.d.id)+'\')">Ver perfil</button></td></tr>').join('')||'<tr><td colspan="8"><div class="empty">Sem dados.</div></td></tr>';
  renderLineup();renderCalendar();renderDayList();renderAllEvents();renderJudge();updateWeekday();searchManual();
}
function renderPhotoPreview(photo,name){const box=$('#dPhotoPreview');if(!box)return;const ini=(name||'Foto').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();box.innerHTML=photo?'<img src="'+esc(photo)+'" alt="Foto de perfil">':esc(ini||'Foto')}
window.loadDebaterPhoto=function(event){const file=event.target.files&&event.target.files[0];if(!file)return;if(!file.type.startsWith('image/')){alert('Escolha um arquivo de imagem.');return}const reader=new FileReader();reader.onload=function(){const img=new Image();img.onload=function(){const canvas=document.createElement('canvas');const size=320;canvas.width=size;canvas.height=size;const ctx=canvas.getContext('2d');const side=Math.min(img.width,img.height);const sx=(img.width-side)/2;const sy=(img.height-side)/2;ctx.drawImage(img,sx,sy,side,side,0,0,size,size);const data=canvas.toDataURL('image/jpeg',0.82);$('#dPhoto').value=data;renderPhotoPreview(data,$('#dName').value)};img.src=reader.result};reader.readAsDataURL(file)}
window.removeDebaterPhoto=function(){if($('#dPhoto'))$('#dPhoto').value='';if($('#dPhotoFile'))$('#dPhotoFile').value='';renderPhotoPreview('', $('#dName')?$('#dName').value:'')}
window.editDebater=function(id){if(!canManageDebaters())return alert('Só o admin pode editar debatedores por aqui.');const d=D.find(x=>x.id===id);if(!d)return;window.show('settings');$('#dfTitle').textContent='Editar perfil';$('#dId').value=d.id;$('#dName').value=d.name;$('#dClass').value=d.className||'';$('#dStatus').value=d.status;$('#dPhoto').value=d.photo||'';const r=d.roles||[];$('#dRoleJudge').checked=r.includes('judge');renderPhotoPreview(d.photo||'',d.name)};
window.resetDebater=function(){$('#dfTitle').textContent='Adicionar debatedor';$('#debaterForm').reset();$('#dId').value='';if($('#dPhoto'))$('#dPhoto').value='';if($('#dPhotoFile'))$('#dPhotoFile').value='';if($('#dRoleJudge'))$('#dRoleJudge').checked=false;renderPhotoPreview('', '')};
$('#debaterForm').addEventListener('submit',e=>{e.preventDefault();if(!canManageDebaters())return alert('Só o admin pode salvar debatedores.');const id=$('#dId').value||uid(),old=D.find(d=>d.id===id)||{},roles=$('#dRoleJudge').checked?['judge']:[],p={id,name:$('#dName').value.trim(),className:$('#dClass').value.trim(),status:$('#dStatus').value,photo:$('#dPhoto').value,banner:old.banner||'',roles};D=D.some(d=>d.id===id)?D.map(d=>d.id===id?p:d):[...D,p];A=A.map(a=>a.debaterId===id?{...a,name:p.name}:a);save();window.resetDebater();render()});
window.delDebater=function(id){
  if(!requireAdmin('excluir membros'))return;
  id=String(id||'');
  if(!id||id==='undefined'||id==='null'){
    D=D.map((d,i)=>({...d,id:d.id||('debater_'+i+'_'+Date.now())}));
    save();render();
    alert('Corrigi IDs antigos. Tente excluir de novo.');
    return;
  }
  const d=D.find(x=>String(x.id)===id);
  if(!d){alert('Esse membro não existe mais.');render();return}
  if(!confirm('Excluir '+d.name+'? Isso remove o membro das escalações e apaga as notas dele.'))return;

  const before=D.length;
  D=D.filter(x=>String(x.id)!==id);
  E=E.map(e=>{
    const scores={...(e.scores||{})};
    delete scores[id];
    return {...e,lineup:(e.lineup||[]).filter(l=>String(l.debaterId)!==id),scores};
  });
  A=A.filter(a=>String(a.debaterId)!==id);

  if(D.length===before){
    alert('Não consegui excluir este membro. Use Resetar dados se a base antiga estiver corrompida.');
    return;
  }

  if(currentUser&&String(currentUser.debaterId)===id){localStorage.removeItem(K.u);currentUser=null}
  if($('#dId')&&$('#dId').value===id) resetDebater();
  save();
  render();
};
function renderLineup(sel=[]){ensureArrays();const box=$('#lineup');if(!box)return;const current=$$('[data-role]').map(s=>({role:s.dataset.role,debaterId:s.value})).filter(x=>x.debaterId),base=Array.isArray(sel)&&sel.length?sel:current;box.innerHTML=roles.map(r=>{const v=(base.find(x=>x.role===r)||{}).debaterId||'';return '<label>'+esc(r)+'<select data-role="'+esc(r)+'"><option value="">Sem escalação</option>'+D.map(d=>'<option value="'+esc(d.id)+'" '+(v===d.id?'selected':'')+'>'+esc(d.name)+'</option>').join('')+'</select></label>'}).join('');$$('[data-role]').forEach(s=>s.onchange=()=>renderEvals());renderEvals()}
function scoreBox(l,scores,prefix){const s=scores[l.debaterId]||{},isReply=l.role.includes('Reply');return '<div class="evalbox"><h4>'+esc(l.role)+' — '+esc(l.name)+'</h4><div class="evalgrid"><label>Conteúdo<input data-score="content" data-id="'+esc(prefix+l.debaterId)+'" type="number" min="'+(isReply?12:24)+'" max="'+(isReply?16:32)+'" step=".5" value="'+esc(s.content??'')+'" placeholder="'+(isReply?'12-16':'24-32')+'"></label><label>Estilo<input data-score="style" data-id="'+esc(prefix+l.debaterId)+'" type="number" min="'+(isReply?12:24)+'" max="'+(isReply?16:32)+'" step=".5" value="'+esc(s.style??'')+'" placeholder="'+(isReply?'12-16':'24-32')+'"></label><label>Estratégia<input data-score="strategy" data-id="'+esc(prefix+l.debaterId)+'" type="number" min="'+(isReply?6:12)+'" max="'+(isReply?8:16)+'" step=".5" value="'+esc(s.strategy??'')+'" placeholder="'+(isReply?'6-8':'12-16')+'"></label></div></div>'}
function renderEvals(scores={}){const box=$('#evals');if(!box)return;const lineup=$$('[data-role]').map(s=>({role:s.dataset.role,debaterId:s.value,name:(D.find(d=>d.id===s.value)||{}).name})).filter(x=>x.debaterId);box.innerHTML=lineup.length?lineup.map(l=>scoreBox(l,scores,'event-')).join(''):'<div class="empty">Escalone debatedores para avaliá-los.</div>'}
$('#eventForm').addEventListener('submit',e=>{e.preventDefault();const id=$('#eId').value||uid(),lineup=$$('[data-role]').map(s=>({role:s.dataset.role,debaterId:s.value})).filter(x=>x.debaterId),scores={};lineup.forEach(l=>{const vals={};$$('[data-id="'+CSS.escape('event-'+l.debaterId)+'"]').forEach(i=>{if(i.value!=='')vals[i.dataset.score]=Number(i.value)});if(vals.content!==undefined&&vals.style!==undefined&&vals.strategy!==undefined){vals.total=vals.content+vals.style+vals.strategy;scores[l.debaterId]=vals}});const p={id,date:$('#eDate').value,time:$('#eTime').value,motion:$('#eMotion').value.trim(),format:$('#eFormat').value,place:$('#ePlace').value.trim(),lineup,scores};E=E.some(x=>x.id===id)?E.map(x=>x.id===id?p:x):[...E,p];selectedDate=p.date;viewDate=new Date(p.date+'T00:00');save();resetEvent();render()});
window.editEvent=function(id){if(!canManageEvents())return alert('Só o admin pode editar debates.');const e=E.find(x=>x.id===id);if(!e)return;window.show('calendar');$('#efTitle').textContent='Editar debate';$('#eId').value=e.id;$('#eDate').value=e.date;$('#eTime').value=e.time;$('#eMotion').value=e.motion;$('#eFormat').value=e.format;$('#ePlace').value=e.place||'';selectedDate=e.date;viewDate=new Date(e.date+'T00:00');renderLineup(e.lineup||[]);renderEvals(e.scores||{});updateWeekday();renderCalendar();renderDayList()};
function renderJudge(){const sel=$('#judgeEventSelect');if(!sel)return;const previous=sel.value;sel.innerHTML=E.sort(sortEvent).map(e=>'<option value="'+esc(e.id)+'">'+esc(e.date+' '+e.time+' — '+e.motion)+'</option>').join('');if(previous)sel.value=previous;if(!sel.value&&E[0])sel.value=E[0].id;loadJudgeEvent(false);$('#judgeSaved').innerHTML=E.filter(e=>e.judge||e.winner||e.decision).sort(sortEvent).map(e=>'<div class="result"><b>'+esc(e.motion)+'</b><p>'+esc(e.date+' '+e.time)+' · Juiz: '+esc(e.judge||'não informado')+' · Vencedor: '+esc(e.winner||'sem decisão')+'</p><p>'+esc(e.decision||'')+'</p></div>').join('')||'<div class="empty">Nenhum registro de juiz salvo.</div>'}
window.loadJudgeEvent=function(keep=true){const id=$('#judgeEventSelect')&&$('#judgeEventSelect').value;const e=E.find(x=>x.id===id);if(!e)return;$('#judgeName').value=e.judge||'';$('#judgeWinner').value=e.winner||'';$('#judgeDecision').value=e.decision||'';$('#judgeEventInfo').innerHTML='<p><b>'+esc(e.motion)+'</b><br><span class="muted">'+esc(e.date+' · '+e.time+' · '+weekday(e.date))+'</span></p><button type="button" class="danger" onclick="delEvent(\''+esc(e.id)+'\')">Excluir este debate</button>';const lineup=(e.lineup||[]).map(l=>({role:l.role,debaterId:l.debaterId,name:(D.find(d=>d.id===l.debaterId)||{}).name})).filter(x=>x.debaterId);$('#judgeScores').innerHTML=lineup.length?lineup.map(l=>scoreBox(l,e.scores||{},'judge-')).join(''):'<div class="empty">Este debate ainda não tem participantes escalados. Edite no calendário primeiro.</div>'}
window.saveJudgeRecord=function(){if(!canJudge())return alert('Só juiz ou admin pode registrar decisões.');const id=$('#judgeEventSelect').value;const e=E.find(x=>x.id===id);if(!e)return;const scores={};(e.lineup||[]).forEach(l=>{const vals={};$$('[data-id="'+CSS.escape('judge-'+l.debaterId)+'"]').forEach(i=>{if(i.value!=='')vals[i.dataset.score]=Number(i.value)});if(vals.content!==undefined&&vals.style!==undefined&&vals.strategy!==undefined){vals.total=vals.content+vals.style+vals.strategy;scores[l.debaterId]=vals}});Object.assign(e,{judge:$('#judgeName').value.trim(),winner:$('#judgeWinner').value,decision:$('#judgeDecision').value.trim(),scores});save();render();window.show('judge')};
window.delEvent=function(id){
  if(!requireAdmin('excluir debates'))return;
  id=String(id||'');
  if(!id||id==='undefined'||id==='null'){
    E=E.map((ev,i)=>({...ev,id:ev.id||('event_'+i+'_'+Date.now())}));
    save();render();
    alert('Corrigi IDs antigos. Tente excluir de novo.');
    return;
  }
  const ev=E.find(e=>String(e.id)===id);
  if(!ev){alert('Esse debate não existe mais.');render();return}
  if(!confirm('Excluir o debate: '+ev.motion+'?'))return;
  const before=E.length;
  E=E.filter(e=>String(e.id)!==id);
  if(E.length===before){alert('Não consegui excluir este debate. Use Excluir todos os debates ou Resetar dados.');return}
  if($('#eId')&&$('#eId').value===id) resetEvent();
  if($('#judgeEventSelect')&&$('#judgeEventSelect').value===id) $('#judgeEventSelect').value='';
  if(isUuid(id)){
    supabaseClient.from('debate_scores').delete().eq('debate_id', id).then(({error})=>{ if(error) console.error('Erro excluindo notas:', error); });
    supabaseClient.from('debates').delete().eq('id', id).then(({error})=>{ if(error) console.error('Erro excluindo debate:', error); });
  }
  save();
  render();
};
window.resetEvent=function(){$('#efTitle').textContent='Novo debate';$('#eventForm').reset();$('#eId').value='';$('#eDate').value=selectedDate;$('#eTime').value='14:00';renderLineup([]);updateWeekday()};
function renderCalendar(){const y=viewDate.getFullYear(),m=viewDate.getMonth(),first=new Date(y,m,1),start=new Date(first);start.setDate(1-first.getDay());$('#calTitle').textContent=viewDate.toLocaleDateString('pt-BR',{month:'long',year:'numeric'});let html=['dom','seg','ter','qua','qui','sex','sáb'].map(d=>'<div class="dow">'+d+'</div>').join('');for(let i=0;i<42;i++){const d=new Date(start);d.setDate(start.getDate()+i);const iso=d.toISOString().slice(0,10),evs=E.filter(e=>e.date===iso).sort(sortEvent);html+='<div class="day '+(d.getMonth()!==m?'off':'')+' '+(iso===selectedDate?'sel':'')+'" data-date="'+iso+'"><div class="daynum">'+d.getDate()+'</div>'+evs.slice(0,3).map(e=>'<span class="chip">'+esc(e.time)+' '+esc(e.motion)+'</span>').join('')+(evs.length>3?'<span class="chip">+'+(evs.length-3)+'</span>':'')+'</div>'}$('#calendarGrid').innerHTML=html;$$('.day[data-date]').forEach(day=>day.onclick=()=>selectDay(day.dataset.date))}
window.moveMonth=function(n){viewDate.setMonth(viewDate.getMonth()+n);renderCalendar()};
function selectDay(iso){selectedDate=iso;$('#eDate').value=iso;updateWeekday();renderCalendar();renderDayList()}
window.updateDateFromInput=function(){selectedDate=$('#eDate').value;viewDate=new Date(selectedDate+'T00:00');updateWeekday();renderCalendar();renderDayList()};
function renderDayList(){const evs=E.filter(e=>e.date===selectedDate).sort(sortEvent);$('#dayTitle').textContent='Debates de '+new Date(selectedDate+'T00:00').toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'});$('#dayEvents').innerHTML=evs.map(eventCard).join('')||'<div class="empty">Nenhum debate neste dia.</div>'}
function renderAllEvents(){const box=$('#allEvents');if(!box)return;box.innerHTML=E.slice().sort(sortEvent).map(eventCard).join('')||'<div class="empty">Nenhum debate cadastrado.</div>'}
window.deleteAllEvents=function(){if(!requireAdmin('excluir debates'))return;if(!confirm('Excluir TODOS os debates?'))return;supabaseClient.from('debate_scores').delete().neq('id','00000000-0000-0000-0000-000000000000').then(()=>supabaseClient.from('debates').delete().neq('id','00000000-0000-0000-0000-000000000000'));E=[];save();resetEvent();render()}

function updateWeekday(){if($('#eDate').value)$('#eWeekday').value=weekday($('#eDate').value)}
function normSearchText(value){return String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
window.searchManual=function(){
  const raw=($('#manualSearch')&&$('#manualSearch').value||'').trim(),res=$('#searchResults');
  if(!res)return;
  if(!raw){res.innerHTML='<div class="empty">Digite um termo para consultar toda a apostila.</div>';return}
  const tokens=normSearchText(raw).split(/[^a-z0-9º]+/).filter(t=>t.length>1);
  const found=manual.map(item=>{
    const hay=normSearchText((item.title||'')+' '+(item.tab||'')+' '+(item.text||''));
    const score=tokens.reduce((sum,t)=>sum+(hay.includes(t)?1:0),0)+(hay.includes(normSearchText(raw))?3:0);
    return {item,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,6);
  res.innerHTML=found.length?found.map(({item})=>'<div class="result"><b>'+esc(item.title)+'</b><p>'+esc(item.text.slice(0,430))+'...</p><button type="button" class="btn2" onclick="openManual(\''+item.id+'\')">Abrir seção</button></div>').join(''):'<div class="empty">Nada encontrado na apostila.</div>'
};window.openManual=openManual;function openManual(id){$$('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.p===id));$$('.panel').forEach(p=>p.classList.toggle('on',p.id==='p-'+id));window.show('manual')}
window.askAI=function(){
  const q=($('#aiQuestion').value||'').toLowerCase();
  let id='intro',prefix='';
  if(/gloss|termo|conceito|mecanismo|impacto|framing|choque|weigh|pesagem/.test(q))id='gloss';
  else if(/poi|point|informação|intervenção/.test(q))id='pois';
  else if(/reply|sumário|resumo|síntese/.test(q))id='reply';
  else if(/3|terceir|novo argumento|material novo|whip/.test(q)){id='roles2';prefix='Resposta direta: o 3º debatedor deve organizar choques e responder ao caso adversário. Ele pode desenvolver material já apresentado, mas não deve introduzir argumento independente totalmente novo.\n\n'}
  else if(/2|segund|deputy|aprofund/.test(q))id='roles2';
  else if(/1|primeir|abertura|setup|set-up/.test(q))id='roles1';
  else if(/conteúdo|argumento|análise|refut|rebuttal|exemplo/.test(q))id='content';
  else if(/estilo|clareza|voz|ritmo|persuas/.test(q))id='style';
  else if(/estratégia|prioriz|tempo|compar|peso|pesagem/.test(q))id='strategy';
  else if(/pont|nota|score|escala|média/.test(q))id='score';
  else if(/feedback|devolutiva|treino|melhorar/.test(q))id='feedback';
  else if(/processo|delib|conferral|oa|oral|ballot|decisão/.test(q))id='process';
  else if(/moç|motion|policy|agente|lamenta|prefere|apoia|opõe/.test(q))id='motions';
  else if(/defini|modelo|squirrel|truísmo|tautologia|restritiva/.test(q))id='def';
  else if(/juiz|julg|adjudica|ganha|vencedor|imparcial/.test(q))id='judge';
  else if(/formato|tempo|ordem|equipe|fala/.test(q))id='formato';
  else prefix='Não achei uma resposta específica. Tente perguntar usando termos como POI, reply, 3º debatedor, pontuação, moção, definição, conteúdo, estilo, estratégia ou julgamento.\n\nResumo das seções disponíveis:\n';
  const item=manual.find(x=>x.id===id);
  $('#aiAnswer').textContent=prefix+(prefix.includes('seções disponíveis')?manual.map(x=>'• '+x.title).join('\n'):(item?item.text:''));
};window.resetAllData=function(){if(!confirm('Apagar todos os dados salvos e voltar ao padrão?'))return;localStorage.removeItem(K.d);localStorage.removeItem(K.e);localStorage.removeItem(K.a);localStorage.removeItem(K.u);localStorage.removeItem(K.admin);location.reload()};
window.resetBrokenData=window.resetAllData;
const debatersSection=$('#debaters'),debatersMount=$('#settingsDebatersMount');
if(debatersSection&&debatersMount){
  debatersSection.classList.remove('sec');
  debatersSection.classList.add('settings-debaters');
  debatersMount.appendChild(debatersSection);
}

window.viewDebaterProfile = function(id) {
  const d = D.find(x => x.id === id);

  if (!d) {
    console.warn('Debatedor não encontrado:', id);
    return;
  }

  const s = stats(d.id);

  const ini = (d.name || '?')
    .split(' ')
    .map(x => x[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const modal = document.getElementById('debaterProfileModal');

  if (!modal) {
    console.error('Modal debaterProfileModal não encontrado.');
    return;
  }

  const dpBanner = document.getElementById('dpBanner');
  const dpPhoto = document.getElementById('dpPhoto');
  const dpName = document.getElementById('dpName');
  const dpInfo = document.getElementById('dpInfo');
  const dpMetrics = document.getElementById('dpMetrics');
  const dpDebates = document.getElementById('dpDebates');

  if (dpBanner) {
    dpBanner.innerHTML = d.banner
      ? `<img src="${esc(d.banner)}" style="width:100%;height:100%;object-fit:cover" alt="">`
      : '';
  }

  if (dpPhoto) {
    dpPhoto.innerHTML = d.photo
      ? `<img src="${esc(d.photo)}" style="width:100%;height:100%;object-fit:cover" alt="${esc(d.name)}">`
      : esc(ini);
  }

  if (dpName) {
    dpName.textContent = d.name || 'Sem nome';
  }

  if (dpInfo) {
    dpInfo.textContent =
      `${d.className || 'Sem turma'} • ${d.status || 'Sem status'}` +
      ((d.roles || []).includes('judge') ? ' • Juiz' : '');
  }

  if (dpMetrics) {
    dpMetrics.innerHTML = [
      metric(
        'Média geral',
        s.total ? s.total.toFixed(1) : '—',
        'Debates avaliados: ' + (s.scored || 0),
        s.total ? (s.total / 80) * 100 : 5
      ),
      metric(
        'Conteúdo',
        s.content ? s.content.toFixed(1) : '—',
        'Linha de conteúdo',
        s.content ? (s.content / 32) * 100 : 5
      ),
      metric(
        'Estilo',
        s.style ? s.style.toFixed(1) : '—',
        'Clareza e persuasão',
        s.style ? (s.style / 32) * 100 : 5
      )
    ].join('');
  }

  const myEvs = E
    .filter(ev =>
      (ev.lineup || []).some(
        l => l && l.debaterId === d.id
      )
    )
    .sort(sortEvent);

  const debatesHtml = myEvs
    .slice(0, 5)
    .map(ev => {
      const sc = (ev.scores || {})[d.id];

      return `
        <p style="margin:8px 0;padding:10px;background:#f8fbff;border-radius:12px">
          <b>${esc(ev.motion || 'Sem moção')}</b><br>
          <small class="muted">
            ${esc(`${ev.date || ''} · ${ev.time || ''} · ${ev.format || ''}`)}
          </small><br>
          ${
            sc
              ? `
                <span class="pill green">Total: ${esc(sc.total)}</span>
                <span class="pill">C: ${esc(sc.content)}</span>
                <span class="pill">E: ${esc(sc.style)}</span>
                <span class="pill">Est: ${esc(sc.strategy)}</span>
              `
              : '<span class="pill yellow">Sem nota</span>'
          }
        </p>
      `;
    })
    .join('');

  if (dpDebates) {
    dpDebates.innerHTML =
      `<h4 style="margin:0 0 10px;color:#0f3f83">
        Debates (${myEvs.length})
      </h4>` +
      (debatesHtml ||
        '<div class="empty">Sem debates registrados.</div>');
  }

  modal.style.display = 'grid';
  document.body.style.overflow = 'hidden';
};

window.closeDebaterProfile = function() {
  const modal = document.getElementById('debaterProfileModal');

  if (modal) {
    modal.style.display = 'none';
  }

  document.body.style.overflow = '';
};



// ===== SUPABASE DATABASE ADAPTER =====
function isUuid(value){
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value||''));
}
function roleFromDebater(d){
  if(d && Array.isArray(d.roles) && d.roles.includes('judge')) return 'judge';
  return 'student';
}
function mapProfileRow(row){
  return {
    id: row.id,
    name: row.name || 'Aluno SSD',
    className: row.class_name || '',
    status: 'Ativo',
    photo: row.photo || '',
    banner: row.banner || '',
    roles: row.role === 'judge' ? ['judge'] : []
  };
}
function mapDebateRows(debates, scoreRows){
  const byDebate = {};
  (scoreRows || []).forEach(r => {
    if(!byDebate[r.debate_id]) byDebate[r.debate_id] = [];
    byDebate[r.debate_id].push(r);
  });
  return (debates || []).map(ev => {
    const rows = byDebate[ev.id] || [];
    const scores = {};
    const lineup = rows.filter(r => r.user_id).map(r => {
      if(r.content !== null && r.content !== undefined && r.style !== null && r.style !== undefined && r.strategy !== null && r.strategy !== undefined){
        scores[r.user_id] = {
          content: Number(r.content),
          style: Number(r.style),
          strategy: Number(r.strategy),
          total: Number(r.total ?? (Number(r.content)+Number(r.style)+Number(r.strategy)))
        };
      }
      return { role: r.role || 'Debatedor', debaterId: r.user_id };
    });
    return {
      id: ev.id,
      date: ev.date || '',
      time: ev.time || '',
      motion: ev.motion || '',
      format: ev.format || '',
      place: ev.place || '',
      judge: ev.judge || '',
      winner: ev.winner || '',
      decision: ev.decision || '',
      lineup,
      scores
    };
  });
}
async function loadAll(){
  ensureArrays();
  try{
    const [profilesRes, debatesRes, scoresRes] = await Promise.all([
      supabaseClient.from('profiles').select('*'),
      supabaseClient.from('debates').select('*'),
      supabaseClient.from('debate_scores').select('*')
    ]);
    if(profilesRes.error) console.error('Erro profiles:', profilesRes.error);
    if(debatesRes.error) console.error('Erro debates:', debatesRes.error);
    if(scoresRes.error) console.error('Erro debate_scores:', scoresRes.error);

    if(!profilesRes.error && Array.isArray(profilesRes.data)){
      D = profilesRes.data.map(mapProfileRow);
      safeStore(K.d, JSON.stringify(D));
    }
    if(!debatesRes.error && Array.isArray(debatesRes.data)){
      E = mapDebateRows(debatesRes.data, scoresRes.data || []);
      safeStore(K.e, JSON.stringify(E));
    }
    A = [];
    render && render();
  }catch(err){
    console.error('Erro carregando Supabase:', err);
    D = [];
    E = [];
    A = [];
  }
}
function save(){
  ensureArrays();
  safeStore(K.d, JSON.stringify(D));
  safeStore(K.e, JSON.stringify(E));
  saveAccounts();
  syncToSupabase();
  return true;
}
async function syncToSupabase(){
  try{
    const validProfiles = D.filter(d => isUuid(d.id)).map(d => ({
      id: d.id,
      name: d.name || 'Aluno SSD',
      class_name: d.className || '',
      photo: d.photo || '',
      banner: d.banner || '',
      role: roleFromDebater(d)
    }));
    if(validProfiles.length){
      const { error } = await supabaseClient.from('profiles').upsert(validProfiles, { onConflict: 'id' });
      if(error) console.error('Erro salvando profiles:', error);
    }

    const validDebates = E.filter(ev => isUuid(ev.id)).map(ev => ({
      id: ev.id,
      date: ev.date || null,
      time: ev.time || null,
      motion: ev.motion || '',
      format: ev.format || '',
      place: ev.place || '',
      judge: ev.judge || '',
      winner: ev.winner || '',
      decision: ev.decision || '',
      created_by: currentUser && isUuid(currentUser.id) ? currentUser.id : null
    }));
    if(validDebates.length){
      const { error } = await supabaseClient.from('debates').upsert(validDebates, { onConflict: 'id' });
      if(error) console.error('Erro salvando debates:', error);
    }

    for(const ev of E.filter(ev => isUuid(ev.id))){
      await supabaseClient.from('debate_scores').delete().eq('debate_id', ev.id);
      const rows = (ev.lineup || []).filter(l => isUuid(l.debaterId)).map(l => {
        const sc = (ev.scores || {})[l.debaterId] || {};
        const hasScore = sc.content !== undefined && sc.content !== '' && sc.style !== undefined && sc.style !== '' && sc.strategy !== undefined && sc.strategy !== '';
        return {
          debate_id: ev.id,
          user_id: l.debaterId,
          role: l.role || '',
          content: hasScore ? Number(sc.content) : null,
          style: hasScore ? Number(sc.style) : null,
          strategy: hasScore ? Number(sc.strategy) : null,
          total: hasScore ? Number(sc.total ?? (Number(sc.content)+Number(sc.style)+Number(sc.strategy))) : null
        };
      });
      if(rows.length){
        const { error } = await supabaseClient.from('debate_scores').insert(rows);
        if(error) console.error('Erro salvando debate_scores:', error);
      }
    }
  }catch(err){
    console.error('Erro sincronizando Supabase:', err);
  }
}

function iniciarLoginSupabase() {
  localStorage.removeItem(K.d);
  localStorage.removeItem(K.e);
  localStorage.removeItem(K.a);
  loadAll().then(() => carregarUsuario()).then(logado => {
    if (logado && currentUser) {
      save();
    }
    applyPermissions();

    if (logado && currentUser) {
      window.show(currentUser.role === 'admin' ? 'overview' : 'student');
    } else {
      window.switchAuth('login');
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarLoginSupabase);
} else {
  iniciarLoginSupabase();
}

})();