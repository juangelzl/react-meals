import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `${props.price.toFixed(2)}`;
  const CartCtx = useContext(CartContext);
  const minusAmountHandler = () => {
    CartCtx.RemoveItem(props.id);
    return true;
  };
  
  const plusAmountHandler = () => {
    CartCtx.AddItem({...props,amount:1});
    return true;
  };
  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={minusAmountHandler}>−</button>
        <button onClick={plusAmountHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
