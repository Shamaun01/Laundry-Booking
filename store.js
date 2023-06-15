import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import ProductReaducer from "./ProductReaducer";

export default configureStore({
  reducer: {
    cart: CartReducer,
    product: ProductReaducer,
  },
});
