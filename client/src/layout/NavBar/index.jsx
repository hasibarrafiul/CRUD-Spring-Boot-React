import { useState } from "react";
import Logo from "../../assets/img/logo.svg";
import "./index.css";

export default function Index() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navList = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Shop",
            link: "/shop",
        },
        {
            name: "Product",
            link: "/product",
        },
        {
            name: "Test",
            link: "/test",
        },
    ];
    var hidden = "hidden";

    if (navbarOpen) {
        hidden = "transition transform ease-in";
    } else {
        hidden = "hidden transform transition ease-out";
    }

    return (
        <nav className=" z-50 flex w-full flex-wrap items-center justify-between bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 p-2">
            <a
                href="/"
                className="mr-6 flex flex-shrink-0 items-center text-white"
            >
                <div>
                    <img src={Logo} alt="Think and Get Logo" className="w-10" />
                </div>
                <span className="text-xl font-semibold tracking-tight">
                    Think & Get
                </span>
            </a>
            <div className="block lg:hidden">
                <button
                    onClick={() => setNavbarOpen(!navbarOpen)}
                    className="flex items-center rounded-md border-2 border-white px-3 py-2 text-white transition duration-300 ease-in-out hover:border-white hover:text-white"
                >
                    <svg
                        className="h-3 w-3 animate-bounce fill-current transition duration-500 ease-in-out hover:text-white"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div
                className={`block w-full flex-grow lg:flex lg:w-auto lg:items-center ${hidden}`}
            >
                <div className="text-md justify-center font-semibold lg:flex-grow">
                    {navList.map((item, index) => (
                        <a
                            key={index}
                            className={
                                item.link === window.location.pathname
                                    ? "nav-link nav-link-ltr mt-4 mr-4 block border-collapse text-white hover:text-white lg:mt-0 lg:inline-block "
                                    : "nav-link nav-link-ltr mt-4 mr-4 block text-white opacity-50 hover:text-white lg:mt-0 lg:inline-block"
                            }
                            href={item.link}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                <div>
                    <a
                        href="/login"
                        className="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white transition duration-500 ease-in-out hover:border-transparent hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 lg:mt-0"
                    >
                        Login
                    </a>
                </div>
            </div>
        </nav>
    );
}
