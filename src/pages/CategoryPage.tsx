import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealsByCategory } from "../core/queryManager";
import ItemsList from "../components/helpers/ItemsList";
import BreadcrumbProvider from "../components/BreadcrumbProvider";
import SearchInput from "../components/helpers/SearchInput";

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

const CategoryPage = () => {
    const { name } = useParams<{ name: string }>();
    const [meals, setMeals] = useState<Meal[]>([]);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        if (!name) return;
        getMealsByCategory(name).then((data) => {
            setMeals(data.meals || []);
        });
    }, [name]);

    const mealsToShow = filter
        ? meals.filter(meal =>
            meal.strMeal.toLowerCase().includes(filter.toLowerCase())
        )
        : meals;

    return (
        <div className="container-fluid">
            <BreadcrumbProvider
                items={[
                    { label: "Home", path: "/" },
                    { label: "Category" },
                    { label: name || "Unknown-category" }
                ]}
            />
            <SearchInput placeholder="Search by name" onSearch={(value) => setFilter(value)} />
            <h1 className="text-capitalize">{name}</h1>
            <ItemsList
                items={mealsToShow.map((meal) => ({
                    id: meal.idMeal,
                    title: meal.strMeal,
                    image: meal.strMealThumb,
                    linkPath: `/meal/${meal.strMeal}`,
                }))}
                filter={filter}
            />
        </div>
    );
};

export default CategoryPage;
