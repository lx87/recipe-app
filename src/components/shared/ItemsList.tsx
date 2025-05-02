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
    filter?: string
}

const ItemsList = ({ items, filter }: ItemsListProps) => {
    if (items.length === 0 && !filter) {
        return <Preloader />;
    }

    const itemsToShow = filter
        ? items.filter(item =>
            item.title.toLowerCase().includes(filter.toLowerCase())
        )
        : items;

    return (
        <div className="grid-container">
            {itemsToShow.map((item) => (
                <CardItem
                    key={item.id}
                    item={item}
                    linkPath={item.linkPath}
                />
            ))}
            {itemsToShow.length === 0 && <p>No meals found</p>}
        </div>
    );
};

export default ItemsList;
