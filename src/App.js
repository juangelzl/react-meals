import React, { useState } from "react";

import Header from "./Components/Layout/Header/Header";
import Meals from "./Components/Home/Meals/Meals";
import Cart from "./Components/Home/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);
  const onShowCart = () => {
    setShowCart(true);
  };
  const cartHandler = () => {
    setShowCart(false);
  };
  return (
    <CartProvider>
      {showCart && <Cart onClose={cartHandler}></Cart>}
      <Header onShowCart={onShowCart}></Header>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
