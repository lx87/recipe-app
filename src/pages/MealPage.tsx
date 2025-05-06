import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../core/queryManager";
import Preloader from "../components/Preloader";
import { BreadcrumbPlus } from "../components/vistUI/BreadcrumbPlus";
import { Meal } from "../types/mealTypes";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';

const MealPage = () => {
    const { id } = useParams<{ id: string }>();
    const [meal, setMeal] = useState<Meal | null>(null);
    const [error, setError] = useState<boolean>(false);
    const mealName = id;

    useEffect(() => {
        if (mealName) {
            fetchData("mealByName", mealName)
                .then((data) => {
                    if (data.meals && data.meals.length > 0) {
                        setMeal(data.meals[0]);
                    } else {
                        setMeal(null);
                    }
                })
                .catch((error) => {
                    console.error("Ошибка при загрузке данных:", error);
                    setError(error);
                    setMeal(null);
                });
        }
    }, [mealName]);

    if (error) return <h1>{error}</h1>;
    if (!meal) return <Preloader />;

    return (
        <>
            <div className="container-fluid d-flex flex-column align-items-start text-start pt-3">
                <BreadcrumbPlus>
                    <BreadcrumbPlus.Item path="/">Home</BreadcrumbPlus.Item>
                    <BreadcrumbPlus.Item>Category</BreadcrumbPlus.Item>
                    <BreadcrumbPlus.Item>{`${meal.strCategory || "Unkown-category"}`}</BreadcrumbPlus.Item>
                </BreadcrumbPlus>
                <div className=" d-flex justify-content-between">
                    <div>
                        <Card style={{ width: '25vw' }}>
                            <Card.Img variant="top" src={meal.strMealThumb} alt={meal.strMeal} className=" w-100" />
                            <Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><h1 className="pb-3">{meal.strMeal}</h1></ListGroup.Item>
                                    <ListGroup.Item><strong>Category:</strong> {meal.strCategory}</ListGroup.Item>
                                    <ListGroup.Item><strong>Cuisine:</strong> {meal.strArea}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="ps-5">
                        <h1>Instructions:</h1>
                        <p>{meal.strInstructions}</p>
                        <h3 className="mt-3">Video:</h3>
                        <iframe src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`} className="iframe"></iframe>
                    </div>
                </div>
            </div >
        </>
    );
};

export default MealPage;
