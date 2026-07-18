//@ts-nocheck
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Inspection } from '../../types/inspection.types';
import { User } from '../../types/auth.types';

interface PdfGeneratorOptions {
  includeWatermark?: boolean;
  includeSignature?: boolean;
  includeNotes?: boolean;
  includePhotos?: boolean;
  customHeader?: string;
  customFooter?: string;
}

export class PdfGenerator {
  private doc: jsPDF;
  private user: User;
  private inspection: Inspection;
  private options: PdfGeneratorOptions;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number = 20;
  private currentY: number = 20;
  
  constructor(user: User, inspection: Inspection, options: PdfGeneratorOptions = {}) {
    this.doc = new jsPDF();
    this.user = user;
    this.inspection = inspection;
    this.options = {
      includeWatermark: true,
      includeSignature: true,
      includeNotes: true,
      includePhotos: true,
      ...options
    };
    
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
  }
  
  private addWatermark(): void {
    if (!this.options.includeWatermark || !this.user.company?.logoUrl) return;
    
    // Add semi-transparent company logo as watermark
    this.doc.saveGraphicsState();
    this.doc.setGState(this.doc.GState({ opacity: 0.1 }));
    
    // Calculate center of page
    const x = this.pageWidth / 2;
    const y = this.pageHeight / 2;
    
    // Add image as watermark (this would typically be implemented with actual image loading)
    // For now, just a placeholder - in real implementation you'd load the image
    // and calculate dimensions to fit properly
    // this.doc.addImage(this.user.company.logoUrl, 'PNG', x - 50, y - 50, 100, 100);
    
    this.doc.restoreGraphicsState();
  }
  
  private addHeader(): void {
    // Add company logo in top left (small size)
    if (this.user.company?.logoUrl) {
      // this.doc.addImage(this.user.company.logoUrl, 'PNG', this.margin, this.margin, 40, 20);
    }
    
    // Company name in bold
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(16);
    this.doc.text(this.user.company?.name || 'Vehicle Inspection Service', this.margin, this.margin + 10);
    
    // Company contact info
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    this.doc.text(this.user.company?.address || '', this.margin, this.margin + 18);
    this.doc.text(this.user.company?.phone || '', this.margin, this.margin + 24);
    this.doc.text(this.user.email || '', this.margin, this.margin + 30);
    
    // Report title
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(14);
    this.doc.text('VEHICLE INSPECTION REPORT', this.pageWidth / 2, this.margin + 40, { align: 'center' });
    
    // Add custom header if provided
    if (this.options.customHeader) {
      this.doc.setFont('helvetica', 'italic');
      this.doc.setFontSize(10);
      this.doc.text(this.options.customHeader, this.pageWidth / 2, this.margin + 48, { align: 'center' });
    }
    
    this.currentY = this.margin + 60;
  }
  
  private addVehicleInfo(): void {
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(12);
    this.doc.text('Vehicle Information', this.margin, this.currentY);
    this.currentY += 8;
    
    const vehicleInfo = [
      ['Make', this.inspection.vehicleInfo.make],
      ['Model', this.inspection.vehicleInfo.model],
      ['Year', this.inspection.vehicleInfo.year.toString()],
      ['VIN', this.inspection.vehicleInfo.vin],
      ['License Plate', this.inspection.vehicleInfo.licensePlate],
      ['Color', this.inspection.vehicleInfo.color],
      ['Mileage', `${this.inspection.vehicleInfo.mileage.toLocaleString()} mi`],
      ['Transmission', this.inspection.vehicleInfo.transmission],
      ['Fuel Type', this.inspection.vehicleInfo.fuelType],
      ['Inspection Date', new Date(this.inspection.createdAt).toLocaleDateString()]
    ];
    
    autoTable(this.doc, {
      startY: this.currentY,
      body: vehicleInfo,
      theme: 'striped',
      styles: { fontSize: 10, cellPadding: 4 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 80 },
        1: { cellWidth: 'auto' }
      },
      margin: { left: this.margin, right: this.margin }
    });
    
