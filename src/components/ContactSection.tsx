import { useSite } from '../conteudo/useSite';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { api, ErroDaApi } from '../api/cliente';
import { CheckCircle2, Mail, MapPin, MessageCircle, Send, Truck } from 'lucide-react';
import { InstagramIcon } from './ui/BrandIcons';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { aoPreencherContato } from '../lib/eventos';

/** Cliente servido por esta instalação — o mesmo usado pelo provider. */
const SLUG = import.meta.env.VITE_CLIENT_SLUG || 'dindago-atelier';

type Campos = {
  nome: string;
  email: string;
  whatsapp: string;
  assunto: string;
  mensagem: string;
  /** Armadilha anti-robô: invisível para pessoas, sempre vazio. */
  website: string;
};

type Erros = Partial<Record<keyof Campos, string>>;

/**
 * Como a mensagem saiu. Cada desfecho tem o seu retorno: dizer "mensagem
 * enviada" quando só o aplicativo de e-mail foi aberto seria enganar o
 * visitante.
 */
type Envio =
  | { estado: 'parado' }
  | { estado: 'enviando' }
  | { estado: 'enviado' }
  | { estado: 'redirecionado'; canal: 'whatsapp' | 'email'; link: string }
  | { estado: 'falhou' };

/** O assunto inicial vem do conteúdo, então é montado dentro do componente. */
function valoresIniciaisCom(assunto: string): Campos {
  return { nome: '', email: '', whatsapp: '', assunto, mensagem: '', website: '' };
}

function validar(campos: Campos): Erros {
  const erros: Erros = {};

  if (campos.nome.trim().length < 2) {
    erros.nome = 'Informe seu nome.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(campos.email.trim())) {
    erros.email = 'Informe um e-mail válido.';
  }

  const digitos = campos.whatsapp.replace(/\D/g, '');
  if (digitos.length > 0 && (digitos.length < 10 || digitos.length > 13)) {
    erros.whatsapp = 'Informe o número com DDD, ou deixe em branco.';
  }

  if (campos.mensagem.trim().length < 10) {
    erros.mensagem = 'Escreva um pouco mais para o atelier entender seu pedido.';
  }

  return erros;
}

/** 16px no celular: abaixo disso o iPhone dá zoom ao focar o campo. */
const estiloCampo =
  'w-full border bg-papel-claro px-4 py-3.5 font-sans text-base text-tinta transition placeholder:text-tinta/45 focus:border-tijolo focus:ring-2 focus:ring-tijolo/15 focus:outline-none sm:text-[0.95rem]';

const estiloRotulo =
  'mb-2 block font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-tinta uppercase';

function borda(erro?: string) {
  return erro ? 'border-tijolo' : 'border-tinta/20';
}

