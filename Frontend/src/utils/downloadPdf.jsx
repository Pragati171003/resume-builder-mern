import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadPdf = (iframeElement, filename) => {
  // We no longer need getElementById. We already have the magnificent connection.
  if (!iframeElement) {
    console.error("Iframe element reference not found!");
    alert("Could not find the resume preview to download. Please try again.");
    return;
  }

  const iframeDocument = iframeElement.contentWindow?.document;
  if (!iframeDocument) {
    console.error("Could not access the content of the iframe.");
    alert("Could not access resume content. Please try again.");
    return;
  }
  const resumeElement = iframeDocument.body;
  
  if (resumeElement.childElementCount === 0) {
      alert("Resume content is empty, cannot download.");
      return;
  }

  html2canvas(resumeElement, {
    scale: 2,
    useCORS: true,
    logging: false,
    width: resumeElement.scrollWidth,
    height: resumeElement.scrollHeight,
    windowWidth: resumeElement.scrollWidth,
    windowHeight: resumeElement.scrollHeight,
  }).then((canvas) => {
    const pageWidth = 210; 
    const pageHeight = 297; 

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasHeight / canvasWidth;
    const imgHeight = pageWidth * ratio;
    
    let heightLeft = imgHeight;
    let position = 0;

    const pdf = new jsPDF('p', 'mm', 'a4');

    pdf.addImage(canvas, 'PNG', 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(canvas, 'PNG', 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename}.pdf`);
  }).catch(error => {
    console.error("PDF Generation Failed:", error);
    alert("An error occurred while generating the PDF.");
  });
};