    this.currentY = (this.doc as any).lastAutoTable.finalY + 15;
  }
  
  private addInspectionSection(title: string, items: Array<{ item: string, condition: string, notes?: string }>): void {
    // Check if we need to start a new page
    if (this.currentY > this.pageHeight - 100) {
      this.doc.addPage();
      this.currentY = this.margin;
      if (this.options.includeWatermark) {
        this.addWatermark();
      }
    }
    
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(12);
    this.doc.text(title, this.margin, this.currentY);
    this.currentY += 8;
    
    const tableBody = items.map(item => [
      item.item,
      item.condition,
      item.notes || ''
    ]);
    
    autoTable(this.doc, {
      startY: this.currentY,
      head: [['Item', 'Condition', 'Notes']],
      body: tableBody,
      theme: 'striped',
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [66, 139, 202], textColor: 255 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 60 },
        2: { cellWidth: 'auto' }
      },
      margin: { left: this.margin, right: this.margin }
    });
    
    this.currentY = (this.doc as any).lastAutoTable.finalY + 15;
  }
  
  private addPhotosSection(): void {
    if (!this.options.includePhotos || !this.inspection.photos || this.inspection.photos.length === 0) {
      return;
    }
    
    // Check if we need to start a new page
    if (this.currentY > this.pageHeight - 100) {
      this.doc.addPage();
      this.currentY = this.margin;
      if (this.options.includeWatermark) {
        this.addWatermark();
      }
    }
    
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(12);
    this.doc.text('Inspection Photos', this.margin, this.currentY);
    this.currentY += 15;
    
    // We'll add photos in a grid, 2 per row
    const photosPerRow = 2;
    const photoWidth = (this.pageWidth - (this.margin * 2) - 10) / photosPerRow;
    const photoHeight = photoWidth * 0.75; // 4:3 aspect ratio
    
    for (let i = 0; i < this.inspection.photos.length; i++) {
      const photo = this.inspection.photos[i];
      const rowIndex = Math.floor(i / photosPerRow);
      const colIndex = i % photosPerRow;
      
      const x = this.margin + (colIndex * (photoWidth + 10));
      const y = this.currentY + (rowIndex * (photoHeight + 30));
      
      // Check if we need a new page
      if (y + photoHeight > this.pageHeight - this.margin) {
        this.doc.addPage();
        this.currentY = this.margin;
        if (this.options.includeWatermark) {
          this.addWatermark();
        }
        // Reset counters to start at top of new page
        i--; // Process this photo again
        continue;
      }
      
      // Add photo placeholder (in real app, would load actual image)
      // this.doc.addImage(photo.url, 'JPEG', x, y, photoWidth, photoHeight);
      
      // For demonstration, add a placeholder box
      this.doc.setDrawColor(200);
      this.doc.setFillColor(240);
      this.doc.rect(x, y, photoWidth, photoHeight, 'FD');
      
      // Add photo caption
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(9);
      this.doc.text(photo.category || 'Photo', x, y + photoHeight + 10);
      this.doc.text(photo.description || '', x, y + photoHeight + 18, {
        maxWidth: photoWidth
      });
      
      // Update currentY if this is the last row or last photo
      if (i === this.inspection.photos.length - 1 || colIndex === photosPerRow - 1) {
        this.currentY = y + photoHeight + 30;
      }
    }
  }
  
  private addSummary(): void {
    // Check if we need to start a new page
    if (this.currentY > this.pageHeight - 150) {
      this.doc.addPage();
      this.currentY = this.margin;
      if (this.options.includeWatermark) {
        this.addWatermark();
      }
    }
    
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(12);
    this.doc.text('Inspection Summary', this.margin, this.currentY);
    this.currentY += 10;
    
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    
    // Add summary text with line wrapping
    const summaryText = this.inspection.summary || 'No summary provided.';
    const textLines = this.doc.splitTextToSize(summaryText, this.pageWidth - (this.margin * 2));
    this.doc.text(textLines, this.margin, this.currentY);
    
    // Update currentY based on text height
    this.currentY += textLines.length * 6 + 15;
  }
  
  private addSignature(): void {
    if (!this.options.includeSignature) {
      return;
    }
    
    // Check if we need to start a new page
    if (this.currentY > this.pageHeight - 80) {
      this.doc.addPage();
      this.currentY = this.margin;
      if (this.options.includeWatermark) {
        this.addWatermark();
      }
    }
    
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    
    // Add inspector name
    this.doc.text(`Inspector: ${this.user.firstName} ${this.user.lastName}`, this.margin, this.currentY);
    this.currentY += 8;
    
    // Add date
    const inspectionDate = new Date(this.inspection.createdAt).toLocaleDateString();
    this.doc.text(`Date: ${inspectionDate}`, this.margin, this.currentY);
    this.currentY += 20;
    
    // Add signature image if available
    if (this.user.company?.signatureUrl) {
      // this.doc.addImage(this.user.company.signatureUrl, 'PNG', this.margin, this.currentY, 60, 30);
      
      // For demo purposes, add a placeholder
      this.doc.setDrawColor(0);
      this.doc.setLineWidth(0.5);
      this.doc.line(this.margin, this.currentY + 15, this.margin + 60, this.currentY + 15);
      
      this.doc.setFont('helvetica', 'italic');
      this.doc.setFontSize(10);
      this.doc.text('Signature', this.margin + 10, this.currentY + 25);
    }
    
    this.currentY += 40;
  }
  
  private addFooter(): void {
    const footerY = this.pageHeight - 15;
    
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8);
    
    // Add page number
    const pageNumber = `Page ${this.doc.getCurrentPageInfo().pageNumber} of ${this.doc.getNumberOfPages()}`;
    this.doc.text(pageNumber, this.pageWidth - this.margin, footerY, { align: 'right' });
    
    // Add custom footer if provided
    if (this.options.customFooter) {
      this.doc.text(this.options.customFooter, this.margin, footerY);
    } else {
      // Default footer with company name
      this.doc.text(this.user.company?.name || 'Vehicle Inspection Report', this.margin, footerY);
    }
  }
  
  public generate(): Blob {
    // Start with a watermark if enabled
    if (this.options.includeWatermark) {
      this.addWatermark();
    }
    
    // Add header with company info
    this.addHeader();
    
    // Add vehicle information section
    this.addVehicleInfo();
    
    // Add exterior inspection section
    this.addInspectionSection('Exterior Inspection', this.inspection.exterior || []);
    
    // Add interior inspection section
    this.addInspectionSection('Interior Inspection', this.inspection.interior || []);
    
    // Add mechanical inspection section
    this.addInspectionSection('Mechanical Inspection', this.inspection.mechanical || []);
    
    // Add photos if available and enabled
    if (this.options.includePhotos) {
      this.addPhotosSection();
    }
    
    // Add summary
    this.addSummary();
    
    // Add signature if enabled
    if (this.options.includeSignature) {
      this.addSignature();
    }
    
    // Add footer to all pages
    for (let i = 1; i <= this.doc.getNumberOfPages(); i++) {
      this.doc.setPage(i);
      this.addFooter();
    }
    
    // Return the PDF as a blob
    return this.doc.output('blob');
  }
  
  // Static convenience method
  public static async generatePdf(user: User, inspection: Inspection, options?: PdfGeneratorOptions): Promise<Blob> {
    const generator = new PdfGenerator(user, inspection, options);
    return generator.generate();
  }
}

export default PdfGenerator