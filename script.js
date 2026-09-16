const snacks = [
  { name: 'Lay’s', price: '$1.25', category: 'savory', label: 'Classic chips', image: 'assets/lays.png', description: 'Classic crispy potato chips with just the right amount of salty crunch.' },
  { name: 'Doritos', price: '$1.50', category: 'savory', label: 'Cheesy crunch', image: 'assets/doritos.png', description: 'Bold, cheesy tortilla chips for a big flavor boost between classes.' },
  { name: 'Fritos', price: '$1.25', category: 'savory', label: 'Classic chips', image: 'assets/fritos.png', description: 'Corn chips with a salty, satisfying crunch that travels well.' },
  { name: 'Cheetos', price: '$1.50', category: 'savory', label: 'Cheesy crunch', image: 'assets/cheetos.png', description: 'Crunchy, cheesy snack-time fuel for your next hallway sprint.' },
  { name: 'Takis', price: '$1.75', category: 'savory', label: 'Spicy', image: 'assets/takis.png', description: 'Rolled tortilla chips with a spicy kick for heat seekers.' },
  { name: 'Chester’s Hot Fries', price: '$1.50', category: 'savory', label: 'Spicy', image: 'assets/chesters-hot-fries.png', description: 'Spicy, crunchy corn-and-potato snacks with a bold Chester’s kick.' },
  { name: 'Cheese Sticks', price: '$1.25', category: 'savory', label: 'Cheesy snack', image: 'assets/cheese-sticks.png', description: 'Easy, cheesy sticks made for grabbing on your way to class.' },
  { name: 'Oreos', price: '$1.25', category: 'sweet', label: 'Sweet', image: 'assets/oreos.png', description: 'Chocolate sandwich cookies with a sweet creme center.' },
  { name: 'Chips Ahoy!', price: '$1.25', category: 'sweet', label: 'Sweet', image: 'assets/chips-ahoy.png', description: 'Classic chocolate chip cookies for a quick, familiar sweet bite.' },
  { name: 'Gatorade', price: '$1.50', category: 'fresh', label: 'Cold drink', image: 'assets/gatorade.png', description: 'A cold sports drink to help you recharge through the rest of the day.' },
  { name: 'Water', price: '$1.00', category: 'fresh', label: 'Cold drink', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=85', description: 'Simple, cold, and refreshing. The easiest win of the day.' }
];

const grid = document.querySelector('#menu-grid');
const modal = document.querySelector('#modal-backdrop');
const closeButton = document.querySelector('#modal-close');
let lastTrigger;

function renderMenu(filter = 'all') {
  grid.innerHTML = snacks.map((snack, index) => `
    <article class="menu-card ${filter !== 'all' && snack.category !== filter ? 'hidden' : ''}">
      <div class="card-image"><img src="${snack.image}" alt="${snack.name}" loading="lazy" /><span class="card-tag">${snack.label}</span></div>
      <div class="card-body"><div class="card-title-row"><h3 class="card-title">${snack.name}</h3><span class="card-price">${snack.price}</span></div><p class="card-desc">${snack.description}</p><button class="card-button" data-snack="${index}">See snack details <span aria-hidden="true">→</span></button></div>
    </article>`).join('');
  grid.querySelectorAll('.card-button').forEach(button => button.addEventListener('click', () => openModal(Number(button.dataset.snack), button)));
}

function openModal(index, trigger) {
  const snack = snacks[index]; lastTrigger = trigger;
  document.querySelector('#modal-image').src = snack.image;
  document.querySelector('#modal-image').alt = snack.name;
  document.querySelector('#modal-category').innerHTML = `<span class="eyebrow-line"></span> ${snack.label}`;
  document.querySelector('#modal-title').textContent = snack.name;
  document.querySelector('#modal-price').textContent = snack.price;
  document.querySelector('#modal-description').textContent = snack.description;
  modal.hidden = false; document.body.style.overflow = 'hidden'; closeButton.focus();
}

function closeModal() { modal.hidden = true; document.body.style.overflow = ''; if (lastTrigger) lastTrigger.focus(); }

document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter-button.active').classList.remove('active'); button.classList.add('active'); renderMenu(button.dataset.filter);
}));
closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });
document.querySelector('.modal-map-link').addEventListener('click', closeModal);
renderMenu();
