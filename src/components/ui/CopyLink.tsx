"use client"

type UrlType = {
    url: string
}
import { useState } from "react";

const CopyLink = ({ url }: UrlType) => {
    const [copyStatus, setCopyStatus] = useState("Copy");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url); // Copy the text to the clipboard
            setCopyStatus("Copied"); // Change button text to "Copied"
            setTimeout(() => setCopyStatus("Copy"), 2000); // Reset to "Copy" after 2 seconds
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <>
            <div>

                <div className="flex flex-col gap-4">
                    <div id="link">
                        {url}
                        <img src={url} alt="img" />
                    </div>
                    <div>
                        <button
                            onClick={handleCopy}
                            className="bg-blue-400 w-full font-bold px-4 py-1 text-sm rounded-md active:scale-95 transition-all duration-150"
                        >
                            {copyStatus}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CopyLink;