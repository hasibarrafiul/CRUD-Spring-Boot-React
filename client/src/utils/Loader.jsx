export default function Loader() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-x-2 border-solid border-green-500 border-t-transparent bg-transparent shadow-md"></div>
            <div className="mt-4 animate-pulse text-center text-2xl font-semibold text-green-700">
                Please wait, we are loading your data...
            </div>
        </div>
    );
}
