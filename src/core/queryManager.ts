import { API_URL } from "./constants";

type Endpoint =
    | { type: "allCategories" }
    | { type: "mealsByCategory"; category: string }
    | { type: "mealByName"; name: string };

const handleFetchError = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при получении данных');
    }
    return response.json();
}

const buildUrl = (endpoint: Endpoint): string => {
    switch (endpoint.type) {
        case "allCategories":
            return `${API_URL}categories.php`;
        case "mealsByCategory":
            return `${API_URL}filter.php?c=${encodeURIComponent(endpoint.category)}`;
        case "mealByName":
            return `${API_URL}search.php?s=${encodeURIComponent(endpoint.name)}`;
        default:
            throw new Error("Error: Unknown query");
    }
}

const fetchData = async (endpoint: Endpoint): Promise<any> => {
    try {
        const url = buildUrl(endpoint);
        const response = await fetch(url);
        return await handleFetchError(response);
    } catch (error) {
        console.error(`Ошибка при запросе ${endpoint.type}:`, error);
        throw error;
    }
}

export { fetchData }