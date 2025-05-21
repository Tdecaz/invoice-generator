function downloadPDF() {
  const invoice = document.getElementById("invoice");
  html2pdf().set({
    margin: 0.5,
    filename: 'invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }).from(invoice).save();
}