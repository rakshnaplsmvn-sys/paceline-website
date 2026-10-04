// PACELINE interactions: mobile navigation, product filters, wishlist, bag and newsletter.
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? '×' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.textContent = '☰';
    }));
  }

  const tabs = document.querySelectorAll('.filter-tab');
  const products = document.querySelectorAll('.product-card');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(item => item.classList.toggle('active', item === tab));
    const filter = tab.dataset.filter;
    products.forEach(product => { product.hidden = !product.dataset.tags.split(' ').includes(filter); });
  }));

  document.querySelectorAll('.heart').forEach(button => button.addEventListener('click', () => {
    const saved = button.classList.toggle('saved');
    button.textContent = saved ? '♥' : '♡';
    button.setAttribute('aria-pressed', String(saved));
  }));

  let cartCount = 0;
  const cartCounter = document.getElementById('cartCount');
  const shopMessage = document.getElementById('shopMessage');
  document.querySelectorAll('.quick-add').forEach(button => button.addEventListener('click', () => {
    cartCount += 1;
    if (cartCounter) cartCounter.textContent = String(cartCount);
    if (shopMessage) shopMessage.textContent = `${button.dataset.product} added to your bag. Bag items: ${cartCount}.`;
    button.textContent = 'ADDED ✓';
    window.setTimeout(() => { button.textContent = 'ADD TO BAG +'; }, 1400);
  }));

  document.querySelectorAll('.newsletter-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const email = form.querySelector('input[type="email"]');
    const message = form.parentElement.querySelector('.form-message');
    if (email && email.checkValidity()) {
      if (message) message.textContent = 'Thanks for joining the Paceline club! This demo form is not connected to a mailing service yet.';
      form.reset();
    } else if (email) email.reportValidity();
  }));

  const searchButton = document.getElementById('searchButton');
  if (searchButton) searchButton.addEventListener('click', () => {
    const query = window.prompt('What are you looking for?');
    if (query && query.trim()) {
      const target = document.getElementById('arrivals');
      if (target) { target.scrollIntoView({ behavior: 'smooth' }); if (shopMessage) shopMessage.textContent = `Showing the current collection. Search for “${query.trim()}” is a demo feature.`; }
      else window.location.href = `index.html#arrivals`;
    }
  });
});
