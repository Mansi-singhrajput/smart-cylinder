/**
 * SMART CYLINDER BOOKING SYSTEM - COMMON UI UTILITIES
 */

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function formatCurrency(num) {
  return '₹' + Number(num).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateTime(dateStr) {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function getStatusBadge(status) {
  const map = {
    'PENDING': { label: 'Pending Confirmation', class: 'badge-pending' },
    'CONFIRMED': { label: 'Order Confirmed', class: 'badge-confirmed' },
    'DISPATCHED': { label: 'Dispatched from Plant', class: 'badge-dispatched' },
    'OUT_FOR_DELIVERY': { label: 'Out for Delivery', class: 'badge-out_for_delivery' },
    'DELIVERED': { label: 'Delivered', class: 'badge-delivered' },
    'CANCELLED': { label: 'Cancelled', class: 'badge-cancelled' }
  };
  const item = map[status] || { label: status, class: 'badge-pending' };
  return `<span class="badge ${item.class}">${item.label}</span>`;
}

// Invoice Generator Modal
function openInvoiceModal(bookingRef) {
  const booking = DB.getBookingByReference(bookingRef);
  if (!booking) {
    showToast('Booking details not found', 'error');
    return;
  }

  const user = DB.getUserById(booking.userId) || { fullName: 'Valued Customer', phone: 'N/A', consumerNo: 'LPG-UNKNOWN', distributorName: 'Indane City Agency' };

  let modal = document.getElementById('invoice-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'invoice-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 24px;">🔥</span>
          <h2 style="font-size: 20px; font-weight: 800;">Smart<strong>Cylinder</strong> Official Bill / Receipt</h2>
        </div>
        <button onclick="closeInvoiceModal()" style="background: none; border: none; font-size: 22px; cursor: pointer; color: #64748b;">✕</button>
      </div>

      <div class="invoice-header">
        <div>
          <p style="font-weight: 700; font-size: 15px; margin-bottom: 2px;">Billed To:</p>
          <p style="font-weight: 600; color: #0f172a;">${user.fullName}</p>
          <p style="font-size: 13px; color: #64748b;">Consumer No: <strong>${user.consumerNo}</strong></p>
          <p style="font-size: 13px; color: #64748b;">Phone: +91 ${user.phone}</p>
          <p style="font-size: 13px; color: #64748b; max-width: 250px;">${booking.deliveryAddress}</p>
        </div>
        <div class="invoice-meta">
          <p><strong>Booking Ref:</strong> ${booking.bookingReference}</p>
          <p><strong>Date:</strong> ${formatDateTime(booking.bookingDate)}</p>
          <p><strong>Payment Mode:</strong> ${booking.paymentMethod || 'Online / UPI'}</p>
          <p><strong>Payment Status:</strong> <span style="color: #10b981; font-weight: 700;">${booking.paymentStatus}</span></p>
          <p><strong>Agency:</strong> ${user.distributorName || 'Bharat Gas Regional Agency'}</p>
        </div>
      </div>

      <table class="invoice-items-table">
        <thead>
          <tr>
            <th>Item Description</th>
            <th style="text-align: center;">Weight</th>
            <th style="text-align: center;">Qty</th>
            <th style="text-align: right;">Unit Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>${booking.cylinderType}</strong><br>
              <small style="color: #64748b;">ISI Certified Domestic LPG Refill</small>
            </td>
            <td style="text-align: center;">${booking.weightKg} kg</td>
            <td style="text-align: center;">1</td>
            <td style="text-align: right;">${formatCurrency(booking.basePrice)}</td>
          </tr>
        </tbody>
      </table>

      <div class="invoice-summary">
        <div class="invoice-summary-row">
          <span>Base Cylinder Price:</span>
          <span>${formatCurrency(booking.basePrice)}</span>
        </div>
        <div class="invoice-summary-row" style="color: #10b981;">
          <span>Govt Subsidy Discount:</span>
          <span>- ${formatCurrency(booking.subsidyDiscount)}</span>
        </div>
        <div class="invoice-summary-row">
          <span>Doorstep Delivery:</span>
          <span>${formatCurrency(booking.deliveryCharge)}</span>
        </div>
        <div class="invoice-summary-row total">
          <span>Total Paid:</span>
          <span>${formatCurrency(booking.totalAmount)}</span>
        </div>
      </div>

      <div style="margin-top: 24px; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 12px; color: #64748b; text-align: center;">
        🛡️ This is a computer-generated invoice for LPG gas refill under Smart Cylinder Booking System. No physical signature required.
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;" class="no-print">
        <button class="btn btn-outline" onclick="closeInvoiceModal()">Close</button>
        <button class="btn btn-primary" onclick="window.print()">🖨️ Print / Download PDF</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeInvoiceModal() {
  const modal = document.getElementById('invoice-modal');
  if (modal) modal.classList.remove('active');
}
