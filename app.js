// ==========================================
// STATE MANAGEMENT
// ==========================================

let invoiceData = {
    business: {},
    client: {},
    invoice: {},
    items: [],
    totals: {}
};

let currentStep = 1;

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    document.getElementById('invoiceDate').value = today;
    document.getElementById('dueDate').value = dueDate.toISOString().split('T')[0];

    // Add initial item
    addItem();
});

// ==========================================
// NAVIGATION
// ==========================================

function nextStep(step) {
    // Validate current step
    if (!validateStep(currentStep)) {
        return;
    }

    // Save data from current step
    saveStepData(currentStep);

    // Update UI
    updateStepUI(step);

    // If moving to step 3, populate preview
    if (step === 3) {
        populatePreview();
    }

    currentStep = step;
}

function prevStep(step) {
    updateStepUI(step);
    currentStep = step;
}

function updateStepUI(step) {
    // Update form steps
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');

    // Update progress steps
    document.querySelectorAll('.step').forEach((el, index) => {
        el.classList.remove('active', 'completed');
        if (index + 1 < step) {
            el.classList.add('completed');
        } else if (index + 1 === step) {
            el.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// VALIDATION
// ==========================================

function validateStep(step) {
    let isValid = true;
    let errorMessage = '';

    if (step === 1) {
        const businessName = document.getElementById('businessName').value.trim();
        const businessEmail = document.getElementById('businessEmail').value.trim();

        if (!businessName) {
            errorMessage = 'Please enter your business name';
            isValid = false;
        } else if (!businessEmail) {
            errorMessage = 'Please enter your business email';
            isValid = false;
        } else if (!isValidEmail(businessEmail)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    } else if (step === 2) {
        const clientName = document.getElementById('clientName').value.trim();
        const invoiceNumber = document.getElementById('invoiceNumber').value.trim();
        const items = document.querySelectorAll('.item-row');

        if (!clientName) {
            errorMessage = 'Please enter client name';
            isValid = false;
        } else if (!invoiceNumber) {
            errorMessage = 'Please enter invoice number';
            isValid = false;
        } else if (items.length === 0) {
            errorMessage = 'Please add at least one item';
            isValid = false;
        } else {
            // Validate all items
            let hasEmptyItem = false;
            items.forEach(item => {
                const desc = item.querySelector('.item-description').value.trim();
                const qty = item.querySelector('.item-quantity').value;
                const price = item.querySelector('.item-price').value;

                if (!desc || !qty || !price || qty <= 0 || price <= 0) {
                    hasEmptyItem = true;
                }
            });

            if (hasEmptyItem) {
                errorMessage = 'Please fill in all item details with valid values';
                isValid = false;
            }
        }
    }

    if (!isValid) {
        showNotification(errorMessage, 'error');
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'error') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'error' ? '#FEE2E2' : '#D1FAE5'};
        color: ${type === 'error' ? '#DC2626' : '#059669'};
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 2000;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// DATA MANAGEMENT
// ==========================================

function saveStepData(step) {
    if (step === 1) {
        invoiceData.business = {
            name: document.getElementById('businessName').value.trim(),
            email: document.getElementById('businessEmail').value.trim(),
            phone: document.getElementById('businessPhone').value.trim(),
            address: document.getElementById('businessAddress').value.trim()
        };
    } else if (step === 2) {
        invoiceData.client = {
            name: document.getElementById('clientName').value.trim(),
            email: document.getElementById('clientEmail').value.trim()
        };

        invoiceData.invoice = {
            number: document.getElementById('invoiceNumber').value.trim(),
            date: document.getElementById('invoiceDate').value,
            dueDate: document.getElementById('dueDate').value,
            currency: document.getElementById('currency').value,
            taxRate: parseFloat(document.getElementById('taxRate').value) || 0,
            discount: parseFloat(document.getElementById('discountAmount').value) || 0,
            notes: document.getElementById('notes').value.trim()
        };

        // Save items
        invoiceData.items = [];
        document.querySelectorAll('.item-row').forEach(item => {
            const description = item.querySelector('.item-description').value.trim();
            const quantity = parseFloat(item.querySelector('.item-quantity').value);
            const price = parseFloat(item.querySelector('.item-price').value);
            const total = quantity * price;

            invoiceData.items.push({
                description,
                quantity,
                price,
                total
            });
        });

        // Calculate totals
        calculateTotals();
    }
}

function calculateTotals() {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0);
    const discount = invoiceData.invoice.discount || 0;
    const subtotalAfterDiscount = Math.max(0, subtotal - discount);

    const taxRate = invoiceData.invoice.taxRate || 0;
    const tax = subtotalAfterDiscount * (taxRate / 100);

    const total = subtotalAfterDiscount + tax;

    invoiceData.totals = {
        subtotal,
        discount,
        tax,
        total
    };
}

// ==========================================
// ITEMS MANAGEMENT
// ==========================================

function addItem() {
    const itemsList = document.getElementById('itemsList');
    const itemIndex = document.querySelectorAll('.item-row').length;

    const itemRow = document.createElement('div');
    itemRow.className = 'item-row';
    itemRow.innerHTML = `
        <div class="form-group">
            <label>Description</label>
            <input type="text" class="item-description" placeholder="Service or product description" required>
        </div>
        <div class="form-group">
            <label>Quantity</label>
            <input type="number" class="item-quantity" placeholder="1" min="1" step="1" value="1" required>
        </div>
        <div class="form-group">
            <label>Price</label>
            <input type="number" class="item-price" placeholder="0.00" min="0" step="0.01" required>
        </div>
        <div class="form-group">
            <label>Total</label>
            <input type="text" class="item-total" placeholder="$0.00" readonly>
        </div>
        <button type="button" class="btn-remove" onclick="removeItem(this)" title="Remove item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>
    `;

    itemsList.appendChild(itemRow);

    // Add event listeners for auto-calculation
    const qtyInput = itemRow.querySelector('.item-quantity');
    const priceInput = itemRow.querySelector('.item-price');
    const totalInput = itemRow.querySelector('.item-total');

    function updateTotal() {
        const qty = parseFloat(qtyInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        const total = qty * price;
        totalInput.value = formatCurrency(total);
    }

    qtyInput.addEventListener('input', updateTotal);
    priceInput.addEventListener('input', updateTotal);
}

function removeItem(button) {
    const itemRow = button.closest('.item-row');
    itemRow.style.animation = 'itemSlideOut 0.3s ease-out';
    setTimeout(() => itemRow.remove(), 300);
}

// ==========================================
// PREVIEW
// ==========================================

function populatePreview() {
    // Business preview
    const businessPreview = document.getElementById('businessPreview');
    businessPreview.innerHTML = `
        <p><strong>Name:</strong> ${invoiceData.business.name}</p>
        <p><strong>Email:</strong> ${invoiceData.business.email}</p>
        ${invoiceData.business.phone ? `<p><strong>Phone:</strong> ${invoiceData.business.phone}</p>` : ''}
        ${invoiceData.business.address ? `<p><strong>Address:</strong> ${invoiceData.business.address}</p>` : ''}
    `;

    // Client preview
    const clientPreview = document.getElementById('clientPreview');
    clientPreview.innerHTML = `
        <p><strong>Name:</strong> ${invoiceData.client.name}</p>
        ${invoiceData.client.email ? `<p><strong>Email:</strong> ${invoiceData.client.email}</p>` : ''}
    `;

    // Summary preview
    const summaryPreview = document.getElementById('summaryPreview');
    summaryPreview.innerHTML = `
        <p><strong>Invoice Number:</strong> ${invoiceData.invoice.number}</p>
        <p><strong>Invoice Date:</strong> ${formatDate(invoiceData.invoice.date)}</p>
        <p><strong>Due Date:</strong> ${formatDate(invoiceData.invoice.dueDate)}</p>
        <p><strong>Currency:</strong> ${invoiceData.invoice.currency}</p>
        ${invoiceData.invoice.notes ? `<p><strong>Notes:</strong> ${invoiceData.invoice.notes}</p>` : ''}
    `;

    // Items preview
    const itemsPreview = document.getElementById('itemsPreview');
    let itemsHTML = '<table class="preview-items-table"><thead><tr><th>Description</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>';

    invoiceData.items.forEach(item => {
        itemsHTML += `
            <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>${formatCurrency(item.total)}</td>
            </tr>
        `;
    });

    itemsHTML += '</tbody></table>';
    itemsPreview.innerHTML = itemsHTML;

    // Update totals
    document.getElementById('subtotalAmount').textContent = formatCurrency(invoiceData.totals.subtotal);
    // Update totals
    document.getElementById('subtotalAmount').textContent = formatCurrency(invoiceData.totals.subtotal);

    // Insert Discount Row if applicable
    const totalsCard = document.querySelector('.total-card');
    // Remove existing dynamic rows if any (simplest is to rebuild)

    // We can't easily rebuild the structure with just this tool in this specific manner without replacing the whole total-card content or managing the DOM carefully.
    // Let's modify populatePreview to reconstruct the totals area or just specific IDs.
    // The previous code had hardcoded structure. Let's make it more flexible or target the structure.
    // Actually, I'll assume the structure is: Subtotal row, Tax row, Total row. I should Insert Discount row before Tax row?
    // It's cleaner to rewrite the totals section in HTML via JS here.

    const totalRowsHTML = `
        <div class="total-row">
            <span>Subtotal:</span>
            <span id="subtotalAmount">${formatCurrency(invoiceData.totals.subtotal)}</span>
        </div>
        ${invoiceData.totals.discount > 0 ? `
        <div class="total-row" style="color: #EF4444;">
            <span>Discount:</span>
            <span>-${formatCurrency(invoiceData.totals.discount)}</span>
        </div>
        ` : ''}
        <div class="total-row">
            <span>Tax (${invoiceData.invoice.taxRate}%):</span>
            <span id="taxAmount">${formatCurrency(invoiceData.totals.tax)}</span>
        </div>
        <div class="total-row total-final">
            <span>Total Amount:</span>
            <span id="totalAmount">${formatCurrency(invoiceData.totals.total)}</span>
        </div>
    `;

    document.querySelector('.total-card').innerHTML = totalRowsHTML;
    document.getElementById('totalAmount').textContent = formatCurrency(invoiceData.totals.total);
}

// ==========================================
// INVOICE GENERATION
// ==========================================

function generateInvoice() {
    // Show loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('active');

    // Simulate AI processing
    setTimeout(() => {
        loadingOverlay.classList.remove('active');

        // Show success overlay
        const successOverlay = document.getElementById('successOverlay');
        successOverlay.classList.add('active');
    }, 3000);
}

function downloadPDF() {
    // In a real application, this would generate and download a PDF
    // For this demo, we'll create a simple HTML-based invoice

    const invoiceHTML = generateInvoiceHTML();

    // Create a new window with the invoice
    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();

    // Trigger print dialog
    setTimeout(() => {
        printWindow.print();
    }, 500);

    showNotification('Invoice ready! Use your browser\'s print dialog to save as PDF.', 'success');
}

function generateInvoiceHTML() {
    const currencySymbol = getCurrencySymbol(invoiceData.invoice.currency);

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice ${invoiceData.invoice.number}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; padding: 40px; color: #333; }
        .invoice-container { max-width: 800px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #2563EB; }
        .logo { font-size: 32px; font-weight: bold; color: #2563EB; }
        .invoice-title { font-size: 24px; color: #666; }
        .info-section { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .info-block h3 { color: #2563EB; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; }
        .info-block p { margin: 5px 0; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th { background: #EFF6FF; padding: 12px; text-align: left; font-weight: 600; color: #2563EB; border-bottom: 2px solid #60A5FA; }
        td { padding: 12px; border-bottom: 1px solid #E5E7EB; }
        .text-right { text-align: right; }
        .totals { margin-left: auto; width: 300px; }
        .totals-row { display: flex; justify-content: space-between; padding: 10px 0; font-size: 16px; }
        .totals-final { border-top: 2px solid #2563EB; margin-top: 10px; padding-top: 10px; font-size: 20px; font-weight: bold; color: #2563EB; }
        .notes { margin-top: 40px; padding: 20px; background: #EFF6FF; border-radius: 8px; border-left: 4px solid #2563EB; }
        .notes h3 { color: #2563EB; margin-bottom: 10px; }
        .footer { margin-top: 60px; text-align: center; color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div>
                <div class="logo">Apex Invoice Solutions</div>
            </div>
            <div style="text-align: right;">
                <div class="invoice-title">INVOICE</div>
                <p style="font-size: 18px; margin-top: 5px;">#${invoiceData.invoice.number}</p>
            </div>
        </div>
        
        <div class="info-section">
            <div class="info-block">
                <h3>From</h3>
                <p><strong>${invoiceData.business.name}</strong></p>
                <p>${invoiceData.business.email}</p>
                ${invoiceData.business.phone ? `<p>${invoiceData.business.phone}</p>` : ''}
                ${invoiceData.business.address ? `<p>${invoiceData.business.address}</p>` : ''}
            </div>
            <div class="info-block">
                <h3>Bill To</h3>
                <p><strong>${invoiceData.client.name}</strong></p>
                ${invoiceData.client.email ? `<p>${invoiceData.client.email}</p>` : ''}
            </div>
            <div class="info-block">
                <h3>Invoice Details</h3>
                <p><strong>Date:</strong> ${formatDate(invoiceData.invoice.date)}</p>
                <p><strong>Due:</strong> ${formatDate(invoiceData.invoice.dueDate)}</p>
            </div>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th class="text-right">Quantity</th>
                    <th class="text-right">Price</th>
                    <th class="text-right">Total</th>
                </tr>
            </thead>
            <tbody>
                ${invoiceData.items.map(item => `
                    <tr>
                        <td>${item.description}</td>
                        <td class="text-right">${item.quantity}</td>
                        <td class="text-right">${currencySymbol}${item.price.toFixed(2)}</td>
                        <td class="text-right">${currencySymbol}${item.total.toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <div class="totals">
            <div class="totals-row">
                <span>Subtotal:</span>
                <span>${currencySymbol}${invoiceData.totals.subtotal.toFixed(2)}</span>
            </div>
            ${invoiceData.totals.discount > 0 ? `
            <div class="totals-row" style="color: #EF4444;">
                <span>Discount:</span>
                <span>-${currencySymbol}${invoiceData.totals.discount.toFixed(2)}</span>
            </div>
            ` : ''}
            <div class="totals-row">
                <span>Tax (${invoiceData.invoice.taxRate}%):</span>
                <span>${currencySymbol}${invoiceData.totals.tax.toFixed(2)}</span>
            </div>
            <div class="totals-row totals-final">
                <span>Total:</span>
                <span>${currencySymbol}${invoiceData.totals.total.toFixed(2)}</span>
            </div>
        </div>
        
        ${invoiceData.invoice.notes ? `
            <div class="notes">
                <h3>Notes</h3>
                <p>${invoiceData.invoice.notes}</p>
            </div>
        ` : ''}
        
        <div class="footer">
            <p>Generated with Apex Invoice Solutions - Professional invoices in 2 minutes</p>
        </div>
    </div>
</body>
</html>
    `;
}

function createAnother() {
    // Reset the form
    location.reload();
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function formatCurrency(amount) {
    const symbol = getCurrencySymbol(invoiceData.invoice?.currency || 'USD');
    return `${symbol}${amount.toFixed(2)}`;
}

function getCurrencySymbol(currency) {
    const symbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'CAD': '$'
    };
    return symbols[currency] || '$';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes itemSlideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-20px);
        }
    }
`;
document.head.appendChild(style);
