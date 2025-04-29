import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealsByCategory } from "../core/queryManager";
import ItemsList from "../components/helpers/ItemsList";
import Preloader from "../components/Preloader";
import BreadcrumbProvider from "../components/BreadcrumbProvider";

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

const CategoryPage = () => {
    const { name } = useParams<{ name: string }>();
    const [meals, setMeals] = useState<Meal[] | null>(null);

    useEffect(() => {
        if (!name) return;

        getMealsByCategory(name).then((data) => {
            setMeals(data?.meals || []);
        });
    }, [name]);

    if (!name || meals === null) return <Preloader />;

    return (
        <div className="container-fluid">
            <BreadcrumbProvider
                items={[
                    { label: "Home", path: "/" },
                    { label: "Category" },
                    { label: name}
                ]}
            />
            <h1 className="text-capitalize">{name}</h1>
            <ItemsList
                items={meals.map((meal) => ({
                    id: meal.idMeal,
                    title: meal.strMeal,
                    image: meal.strMealThumb,
                    linkPath: `/meal/${meal.strMeal}`,
                }))}
            />
        </div>
    );
};

export default CategoryPage;
