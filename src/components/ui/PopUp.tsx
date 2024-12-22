"use client";
import { CircleX } from "lucide-react";
import { useContext, useState } from "react";
import FileUploadForm from "./FileUploadForm";
import { AuthContext } from '@/components/shared/AuthProvider';


const PopUp = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    const { value, changeValue } = authContext

    return (
        <div className={value ? "block" : "hidden"}>
            <div className="bg-black bg-opacity-80 fixed z-10 top-0 bottom-0 left-0 right-0 flex justify-center items-center" id="popup">
                <div className="bg-white pt-4 px-4 pb-8 rounded-lg">
                    <div className="flex w-full justify-end pb-2">
                        <button onClick={() => changeValue()}> {/* Add onClick handler */}
                            <CircleX />
                        </button>
                    </div>
                    <FileUploadForm />
                </div>
            </div>
        </div>
    );
};

export default PopUp;
