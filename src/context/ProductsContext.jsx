import { createContext, useEffect, useReducer } from "react";
import { INITIAL_PRODUCTS, PLACEHOLDER_IMAGE } from "../data/products";
import { genId } from "../utils/format";

export const ProductsContext = createContext(null);
const STORAGE_KEY = "shopco-admin-products-v1";

function loadInitial() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload, id: action.payload.id || genId(), unitsSold: 0, rating: 0 }, ...state];
    case "UPDATE":
      return state.map((p) => (p.id === action.payload.id ? { ...p, ...action.payload } : p));
    case "DELETE":
      return state.filter((p) => p.id !== action.payload);
    default:
      return state;
  }
}

export function ProductsProvider({ children }) {
  const [products, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch { /* storage unavailable, edits just won't persist */ }
  }, [products]);

  const addProduct = (data) => dispatch({ type: "ADD", payload: { image: PLACEHOLDER_IMAGE, ...data } });
  const updateProduct = (id, data) => dispatch({ type: "UPDATE", payload: { id, ...data } });
  const deleteProduct = (id) => dispatch({ type: "DELETE", payload: id });
  const getProductById = (id) => products.find((p) => p.id === id);

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById }}>
      {children}
    </ProductsContext.Provider>
  );
}
