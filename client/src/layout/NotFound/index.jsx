export default function Index() {
    return (
        <section className="flex items-center p-16">
            <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 text-9xl font-extrabold text-red-600">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">
                        Sorry, we couldn't find this page.
                    </p>
                    <p className="mt-4 mb-8">
                        But don't worry, you can find plenty of other things on
                        our homepage.
                    </p>
                    <button
                        className="rounded-full bg-green-600 px-6 py-2 uppercase text-white transition-all duration-500 ease-in-out hover:bg-green-700"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </section>
    );
}
