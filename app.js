// ============================
// Variables principales
// ============================
let DATA_BASE = [];
let uidCounter = 0;
const STORAGE_KEY = "biblio_db_final";

// ============================
// Initialisation
// ============================
function initApp() {
  loadStorage();
  render();
  document.getElementById("saveBtn").onclick = saveBook;
  document.getElementById("searchInput").onkeyup = (e) => search(e.target.value);
  document.getElementById("resetBtn").onclick = resetApp;
}

// ============================
// Chargement LocalStorage
// ============================
function loadStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return;

  try {
    DATA_BASE = JSON.parse(raw);
    if (DATA_BASE.length > 0) {
      uidCounter = DATA_BASE[DATA_BASE.length - 1].uid;
    }
  } catch (e) {
    console.log("Erreur parsing JSON");
  }
}

// ============================
// Sauvegarde
// ============================
function saveStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA_BASE));
}

// ============================
// Ajout de livre
// ============================
function saveBook() {
  const title = document.getElementById("inp_A").value.trim();
  const author = document.getElementById("inp_B").value.trim();
  const categoryValue = document.getElementById("sel_X").value;
  const isbn = document.getElementById("inp_C").value.trim();

  if (!title) return alert("Erreur Titre");
  if (!author) return alert("Erreur Auteur");
  if (isbn.length <= 3) return alert("Erreur ISBN");

  uidCounter++;

  // date
  const d = new Date();
  const dateStr = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  // catégorie
  let label = "Roman";
  if (categoryValue === "1") label = "Science-Fiction";
  else if (categoryValue === "2") label = "Documentaire";

  // objet
  const book = {
    uid: uidCounter,
    Name: title,
    auteur_name: author,
    k: label,
    stuff: `${isbn} | ${dateStr}`,
    is_dead: false
  };

  DATA_BASE.push(book);
  saveStorage();
  render();
  showMessage("C'est bon");

  document.getElementById("inp_A").value = "";
  document.getElementById("inp_B").value = "";
  document.getElementById("inp_C").value = "";
}

// ============================
// Affichage
// ============================
function render() {
  const tbody = document.getElementById("corps_du_tableau");
  tbody.innerHTML = "";
  let count = 0;

  DATA_BASE.forEach(book => {
    if (!book.is_dead) {
      count++;

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>#${book.uid}</td>
        <td><b>${book.Name.toUpperCase()}</b><br><i>${book.auteur_name}</i></td>
        <td><span style="background:white;color:black;padding:2px;">${book.k}</span></td>
        <td>${book.stuff}</td>
        <td><button class="btn-del" onclick="delBook(${book.uid})">X</button></td>
      `;

      tbody.appendChild(tr);
    }
  });

  document.getElementById("cpt").innerText = count;
}

// ============================
// Suppression
// ============================
function delBook(id) {
  if (!confirm("Supprimer ?")) return;

  const found = DATA_BASE.find(b => b.uid === id);
  if (found) found.is_dead = true;

  saveStorage();
  render();
}

// ============================
// Recherche
// ============================
function search(value) {
  const rows = document.querySelectorAll("#tab tbody tr");
  const filter = value.toUpperCase();

  rows.forEach(row => {
    const cell = row.getElementsByTagName("td")[1];
    const text = cell.textContent.toUpperCase();
    row.style.display = text.includes(filter) ? "" : "none";
  });
}

// ============================
// RAZ
// ============================
function resetApp() {
  localStorage.clear();
  location.reload();
}

// ============================
// Message
// ============================
function showMessage(msg) {
  const z = document.getElementById("zone_m");
  z.innerText = msg;
  setTimeout(() => z.innerText = "", 3000);
}
