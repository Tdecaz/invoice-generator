document.getElementById("add-item").addEventListener("click", () => {
  const row = document.createElement("div");
  row.className = "item-row";
  row.innerHTML = \`
    <input type="text" placeholder="Item Description" class="desc" required />
    <input type="number" placeholder="Qty" class="qty" required />
    <input type="number" placeholder="Rate" class="rate" required />
  \`;
  document.getElementById("items").appendChild(row);
});

document.getElementById("invoice-form").addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("prev-your-name").innerText = document.getElementById("your-name").value;
  document.getElementById("prev-client-name").innerText = document.getElementById("client-name").value;

  const descriptions = document.querySelectorAll(".desc");
  const quantities = document.querySelectorAll(".qty");
  const rates = document.querySelectorAll(".rate");

  const tbody = document.getElementById("invoice-items");
  tbody.innerHTML = "";

  let total = 0;

  for (let i = 0; i < descriptions.length; i++) {
    const desc = descriptions[i].value;
    const qty = parseFloat(quantities[i].value);
    const rate = parseFloat(rates[i].value);
    const subtotal = qty * rate;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = \`
      <td>\${desc}</td>
      <td>\${qty}</td>
      <td>$\${rate.toFixed(2)}</td>
      <td>$\${subtotal.toFixed(2)}</td>
    \`;
    tbody.appendChild(row);
  }

  document.getElementById("total-amount").innerText = total.toFixed(2);
});

document.getElementById("download-pdf").addEventListener("click", function () {
  const element = document.getElementById("invoice-preview");

  setTimeout(() => {
    html2pdf().set({
      margin: 0.5,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).from(element).save();
  }, 100);
});