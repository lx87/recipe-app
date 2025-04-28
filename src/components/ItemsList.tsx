import CardItem from "./cardItem";
import Preloader from "./Preloader";

interface ItemsListProps<T> {
    items: T[];
    linkPath: string;
}

const ItemsList = <T extends { id: string; title: string; image: string; description?: string; }>
    ({ items, linkPath }: ItemsListProps<T>) => {

    if (items.length === 0) {
        return <Preloader />;
    }

    return (
        <div className="container-fluid p-0 m-0 list">
            {items.map((item) => (
                <CardItem
                    key={item.id}
                    item={{
                        id: item.id,
                        title: item.title,
                        image: item.image,
                        description: item.description
                    }}
                    linkPath={linkPath}
                />
            ))}
        </div>
    );
};

export default ItemsList;