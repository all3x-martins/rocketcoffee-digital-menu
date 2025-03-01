// Seletores
const searchToggle = document.getElementById("search-toggle");
const searchBar = document.getElementById("search-bar");
const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");
const checkoutButton = document.getElementById("checkout-button");

// Variáveis globais

// Recupera o carrinho salvo, caso exista
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = calculateTotal();

// Função para mostrar/ocultar a barra de busca
searchToggle.addEventListener("click", () => {
  searchBar.classList.toggle("open");
  if (searchBar.classList.contains("open")) {
    searchBar.focus();
  }
});

// Fecha a barra de pesquisa quando clicar fora dela
document.addEventListener('click', (event) => {
  if (!searchBar.contains(event.target) && !searchToggle.contains(event.target)) {
    searchBar.classList.remove('open');
  }
})

// Função para filtrar os itens do menu
searchBar.addEventListener("input", () => {
  const searchTerm = searchBar.value.toLowerCase();
  const sections = document.querySelectorAll(".container section");

  sections.forEach((section) => {
    const items = section.querySelectorAll("li");
    let hasVisibleItems = false;

    items.forEach((item) => {
      const itemName = item.querySelector("h3").textContent.toLowerCase();
      if (itemName.includes(searchTerm)) {
        item.style.display = "flex";
        hasVisibleItems = true;
      } else {
        item.style.display = "none";
      }
    });

    // Mostrar/ocultar a seção com base na visibilidade dos itens
    section.style.display = hasVisibleItems ? "block" : "none";
  });
});

// Função para adicionar itens ao carrinho
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest("li");
    const itemName = item.querySelector("h3").textContent;
    const itemPrice = parseFloat(
      item.querySelector(".preco").textContent.replace("R$", "").trim()
    );

    // Verificar se o item já está no carrinho
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.name === itemName
    );

    if (existingItemIndex > -1) {
      // Se o item já estiver no carrinho, apenas aumentar a quantidade
      cart[existingItemIndex].quantity += 1;
    } else {
      // Se não estiver no carrinho, adicionar um novo item
      cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    total += itemPrice;

    // Salvar carrinho no LocalStorage
    saveCart();

    // Atualizar a contagem do carrinho
    cartCount.textContent = cart.length;

    // Atualizar o modal do carrinho
    updateCartModal();
  });
});

// Função para atualizar o modal do carrinho
function updateCartModal() {
  // Limpar a lista de itens
  cartItemsList.innerHTML = "";

  // Adicionar itens ao modal
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
  
    li.innerHTML = `
      <div class="item-info">
        <span class="item-name">${item.name}</span>
        <span class="item-price">R$ ${item.price.toFixed(2)}</span>
      </div>
      <div class="cart-btn-container">
        <button class="increase-item cart-increase-item" data-index="${index}">+</button>
        <span class="item-quantity">${item.quantity}</span>
        <button class="decrease-item cart-decrease-item" data-index="${index}">-</button>
        <button class="remove-item cart-remove-item" data-index="${index}"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg></button>
      </div>
    `;
  
    cartItemsList.appendChild(li);
  });
  

  // Atualizar o total
  cartTotal.textContent = total.toFixed(2);

  // Adicionar evento de remoção de item
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      removeItemFromCart(index);
    });
  });

  // Adicionar eventos de aumentar e diminuir quantidade
  document.querySelectorAll(".increase-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      increaseItemQuantity(index);
    });
  });

  document.querySelectorAll(".decrease-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      decreaseItemQuantity(index);
    });
  });
}

// Função para aumentar a quantidade de um item
function increaseItemQuantity(index) {
  const item = cart[index];
  item.quantity += 1;
  total += item.price;

  // Salvar carrinho no LocalStorage após a alteração
  saveCart();

  // Atualizar o modal do carrinho
  updateCartModal();
}

// Função para diminuir a quantidade de um item
function decreaseItemQuantity(index) {
  const item = cart[index];
  if (item.quantity > 1) {
    item.quantity -= 1;
    total -= item.price;

    // Salvar carrinho no LocalStorage após a alteração
    saveCart();

    // Atualizar o modal do carrinho
    updateCartModal();
  }
}

// Função para remover item do carrinho
function removeItemFromCart(index) {
  const itemToRemove = cart[index];
  total -= itemToRemove.price * itemToRemove.quantity;

  // Remove o item da lista
  cart.splice(index, 1);

  // Salvar carrinho no LocalStorage após a remoção
  saveCart();

  // Atualizar a contagem do carrinho
  cartCount.textContent = cart.length;

  // Atualizar o modal do carrinho
  updateCartModal();
}

// Função para salvar o carrinho no LocalStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para calcular o total
function calculateTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Função para abrir o modal do carrinho
cartButton.addEventListener("click", () => {
  cartModal.classList.add("show");
});

// Função para fechar o modal do carrinho
closeCart.addEventListener("click", () => {
  cartModal.classList.remove("show");
});

// Fechar o modal ao clicar fora dele
window.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.classList.remove("show");
  }
});

// Função para finalizar a compra
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio. Adicione itens antes de finalizar a compra.");
  } else {
    alert("Compra finalizada com sucesso!");
    // Limpa o carrinho após finalizar a compra
    cart = [];
    total = 0;
    saveCart();
    cartCount.textContent = 0;
    updateCartModal();
  }
});

// Inicializar o carrinho ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  if (cart.length > 0) {
    updateCartModal();
    cartCount.textContent = cart.length;
  }
});
