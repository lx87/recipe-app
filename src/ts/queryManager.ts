interface Meal {
    meals: any;
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

const handleFetchError = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при получении данных');
    }
    return response.json();
}

const getAllCategories = async () => {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        return await handleFetchError(response);
    } catch (error) {
        console.error("Ошибка при получении категорий:", error);
        throw error;
    }
}

const getMealById = async (mealid: string): Promise<Meal> => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealid}`);
        return await handleFetchError(response);
    } catch (error) {
        console.error(`Ошибка при получении блюда с ID ${mealid}:`, error);
        throw error;
    }
}

const getMealsByCategory = async (catName: string) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`);
        return await handleFetchError(response);
    } catch (error) {
        console.error(`Ошибка при получении категории ${catName}:`, error);
        throw error;
    }
}

export { getAllCategories, getMealById, getMealsByCategory }
