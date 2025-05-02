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
        <div className="row gap-5">
            <div className="row">
                {itemsToShow.map((item) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <CardItem
                            key={item.id}
                            item={item}
                            linkPath={item.linkPath}
                        />
                    </div>
                ))}
                {itemsToShow.length === 0 && <p>No meals found</p>}
            </div>
        </div>
    );
};

export default ItemsList;
