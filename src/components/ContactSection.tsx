import { useRef, useState, type FormEvent } from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { InstagramIcon } from './ui/BrandIcons';
import { buildMailtoUrl, buildWhatsAppUrl, isConfigured, siteConfig } from '../config/site';
import { Reveal } from './ui/Reveal';
import { clientData } from '../data/clientData';
import { SectionHeading } from './ui/SectionHeading';

type Campos = {
  nome: string;
  email: string;
  whatsapp: string;
  assunto: string;
  mensagem: string;
};

type Erros = Partial<Record<keyof Campos, string>>;

const assuntos = clientData.contact.subjects;

const valoresIniciais: Campos = {
  nome: '',
  email: '',
  whatsapp: '',
  assunto: assuntos[0],
  mensagem: '',
};

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

const estiloCampo =
  'w-full border border-tinta/20 bg-papel-claro px-4 py-3.5 font-sans text-[0.95rem] text-tinta transition placeholder:text-tinta/35 focus:border-tijolo focus:outline-none';

export function ContactSection() {
  const [campos, setCampos] = useState<Campos>(valoresIniciais);
  const [erros, setErros] = useState<Erros>({});
  const [enviado, setEnviado] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const whatsappConfigurado = isConfigured(siteConfig.whatsapp);
  const emailConfigurado = isConfigured(siteConfig.email);
  const instagramConfigurado = isConfigured(siteConfig.instagram);

  function atualizar(campo: keyof Campos, valor: string) {
    setCampos((anterior) => ({ ...anterior, [campo]: valor }));
    setErros((anterior) => ({ ...anterior, [campo]: undefined }));
    setEnviado(false);
  }

  function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const novosErros = validar(campos);
    setErros(novosErros);

    const primeiroErro = Object.keys(novosErros)[0];
    if (primeiroErro) {
      formRef.current?.querySelector<HTMLElement>(`[name="${primeiroErro}"]`)?.focus();
      return;
    }

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

    // Sem back-end: a mensagem segue pelo canal já configurado no site.
    const destino =
      buildWhatsAppUrl(texto) ??
      (emailConfigurado
        ? `${buildMailtoUrl(`${campos.assunto} — site`)}&body=${encodeURIComponent(texto)}`
        : null);

    if (destino) {
      window.open(destino, '_blank', 'noopener,noreferrer');
    }

    setEnviado(true);
    setCampos(valoresIniciais);
  }

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="bg-papel py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="contato-titulo"
              numero={clientData.contact.numero}
              eyebrow={clientData.contact.eyebrow}
              title={clientData.contact.title}
              description={clientData.contact.subtitle}
            />

            <Reveal delay={100} className="mt-9">
              <ul className="space-y-3">
                {whatsappConfigurado && (
                  <li>
                    <a
                      href={buildWhatsAppUrl() ?? '#contato'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 border border-papel-escuro bg-papel-escuro/60 p-4 transition hover:border-tijolo/40 hover:bg-papel-escuro"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center bg-tijolo/10 text-tijolo">
                        <MessageCircle className="size-5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-sans text-[0.68rem] tracking-[0.16em] text-tinta-suave uppercase">
                          WhatsApp
                        </span>
                        <span className="block font-display text-base text-tinta">
                          {siteConfig.whatsappDisplay}
                        </span>
                      </span>
                    </a>
                  </li>
                )}

                {emailConfigurado && (
                  <li>
                    <a
                      href={buildMailtoUrl() ?? '#contato'}
                      className="flex items-center gap-4 border border-papel-escuro bg-papel-escuro/60 p-4 transition hover:border-tijolo/40 hover:bg-papel-escuro"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center bg-tijolo/10 text-tijolo">
                        <Mail className="size-5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-sans text-[0.68rem] tracking-[0.16em] text-tinta-suave uppercase">
                          E-mail
                        </span>
                        <span className="block truncate font-display text-base text-tinta">
                          {siteConfig.email}
                        </span>
                      </span>
                    </a>
                  </li>
                )}

                {instagramConfigurado && (
                  <li>
                    <a
                      href={siteConfig.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 border border-papel-escuro bg-papel-escuro/60 p-4 transition hover:border-tijolo/40 hover:bg-papel-escuro"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center bg-tijolo/10 text-tijolo">
                        <InstagramIcon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-sans text-[0.68rem] tracking-[0.16em] text-tinta-suave uppercase">
                          Instagram
                        </span>
                        <span className="block font-display text-base text-tinta">
                          Bastidores e novas peças
                        </span>
                      </span>
                    </a>
                  </li>
                )}

                {!whatsappConfigurado && !emailConfigurado && (
                  <li className=" border border-dashed border-papel-escuro bg-papel-escuro/50 p-5">
                    <p className="font-sans text-sm leading-relaxed text-tinta-suave">
                      Os canais de atendimento aparecem aqui assim que WhatsApp e e-mail forem
                      preenchidos em{' '}
                      <code className=" bg-papel-escuro px-1.5 py-0.5 text-[0.8em] text-tinta-suave">
                        src/data/clientData.ts
                      </code>
                      .
                    </p>
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
              className="-[1.75rem] border border-papel-escuro bg-papel-escuro/50 p-6 sm:p-8 lg:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="nome"
                    className="mb-2 block font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-tinta uppercase"
                  >
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
                    className={`${estiloCampo} ${erros.nome ? 'border-tijolo' : ''}`}
                  />
                  {erros.nome && (
                    <p id="erro-nome" role="alert" className="mt-2 font-sans text-xs text-tijolo">
                      {erros.nome}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-tinta uppercase"
                  >
                    E-mail <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={campos.email}
                    onChange={(evento) => atualizar('email', evento.target.value)}
                    aria-invalid={erros.email ? true : undefined}
                    aria-describedby={erros.email ? 'erro-email' : undefined}
                    placeholder="seunome@email.com"
                    className={`${estiloCampo} ${erros.email ? 'border-tijolo' : ''}`}
                  />
                  {erros.email && (
                    <p id="erro-email" role="alert" className="mt-2 font-sans text-xs text-tijolo">
                      {erros.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="whatsapp"
                    className="mb-2 block font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-tinta uppercase"
                  >
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
                    className={`${estiloCampo} ${erros.whatsapp ? 'border-tijolo' : ''}`}
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
                    <p id="ajuda-whatsapp" className="mt-2 font-sans text-xs text-tinta-suave/70">
                      Opcional — facilita a resposta.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="assunto"
                    className="mb-2 block font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-tinta uppercase"
                  >
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={campos.assunto}
                    onChange={(evento) => atualizar('assunto', evento.target.value)}
                    className={estiloCampo}
                  >
                    {assuntos.map((assunto) => (
                      <option key={assunto} value={assunto}>
                        {assunto}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="mensagem"
                    className="mb-2 block font-sans text-[0.7rem] font-semibold tracking-[0.16em] text-tinta uppercase"
                  >
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
                    className={`${estiloCampo} resize-y ${erros.mensagem ? 'border-tijolo' : ''}`}
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
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex min-h-13 items-center justify-center gap-2.5 bg-tijolo px-8 font-sans text-xs font-semibold tracking-[0.14em] text-papel uppercase transition hover:-translate-y-0.5 hover:bg-tinta-suave active:translate-y-0"
                >
                  <Send className="size-4" aria-hidden="true" />
                  Enviar mensagem
                </button>
                <p className="font-sans text-xs text-tinta-suave/75">
                  <span aria-hidden="true">*</span> Campos obrigatórios
                </p>
              </div>

              <p role="status" aria-live="polite" className="mt-4 font-sans text-sm text-cacto">
                {enviado
                  ? whatsappConfigurado || emailConfigurado
                    ? 'Mensagem pronta! Abrimos seu aplicativo para finalizar o envio ao atelier.'
                    : 'Mensagem validada. Configure WhatsApp ou e-mail em src/data/clientData.ts para concluir o envio.'
                  : ''}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
