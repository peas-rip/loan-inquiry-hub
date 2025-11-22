import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LoanApplication } from './storage';

export const generateApplicationPDF = (application: LoanApplication) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Loan Application Form', 105, 20, { align: 'center' });
  
  // Add submission date
  doc.setFontSize(10);
  doc.text(`Submitted: ${new Date(application.submittedAt).toLocaleString()}`, 105, 30, { align: 'center' });
  
  // Add application details
  autoTable(doc, {
    startY: 40,
    head: [['Field', 'Value']],
    body: [
      ['Application ID', application.id],
      ['Name', application.name],
      ['Phone Number', application.phoneNumber],
      ['Address', application.address],
      ['Date of Birth', new Date(application.dateOfBirth).toLocaleDateString()],
      ['Gender', application.gender],
      ['Loan Category', application.loanCategory],
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 11 }
  });
  
  // Save the PDF
  doc.save(`loan-application-${application.id}.pdf`);
};
