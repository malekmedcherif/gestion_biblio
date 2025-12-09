// Affichage
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
