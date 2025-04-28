import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getMealById } from "../core/queryManager";
import Preloader from "../components/Preloader";

interface MealData {
    strMeal: string;
    strInstructions: string;
    strCategory: string;
    strArea: string;
    strMealThumb?: string;
}

const MealPage = () => {
    const location = useLocation();
    const mealID = location.state?.title || "";
    const [meal, setMeal] = useState<MealData | null>(null);

    useEffect(() => {
        if (mealID) {
            getMealById(mealID).then((data) => {
                setMeal(data?.meals[0] || null);
            });
        }
    }, [mealID]);

    if (!meal) return <Preloader />;

    return (
        <div className="container">
            <h1>{meal.strMeal}</h1>
            {meal.strMealThumb && (
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="img-fluid mb-3"
                />
            )}
            <p>
                <strong>Category:</strong>
                {meal.strCategory}
            </p>
            <p>
                <strong>Cuisine:</strong>
                {meal.strArea}
            </p>
            <div className="mt-4">
                <h3>Instructions:</h3>
                <p>{meal.strInstructions}</p>
            </div>
        </div>
    );
}

export default MealPage;