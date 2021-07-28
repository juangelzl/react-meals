import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-context";
import CartIcon from "../../Extras/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [bump, setBump] = useState(false);
  const btnClasses = `${classes.button} ${bump ? classes.bump : ""}`;

  const { cartItems } = cartCtx;
  // console.log(cartItems)

  useEffect(() => {
    if (cartItems.length === 0) {
      return;
    }
    setBump(true);
    const timer = setTimeout(() => {
      setBump(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartItems]);

  let numberOfCartItems = 0;
  if (cartCtx.cartItems.length > 0) {
    numberOfCartItems = cartItems.reduce((sum, item) => {
      return +sum + item.amount;
    }, 0);
  }

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
