export function getOrderStatus(status) {
    switch (status) {
        case "PLACED":
            return (
                <span className="rounded-md bg-sky-100 py-1 px-2 text-xs capitalize text-sky-600">
                    {status.replaceAll("_", " ").toLowerCase()}
                </span>
            );
        case "CONFIRMED":
            return (
                <span className="rounded-md bg-orange-100 py-1 px-2 text-xs capitalize text-orange-600">
                    {status.replaceAll("_", " ").toLowerCase()}
                </span>
            );
        case "SHIPPED":
            return (
                <span className="rounded-md bg-teal-100 py-1 px-2 text-xs capitalize text-teal-600">
                    {status.replaceAll("_", " ").toLowerCase()}
                </span>
            );
        case "OUT_FOR_DELIVERY":
            return (
                <span className="rounded-md bg-yellow-100 py-1 px-2 text-xs capitalize text-yellow-600">
                    {status.replaceAll("_", " ").toLowerCase()}
                </span>
            );
        case "DELIVERED":
            return (
                <span className="rounded-md bg-green-100 py-1 px-2 text-xs capitalize text-green-600">
                    {status.replaceAll("_", " ").toLowerCase()}
                </span>
            );
        default:
            return (
                <span className="rounded-md bg-gray-100 py-1 px-2 text-xs capitalize text-gray-600">
                    {status.replaceAll("_", " ").toLowerCase()}
                </span>
            );
    }
}
