# Imagens do site

Coloque aqui as fotografias reais. Os nomes abaixo já estão referenciados no
código — ao adicionar o arquivo com o mesmo nome, a imagem aparece sozinha no
site (enquanto não existir, é exibido um marcador identificado).

```
logo/
  dindago-atelier.svg      logo real da marca (usada no header e no rodapé)

hero/
  EuAmoNordeste.jpeg       arte de destaque do topo
  og-image.jpg             imagem de compartilhamento em redes (1200x630)

products/
  AMocaDoMar.jpeg
  BrincantesDoGuerreiroAlagoano.jpeg
  DonaEspanhola.jpeg
  DonaRibeirinha.jpeg
  MocaComCandeeiro.jpeg
  MoradaDePassarinhos.jpeg
  NossaSenhoraMaeDosHomens.jpeg
  PalhacoEBailarina.jpeg
  mocaECandeiroMocaEBeija-Flor.jpeg
  sereia.jpeg              fotos das peças

artist/
  Retratodaartista.jpeg    retrato da artesã

gallery/
  obra-01.jpg ... obra-03.jpg
  processo-01.jpg ... processo-04.jpg
  atelier-01.jpg ... atelier-03.jpg
  detalhe-01.jpg, detalhe-02.jpg
```

Para trocar caminhos ou acrescentar novas fotos, edite os campos `products`
e `gallery` em `src/data/clientData.ts`.

Dica: exporte em JPG/WebP com no máximo ~1600px no maior lado para o site
continuar leve.
