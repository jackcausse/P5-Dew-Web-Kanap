// ......................................................................

// .................fonction qui confirme la transaction.................
// ......................................................................

function confirm() {
  // On récupère l'id du produit
  const id = new URL(window.location.href).searchParams.get('id')

  // On envoie le numéro de commande sur le ticket de commande validée
  const orderId = document.getElementById('orderId')

  // On affiche le numéro de commande
  orderId.innerHTML = id

  // On nettoie le local Storage
  localStorage.clear()
}
//fin de la fonction, function confirm()

confirm()
