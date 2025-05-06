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

    const mealsToShow = filter ? meals.filter((meal) => meal.strMeal.toLowerCase().includes(filter.toLowerCase())) : meals;

    return (
        <>
            <div className="w-100 d-flex p-2 justify-content-between align-content-center bg-body-tertiary z-3">
                <BreadcrumbPlus className="mt-2 ps-2">
                    <BreadcrumbPlus.Item path="/">Home</BreadcrumbPlus.Item>
                    <BreadcrumbPlus.Item>Category</BreadcrumbPlus.Item>
                    <BreadcrumbPlus.Item>{`${name || "Unkown-category"}`}</BreadcrumbPlus.Item>
                </BreadcrumbPlus>
                <SearchInput placeholder="Search by name" onSearch={(value) => setFilter(value)} />
            </div>
            <div className="container-fluid d-flex flex-column overflow-auto">
                <div className="d-flex align-items-center justify-content-center ayam-percik py-5">
                    <h1 className="text-capitalize align-self-center display-1 fw-medium custom-shadow py-5">{name}</h1>
                </div>
                <div className="p-0 container-fluid d-flex flex-column py-3 align-items-center gap-3">
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
            </div>
        </>
    );
};

export default CategoryPage;
