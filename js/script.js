// Seletores
const searchToggle = document.getElementById('search-toggle');
const searchBar = document.getElementById('search-bar');
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cart-count');

// Variáveis globais
let cart = [];
let total = 0;

// Função para mostrar/ocultar a barra de busca
searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('open');
    if (searchBar.classList.contains('open')) {
        searchBar.focus(); // Focar na barra de busca quando aberta
    }
});

// Função para filtrar os itens do menu
searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();
    const sections = document.querySelectorAll('.conteiner section');

    sections.forEach(section => {
        const items = section.querySelectorAll('li');
        let hasVisibleItems = false;

        items.forEach(item => {
            const itemName = item.querySelector('h3').textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.style.display = 'flex';
                hasVisibleItems = true;
            } else {
                item.style.display = 'none';
            }
        });

        // Mostrar/ocultar a seção com base na visibilidade dos itens
        section.style.display = hasVisibleItems ? 'block' : 'none';
    });
});

// Função para adicionar itens ao carrinho
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const item = button.closest('li');
        const itemName = item.querySelector('h3').textContent;
        const itemPrice = parseFloat(item.querySelector('.preco').textContent.replace('R$', '').trim());

        // Adicionar item ao carrinho
        cart.push({ name: itemName, price: itemPrice });
        total += itemPrice;

        // Atualizar a contagem do carrinho
        cartCount.textContent = cart.length;

        // Atualizar o modal do carrinho
        updateCartModal();
    });
});

// Função para atualizar o modal do carrinho
function updateCartModal() {
    // Limpar a lista de itens
    cartItemsList.innerHTML = '';

    // Adicionar itens ao modal
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
    });

    // Atualizar o total
    cartTotal.textContent = total.toFixed(2);
}

// Função para abrir o modal do carrinho
cartButton.addEventListener('click', () => {
    cartModal.classList.add('show');
});

// Função para fechar o modal do carrinho
closeCart.addEventListener('click', () => {
    cartModal.classList.remove('show');
});

// Fechar o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.classList.remove('show');
    }
});