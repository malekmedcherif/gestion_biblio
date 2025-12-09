


// Suppression
function delBook(id) {
  if (!confirm("Supprimer ?")) return;

  const found = DATA_BASE.find(b => b.uid === id);
  if (found) found.is_dead = true;

  saveStorage();
  render();
}

// Recherche
function search(value) {
  const rows = document.querySelectorAll("#tab tbody tr");
  const filter = value.toUpperCase();

  rows.forEach(row => {
    const cell = row.getElementsByTagName("td")[1];
    if (cell) {
        const text = cell.textContent.toUpperCase();
        row.style.display = text.includes(filter) ? "" : "none";
    }
  });
}

// RAZ (Reset complet)
function resetApp() {
  localStorage.clear();
  location.reload();
}

// Message flash
function showMessage(msg) {
  const z = document.getElementById("zone_m");
  if(z) {
    z.innerText = msg;
    setTimeout(() => z.innerText = "", 3000);
  }
}
