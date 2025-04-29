import CardItem from "./CardItem";
import Preloader from "../Preloader";

interface Item {
    id: string;
    title: string;
    image: string;
    description?: string;
    linkPath: string;
}

interface ItemsListProps {
    items: Item[];
}

const ItemsList = ({ items }: ItemsListProps) => {
    if (items.length === 0) {
        return <Preloader />;
    }

    return (
        <div className="container-fluid p-0 m-0 list d-flex flex-wrap gap-3 justify-content-center">
            {items.map((item) => (
                <CardItem
                    key={item.id}
                    item={item}
                    linkPath={item.linkPath}
                />
            ))}
        </div>
    );
};

export default ItemsList;
