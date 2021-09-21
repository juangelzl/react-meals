import { useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import useHttp from "../../hooks/use-http";
import { ReactFragment } from "react";

const Cart = (props) => {
  const { isLoading, error, sendRequest: sendMealRequest } = useHttp();

  const createOrder = (mealsTotal, mealsList, mealData) => {
    const generatedId = mealData.name; // firebase-specific => "name" contains generated id
    const createdOrder = {
      id: generatedId,
      meals: mealsList,
      total: mealsTotal,
    };

    // props.onAddMeal(createdTask);
    console.log(createdOrder);
  };

  const cartCtx = useContext(CartContext);
  const clearCart = () => {
    cartCtx.clearCart();
  };

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

  const submitOrderHandler = () => {
    const meals = cartCtx.items.map((item) => {
      return {
        // id: item.id,
        name: item.name,
        amount: item.amount,
        price: item.price,
      };
    });
    const orderTotal = cartCtx.totalAmount.toFixed(2);

    sendMealRequest(
      {
        url: "",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { meals: meals, total: orderTotal },
      },
      createOrder.bind(null, orderTotal, meals)
    );
    clearCart();
  };

  let cartContent = <p>Your Cart is Empty</p>;
  if (isLoading) {
    cartContent = (
      <p>
        Placing order... <br /> Please Wait
      </p>
    );
  }
  if (error) {
    cartContent = (
      <p>
        There has been an error... <br /> Please Try Again
      </p>
    );
  }
  if (hasItems) {
    cartContent = (
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      </div>
    );
  }

  return (
    <Modal onClose={props.onClose}>
      {cartContent}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={submitOrderHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
