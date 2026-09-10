import { Routes, Route, Navigate } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import ProductSales from "./pages/ProductSales";
import ManageProducts from "./pages/ManageProducts";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ProductsProvider>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/product-sales" element={<ProductSales />} />
          <Route path="/products" element={<ManageProducts />} />
          <Route path="/products/new" element={<ManageProducts />} />
          <Route path="/products/edit/:productId" element={<ManageProducts />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/404" element={<Navigate to="/" replace />} />
      </Routes>
    </ProductsProvider>
  );
}
