document.getElementById("add-item").addEventListener("click", () => {
  const row = document.createElement("div");
  row.className = "item-row";
  row.innerHTML = \`
    <input type="text" placeholder="Serial No." class="serial" required />
    <input type="text" placeholder="Name" class="name" required />
    <input type="text" placeholder="Unit" class="unit" required />
    <input type="number" placeholder="Qty" class="qty" required />
    <input type="number" placeholder="Price EUR" class="price" required />
    <input type="number" placeholder="Amount EUR" class="amount" readonly />
  \`;
  document.getElementById("items").appendChild(row);
});
function numberToWords(n) {
  const a = ["zero","one","two","three","four","five","six","seven","eight","nine","ten"];
  if (n < 11) return a[n];
  return n.toString();
}
document.getElementById("invoice-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const $ = id => document.getElementById(id).value;
  const set = (id, val) => document.getElementById(id).innerText = val;
  set("p-series", $("series"));
  set("p-number", $("number"));
  set("p-date", $("date"));
  set("p-vendor", $("vendor"));
  set("p-vendor-code", $("vendor-code"));
  set("p-vendor-address", $("vendor-address"));
  set("p-vendor-billing", $("vendor-billing"));
  set("p-vendor-vat", $("vendor-vat"));
  set("p-buyer", $("buyer"));
  set("p-buyer-code", $("buyer-code"));
  set("p-buyer-address", $("buyer-address"));
  set("p-buyer-billing", $("buyer-billing"));
  set("p-buyer-vat", $("buyer-vat"));
  const tbody = document.getElementById("invoice-items");
  tbody.innerHTML = "";
  let total = 0;
  const rows = document.querySelectorAll(".item-row");
  rows.forEach(row => {
    const serial = row.querySelector(".serial").value;
    const name = row.querySelector(".name").value;
    const unit = row.querySelector(".unit").value;
    const qty = parseFloat(row.querySelector(".qty").value);
    const price = parseFloat(row.querySelector(".price").value);
    const amount = qty * price;
    row.querySelector(".amount").value = amount.toFixed(2);
    total += amount;
    const tr = document.createElement("tr");
    tr.innerHTML = \`<td>\${serial}</td><td>\${name}</td><td>\${unit}</td><td>\${qty}</td><td>€\${price.toFixed(2)}</td><td>€\${amount.toFixed(2)}</td>\`;
    tbody.appendChild(tr);
  });
  document.getElementById("total-amount").innerText = total.toFixed(2);
  document.getElementById("amount-words").innerText = numberToWords(Math.round(total));
});
document.getElementById("download-pdf").addEventListener("click", function () {
  const element = document.getElementById("invoice-preview");
  html2pdf().set({
    margin: 0.5,
    filename: 'invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }).from(element).save();
});
