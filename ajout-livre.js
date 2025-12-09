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
  const dateStr = ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()};

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
    stuff: ${isbn} | ${dateStr},
    is_dead: false
  };

  DATA_BASE.push(book);
  saveStorage();
  render();
  showMessage("C'est bon");

  document.getElementById("inp_A").value = "";
  document.getElementById("inp_B").value = "";
  document.getElementById("inp_C").value = "";
}