import { useEffect, useState } from 'react';
import { api } from '../api/cliente';
import { ColecaoEditor, type ConfigColecao } from './ColecaoEditor';
import { MensagensPainel } from './MensagensPainel';
import { mensagemDoErro } from './useAuth';
import { AreaTexto, Aviso, Botao, Campo, Cartao, Carregando, Entrada } from './ui';

/**
 * ============================================================================
 * EDIÇÃO DE UM CLIENTE
 * ----------------------------------------------------------------------------
 * Uma aba por assunto. Os blocos de conteúdo (identidade, cores, contato, capa,
 * história, processo) são formulários que salvam por upsert; as coleções usam o
 * editor genérico.
 * ============================================================================
 */

const COLECOES: Record<string, ConfigColecao> = {
  produtos: {
    caminho: 'products',
    titulo: 'Peças',
    descricao:
      'Deixe o preço em branco para a peça exibir "Consultar valor" — é o comportamento certo para trabalho sob encomenda.',
    campos: [
      { nome: 'name', rotulo: 'Nome', tipo: 'texto', naLista: true },
      {
        nome: 'slug',
        rotulo: 'Identificador',
        tipo: 'texto',
        dica: 'minúsculas, números e hífen',
        naLista: true,
      },
      { nome: 'category', rotulo: 'Categoria', tipo: 'texto', naLista: true },
      {
        nome: 'price',
        rotulo: 'Preço (R$)',
        tipo: 'preco',
        dica: 'Em branco = Consultar valor',
        naLista: true,
      },
      { nome: 'description', rotulo: 'Descrição curta', tipo: 'area' },
      { nome: 'story', rotulo: 'Texto do detalhe', tipo: 'area' },
      {
        nome: 'imageUrl',
        rotulo: 'Imagem (URL)',
        tipo: 'texto',
        dica: 'Envie pelo campo de upload ou informe /images/...',
      },
      { nome: 'imageAlt', rotulo: 'Descrição da imagem', tipo: 'texto' },
      { nome: 'badge', rotulo: 'Selo', tipo: 'texto', dica: 'ex.: Peça única' },
      { nome: 'order', rotulo: 'Ordem', tipo: 'numero', naLista: true },
      { nome: 'featured', rotulo: 'Destaque', tipo: 'booleano' },
      { nome: 'active', rotulo: 'Ativo', tipo: 'booleano', naLista: true },
    ],
  },
  diferenciais: {
    caminho: 'benefits',
    titulo: 'Diferenciais',
    campos: [
      { nome: 'title', rotulo: 'Título', tipo: 'texto', naLista: true },
      {
        nome: 'icon',
        rotulo: 'Desenho',
        tipo: 'escolha',
        opcoes: ['maos', 'folha', 'sol', 'cacto', 'presente', 'flor', 'passaro'],
        naLista: true,
      },
      { nome: 'description', rotulo: 'Descrição', tipo: 'area' },
      { nome: 'order', rotulo: 'Ordem', tipo: 'numero', naLista: true },
      { nome: 'active', rotulo: 'Ativo', tipo: 'booleano', naLista: true },
    ],
  },
  etapas: {
    caminho: 'process-steps',
    titulo: 'Etapas do processo',
    campos: [
      { nome: 'name', rotulo: 'Nome', tipo: 'texto', naLista: true },
      { nome: 'detail', rotulo: 'Detalhe', tipo: 'area' },
      { nome: 'order', rotulo: 'Ordem', tipo: 'numero', naLista: true },
      { nome: 'active', rotulo: 'Ativo', tipo: 'booleano', naLista: true },
    ],
  },
  galeria: {
    caminho: 'gallery',
    titulo: 'Galeria',
    campos: [
      { nome: 'category', rotulo: 'Categoria', tipo: 'texto', naLista: true },
      { nome: 'imageUrl', rotulo: 'Imagem (URL)', tipo: 'texto', naLista: true },
      {
        nome: 'alt',
        rotulo: 'Descrição da imagem',
        tipo: 'texto',
        dica: 'Obrigatória por acessibilidade',
      },
      { nome: 'order', rotulo: 'Ordem', tipo: 'numero', naLista: true },
      { nome: 'active', rotulo: 'Ativo', tipo: 'booleano', naLista: true },
    ],
  },
  depoimentos: {
    caminho: 'testimonials',
    titulo: 'Depoimentos',
    descricao: 'Cadastre apenas depoimentos reais, com autorização de quem escreveu.',
    campos: [
      { nome: 'name', rotulo: 'Nome', tipo: 'texto', naLista: true },
      { nome: 'role', rotulo: 'Descrição da pessoa', tipo: 'texto', naLista: true },
      { nome: 'text', rotulo: 'Depoimento', tipo: 'area' },
      { nome: 'order', rotulo: 'Ordem', tipo: 'numero', naLista: true },
      { nome: 'active', rotulo: 'Ativo', tipo: 'booleano', naLista: true },
    ],
  },
  redes: {
    caminho: 'social',
    titulo: 'Redes sociais',
    campos: [
      {
        nome: 'network',
        rotulo: 'Rede',
        tipo: 'escolha',
        opcoes: ['instagram', 'facebook', 'whatsapp', 'linkedin', 'youtube'],
        naLista: true,
      },
      { nome: 'url', rotulo: 'Endereço', tipo: 'texto', naLista: true },
      { nome: 'order', rotulo: 'Ordem', tipo: 'numero' },
      { nome: 'active', rotulo: 'Ativo', tipo: 'booleano', naLista: true },
    ],
  },
  ficha: {
    caminho: 'hero-facts',
    titulo: 'Ficha técnica da capa',
    campos: [
      { nome: 'label', rotulo: 'Rótulo', tipo: 'texto', naLista: true },
      { nome: 'value', rotulo: 'Valor', tipo: 'texto', naLista: true },
      { nome: 'order', rotulo: 'Ordem', tipo: 'numero', naLista: true },
    ],
  },
  pilares: {
    caminho: 'about-pillars',
    titulo: 'Pilares da história',
    campos: [
      { nome: 'title', rotulo: 'Título', tipo: 'texto', naLista: true },
      { nome: 'text', rotulo: 'Texto', tipo: 'area' },
      { nome: 'order', rotulo: 'Ordem', tipo: 'numero', naLista: true },
    ],
  },
};

