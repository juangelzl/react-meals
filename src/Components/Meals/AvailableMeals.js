import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (mealsObj) => {
      const loadedMeals = [];
      for (const mealKey in mealsObj) {
        loadedMeals.push({
          id: mealKey,
          name: mealsObj[mealKey].name,
          description: mealsObj[mealKey].description,
          price: mealsObj[mealKey].price,
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals(
      {
        url: "",
      },
      transformMeals
    );
  }, [fetchMeals]);

  // if (meals) {
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  // }
  if (isLoading) {
    return <div className={classes.mealsLoading}><h3>Loading meals...</h3></div>;
  }
  if (error) {
    return <div className={classes.mealsError}><h3>{error}</h3></div>;
  }
  return (
    <section className={classes.meals}>
      <Card>
        {error && <div>{error}</div>}
        <ul>{mealsList && mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
