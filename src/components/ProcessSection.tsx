import { Reveal } from './ui/Reveal';

export function ProcessSection() {
  return (
    <section
      id="processo"
      aria-labelledby="processo-titulo"
      className="bg-papel py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2
            id="processo-titulo"
            className="text-[clamp(1.9rem,4.2vw,3.25rem)]"
          >
            Como fazer papel mache?
          </h2>
        </Reveal>

        <Reveal delay={90}>
          <p className="mt-6 text-[0.98rem] leading-[1.75] text-tinta-suave">
            Antes de mergulhar na criação de suas próprias peças de papel mache,
            é importante ter os materiais certos à disposição. Assim, aqui estão
            os itens essenciais para aprender a como fazer papel mache:
          </p>
        </Reveal>

        <Reveal delay={140}>
          <ul className="mt-6 list-disc space-y-4 pl-6 text-[0.98rem] leading-[1.75] text-tinta-suave">
            <li>
              <strong>Papel:</strong> O papel mais comumente usado no papel
              mache é o jornal, devido à sua disponibilidade e facilidade de
              moldagem. No entanto, você também pode usar papel de revista ou
              papel craft, desde que estejam cortados ou rasgados em pedaços
              pequenos.
            </li>
            <li>
              <strong>Cola Branca:</strong> A cola branca funciona como um
              aglutinante para o papel, criando a pasta que será moldada. No
              entanto, certifique-se de obter uma cola de boa qualidade para
              obter os melhores resultados.
            </li>
            <li>
              <strong>Água:</strong> A água é usada para diluir a cola e tornar
              a mistura mais fácil de trabalhar. Ela também ajuda a amaciar o
              papel, facilitando a moldagem.
            </li>
            <li>
              <strong>Base para Moldar:</strong> Para dar forma às suas criações
              de papel mache, você precisará de uma base sólida. O arame é uma
              opção popular, pois pode ser dobrado e moldado de acordo com suas
              necessidades. Porém, outra alternativa é usar uma estrutura de
              papelão pré-existente.
            </li>
          </ul>
        </Reveal>

        <Reveal delay={190}>
          <p className="mt-8 text-[0.98rem] leading-[1.75] text-tinta-suave">
            Além dos materiais básicos mencionados acima, você também pode usar
            outros itens para aprimorar suas criações com essa técnica. Assim,
            tintas acrílicas, vernizes e pincéis são ideais para decorar e
            proteger suas peças após a secagem. Além disso, você pode adicionar
            texturas e detalhes extras usando tecidos, linhas, miçangas ou
            outros materiais artísticos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
