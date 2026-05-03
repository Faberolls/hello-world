const STORAGE_KEY = 'bayamsell-products';

const seed = [
  { id: 1, name: 'Smart Watch S2', price: 89.99, stock: 22, category: 'Electronics', status: 'active', seller: 'seller_demo' },
  { id: 2, name: 'Organic Honey 500g', price: 13.5, stock: 45, category: 'Grocery', status: 'pending', seller: 'seller_demo' }
];

const getProducts = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || seed;
const saveProducts = (items) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

function statusBadge(status) {
  return `<span class="badge ${status}">${status}</span>`;
}

function renderMarketplace(items) {
  const grid = document.getElementById('productGrid');
  const visible = items.filter((x) => x.status === 'active' && x.stock > 0);
  grid.innerHTML = visible.map((x) => `
    <article class="card product">
      <h3>${x.name}</h3>
      <p><strong>$${x.price.toFixed(2)}</strong></p>
      <small>${x.category} · Stock: ${x.stock}</small>
    </article>
  `).join('') || '<p>No active products yet.</p>';
}

function renderSeller(items) {
  const rows = document.getElementById('sellerProductRows');
  rows.innerHTML = items.map((x) => `
    <tr>
      <td>${x.name}</td><td>$${x.price.toFixed(2)}</td><td>${x.stock}</td><td>${x.category}</td>
      <td>${statusBadge(x.status)}</td>
      <td><button data-id="${x.id}" class="toggle-btn">Toggle Active/Blocked</button></td>
    </tr>
  `).join('');

  document.querySelectorAll('.toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const next = items.map((p) => p.id === id ? { ...p, status: p.status === 'blocked' ? 'active' : 'blocked' } : p);
      saveProducts(next);
      renderAll();
    });
  });
}

function renderOwner(items) {
  document.getElementById('statProducts').textContent = items.length;
  document.getElementById('statActive').textContent = items.filter((x) => x.status === 'active').length;
  document.getElementById('statStock').textContent = items.reduce((acc, p) => acc + p.stock, 0);

  const rows = document.getElementById('ownerRows');
  rows.innerHTML = items.map((x) => `
    <tr>
      <td>${x.name}</td><td>${x.seller}</td><td>$${x.price.toFixed(2)}</td><td>${statusBadge(x.status)}</td>
      <td>
        <button data-id="${x.id}" data-action="approve">Approve</button>
        <button data-id="${x.id}" data-action="block">Block</button>
      </td>
    </tr>
  `).join('');

  rows.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;
      const status = action === 'approve' ? 'active' : 'blocked';
      const next = items.map((p) => p.id === id ? { ...p, status } : p);
      saveProducts(next);
      renderAll();
    });
  });
}

function renderAll() {
  const items = getProducts();
  renderMarketplace(items);
  renderSeller(items);
  renderOwner(items);
}

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((x) => x.classList.remove('active'));
    document.querySelectorAll('.panel').forEach((x) => x.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

document.getElementById('productForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const items = getProducts();
  const next = {
    id: Date.now(),
    name: data.get('name').trim(),
    price: Number(data.get('price')),
    stock: Number(data.get('stock')),
    category: data.get('category').trim(),
    status: 'pending',
    seller: 'seller_demo'
  };
  saveProducts([...items, next]);
  form.reset();
  renderAll();
});

if (!localStorage.getItem(STORAGE_KEY)) saveProducts(seed);
renderAll();
