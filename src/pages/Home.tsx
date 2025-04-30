import { useEffect, useState } from 'react';
import { fetchData } from '../core/queryManager';
import ItemsList from '../components/shared/ItemsList';
import SearchInput from '../components/shared/SearchInput';
import { Category } from '../types/mealTypes';

function Home() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        fetchData("allCategories").then((data) => {
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