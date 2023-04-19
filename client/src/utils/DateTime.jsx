export default function DateTime({ date, isDate = true, isTime = true }) {
    var clsName =
        "rounded-lg bg-opacity-50 text-xs font-medium uppercase tracking-wider";
    return (
        <div className="flex flex-col items-center justify-center space-y-1">
            {isTime && (
                <span className={`${clsName} bg-green-200 text-green-800`}>
                    {new Date(date).toLocaleString("en-US", {
                        timeZone: "Asia/Dhaka",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                    })}
                </span>
            )}
            {isDate && (
                <span className={`${clsName} bg-red-200 text-red-800`}>
                    {new Date(date).toLocaleString("en-GB", {
                        timeZone: "Asia/Dhaka",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </span>
            )}
        </div>
    );
}
