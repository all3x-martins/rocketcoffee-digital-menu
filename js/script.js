// Barra de pesquisa
const searchToggle = document.getElementById('search-toggle');
const searchBar = document.getElementById('search-bar');

// Alterna a visibilidade da barra de pesquisa
searchToggle.addEventListener('click', () => {
  searchBar.classList.toggle('open'); // Alterna a classe para expandir/contrair a barra
  searchBar.focus(); // Foca no campo de pesquisa quando ele abrir
});

// Fecha a barra de pesquisa quando clicar fora dela
document.addEventListener('click', (event) => {
  if (!searchBar.contains(event.target) && !searchToggle.contains(event.target)) {
    searchBar.classList.remove('open');
  }
});

// Função de busca
searchBar.addEventListener('input', () => {
  const searchText = searchBar.value.toLowerCase();
  document.querySelectorAll('ul li').forEach(item => {
    const itemText = item.innerText.toLowerCase();
    item.style.display = itemText.includes(searchText) ? 'flex' : 'none';
  });
});


const cart = [];
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
  // Atualiza o contador de itens no carrinho
  cartCount.innerText = cart.length;

  // Limpa a lista de itens
  cartItemsList.innerHTML = '';

  // Adiciona os itens no carrinho à lista
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerText = item;
    cartItemsList.appendChild(listItem);
  });
}

// Abre o modal do carrinho
cartButton.addEventListener('click', () => {
  cartModal.style.display = 'flex';
  updateCartDisplay(); // Atualiza a lista de itens no carrinho
});

// Fecha o modal do carrinho
closeCartButton.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Adiciona um item ao carrinho quando o botão "Adicionar" é clicado
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (event) => {
    const item = event.target.parentElement.querySelector('h3').innerText;
    cart.push(item);
    alert(`${item} adicionado ao pedido!`);
    updateCartDisplay(); // Atualiza o carrinho
  });
});






