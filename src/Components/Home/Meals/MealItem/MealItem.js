import { useContext } from "react";
import CartContext from "../../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const CartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    CartCtx.AddItem({...props,amount:amount});
  };
  return (
    <div className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{props.price}</div>
      </div>
      <MealItemForm onAddToCart={addToCartHandler} />
    </div>
  );
};

export default MealItem;