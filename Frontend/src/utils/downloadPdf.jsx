import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadPdf = (elementId, filename) => {
  const resumeElement = document.getElementById(elementId);

  if (!resumeElement) {
    console.error("Element not found for PDF generation!");
    return;
  }

  html2canvas(resumeElement, {
    scale: 2,
    useCORS: true, 
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = 210; 
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${filename}.pdf`);
  });
};