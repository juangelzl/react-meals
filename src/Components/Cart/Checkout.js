import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const isEmpty = (val) => val.trim() === "";
  const isFiveChars = (val) => val.trim().length === 5;
  const nameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const checkoutHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const city = cityRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const cityIsValid = !isEmpty(city);
    const postalCodeIsValid = isFiveChars(postalCode) && !isEmpty(postalCode);

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    props.onSubmit({
      name: name,
      street: street,
      city: city,
      postalCode: postalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;

  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={checkoutHandler}>
      <div className={nameControlClasses}>
        <label className={classes.label}>Your Name</label>
        <input className={classes.input} name="name" ref={nameRef}></input>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label className={classes.label}>Street</label>
        <input className={classes.input} name="street" ref={streetRef}></input>
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label className={classes.label}>Postal Code</label>
        <input
          className={classes.input}
          name="postalCode"
          ref={postalCodeRef}
        ></input>
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid Postal Code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label className={classes.label}>City</label>
        <input className={classes.input} name="city" ref={cityRef}></input>
        {!formInputsValidity.city && <p>Please enter a valid name!</p>}
      </div>
      <div className={classes.actions}>
        <button
          className={classes.button}
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button className={`${classes.button} ${classes.submit}`}>Complete Order</button>
      </div>
    </form>
  );
};

export default Checkout;
