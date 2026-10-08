# Imagens do site

Coloque aqui as fotografias reais. Os nomes abaixo já estão referenciados no
código — ao adicionar o arquivo com o mesmo nome, a imagem aparece sozinha no
site (enquanto não existir, é exibido um marcador identificado).

```
logo/
  (vazio)                  logo real da marca — ao salvar o arquivo aqui,
                           escreva o caminho em `company.logo` no clientData.ts

hero/
  EuAmoNordeste.jpeg       arte de destaque do topo
  og-image.jpg             imagem de compartilhamento em redes (1200x630),
                           recortada da arte EuAmoNordeste

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
  artesa.jpg               retrato da artesã (Goretti Brandão no atelier)

gallery/                   reservado ao painel: a galeria não aparece na página hoje
  obra-01.jpg ... obra-03.jpg
  processo-01.jpg ... processo-04.jpg
  atelier-01.jpg ... atelier-03.jpg
  detalhe-01.jpg, detalhe-02.jpg
```

Para trocar caminhos ou acrescentar novas fotos, edite os campos `products`
e `gallery` em `src/data/clientData.ts`.

Dica: exporte em JPG/WebP com no máximo ~1600px no maior lado para o site
continuar leve.
