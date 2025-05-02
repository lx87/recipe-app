import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../core/queryManager";
import ItemsList from "../components/shared/ItemsList";
import SearchInput from "../components/shared/SearchInput";
import { MealPreview } from "../types/mealTypes";
import { BreadcrumbPlus } from "../components/vistUI/BreadcrumbPlus";

const CategoryPage = () => {
    const { name } = useParams<{ name: string }>();
    const [meals, setMeals] = useState<MealPreview[]>([]);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        if (!name) return;
        fetchData("mealsByCategory", name).then((data) => {
            setMeals(data.meals || []);
        });
    }, [name]);

    const mealsToShow = filter
        ? meals.filter(meal =>
            meal.strMeal.toLowerCase().includes(filter.toLowerCase())
        )
        : meals;

    return (
        <div className="container-fluid d-flex flex-column overflow-auto">
            <div className="w-100 d-flex  justify-content-between align-content-center bg-body-tertiary z-3">
                <BreadcrumbPlus>
                    <BreadcrumbPlus.Item label="Home" path="/" />
                    <BreadcrumbPlus.Item label="Category" />
                    <BreadcrumbPlus.Item label={`${name || "Unkown-category"}`} />
                </BreadcrumbPlus>
                <SearchInput placeholder="Search by name" onSearch={(value) => setFilter(value)} />
            </div>
            <h1 className="text-capitalize align-self-start">{name}</h1>
            <div className="p-0 container-fluid d-flex flex-column py-3 align-items-center gap-3">
                <ItemsList
                    items={mealsToShow.map((meal) => ({
                        id: meal.idMeal,
                        title: meal.strMeal,
                        image: meal.strMealThumb,
                        linkPath: `/meal/${meal.strMeal}`,
                    }))}
                    filter={filter} />
            </div>
        </div>
    );
};

export default CategoryPage;
