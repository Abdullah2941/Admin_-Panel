import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { PLACEHOLDER_IMAGE, CATEGORIES } from "../../data/products";
import "./ProductFormModal.css";

/**
 * One form, two jobs: passing `product` renders it pre-filled for
 * editing; leaving it out renders a blank "Add Product" form. Both
 * pages just call the same `onSave(data)` callback.
 */
export default function ProductFormModal({ product, onSave, onCancel }) {
  const [image, setImage] = useState(product?.image || "");
  const [title, setTitle] = useState(product?.title || "");
  const [category, setCategory] = useState(product?.category || CATEGORIES[0]);
  const [quantity, setQuantity] = useState(product?.quantity ?? "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [discount, setDiscount] = useState(product?.discount ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      image: image.trim() || PLACEHOLDER_IMAGE,
      title: title.trim(),
      category,
      quantity: Number(quantity) || 0,
      price: Number(price) || 0,
      discount: Number(discount) || 0,
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="product-form__image-row">
        <div className="product-form__preview">
          {image ? <img src={image} alt="" /> : <ImagePlus size={26} />}
        </div>
        <label className="product-form__field product-form__field--grow">
          Image URL
          <input
            type="text"
            placeholder="/images/products/your-image.svg or https://..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
      </div>

      <label className="product-form__field">
        Title
        <input type="text" required placeholder="e.g. Oversized Denim Jacket" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <label className="product-form__field">
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <div className="product-form__row">
        <label className="product-form__field">
          Quantity in stock
          <input type="number" min="0" required value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <label className="product-form__field">
          Price ($)
          <input type="number" min="0" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
      </div>

      <label className="product-form__field">
        Discount % <span className="product-form__optional">(optional)</span>
        <input type="number" min="0" max="90" placeholder="0" value={discount} onChange={(e) => setDiscount(e.target.value)} />
      </label>

      <div className="product-form__actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  );
}
