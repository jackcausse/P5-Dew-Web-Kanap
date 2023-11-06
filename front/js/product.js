//On récupère le paramètre id dans l'url de la page product.html.
const params = new URL(document.location).searchParams
const id = params.get('id')

//On envoie une requête fetch avec l'id du produit.
let url = `http://localhost:3000/api/products/${id}`
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data

    //On modifie les éléments de la page product.html pour y ajouter les informations du produit.
    const item__img = document.querySelector('.item__img')
    item__img.innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`

    const title = document.getElementById('title')
    title.innerHTML = data.name

    const price = document.getElementById('price')
    price.innerHTML = data.price

    const description = document.getElementById('description')
    description.innerHTML = data.description

    // On rempli la liste déroulante des couleurs
    const colorsSelect = document.getElementById('colors')
    data.colors.forEach((color) => {
      const colorOption = document.createElement('option')
      colorOption.value = color
      colorOption.innerText = color
      colorsSelect.appendChild(colorOption)
    })
  })
// sélection du bouton Ajouter au panier
const button = document.getElementById('addToCart')

//On écoute le bouton et on ajoute les éléments au panier
button.addEventListener('click', (event) => {
  event.preventDefault()

  //On déclare les données quantité et couleur
  let color = document.getElementById('colors').value
  let quantity = document.getElementById('quantity').value

  //On vérifie si les données quantité et couleur sont valides avec la fonction if
  if (document.getElementById('colors').value != '') {
    if (document.getElementById('quantity').value > 0) {
      if (document.getElementById('quantity').value <= 100) {
        // if ( quantity.value != 0 && quantity.value <= 100) {

        //JSON.parse permet de convertir les données au format JSON dans le local storage en objet JavaScript
        // JSON = JAVA SCRIPT OBJECT NOTATION = notation en chaînes de caractères de données java script
        cart = JSON.parse(localStorage.getItem('products'))

        // On déclare la constante product
        const product = {
          color: color,
          quantity: Number(quantity),
          id: id,
        }

        // Si il y a déjà un produit enregistré dans le local storage
        if (cart) {
          function productInCart() {
            // On cherche dans le panier si il y a un produit dont l'id est égal au produit de l'id que l'on veut ajouter
            let productInCar = cart.find(
              (t) => t.id === product.id && t.color === product.color
            )
            if (productInCar) {
              // Si le produit est déjà dans le panier on rajoute un à la quantité
              productInCar.quantity += product.quantity
            } else {
              // On ajoute la quantité pour le produit
              product.quantity == quantity
              // Et on repousse le produit dans ce cas là
              cart.push(product)
            }
            localStorage.setItem('products', JSON.stringify(cart))
          }
          // Fin de la fonction, productInCart()

          productInCart()
        } else {
          cart = []
          // Dans tous les autres cas, on enregistre un nouvel objet dans le localStorage
          cart.push(product)
          // stringify transforme quelque chose de complexe comme un tableau ou un objet en chaînes de caractères
          localStorage.setItem('products', JSON.stringify(cart))
        }

        if (
        // On prévient avec une fenêtre de confirmation d'ajout au panier
          window.confirm(
            'Le produit a été ajouté au panier. Voulez-vous aller à la page de votre panier ?'
          )
        ) {
          // On redirige la page suivant l'option choisie
          window.location.href = 'cart.html'
        }
        else {
          // window.location.href = 'index.html'
           return
        }
        

        // On alerte sur la quantité des produits
      } else {
        alert(
          "Pas plus de 100 articles par produit, veuillez modifier le nombre d'article de votre panier"
        )
      }
    } else {
      alert('Choisissez une quantité entre 1 et 100')
    }
    // On alerte sur le choix des couleurs
  } else {
    alert('Veuillez choisir une couleur')
  }
})
 

  
  
  

