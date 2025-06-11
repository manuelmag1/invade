// Modal control
const modal = document.getElementById('reportModal');
const openBtn = document.getElementById('newReportBtn');
const closeBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const form = document.getElementById('reportForm');
const gallery = document.getElementById('reportGallery');

let editIndex = null;

openBtn.onclick = () => {
  modal.style.display = 'block';
  form.reset();
  editIndex = null;
};

closeBtn.onclick = cancelBtn.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = 'none';
};

form.onsubmit = (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;
  const tags = document.getElementById('tags').value;
  const media = document.getElementById('media').files;

  const card = document.createElement('div');
  card.className = 'card';

  let mediaPreview = '';
  if (media.length > 0) {
    const file = media[0];
    const url = URL.createObjectURL(file);
    mediaPreview = `<img src="${url}" alt="Preview">`;
  } else {
    mediaPreview = `<img src="./img/placeholder.jpg" alt="Preview">`;
  }

  const badgeColor =
    category === 'Seguridad' ? 'rojo' : category === 'Técnico' ? 'azul' : 'verde';

  card.innerHTML = `
    ${mediaPreview}
    <div class="badge ${badgeColor}">${category}</div>
    <div class="card-content">
      <h3>${title}</h3>
      <p>${description}</p>
      <p class="date">📅 ${new Date(date).toLocaleDateString()}</p>
      <div class="tags">
        ${tags
          .split(',')
          .map((tag) => `<span>${tag.trim()}</span>`)
          .join('')}
      </div>
      <div class="card-actions">
        <button onclick="editCard(this)">✏️</button>
        <button onclick="deleteCard(this)">🗑️</button>
      </div>
    </div>
  `;

  if (editIndex !== null) {
    gallery.replaceChild(card, gallery.children[editIndex]);
  } else {
    gallery.appendChild(card);
  }

  modal.style.display = 'none';
};

window.editCard = function (btn) {
  const card = btn.closest('.card');
  editIndex = Array.from(gallery.children).indexOf(card);

  document.getElementById('title').value = card.querySelector('h3').textContent;
  document.getElementById('description').value = card.querySelector('p').textContent;
  document.getElementById('date').value = new Date(
    card.querySelector('.date').textContent.replace('📅 ', '')
  )
    .toISOString()
    .split('T')[0];
  document.getElementById('category').value = card.querySelector('.badge').textContent;
  document.getElementById('tags').value = Array.from(
    card.querySelectorAll('.tags span')
  )
    .map((t) => t.textContent)
    .join(', ');

  modal.style.display = 'block';
};

window.deleteCard = function (btn) {
  const card = btn.closest('.card');
  gallery.removeChild(card);
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8FZ-8ECCU_3yLKjD_aLNNMEa-3jMMh6w",
  authDomain: "invade-fc9a6.firebaseapp.com",
  projectId: "invade-fc9a6",
  storageBucket: "invade-fc9a6.firebasestorage.app",
  messagingSenderId: "612828253629",
  appId: "1:612828253629:web:176423fc7dd8443f9a16d4",
  measurementId: "G-VTN001SQGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);