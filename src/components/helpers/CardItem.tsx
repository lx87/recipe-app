import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

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

    const handleNavigate = () => {
        navigate(linkPath);
    };
    
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                {item.description && (
                    <Card.Text>
                        {item.description.slice(0, 60)}
                    </Card.Text>
                )}
                <Button variant="primary" onClick={handleNavigate}>
                    View details
                </Button>
            </Card.Body>
        </Card>
    );
};

export default CardItem;