import { Link } from "react-router-dom";
import { BreadcrumbPlus } from "../components/vistUI/BreadcrumbPlus";
import Card from "react-bootstrap/Card";

function AboutPage() {
    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-start p-5">
            <BreadcrumbPlus>
                <BreadcrumbPlus.Item path="/">Home</BreadcrumbPlus.Item>
                <BreadcrumbPlus.Item>About</BreadcrumbPlus.Item>
            </BreadcrumbPlus>
            <h1 className="display-1 fw-semibold mt-2">About Us</h1>
            <h3 className="mt-2">
                Welcome to the recipe app — your reliable source of inspiration for culinary adventures! <br />
                We believe that great food brings people together, and cooking should be joyful.
                <br /> Our mission is to make cooking accessible, simple, and fun for everyone, from beginners to seasoned chefs.
            </h3>
            <h3 className="mt-4">What We Offer:</h3>
            <br />
            <div className="row">
                <div className="col-auto">
                    <Card>
                        <Card.Body>
                            <Card.Title className="fs-1">🍽</Card.Title>
                            <Card.Title>Trusted Recipes</Card.Title>
                            <Card.Text>only the best dishes that actually work</Card.Text>
                            <Card.Link as={Link} to={"/"}>Go to receipts</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-auto">
                    <Card>
                        <Card.Body>
                            <Card.Title className="fs-1">🌱</Card.Title>
                            <Card.Title>Diversity</Card.Title>
                            <Card.Text>from quick weekday dinners to festive masterpieces</Card.Text>
                            <Card.Link as={Link} to={"/"}>Go to receipts</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-auto">
                    <Card>
                        <Card.Body>
                            <Card.Title className="fs-1">🥗</Card.Title>
                            <Card.Title>For Every Lifestyle</Card.Title>
                            <Card.Text>vegetarian, vegan, low-carb, and other options</Card.Text>
                            <Card.Link as={Link} to={"/category/vegetarian"}>Go to vegan category</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-auto">
                    <Card>
                        <Card.Body>
                            <Card.Title className="fs-1">📝</Card.Title>
                            <Card.Title>Clear Instructions</Card.Title>
                            <Card.Text>step-by-step recipes with helpful tips</Card.Text>
                            <Card.Link as={Link} to={"/"}>Go to receipts</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
