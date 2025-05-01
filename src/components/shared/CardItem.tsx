import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

interface CardItemProps {
    item: {
        id: string;
        title: string;
        image: string;
        description?: string;
    };
    linkPath: string;
}

const CardItem = ({ item, linkPath }: CardItemProps) => {
    const navigate = useNavigate();

    const handleNavigate = (): void => {
        navigate(linkPath);
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" className="p-3 rounded-3" src={item.image} />
            <hr className="m-0" />
            <Card.Body>
                <Card.Title>{item.title.slice(0, 24)}</Card.Title>
                {item.description ? (
                    <Card.Text>
                        {item.description.slice(0, 60)}
                    </Card.Text>
                ) : <Card.Text>{"#"}{item.id}</Card.Text>}
            </Card.Body>
            <Card.Footer className="p-3">
                <Button variant="primary" onClick={handleNavigate}>
                    View details
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default CardItem;