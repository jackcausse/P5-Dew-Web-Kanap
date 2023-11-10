//On pointe sur le conteneur de la page web
const container = document.getElementById('items')

let url = 'http://localhost:3000/api/products'

fetch(url)
  .then((response) => response.json())
  .then((products) => {
    showProducts(products)
  })

//on affiche les produits
function showProducts(products) {
  products.forEach((product) => {
    // console.log(product);

    // On crée un élément "a"
    const link = document.createElement('a')
    link.href = '/front/html/product.html?id=' + product._id

    // On crée un élément "article" et on l'ajoute à notre "a"
    const article = document.createElement('article')
    link.appendChild(article)

    //on crée un élément "image" et on l'ajoute a notre "article"
    const image = document.createElement('img')
    image.src = product.imageUrl
    image.alt = product.altTxt
    article.appendChild(image)

    //on crée un élément h3 et on l'ajoute à notre "article"
    const h3 = document.createElement('h3')
    h3.innerText = product.name
    article.appendChild(h3)

    //on crée un élément p et on l'ajoute à notre "article"
    const p = document.createElement('p')
    p.innerText = product.description
    article.appendChild(p)

    // On ajoute le tout à notre conteneur
    container.appendChild(link)
  })
}
