import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies();

    const logout = () => {
        removeCookie("token");
        navigate("/login");
    };

    const value = useMemo(
        () => ({
            cookies,
            logout,
        }),
        [cookies]
    );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};
