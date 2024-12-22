"use client"
import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface AuthContextType {
    value: boolean;
    // setValue: React.Dispatch<React.SetStateAction<boolean>>;
    changeValue: () => void
}

// Create the context with the appropriate type
export const AuthContext = createContext<AuthContextType | null>(null);

// Define the props type for AuthProvider
interface AuthProviderProps {
    children: ReactNode; // Accepts React children
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [value, setValue] = useState<boolean>(false);

    const changeValue = () => {
        setValue(!value)
    }
    // Define the context value
    const authInfo: AuthContextType = {
        value,
        changeValue, // Pass setValue correctly
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
