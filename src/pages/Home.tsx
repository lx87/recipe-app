import { useEffect, useState } from 'react';
import { getAllCategories } from '../core/queryManager';
import ItemsList from '../components/helpers/ItemsList';

interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

function Home() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getAllCategories().then((data) => {
            setCategories(data?.categories || []);
        });
    }, []);

    // Преобразуем категории в формат, ожидаемый ItemsList
    const items = categories.map(category => ({
        id: category.idCategory,
        title: category.strCategory,
        image: category.strCategoryThumb,
        description: category.strCategoryDescription
    }));

    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-center py-5">
            <ItemsList
                items={items}
                linkPath="/category"
            />
        </div>
    );
}

export default Home;