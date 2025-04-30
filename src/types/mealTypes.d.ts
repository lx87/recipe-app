/* object typing */

export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface MealPreview {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

export interface Meal extends MealPreview {
    strCategory: string;
    strArea: string;
    strInstructions: string;
    [key: string]: any;
}

/* query responce typing */

export interface CategoriesResponse {
    categories: Category[];
}

export interface MealsResponse {
    meals: Meal[];
}

export interface MealsPreviewResponse {
    meals: MealPreview[];
}