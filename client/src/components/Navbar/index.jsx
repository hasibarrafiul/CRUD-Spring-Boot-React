import { useAuth } from "../../hooks/auth";
import { DefineRole } from "../../hooks/routes";
import shipLogo from "../../assets/img/shipLogo.svg";

const NavLinks = [
    {
        id: 1,
        link: "/adminpanel",
        name: "Admin Panel",
        role: ["admin"],
    },
    {
        id: 2,
        link: "/recordentry",
        name: "Record Entry",
        role: ["admin", "operations"],
    },
    {
        id: 3,
        link: "/currentstatus",
        name: "Current Status (Others)",
        role: ["admin", "operations"],
    },
    {
        id: 5,
        link: "/damaragecalculation",
        name: "Damarage Calculation",
        role: ["admin", "operations"],
    },
    {
        id: 6,
        link: "/predefinedship",
        name: "Current Status (Own)",
        role: ["admin", "operations"],
    },
    {
        id: 7,
        link: "/predefinedadmin",
        name: "Add LV",
        role: ["admin"],
    },
    {
        id: 8,
        link: "/chqduelist",
        name: "Chq Due List",
        role: ["admin", "accounts-manager"],
    },
    {
        id: 9,
        link: "/chqapproval",
        name: "Chq Approval",
        role: ["admin", "accounts-manager"],
    },
    {
        id: 10,
        link: "/payment",
        name: "Payment",
        role: ["admin", "accounts-manager"],
    },
    {
        id: 11,
        link: "/jobentry",
        name: "Job Entry",
        role: ["admin", "accounts"],
    },
];

function Nav() {
    const { logout } = useAuth();
    const { original_role } = DefineRole();

    return (
        <div
            className={`flex flex-wrap place-items-center ${
                (window.location.pathname === "/login" ||
                    window.location.pathname === "/") &&
                "hidden"
            } `}
        >
            <section className="relative mx-auto">
                <nav className="flex justify-between rounded-b-md bg-green-700 text-white">
                    <div className="flex w-full items-center px-5 py-2 xl:px-8">
                        <a
                            className="font-heading flex items-center justify-center text-2xl font-bold"
                            href="/"
                        >
                            <img
                                className="mr-1 h-10 w-10 text-white"
                                src={shipLogo}
                                alt="KEL-BD"
                            />
                            KEL-BD
                        </a>
                        <ul className="font-heading mx-auto flex space-x-12 px-4 font-semibold">
                            {NavLinks.filter((nav) => {
                                return nav.role.includes(original_role);
                            }).map(({ id, link, name }) => {
                                return (
                                    <li key={id}>
                                        <a
                                            className={`rounded-md border-b-4 py-2 text-center transition duration-500 ease-in-out hover:rounded-md hover:border-b-4 hover:border-gray-200 hover:text-gray-200
                                            ${
                                                window.location.pathname ===
                                                link
                                                    ? "border-white"
                                                    : "border-green-700"
                                            }`}
                                            href={link}
                                        >
                                            {name}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="hidden items-center space-x-5 xl:flex ">
                            <button
                                onClick={logout}
                                className="hover:border-red rounded-full border-2 border-red-600 bg-white px-6 py-2 font-sans font-semibold capitalize text-red-600 transition-all duration-500 ease-in-out hover:bg-red-600 hover:text-white"
                            >
                                {original_role}
                            </button>
                        </div>
                    </div>
                </nav>
            </section>
        </div>
    );
}

export default Nav;
