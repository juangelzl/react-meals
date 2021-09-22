import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import useHttp from "../../hooks/use-http";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const {
    isLoading: isSubmitting,
    error,
    sendRequest: sendMealRequest,
  } = useHttp();
  const [didSubmit, setDidSumbit] = useState(false);

  const createOrder = (mealsTotal, mealsList, mealData, data) => {
    const generatedId = mealData.name; // firebase-specific => "name" contains generated id
    const createdOrder = {
      id: generatedId,
      meals: mealsList,
      total: mealsTotal,
      customer: data,
    };

    // props.onAddMeal(createdTask);
    console.log(createdOrder);
  };

  const cartCtx = useContext(CartContext);
  

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const submitOrderHandler = (data) => {
    // const meals = cartCtx.items.map((item) => {
    //   return {
    //     // id: item.id,
    //     name: item.name,
    //     amount: item.amount,
    //     price: item.price,
    //   };
    // });
    const meals = cartCtx.items;
    const orderTotal = cartCtx.totalAmount.toFixed(2);

    sendMealRequest(
      {
        url: "",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { meals: meals, total: orderTotal, customer: data },
      },
      createOrder.bind(null, orderTotal, meals, data)
    );
    setDidSumbit(true);
    cartCtx.clearCart();
    setCheckout(false);
  };

  const validateOrder = () => {
    setCheckout(true);
  };
  const cancelHandler = () => {
    setCheckout(false);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={validateOrder}>
          Checkout
        </button>
      )}
    </div>
  );

  let cartContent = <p>Your Cart is Empty</p>;
  if (error) {
    cartContent = (
      <p>
        There has been an error... <br /> Please Try Again
      </p>
    );
  }
  if (hasItems) {
    cartContent = (
      <React.Fragment>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      </React.Fragment>
    );
  }

  const cartModalContent = (
    <React.Fragment>
      {cartContent}
      {checkout && (
        <Checkout onCancel={props.onClose} onSubmit={submitOrderHandler} />
      )}
      {!checkout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Order Placed Succesfully</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
