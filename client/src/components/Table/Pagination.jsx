const Pagination = ({ rowsCount, pageSize = 1, setCursorPos, cursorPos }) => {
    let maxPages = Math.ceil(rowsCount / pageSize);
    let items = [];
    let leftSide = cursorPos - 2;
    if (leftSide <= 0) leftSide = 1;
    let rightSide = cursorPos + 2;
    if (rightSide > maxPages) rightSide = maxPages;
    var clsName =
        "mx-2 my-2 flex cursor-pointer items-center justify-left space-x-2 rounded-lg px-4 py-1 font-semibold shadow-lg hover:bg-green-600 text-md transition duration-500 ease-in-out";
    for (let number = leftSide; number <= rightSide; number++) {
        items.push(
            <div
                key={number}
                className={`${clsName} ${
                    number === cursorPos
                        ? "bg-green-600 text-white hover:text-white"
                        : "bg-green-200 text-black hover:text-white"
                }`}
                onClick={() => {
                    setCursorPos(number);
                }}
            >
                {number}
            </div>
        );
    }
    const nextPage = () => {
        if (cursorPos < maxPages) {
            setCursorPos(cursorPos + 1);
        }
    };

    const prevPage = () => {
        if (cursorPos > 1) {
            setCursorPos(cursorPos - 1);
        }
    };

    const paginationRender = (
        <div className="justify-left flex items-center">
            <div className="flex select-none">
                <div
                    className={`${clsName} bg-green-200 text-black hover:text-white`}
                    onClick={prevPage}
                >
                    &lsaquo;
                </div>
                {items}
                <div
                    className={`${clsName} bg-green-200 text-black hover:text-white`}
                    onClick={nextPage}
                >
                    &rsaquo;
                </div>
            </div>
        </div>
    );
    return paginationRender;
};

export default Pagination;
