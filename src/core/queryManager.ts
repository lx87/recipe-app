import { API_URL } from "./constants";
import { CategoriesResponse, MealsPreviewResponse, MealsResponse } from "../types/mealTypes";

type FetchParams =
    | ["allCategories"]
    | ["mealsByCategory", string]
    | ["mealByName", string];

const buildUrl = (...params: FetchParams): string => {
    switch (params[0]) {
        case "allCategories":
            return `${API_URL}categories.php`;
        case "mealsByCategory":
            return `${API_URL}filter.php?c=${encodeURIComponent(params[1])}`;
        case "mealByName":
            return `${API_URL}search.php?s=${encodeURIComponent(params[1])}`;
    }
};

// Перегрузки
function fetchData(...params: ["allCategories"]): Promise<CategoriesResponse>;
function fetchData(...params: ["mealsByCategory", string]): Promise<MealsPreviewResponse>;
function fetchData(...params: ["mealByName", string]): Promise<MealsResponse>;

async function fetchData(...params: FetchParams): Promise<any> {
    try {
        const url = buildUrl(...params);
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Ошибка при получении данных");
        }
        return await response.json();
    } catch (error) {
        console.error(`Ошибка при запросе ${params[0]}:`, error);
        throw error;
    }
}

export { fetchData };
