import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealByName } from "../core/queryManager";
import Preloader from "../components/Preloader";
import BreadcrumbProvider from "../components/BreadcrumbProvider"

interface MealData {
    strMeal: string;
    strInstructions: string;
    strCategory: string;
    strArea: string;
    strMealThumb?: string;
}

const MealPage = () => {
    const { id } = useParams<{ id: string }>();
    const [meal, setMeal] = useState<MealData | null>(null);

    useEffect(() => {
        if (id) {
            getMealByName(id).then((data) => {
                setMeal(data?.meals[0] || null);
            });
        }
    }, [id]);

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