# Imagens do site

Coloque aqui as fotografias reais. Os nomes abaixo já estão referenciados no
código — ao adicionar o arquivo com o mesmo nome, a imagem aparece sozinha no
site (enquanto não existir, é exibido um marcador identificado).

```
logo/
  dindago-atelier.svg      logo real da marca (usada no header e no rodapé)

hero/
  peca-principal.jpg       foto de destaque do topo (vertical, 4:5)
  og-image.jpg             imagem de compartilhamento em redes (1200x630)

products/
  ciranda-do-sertao.jpg
  mae-e-filho.jpg
  sanfoneiro.jpg
  mulher-do-mar.jpg        fotos das peças (vertical, 4:5)

artist/
  artesa.jpg               retrato da artesã, de preferência trabalhando

gallery/
  obra-01.jpg ... obra-03.jpg
  processo-01.jpg ... processo-04.jpg
  atelier-01.jpg ... atelier-03.jpg
  detalhe-01.jpg, detalhe-02.jpg
```

Para trocar caminhos ou acrescentar novas fotos, edite
`src/data/products.ts` e `src/data/gallery.ts`.

Dica: exporte em JPG/WebP com no máximo ~1600px no maior lado para o site
continuar leve.
