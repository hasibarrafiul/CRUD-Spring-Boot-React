export default function FormateNumber({ number }) {
    return (
        <span
            className={`rounded-lg bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider ${
                number.slice(0, 3) === "015" && "bg-green-200 text-green-800"
            } ${
                number.slice(0, 3) === ("018" || "016") &&
                "bg-red-200 text-red-800"
            } ${
                number.slice(0, 3) === ("017" || "013") &&
                "bg-blue-200 text-blue-800"
            } ${
                number.slice(0, 3) === "019" && "bg-orange-200 text-orange-800"
            }`}
        >
            {number.toString().replace(/\B(?=(\d{6})+(?!\d))/g, "-")}
        </span>
    );
}
