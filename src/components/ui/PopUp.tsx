"use client"
import { CircleX } from "lucide-react";
import { useState } from "react";
import FileUploadForm from "./FileUploadForm";

const PopUp = () => {
    const [link, setLink] = useState(""); // Dynamic link
    const [copyStatus, setCopyStatus] = useState("Copy");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link); // Copy the text to the clipboard
            setCopyStatus("Copied"); // Change button text to "Copied"
            setTimeout(() => setCopyStatus("Copy"), 2000); // Reset to "Copy" after 2 seconds
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div className="bg-black bg-opacity-80 fixed z-10 top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            <div className="bg-white pt-4 px-4 pb-8 rounded-lg">
                <div className="flex w-full justify-end pb-2">
                    <CircleX></CircleX>
                </div>
                <FileUploadForm></FileUploadForm>
            </div>
        </div>
    );
};

export default PopUp;
