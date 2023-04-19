import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth";

export function DefineRole() {
    const { cookies } = useAuth();

    const session_token = localStorage.getItem("token");
    let cookies_value = useState([]);

    if (cookies.token != null) {
        cookies_value = cookies.token.split(":");
        const cookies_token = cookies_value[0];
        const role = cookies_value[1];

        const substitute = parseInt(cookies_value[2]);
        const original_ascii = [];
        for (var i = 0; i < role?.length; i++) {
            original_ascii.push(role.codePointAt(i) + substitute);
        }

        const original_role = String.fromCharCode(...original_ascii);
        const is_NoRoleAssigned_SessionAndCookie_IsNotEqual =
            original_role === "undefined" || session_token !== cookies_token;

        return { original_role, is_NoRoleAssigned_SessionAndCookie_IsNotEqual };
    }
    else{
        return { original_role: null, is_NoRoleAssigned_SessionAndCookie_IsNotEqual: true };
    }
    }  

export function AccountsManagerRoutes({ children }) {
    const { original_role, is_NoRoleAssigned_SessionAndCookie_IsNotEqual } =
        DefineRole();

    if (is_NoRoleAssigned_SessionAndCookie_IsNotEqual)
        return <Navigate to="/login" />;

    return original_role === "accounts-manager" || original_role === "admin" ? (
        children
    ) : (
        <Navigate to="/noaccess" />
    );
}

export function AccountsRoutes({ children }) {
    const { original_role, is_NoRoleAssigned_SessionAndCookie_IsNotEqual } =
        DefineRole();

    if (is_NoRoleAssigned_SessionAndCookie_IsNotEqual)
        return <Navigate to="/login" />;

    return original_role === "accounts" || original_role === "admin" ? (
        children
    ) : (
        <Navigate to="/noaccess" />
    );
}

export function OperationRoutes({ children }) {
    const { original_role, is_NoRoleAssigned_SessionAndCookie_IsNotEqual } =
        DefineRole();

    if (is_NoRoleAssigned_SessionAndCookie_IsNotEqual)
        return <Navigate to="/login" />;

    return original_role === "operations" || original_role === "admin" ? (
        children
    ) : (
        <Navigate to="/noaccess" />
    );
}

export function AdminRoutes({ children }) {
    const { original_role, is_NoRoleAssigned_SessionAndCookie_IsNotEqual } =
        DefineRole();

    if (is_NoRoleAssigned_SessionAndCookie_IsNotEqual)
        return <Navigate to="/login" />;

    return original_role === "admin" ? children : <Navigate to="/noaccess" />;
}
