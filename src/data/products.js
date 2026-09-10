// Same catalog family as the SHOP.CO storefront, extended with the
// stock/sales fields an admin panel actually needs (quantity in stock,
// units sold, revenue). Treat this as "the 13 products already added
// to the store" that the admin is now managing.
const img = (name) => `/images/products/${name}.svg`;

export const INITIAL_PRODUCTS = [
  { id: "tshirt-tape-details", title: "T-shirt with Tape Details", category: "T-shirts", price: 120, discount: 0, quantity: 48, unitsSold: 86, rating: 4.5, image: img("tshirt-tape-details") },
  { id: "skinny-fit-jeans", title: "Skinny Fit Jeans", category: "Jeans", price: 240, discount: 20, quantity: 32, unitsSold: 132, rating: 3.5, image: img("skinny-fit-jeans") },
  { id: "checkered-shirt", title: "Checkered Shirt", category: "Shirts", price: 180, discount: 0, quantity: 27, unitsSold: 74, rating: 4.5, image: img("checkered-shirt") },
  { id: "sleeve-striped-tshirt", title: "Sleeve Striped T-shirt", category: "T-shirts", price: 130, discount: 30, quantity: 40, unitsSold: 61, rating: 4.5, image: img("sleeve-striped-tshirt") },
  { id: "vertical-striped-shirt", title: "Vertical Striped Shirt", category: "Shirts", price: 212, discount: 20, quantity: 18, unitsSold: 148, rating: 5.0, image: img("vertical-striped-shirt") },
  { id: "courage-graphic-tshirt", title: "Courage Graphic T-shirt", category: "T-shirts", price: 145, discount: 0, quantity: 51, unitsSold: 53, rating: 4.0, image: img("courage-graphic-tshirt") },
  { id: "loose-fit-bermuda-shorts", title: "Loose Fit Bermuda Shorts", category: "Shorts", price: 80, discount: 0, quantity: 65, unitsSold: 29, rating: 3.0, image: img("loose-fit-bermuda-shorts") },
  { id: "faded-skinny-jeans", title: "Faded Skinny Jeans", category: "Jeans", price: 210, discount: 0, quantity: 22, unitsSold: 97, rating: 4.5, image: img("faded-skinny-jeans") },
  { id: "one-life-graphic-tshirt", title: "One Life Graphic T-shirt", category: "T-shirts", price: 260, discount: 40, quantity: 60, unitsSold: 451, rating: 4.5, image: img("one-life-graphic-tshirt") },
  { id: "polo-contrast-trims", title: "Polo with Contrast Trims", category: "Polo", price: 212, discount: 20, quantity: 15, unitsSold: 44, rating: 4.0, image: img("polo-contrast-trims") },
  { id: "gradient-graphic-tshirt", title: "Gradient Graphic T-shirt", category: "T-shirts", price: 145, discount: 0, quantity: 38, unitsSold: 38, rating: 3.5, image: img("gradient-graphic-tshirt") },
  { id: "polo-tipping-details", title: "Polo with Tipping Details", category: "Polo", price: 180, discount: 0, quantity: 29, unitsSold: 67, rating: 4.5, image: img("polo-tipping-details") },
  { id: "black-striped-tshirt", title: "Black Striped T-shirt", category: "T-shirts", price: 120, discount: 30, quantity: 44, unitsSold: 112, rating: 5.0, image: img("black-striped-tshirt") },
];

export const CATEGORIES = ["T-shirts", "Shirts", "Jeans", "Shorts", "Polo"];
export const PLACEHOLDER_IMAGE = img("classic-tee");
