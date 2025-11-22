const PDFDocument = require("pdfkit");

/**
 * Streams a PDF to the given Express res object for a single application.
 * @param {object} application - application document
 * @param {Response} res - express response
 */
function streamApplicationPDF(application, res) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  // Set headers for download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=application-${application.id}.pdf`);

  doc.pipe(res);

  doc.fontSize(20).text("Loan Application", { align: "center" }).moveDown(1.5);

  doc.fontSize(12);
  doc.text(`Application ID: ${application.id}`);
  doc.text(`Name: ${application.name}`);
  doc.text(`Phone: ${application.phoneNumber}`);
  doc.text(`Date of Birth: ${new Date(application.dateOfBirth).toLocaleDateString()}`);
  doc.text(`Gender: ${application.gender}`);
  doc.text(`Loan Category: ${application.loanCategory}`);
  doc.moveDown();
  doc.text("Address:");
  doc.fontSize(11).text(application.address, { indent: 10, align: "left" });

  doc.moveDown(2);
  doc.fontSize(10).text(`Submitted At: ${new Date(application.submittedAt).toLocaleString()}`, { align: "right" });

  doc.end();
}

module.exports = { streamApplicationPDF };
