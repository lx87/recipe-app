import { API_URL } from "./constants";

const handleFetchError = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при получении данных');
    }
    return response.json();
}

const getAllCategories = async () => {
    try {
        const response = await fetch(API_URL + "categories.php");
        return await handleFetchError(response);
    } catch (error) {
        console.error("Ошибка при получении категорий:", error);
        throw error;
    }
}

const getMealById = async (mealid: string) => {
    try {
        const response = await fetch(API_URL + "lookup.php?i=" + mealid);
        return await handleFetchError(response);
    } catch (error) {
        console.error(`Ошибка при получении блюда с ID ${mealid}:`, error);
        throw error;
    }
}

const getFilteredCategory = async (catName: string) => {
    try {
        const response = await fetch(API_URL + "lookup.php?c=" + catName);
        return await handleFetchError(response);
    } catch (error) {
        console.error(`Ошибка при получении категории ${catName}:`, error);
        throw error;
    }
}

export { getAllCategories, getMealById, getFilteredCategory }
