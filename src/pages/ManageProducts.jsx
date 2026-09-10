import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { downloadCsv } from "../utils/csv";
import ListPageHeader from "../components/common/ListPageHeader";
import ProductGridCard from "../components/products/ProductGridCard";
import ProductFormModal from "../components/products/ProductFormModal";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Reveal from "../components/common/Reveal";
import "./ManageProducts.css";

export default function ManageProducts() {
  // /products -> plain list. /products/new -> Add form open.
  // /products/edit/:productId -> Edit form open, pre-filled (a
  // shareable, deep-linkable URL for a specific edit).
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { products, addProduct, updateProduct, deleteProduct, getProductById } = useProducts();

  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  const isAdding = location.pathname === "/products/new";
  const editingProduct = productId ? getProductById(productId) : null;
  const modalOpen = isAdding || Boolean(editingProduct);

  useEffect(() => {
    document.title = "Manage Products | SHOP.CO Admin";
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [products, search]);

  const closeModal = () => navigate("/products");

  const handleSave = (data) => {
    if (editingProduct) updateProduct(editingProduct.id, data);
    else addProduct(data);
    closeModal();
  };

  const handleDelete = () => {
    deleteProduct(pendingDelete.id);
    setPendingDelete(null);
  };

  return (
    <div className="manage-products-page">
      <ListPageHeader
        title="Manage Products"
        breadcrumbItems={[{ label: "Products" }]}
        searchValue={search}
        onSearchChange={setSearch}
        onDownload={() => downloadCsv("products.csv", filtered.map(({ image: _image, ...rest }) => rest))}
        addLabel="Add Product"
        onAdd={() => navigate("/products/new")}
      />

      {filtered.length > 0 ? (
        <div className="manage-products-page__grid">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 12) * 40}>
              <ProductGridCard
                product={p}
                onEdit={() => navigate(`/products/edit/${p.id}`)}
                onDelete={() => setPendingDelete(p)}
              />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="admin-table__empty">No products match your search.</p>
      )}

      {modalOpen && (
        <Modal title={editingProduct ? `Edit — ${editingProduct.title}` : "Add Product"} onClose={closeModal}>
          <ProductFormModal product={editingProduct} onSave={handleSave} onCancel={closeModal} />
        </Modal>
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete product"
          message={`Delete "${pendingDelete.title}" from the catalog? This can't be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
