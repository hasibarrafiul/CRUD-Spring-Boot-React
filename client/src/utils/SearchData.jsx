export default function SearchData({ items, query }) {
    const data = Object.values(items);
    const search_parameters = Object.keys(Object.assign({}, ...data));
    function search(items) {
        return items.filter((item) =>
            search_parameters.some((parameter) =>
                item[parameter].toString().toLowerCase().includes(query)
            )
        );
    }
    return {
        search: search,
    };
}
