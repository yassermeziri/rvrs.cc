/* =========================================================
   RVRS — order storage
   Simple client-side "database" using localStorage.
   NOTE: this only persists orders on the same browser/device
   that received them. For a real store, replace saveOrder()
   with a call to your own backend / Google Sheet / email API.
   ========================================================= */

const RVRSStore = (() => {
  const KEY = 'rvrs_orders';

  function getOrders() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('RVRSStore: failed to read orders', e);
      return [];
    }
  }

  function saveOrder(order) {
    const orders = getOrders();
    const record = {
      id: 'ord_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...order
    };
    orders.unshift(record);
    localStorage.setItem(KEY, JSON.stringify(orders));
    return record;
  }

  function updateStatus(id, status) {
    const orders = getOrders().map(o => o.id === id ? { ...o, status } : o);
    localStorage.setItem(KEY, JSON.stringify(orders));
  }

  function deleteOrder(id) {
    const orders = getOrders().filter(o => o.id !== id);
    localStorage.setItem(KEY, JSON.stringify(orders));
  }

  function clearAll() {
    localStorage.removeItem(KEY);
  }

  function exportCSV() {
    const orders = getOrders();
    const headers = ['Date', 'Product', 'Size', 'Qty', 'Total (DZD)', 'Full Name', 'Phone', 'Wilaya', 'Address', 'Notes', 'Status'];
    const rows = orders.map(o => [
      new Date(o.createdAt).toLocaleString('fr-FR'),
      o.product, o.size, o.qty, o.total,
      o.fullName, o.phone, o.wilaya, (o.address || '').replace(/\n/g, ' '), o.notes || '', o.status
    ]);
    const csv = [headers, ...rows]
      .map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rvrs-orders-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return { getOrders, saveOrder, updateStatus, deleteOrder, clearAll, exportCSV };
})();
