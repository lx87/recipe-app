import { useEffect, useState } from "react";
import { getMealsByCategory } from "../core/queryManager";
import { useLocation } from "react-router";
import ItemsList from "../components/helpers/ItemsList";
import Preloader from "../components/Preloader";

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

const CategoryPage = () => {
    const location = useLocation();
    const [meals, setMeals] = useState<Meal[]>([]);
    const categoryName = location.state?.title || "";

    useEffect(() => {
        if (categoryName) {
            getMealsByCategory(categoryName).then((data) => {
                setMeals(data?.meals || []);
            });
        }
    }, [categoryName]);

    if (!meals) return <Preloader />;
    return (
        <div className="container-fluid">
            <h1>{categoryName}</h1>
            <ItemsList
                items={meals.map(meal => ({
                    id: meal.idMeal,
                    title: meal.strMeal,
                    image: meal.strMealThumb
                }))}
                linkPath="/meal"
            />
        </div>
    );
};

export default CategoryPage;