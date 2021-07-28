import React from "react";
import AvailableMeals from "./MealsList/AvailableMeals";
import MealsSummary from "./MealsList/MealsSummary";

const Meals = () => {
  return (
    <React.Fragment>
      <MealsSummary />
      <AvailableMeals />
    </React.Fragment>
  );
};

export default Meals;
