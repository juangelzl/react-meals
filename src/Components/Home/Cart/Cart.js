import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import Modal from "../../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const CartCtx=useContext(CartContext)
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {CartCtx.cartItems.map((meal) => (
        <CartItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          price={meal.price}
          amount={meal.amount}
        ></CartItem>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{CartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
