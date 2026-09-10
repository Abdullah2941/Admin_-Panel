import { useEffect, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { CUSTOMER_PURCHASES } from "../data/customers";
import { formatPrice } from "../utils/format";
import { downloadCsv } from "../utils/csv";
import ListPageHeader from "../components/common/ListPageHeader";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Modal from "../components/common/Modal";
import Reveal from "../components/common/Reveal";
import "./Customers.css";

export default function Customers() {
  const [customers, setCustomers] = useState(CUSTOMER_PURCHASES);
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    document.title = "Customers | SHOP.CO Admin";
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.product.toLowerCase().includes(q));
  }, [customers, search]);

  const handleDelete = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === editing.id
          ? {
              ...c,
              totalPurchases: Number(form.get("totalPurchases")),
              productPrice: Number(form.get("productPrice")),
              quantity: Number(form.get("quantity")),
              discount: Number(form.get("discount")),
            }
          : c
      )
    );
    setEditing(null);
  };

  return (
    <div className="customers-page">
      <ListPageHeader
        title="Customer Purchases"
        breadcrumbItems={[{ label: "Customers" }]}
        searchValue={search}
        onSearchChange={setSearch}
        onDownload={() => downloadCsv("customer-purchases.csv", filtered)}
      />

      <Reveal className="card admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Total Purchases</th>
              <th>Product Price</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>#{c.id}</td>
                <td>
                  <div className="admin-table__name-cell">
                    <span className="customers-page__avatar">{c.name.charAt(0)}</span>
                    <div>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-faint)" }}>{c.product}</div>
                    </div>
                  </div>
                </td>
                <td>{c.totalPurchases}</td>
                <td>{formatPrice(c.productPrice)}</td>
                <td>{c.quantity}</td>
                <td>{c.discount > 0 ? `${c.discount}%` : "—"}</td>
                <td>
                  <div className="admin-table__actions">
                    <button className="admin-table__icon-btn" aria-label={`Edit ${c.name}`} onClick={() => setEditing(c)}><Pencil size={16} /></button>
                    <button className="admin-table__icon-btn admin-table__icon-btn--danger" aria-label={`Delete ${c.name}`} onClick={() => setPendingDelete(c)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="admin-table__empty">No customers match your search.</p>}
      </Reveal>

      {pendingDelete && (
        <ConfirmDialog
          title="Remove customer record"
          message={`Remove the purchase record for "${pendingDelete.name}"? This can't be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      {editing && (
        <Modal title={`Edit purchase — ${editing.name}`} onClose={() => setEditing(null)}>
          <form className="customers-page__form" onSubmit={handleSaveEdit}>
            <label>
              Total Purchases
              <input name="totalPurchases" type="number" min="0" defaultValue={editing.totalPurchases} required />
            </label>
            <label>
              Product Price ($)
              <input name="productPrice" type="number" min="0" defaultValue={editing.productPrice} required />
            </label>
            <label>
              Quantity
              <input name="quantity" type="number" min="0" defaultValue={editing.quantity} required />
            </label>
            <label>
              Discount (%)
              <input name="discount" type="number" min="0" max="100" defaultValue={editing.discount} />
            </label>
            <div className="customers-page__form-actions">
              <button type="button" className="btn btn-outline" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