/** Linha da lista de canais de atendimento. */
function Canal({
  href,
  externo = false,
  icone,
  rotulo,
  valor,
}: {
  href?: string;
  externo?: boolean;
  icone: ReactNode;
  rotulo: string;
  valor: string;
}) {
  const conteudo = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center bg-tijolo/10 text-tijolo transition-colors group-hover:bg-tijolo group-hover:text-papel">
        {icone}
      </span>
      <span className="min-w-0">
        <span className="etiqueta block text-tinta-suave">{rotulo}</span>
        <span className="block truncate font-display text-lg leading-snug text-tinta">{valor}</span>
      </span>
    </>
  );

  const classe = 'group flex items-center gap-4 border border-tinta/10 bg-papel-escuro/60 p-4';

  if (!href) return <div className={classe}>{conteudo}</div>;

  return (
    <a
      href={href}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${classe} transition hover:border-tijolo/40 hover:bg-papel-escuro`}
    >
      {conteudo}
    </a>
  );
}

export function ContactSection() {
  const {
    conteudo: clientData,
    buildMailtoUrl,
    buildWhatsAppUrl,
    isConfigured,
    siteConfig,
  } = useSite();
  const assuntos = clientData.contact.subjects;
  const [campos, setCampos] = useState<Campos>(() => valoresIniciaisCom(assuntos[0]));
  const [erros, setErros] = useState<Erros>({});
  const [envio, setEnvio] = useState<Envio>({ estado: 'parado' });
  const [destacado, setDestacado] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const whatsappUrl = buildWhatsAppUrl();
  const mailtoUrl = buildMailtoUrl();
  const instagramConfigurado = isConfigured(siteConfig.instagram);
  const enderecoDefinido = isConfigured(siteConfig.address);
  const enviando = envio.estado === 'enviando';

  /*
   * "Tenho interesse" numa peça e "Fazer uma encomenda" chegam aqui: o
   * formulário já vem com o assunto e o texto, e pisca de leve para mostrar
   * onde o visitante foi parar.
   */
  useEffect(
    () =>
      aoPreencherContato(({ assunto, mensagem }) => {
        setCampos((anterior) => ({
          ...anterior,
          assunto:
            assunto && (assuntos as readonly string[]).includes(assunto)
              ? assunto
              : anterior.assunto,
          mensagem: mensagem ?? anterior.mensagem,
        }));
        setErros({});
        setEnvio({ estado: 'parado' });
        setDestacado(true);
      }),
    [assuntos],
  );

  useEffect(() => {
    if (!destacado) return;
    const tempo = window.setTimeout(() => setDestacado(false), 1600);
    return () => window.clearTimeout(tempo);
  }, [destacado]);

  function atualizar(campo: keyof Campos, valor: string) {
    setCampos((anterior) => ({ ...anterior, [campo]: valor }));
    setErros((anterior) => ({ ...anterior, [campo]: undefined }));
    if (!enviando) setEnvio({ estado: 'parado' });
  }

  async function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const novosErros = validar(campos);
    setErros(novosErros);

    const primeiroErro = Object.keys(novosErros)[0];
    if (primeiroErro) {
      formRef.current?.querySelector<HTMLElement>(`[name="${primeiroErro}"]`)?.focus();
      return;
    }

    setEnvio({ estado: 'enviando' });

    try {
      await api.post(`/site/${SLUG}/contact`, {
        name: campos.nome.trim(),
        email: campos.email.trim(),
        phone: campos.whatsapp.trim() || undefined,
        subject: campos.assunto,
        message: campos.mensagem.trim(),
        // Campo-armadilha: fica escondido e só um robô o preenche.
        website: campos.website,
      });
      setEnvio({ estado: 'enviado' });
      setCampos(valoresIniciaisCom(assuntos[0]));
      return;
    } catch (erro) {
      if (erro instanceof ErroDaApi && erro.errors) {
        // O servidor recusou algum campo: mostra o erro no campo certo.
        const doServidor: Erros = {};
        const mapa: Record<string, keyof Campos> = {
          name: 'nome',
          email: 'email',
          phone: 'whatsapp',
          subject: 'assunto',
          message: 'mensagem',
        };
        for (const [campo, mensagens] of Object.entries(erro.errors)) {
          const alvo = mapa[campo];
          if (alvo && mensagens[0]) doServidor[alvo] = mensagens[0];
        }
        setErros(doServidor);
        setEnvio({ estado: 'parado' });
        return;
      }

      /*
       * Sem API (site publicado só como página estática, ou servidor fora do
       * ar): em vez de perder a mensagem, ela é montada no canal direto que
       * estiver configurado — WhatsApp primeiro, e-mail depois.
       */
      const texto = [
        `Contato pelo site do ${siteConfig.name}`,
        '',
        `Nome: ${campos.nome.trim()}`,
        `E-mail: ${campos.email.trim()}`,
        campos.whatsapp.trim() ? `WhatsApp: ${campos.whatsapp.trim()}` : null,
        `Assunto: ${campos.assunto}`,
        '',
        campos.mensagem.trim(),
      ]
        .filter((linha) => linha !== null)
        .join('\n');

      const linkWhatsApp = buildWhatsAppUrl(texto);
      if (linkWhatsApp) {
        // Pode ser barrado pelo bloqueador de pop-up; o link manual fica na tela.
        window.open(linkWhatsApp, '_blank', 'noopener,noreferrer');
        setEnvio({ estado: 'redirecionado', canal: 'whatsapp', link: linkWhatsApp });
        return;
      }

      const linkEmail = mailtoUrl
        ? `${buildMailtoUrl(`${campos.assunto} — site`)}&body=${encodeURIComponent(texto)}`
        : null;
      if (linkEmail) {
        window.location.href = linkEmail;
        setEnvio({ estado: 'redirecionado', canal: 'email', link: linkEmail });
        return;
      }

      setEnvio({ estado: 'falhou' });
    }
  }

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="bg-papel py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="contato-titulo"
              numero={clientData.contact.numero}
              eyebrow={clientData.contact.eyebrow}
              title={clientData.contact.title}
              description={clientData.contact.subtitle}
              layout="empilhado"
            />

            <Reveal delay={100} className="mt-8">
              <ul className="space-y-3">
                {whatsappUrl && (
                  <li>
                    <Canal
                      href={whatsappUrl}
                      externo
                      icone={<MessageCircle className="size-5" strokeWidth={1.6} aria-hidden="true" />}
                      rotulo="WhatsApp"
                      valor={siteConfig.whatsappDisplay}
                    />
                  </li>
                )}

                {mailtoUrl && (
                  <li>
                    <Canal
                      href={mailtoUrl}
                      icone={<Mail className="size-5" strokeWidth={1.6} aria-hidden="true" />}
                      rotulo="E-mail"
                      valor={siteConfig.email}
                    />
                  </li>
                )}

                {instagramConfigurado && (
                  <li>
                    <Canal
                      href={siteConfig.instagram}
                      externo
                      icone={<InstagramIcon className="size-5" strokeWidth={1.6} aria-hidden="true" />}
                      rotulo="Instagram"
                      valor="Bastidores e novas peças"
                    />
                  </li>
                )}

                {enderecoDefinido && (
                  <li>
                    <Canal
                      href="#atelier"
                      icone={<MapPin className="size-5" strokeWidth={1.6} aria-hidden="true" />}
                      rotulo="Atelier"
                      valor={siteConfig.address}
                    />
                  </li>
                )}

                {isConfigured(siteConfig.shipping) && (
                  <li>
                    <Canal
                      icone={<Truck className="size-5" strokeWidth={1.6} aria-hidden="true" />}
                      rotulo="Entrega"
                      valor={siteConfig.shipping}
                    />
                  </li>
                )}
              </ul>
            </Reveal>
          </div>

          {/* Formulário */}
          <Reveal delay={80} className="lg:col-span-7">
            <form
              ref={formRef}
              noValidate
              onSubmit={aoEnviar}
              aria-labelledby="contato-titulo"
              className={`border bg-papel-escuro/50 p-5 transition-[border-color,box-shadow] duration-700 sm:p-8 lg:p-10 ${
                destacado
                  ? 'border-tijolo/60 shadow-[0_0_0_4px_rgba(168,67,42,0.12)]'
                  : 'border-tinta/10'
              }`}
            >
              <p className="etiqueta mb-6 text-tijolo">Envie sua mensagem</p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nome" className={estiloRotulo}>
                    Nome <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    required
                    value={campos.nome}
                    onChange={(evento) => atualizar('nome', evento.target.value)}
                    aria-invalid={erros.nome ? true : undefined}
                    aria-describedby={erros.nome ? 'erro-nome' : undefined}
                    placeholder="Como podemos te chamar?"
                    className={`${estiloCampo} ${borda(erros.nome)}`}
                  />
                  {erros.nome && (
                    <p id="erro-nome" role="alert" className="mt-2 font-sans text-xs text-tijolo">
                      {erros.nome}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className={estiloRotulo}>
                    E-mail <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={campos.email}
                    onChange={(evento) => atualizar('email', evento.target.value)}
                    aria-invalid={erros.email ? true : undefined}
                    aria-describedby={erros.email ? 'erro-email' : undefined}
                    placeholder="seunome@email.com"
                    className={`${estiloCampo} ${borda(erros.email)}`}
                  />
                  {erros.email && (
                    <p id="erro-email" role="alert" className="mt-2 font-sans text-xs text-tijolo">
                      {erros.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="whatsapp" className={estiloRotulo}>
                    WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={campos.whatsapp}
                    onChange={(evento) => atualizar('whatsapp', evento.target.value)}
                    aria-invalid={erros.whatsapp ? true : undefined}
                    aria-describedby={erros.whatsapp ? 'erro-whatsapp' : 'ajuda-whatsapp'}
                    placeholder="(00) 00000-0000"
                    className={`${estiloCampo} ${borda(erros.whatsapp)}`}
                  />
                  {erros.whatsapp ? (
                    <p
                      id="erro-whatsapp"
                      role="alert"
                      className="mt-2 font-sans text-xs text-tijolo"
                    >
                      {erros.whatsapp}
                    </p>
                  ) : (
                    <p id="ajuda-whatsapp" className="mt-2 font-sans text-xs text-tinta-suave">
                      Opcional — facilita a resposta.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="assunto" className={estiloRotulo}>
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={campos.assunto}
                    onChange={(evento) => atualizar('assunto', evento.target.value)}
                    className={`${estiloCampo} border-tinta/20`}
                  >
                    {assuntos.map((assunto: string) => (
                      <option key={assunto} value={assunto}>
                        {assunto}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="mensagem" className={estiloRotulo}>
                    Mensagem <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={5}
                    required
                    value={campos.mensagem}
                    onChange={(evento) => atualizar('mensagem', evento.target.value)}
                    aria-invalid={erros.mensagem ? true : undefined}
                    aria-describedby={erros.mensagem ? 'erro-mensagem' : undefined}
                    placeholder="Conte o que você procura: uma peça, uma encomenda, um projeto..."
                    className={`${estiloCampo} resize-y ${borda(erros.mensagem)}`}
                  />
                  {erros.mensagem && (
                    <p
                      id="erro-mensagem"
                      role="alert"
                      className="mt-2 font-sans text-xs text-tijolo"
                    >
                      {erros.mensagem}
                    </p>
                  )}
                </div>
                {/*
                  Armadilha anti-robô: escondida da tela e de leitores de tela,
                  e fora da ordem de tabulação. Só um preenchimento automático
                  chega aqui.
                */}
                <div aria-hidden="true" className="hidden">
                  <label htmlFor="website">Não preencha este campo</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={campos.website}
                    onChange={(evento) => atualizar('website', evento.target.value)}
                  />
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={enviando}
                  className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 bg-tijolo px-8 font-sans text-xs font-semibold tracking-[0.16em] text-papel uppercase shadow-[0_10px_24px_-14px_rgba(74,47,33,0.9)] transition hover:-translate-y-0.5 hover:bg-tinta active:translate-y-0 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                >
                  <Send className="size-4" aria-hidden="true" />
                  {enviando ? 'Enviando...' : 'Enviar mensagem'}
                </button>
                <p className="font-sans text-xs text-tinta-suave">
                  <span aria-hidden="true">*</span> Campos obrigatórios
                </p>
              </div>

              {/* Um só ponto de retorno para o visitante, em todos os desfechos. */}
              <div role="status" aria-live="polite">
                {envio.estado === 'enviando' && (
                  <p className="mt-5 font-sans text-sm text-tinta-suave">Enviando sua mensagem...</p>
                )}

                {envio.estado === 'enviado' && (
                  <p className="mt-5 flex items-start gap-3 border border-cacto/30 bg-cacto/10 p-4 font-sans text-sm leading-relaxed text-tinta">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-cacto" aria-hidden="true" />
                    Mensagem enviada! O atelier vai responder em breve pelo e-mail informado.
                  </p>
                )}

                {envio.estado === 'redirecionado' && (
                  <p className="mt-5 flex items-start gap-3 border border-cacto/30 bg-cacto/10 p-4 font-sans text-sm leading-relaxed text-tinta">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-cacto" aria-hidden="true" />
                    <span>
                      {envio.canal === 'whatsapp'
                        ? 'Sua mensagem foi montada no WhatsApp — é só tocar em enviar.'
                        : 'Sua mensagem foi montada no seu aplicativo de e-mail — é só enviar.'}{' '}
                      Não abriu?{' '}
                      <a
                        href={envio.link}
                        {...(envio.canal === 'whatsapp'
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="font-semibold text-tijolo underline underline-offset-4"
                      >
                        {envio.canal === 'whatsapp' ? 'Abrir o WhatsApp' : 'Abrir o e-mail'}
                      </a>
                    </span>
                  </p>
                )}

                {envio.estado === 'falhou' && (
                  <p className="mt-5 border border-tijolo/30 bg-tijolo/5 p-4 font-sans text-sm leading-relaxed text-tijolo">
                    Não conseguimos enviar agora. Tente novamente em instantes.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
