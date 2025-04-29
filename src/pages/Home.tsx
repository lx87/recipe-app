import { useEffect, useState } from 'react';
import { getAllCategories } from '../core/queryManager';
import ItemsList from '../components/helpers/ItemsList';
import SearchInput from '../components/helpers/SearchInput';

interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

function Home() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        getAllCategories().then((data) => {
            setCategories(data.categories || []);
        });
    }, []);

    const items = categories.map(category => ({
        id: category.idCategory,
        title: category.strCategory,
        image: category.strCategoryThumb,
        description: category.strCategoryDescription,
        linkPath: `/category/${category.strCategory.toLowerCase()}`
    }));

    return (
        <div className="p-0 container-fluid d-flex flex-column align-items-center py-5">
            <SearchInput
                onSearch={(value) => { setSearch(value) }}
                placeholder="Search by category"
            />
            <ItemsList
                items={items}
                filter={search}
            />
        </div>
    );
}

export default Home;