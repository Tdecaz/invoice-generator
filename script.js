document.getElementById("add-item").addEventListener("click", () => {
  const itemList = document.getElementById("item-list");
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = \`
    <input type="text" placeholder="Description" class="desc" required>
    <input type="number" placeholder="Qty" class="qty" required>
    <input type="text" placeholder="Unit" class="unit">
    <input type="number" placeholder="Price" class="price" required>
  \`;
  itemList.appendChild(div);
});

document.getElementById("invoice-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const get = id => document.getElementById(id).value;
  const set = (id, val) => document.getElementById(id).innerText = val;
  set("pv-vendor-name", get("vendor-name"));
  set("pv-vendor-address", get("vendor-address"));
  set("pv-vendor-vat", get("vendor-vat"));
  set("pv-buyer-name", get("buyer-name"));
  set("pv-buyer-address", get("buyer-address"));
  set("pv-buyer-vat", get("buyer-vat"));
  const tbody = document.getElementById("invoice-items");
  tbody.innerHTML = "";
  const descs = document.querySelectorAll(".desc");
  const qtys = document.querySelectorAll(".qty");
  const units = document.querySelectorAll(".unit");
  const prices = document.querySelectorAll(".price");
  let total = 0;
  for (let i = 0; i < descs.length; i++) {
    const desc = descs[i].value;
    const qty = parseFloat(qtys[i].value);
    const unit = units[i].value;
    const price = parseFloat(prices[i].value);
    const amount = qty * price;
    total += amount;
    const row = document.createElement("tr");
    row.innerHTML = \`<td>\${desc}</td><td>\${unit}</td><td>\${qty}</td><td>€\${price.toFixed(2)}</td><td>€\${amount.toFixed(2)}</td>\`;
    tbody.appendChild(row);
  }
  document.getElementById("total-amount").innerText = total.toFixed(2);
  document.getElementById("preview").style.display = "block";
});

function downloadPDF() {
  const element = document.getElementById("invoice");
  html2pdf().set({
    margin: 0.5,
    filename: 'invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }).from(element).save();
}