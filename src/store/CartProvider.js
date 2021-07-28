import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existenteId = state.items.findIndex(
      (cItem) => action.item.id === cItem.id
    );
    const existente = state.items[existenteId];
    let updatedItems;
    if (existente) {
      updatedItems = state.items.slice();
      const updatedItem = {
        ...existente,
        amount: action.item.amount + existente.amount,
      };
      updatedItems[existenteId] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existenteId = state.items.findIndex(
      (cItem) => action.id === cItem.id
    );
    const existente = state.items[existenteId];
    const updatedTotalAmount = state.totalAmount - existente.price;
    let newItems = state.items.slice();
    if (existente.amount > 1) {
      existente.amount -= 1;
      newItems[existenteId] = existente;
      // const newTotalAmount = state.totalAmount - action.item.price;
    } else {
      newItems = state.items.filter((cItem) => cItem.id !== action.id);
    }
    return {
      items: newItems,
      totalAmount: updatedTotalAmount > 0 ? updatedTotalAmount : 0,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (newItem) => {
    dispatchCartAction({ type: "ADD_ITEM", item: newItem });

    // cartItems.push(newItem);
    // setCartItems(cartItems);
    // totalAmountHandler();
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
    // setCartItems(
    //   cartItems.filter((item) => {
    //     return item.id !== id;
    //   })
    // );
    // totalAmountHandler();
  };

  // const totalAmountHandler = () => {
  //   cartItems.forEach((item) =>
  //     setTotalAmount(totalAmount + item.amount * item.price)
  //   );
  // };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState.items,
        totalAmount: cartState.totalAmount,
        AddItem: addItemHandler,
        RemoveItem: removeItemHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
