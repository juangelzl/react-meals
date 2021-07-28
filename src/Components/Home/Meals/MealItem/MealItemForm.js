import React, { useState } from "react";
// import CartContext from "../../../../store/cart-context";
import Input from "../../../UI/Input";
import classes from "./MealItemForm.module.css";
import { useRef } from "react";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsVaid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsVaid(false);
      return;
    }
    setAmountIsVaid(true);
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          defaultValue: 1,
          type: "number",
          min: 1,
          max: 5,
        }}
      ></Input>
      <br></br>
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
