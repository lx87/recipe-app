import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../core/queryManager";
import Preloader from "../components/Preloader";
import BreadcrumbProvider from "../components/BreadcrumbProvider"
import { Meal } from "../types/mealTypes";

const MealPage = () => {
    const { id } = useParams<{ id: string }>();
    const [meal, setMeal] = useState<Meal | null>(null);
    const [error, setError] = useState<boolean>(false);
    const mealName = id

    useEffect(() => {
        if (mealName) {
            fetchData("mealByName", mealName)
                .then((data) => {
                    if (data.meals && data.meals.length > 0) {
                        setMeal(data.meals[0]);
                    } else {
                        setMeal(null);
                    }
                })
                .catch((error) => {
                    console.error("Ошибка при загрузке данных:", error);
                    setError(error)
                    setMeal(null);
                });
        }
    }, [mealName]);


    if (error) return <h1>{error}</h1>
    if (!meal) return <Preloader />;

    return (
        <div className="container-fluid d-flex flex-column align-items-start text-start">
            <BreadcrumbProvider
                items={[
                    { label: "Home", path: "/" },
                    { label: meal.strCategory, path: `/category/${meal.strCategory}` },
                    { label: "Recipe" }
                ]}
            />
            <h1>{meal.strMeal}</h1>
            {meal.strMealThumb && (
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="img-fluid mb-3"
                />
            )}
            <p>
                <strong>Category:</strong> {meal.strCategory}
            </p>
            <p>
                <strong>Cuisine:</strong> {meal.strArea}
            </p>
            <h3>Instructions:</h3>
            <p>{meal.strInstructions}</p>
        </div>
    );
};

export default MealPage;