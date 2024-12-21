"use client"

type UrlType = {
    url: string
}
import Image from "next/image";
import { useState } from "react";

const CopyLink = ({ url }: UrlType) => {
    const [copyStatus, setCopyStatus] = useState("Copy Link");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url); // Copy the text to the clipboard
            setCopyStatus("Copied"); // Change button text to "Copied"
            setTimeout(() => setCopyStatus("Copy Link"), 2000); // Reset to "Copy" after 2 seconds
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <>
            <div>
                {
                    url && <div className="w-[400px] space-y-3">

                        <div id="link" className="space-y-3">
                            <div className="text-xs bg-slate-200 p-2 w-[400px]">
                                {url}
                            </div>
                            <Image src={url} alt="img" width={300} height={300}></Image>
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
                }
            </div >
        </>
    );
};

export default CopyLink;