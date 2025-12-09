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

 