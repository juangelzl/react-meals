import classes from "./AvailableMeals.module.css";
import React from "react";
import MealItem from "../MealItem/MealItem";
import DUMMY_MEALS from "../../../Extras/dummy-meals";
import Card from "../../../UI/Card/Card";

const AvailableMeals = () => {
  return (
    <Card className={classes.meals}>
      <ul>
        {DUMMY_MEALS.map((meal) => (
          <li key={meal.id}>
            <MealItem
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default AvailableMeals;