const ABAS = [
  { id: 'identidade', rotulo: 'Identidade' },
  { id: 'cores', rotulo: 'Cores e SEO' },
  { id: 'contato', rotulo: 'Contato' },
  { id: 'capa', rotulo: 'Capa' },
  { id: 'historia', rotulo: 'História' },
  { id: 'processo', rotulo: 'Processo' },
  { id: 'produtos', rotulo: 'Peças' },
  { id: 'diferenciais', rotulo: 'Diferenciais' },
  { id: 'etapas', rotulo: 'Etapas' },
  { id: 'galeria', rotulo: 'Galeria' },
  { id: 'depoimentos', rotulo: 'Depoimentos' },
  { id: 'redes', rotulo: 'Redes' },
  { id: 'ficha', rotulo: 'Ficha técnica' },
  { id: 'pilares', rotulo: 'Pilares' },
  { id: 'mensagens', rotulo: 'Mensagens' },
] as const;

type Cliente = Record<string, unknown> & { id: string; name: string; slug: string };

/** Formulário de um bloco de conteúdo, salvo por upsert. */
function BlocoDeConteudo({
  clientId,
  caminho,
  titulo,
  descricao,
  campos,
  dados,
  aoSalvar,
}: {
  clientId: string;
  caminho: string;
  titulo: string;
  descricao?: string;
  campos: { nome: string; rotulo: string; tipo: 'texto' | 'area' | 'cor'; dica?: string }[];
  dados: Record<string, unknown>;
  aoSalvar: () => void;
}) {
  const [formulario, setFormulario] = useState<Record<string, unknown>>(() => {
    const inicial: Record<string, unknown> = {};
    for (const c of campos) inicial[c.nome] = dados?.[c.nome] ?? '';
    return inicial;
  });
  const [salvando, setSalvando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [errosCampo, setErrosCampo] = useState<Record<string, string[]>>({});

  async function salvar() {
    setSalvando(true);
    setErro(null);
    setAviso(null);
    setErrosCampo({});
    try {
      // A identidade fica no próprio cliente; os demais blocos são sub-recursos.
      const destino = caminho ? `/clients/${clientId}/${caminho}` : `/clients/${clientId}`;
      await api.put(destino, formulario);
      setAviso('Salvo. O site já mostra o conteúdo novo.');
      aoSalvar();
    } catch (e) {
      const detalhe = e as { errors?: Record<string, string[]> };
      if (detalhe.errors) setErrosCampo(detalhe.errors);
      setErro(mensagemDoErro(e));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Cartao titulo={titulo} descricao={descricao}>
      <div className="grid gap-4 sm:grid-cols-2">
        {campos.map((campo) => (
          <div key={campo.nome} className={campo.tipo === 'area' ? 'sm:col-span-2' : ''}>
            <Campo rotulo={campo.rotulo} dica={campo.dica} erro={errosCampo[campo.nome]?.[0]}>
              {campo.tipo === 'area' ? (
                <AreaTexto
                  rows={5}
                  value={String(formulario[campo.nome] ?? '')}
                  onChange={(e) => setFormulario((f) => ({ ...f, [campo.nome]: e.target.value }))}
                />
              ) : campo.tipo === 'cor' ? (
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={String(formulario[campo.nome] ?? '#000000')}
                    onChange={(e) => setFormulario((f) => ({ ...f, [campo.nome]: e.target.value }))}
                    className="h-9 w-12 rounded border border-slate-300"
                  />
                  <Entrada
                    value={String(formulario[campo.nome] ?? '')}
                    onChange={(e) => setFormulario((f) => ({ ...f, [campo.nome]: e.target.value }))}
                  />
                </div>
              ) : (
                <Entrada
                  value={String(formulario[campo.nome] ?? '')}
                  onChange={(e) => setFormulario((f) => ({ ...f, [campo.nome]: e.target.value }))}
                />
              )}
            </Campo>
          </div>
        ))}
      </div>

      {erro && (
        <div className="mt-4">
          <Aviso tipo="erro">{erro}</Aviso>
        </div>
      )}
      {aviso && (
        <div className="mt-4">
          <Aviso tipo="sucesso">{aviso}</Aviso>
        </div>
      )}

      <div className="mt-5">
        <Botao onClick={() => void salvar()} disabled={salvando}>
          {salvando ? 'Salvando...' : 'Salvar'}
        </Botao>
      </div>
    </Cartao>
  );
}

export function ClientePage({ clientId }: { clientId: string }) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [aba, setAba] = useState<string>('identidade');
  const [recarga, setRecarga] = useState(0);

  useEffect(() => {
    let ativo = true;
    api
      .get<Cliente>(`/clients/${clientId}`)
      .then((c) => ativo && setCliente(c))
      .catch((e) => ativo && setErro(mensagemDoErro(e)));
    return () => {
      ativo = false;
    };
  }, [clientId, recarga]);

  if (erro) return <Aviso tipo="erro">{erro}</Aviso>;
  if (!cliente) return <Carregando />;

  const recarregar = () => setRecarga((n) => n + 1);
  const bloco = (chave: string) => (cliente[chave] as Record<string, unknown>) ?? {};

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{cliente.name}</h1>
          <p className="text-sm text-slate-500">/{cliente.slug}</p>
        </div>
      </header>

      <nav className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3" aria-label="Seções">
        {ABAS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setAba(a.id)}
            aria-current={aba === a.id ? 'page' : undefined}
            className={`rounded-md px-3 py-1.5 text-sm transition ${
              aba === a.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {a.rotulo}
          </button>
        ))}
      </nav>

      {aba === 'identidade' && (
        <BlocoDeConteudo
          clientId={clientId}
          caminho=""
          titulo="Identidade"
          descricao="Nome, slogan e descrição da marca."
          dados={cliente}
          aoSalvar={recarregar}
          campos={[
            { nome: 'name', rotulo: 'Nome', tipo: 'texto' },
            { nome: 'slug', rotulo: 'Identificador na URL', tipo: 'texto' },
            { nome: 'segment', rotulo: 'Segmento', tipo: 'texto' },
            { nome: 'slogan', rotulo: 'Slogan', tipo: 'texto' },
            { nome: 'logoUrl', rotulo: 'Logo (URL)', tipo: 'texto' },
            { nome: 'description', rotulo: 'Descrição', tipo: 'area' },
          ]}
        />
      )}

      {aba === 'cores' && (
        <BlocoDeConteudo
          clientId={clientId}
          caminho="settings"
          titulo="Cores e SEO"
          descricao="As quatro cores repintam o site inteiro. O SEO alimenta título e compartilhamento."
          dados={bloco('settings')}
          aoSalvar={recarregar}
          campos={[
            { nome: 'colorPrimary', rotulo: 'Cor primária', tipo: 'cor' },
            { nome: 'colorSecondary', rotulo: 'Cor de destaque', tipo: 'cor' },
            { nome: 'colorAccent', rotulo: 'Cor de realce', tipo: 'cor' },
            { nome: 'colorBackground', rotulo: 'Cor de fundo', tipo: 'cor' },
            { nome: 'shippingNote', rotulo: 'Aviso da barra superior', tipo: 'texto' },
            { nome: 'seoTitle', rotulo: 'Título (SEO)', tipo: 'texto' },
            { nome: 'seoUrl', rotulo: 'URL do site', tipo: 'texto' },
            { nome: 'seoOgImage', rotulo: 'Imagem de compartilhamento', tipo: 'texto' },
            { nome: 'seoDescription', rotulo: 'Descrição (SEO)', tipo: 'area' },
          ]}
        />
      )}

      {aba === 'contato' && (
        <BlocoDeConteudo
          clientId={clientId}
          caminho="contact-info"
          titulo="Contato"
          descricao="Enquanto um campo ficar vazio, o site esconde o link em vez de exibir algo quebrado."
          dados={bloco('contactInfo')}
          aoSalvar={recarregar}
          campos={[
            {
              nome: 'whatsapp',
              rotulo: 'WhatsApp (só dígitos)',
              tipo: 'texto',
              dica: 'ex.: 5582999999999',
            },
            {
              nome: 'whatsappDisplay',
              rotulo: 'WhatsApp exibido',
              tipo: 'texto',
              dica: 'ex.: (82) 99999-9999',
            },
            { nome: 'phone', rotulo: 'Telefone', tipo: 'texto' },
            { nome: 'email', rotulo: 'E-mail', tipo: 'texto' },
            { nome: 'address', rotulo: 'Endereço', tipo: 'texto' },
            { nome: 'addressNote', rotulo: 'Observação sobre visitas', tipo: 'texto' },
          ]}
        />
      )}

      {aba === 'capa' && (
        <BlocoDeConteudo
          clientId={clientId}
          caminho="hero"
          titulo="Capa"
          dados={bloco('hero')}
          aoSalvar={recarregar}
          campos={[
            { nome: 'titleLine1', rotulo: 'Título — 1ª linha', tipo: 'texto' },
            { nome: 'titleLine2', rotulo: 'Título — 2ª linha', tipo: 'texto' },
            { nome: 'titleHighlight', rotulo: 'Título — destaque', tipo: 'texto' },
            { nome: 'imageUrl', rotulo: 'Imagem da capa', tipo: 'texto' },
            { nome: 'imageAlt', rotulo: 'Descrição da imagem', tipo: 'texto' },
            { nome: 'imageCaption', rotulo: 'Legenda da imagem', tipo: 'texto' },
            { nome: 'primaryCtaLabel', rotulo: 'Botão principal', tipo: 'texto' },
            { nome: 'primaryCtaHref', rotulo: 'Destino do botão', tipo: 'texto' },
            { nome: 'secondaryCtaLabel', rotulo: 'Chamada secundária', tipo: 'texto' },
            {
              nome: 'secondaryCtaHref',
              rotulo: 'Destino da chamada',
              tipo: 'texto',
              dica: 'use "whatsapp" para montar o link automaticamente',
            },
            { nome: 'subtitle', rotulo: 'Subtítulo', tipo: 'area' },
          ]}
        />
      )}

      {aba === 'historia' && (
        <BlocoDeConteudo
          clientId={clientId}
          caminho="about"
          titulo="História"
          dados={bloco('about')}
          aoSalvar={recarregar}
          campos={[
            { nome: 'eyebrow', rotulo: 'Etiqueta', tipo: 'texto' },
            { nome: 'title', rotulo: 'Título', tipo: 'texto' },
            { nome: 'ctaLabel', rotulo: 'Texto da chamada', tipo: 'texto' },
            { nome: 'artistName', rotulo: 'Nome da artista', tipo: 'texto' },
            { nome: 'artistRole', rotulo: 'Função', tipo: 'texto' },
            { nome: 'artistPhotoUrl', rotulo: 'Foto (URL)', tipo: 'texto' },
            { nome: 'artistPhotoAlt', rotulo: 'Descrição da foto', tipo: 'texto' },
            { nome: 'intro', rotulo: 'Apresentação', tipo: 'area' },
            { nome: 'quote', rotulo: 'Citação', tipo: 'area' },
            {
              nome: 'body',
              rotulo: 'Texto',
              tipo: 'area',
              dica: 'Separe parágrafos com uma linha em branco.',
            },
          ]}
        />
      )}

      {aba === 'processo' && (
        <BlocoDeConteudo
          clientId={clientId}
          caminho="process"
          titulo="Processo"
          dados={bloco('process')}
          aoSalvar={recarregar}
          campos={[
            { nome: 'eyebrow', rotulo: 'Etiqueta', tipo: 'texto' },
            { nome: 'title', rotulo: 'Título', tipo: 'texto' },
            { nome: 'imageUrl', rotulo: 'Imagem', tipo: 'texto' },
            { nome: 'imageAlt', rotulo: 'Descrição da imagem', tipo: 'texto' },
            { nome: 'materialsTitle', rotulo: 'Título dos materiais', tipo: 'texto' },
            {
              nome: 'body',
              rotulo: 'Texto',
              tipo: 'area',
              dica: 'Separe parágrafos com uma linha em branco.',
            },
            { nome: 'materialsText', rotulo: 'Texto dos materiais', tipo: 'area' },
            { nome: 'materials', rotulo: 'Materiais', tipo: 'area', dica: 'Um por linha.' },
          ]}
        />
      )}

      {COLECOES[aba] && <ColecaoEditor clientId={clientId} config={COLECOES[aba]!} />}

      {aba === 'mensagens' && <MensagensPainel clientId={clientId} />}
    </div>
  );
}
