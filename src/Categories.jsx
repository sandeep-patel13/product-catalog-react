const Categories = ({ categories, onSelect }) => {
    return (
        <>
            <select
                name="categorySelect"
                className="form-control"
                onChange={(e) => onSelect(e.target.value)}>
                <option value="">All Categories</option>
                {
                    categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>

        </>
    )
}

export default Categories;