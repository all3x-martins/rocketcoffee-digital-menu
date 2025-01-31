const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', () => {
  const searchText = searchBar.value.toLowerCase();
  document.querySelectorAll('ul li').forEach(item => {
    const itemText = item.innerText.toLowerCase();
    item.style.display = itemText.includes(searchText) ? 'flex' : 'none';
  });
});

const cart = [];
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (event) => {
    const item = event.target.parentElement.querySelector('h3').innerText;
    cart.push(item);
    alert(`${item} adicionado ao pedido!`);
  });
});