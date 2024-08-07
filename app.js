// Classe pour représenter un produit
class Product {
    constructor(id, name, price) {
      this.id = id; // Identifiant unique du produit
      this.name = name; // Nom du produit
      this.price = price; // Prix du produit
    }
  }
  
  // Classe pour représenter un article dans le panier
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product; // Instance de la classe Product
      this.quantity = quantity; // Quantité de ce produit dans le panier
    }
  
    // Méthode pour calculer le prix total de cet article (prix unitaire * quantité)
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  // Classe pour représenter le panier d'achat
  class ShoppingCart {
    constructor() {
      this.items = []; // Tableau pour stocker les instances de ShoppingCartItem
    }
  
    // Méthode pour obtenir le total des articles dans le panier
    getTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }
  
    // Méthode pour ajouter un article au panier
    addItem(product, quantity) {
      // Cherche si le produit est déjà dans le panier
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        // Si le produit existe, on met à jour la quantité
        existingItem.quantity += quantity;
      } else {
        // Sinon, on ajoute un nouvel article au panier
        this.items.push(new ShoppingCartItem(product, quantity));
      }
    }
  
    // Méthode pour supprimer un article du panier
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
    }
  
    // Méthode pour afficher les articles du panier avec leurs détails
    displayItems() {
      const cartItemsElement = document.getElementById('cart-items');
      cartItemsElement.innerHTML = ''; // Réinitialise le contenu de la liste
      this.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `Produit: ${item.product.name}, Quantité: ${item.quantity}, Prix Total: ${item.getTotalPrice().toFixed(2)}`;
        cartItemsElement.appendChild(li);
      });
      // Met à jour le nombre total d'articles
      document.getElementById('total-items').textContent = `Total des articles: ${this.getTotalItems()}`;
    }
  }
  
  // Instancie le panier d'achat
  const cart = new ShoppingCart();
  
  // Fonction pour ajouter un produit au panier en utilisant les boutons
  function addProductToCart(id, name, price) {
    const product = new Product(id, name, price);
    cart.addItem(product, 1); // Ajoute le produit avec une quantité de 1
    cart.displayItems(); // Affiche les articles du panier
  }
  