export const CategoryPage = () => {
    const category = location.pathname;

    return (
        <div
            style={{ padding: '300px 400px', fontSize: '24px' }}
        >{`${category.slice(1)} page`}</div>
    );
};
