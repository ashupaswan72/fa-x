import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatPrice, formatDate } from './helpers';

export const generateInvoice = (order) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(17, 49, 31); // Dark Green #11311F
  doc.text('FA-X', 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Farm Access Exchange', 14, 26);
  doc.text('India\'s Premium Agri-Marketplace', 14, 31);
  doc.text('support@fax.com | 1800-FAX-FARM', 14, 36);

  // Invoice details (Right side)
  doc.setFontSize(20);
  doc.setTextColor(0);
  doc.text('INVOICE', 150, 20);
  
  doc.setFontSize(10);
  doc.text(`Order ID: ${order.id || order.orderId || 'N/A'}`, 150, 26);
  doc.text(`Date: ${formatDate(order.createdAt || new Date())}`, 150, 31);
  doc.text(`Status: ${order.paymentStatus?.toUpperCase() || 'PAID'}`, 150, 36);

  // Line separator
  doc.setDrawColor(200);
  doc.line(14, 42, 196, 42);

  // Billing & Shipping Info
  doc.setFontSize(12);
  doc.setTextColor(17, 49, 31);
  doc.text('Billed To:', 14, 52);
  
  doc.setFontSize(10);
  doc.setTextColor(0);
  const name = order.shippingAddress?.fullName || order.customerName || 'Valued Customer';
  const phone = order.shippingAddress?.phone || 'N/A';
  const address = order.shippingAddress ? 
    `${order.shippingAddress.street || ''}, ${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''} ${order.shippingAddress.zipCode || ''}` : 
    'N/A';

  doc.text(name, 14, 58);
  doc.text(`Phone: ${phone}`, 14, 63);
  
  // Wrap address text
  const splitAddress = doc.splitTextToSize(`Address: ${address}`, 80);
  doc.text(splitAddress, 14, 68);

  // Table Data
  const items = order.items || [];
  const tableColumn = ["Item Description", "Farmer", "Qty", "Price", "Total"];
  const tableRows = [];

  items.forEach(item => {
    const itemData = [
      item.title || item.name || 'Product',
      item.farmerName || 'N/A',
      `${item.quantity || 1}`,
      formatPrice(item.price || 0),
      formatPrice((item.price || 0) * (item.quantity || 1))
    ];
    tableRows.push(itemData);
  });

  // Generate Table
  autoTable(doc, {
    startY: 85,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [76, 175, 80], textColor: [255, 255, 255] }, // #4CAF50
    alternateRowStyles: { fillColor: [248, 249, 250] },
    margin: { top: 10 },
  });

  // Totals
  const finalY = doc.lastAutoTable.finalY || 85;
  const totalAmount = order.totalAmount || items.reduce((acc, curr) => acc + ((curr.price || 0) * (curr.quantity || 1)), 0);
  const deliveryFee = order.deliveryFee || 0;
  const finalTotal = totalAmount + deliveryFee;

  doc.setFontSize(10);
  doc.text('Subtotal:', 140, finalY + 10);
  doc.text(formatPrice(totalAmount), 170, finalY + 10);
  
  doc.text('Delivery Fee:', 140, finalY + 16);
  doc.text(formatPrice(deliveryFee), 170, finalY + 16);
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Total Amount:', 140, finalY + 24);
  doc.text(formatPrice(finalTotal), 170, finalY + 24);

  // Footer Message
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(100);
  doc.text('Thank you for supporting local farmers and shopping with FA-X!', 105, 280, { align: 'center' });

  // Save the PDF
  const filename = `FAX-Invoice-${order.id || Date.now()}.pdf`;
  doc.save(filename);
};
