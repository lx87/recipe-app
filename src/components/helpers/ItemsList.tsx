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
    if (items.length === 0) {
        return <Preloader />;
    }

    const itemsToShow = filter
        ? items.filter(item =>
            item.title.toLowerCase().includes(filter.toLowerCase())
        )
        : items;

    return (
        <div className="container-fluid p-0 m-0 list d-flex flex-wrap gap-3 justify-content-center">
            {itemsToShow.map((item) => (
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
