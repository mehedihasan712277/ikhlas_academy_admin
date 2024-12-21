"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import CopyLink from "./CopyLink";

const FileUploadForm = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Single file
    const [uploadMessage, setUploadMessage] = useState<string>("");
    const [link, setLink] = useState<string>("");

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0] || null; // Only take the first file
        setSelectedFile(file);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (!selectedFile) {
            setUploadMessage("No file selected!");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", selectedFile); // Append single file

        try {
            const response: AxiosResponse = await axios.post(
                "http://localhost:5000/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                setUploadMessage("File uploaded successfully!");
                console.log(response.data);
                setLink(`http://localhost:5000/${response.data.path}`)
            } else {
                setUploadMessage(`Error: ${response.statusText}`);
            }
        } catch (error: unknown) {
            const errorMessage =
                axios.isAxiosError(error) && error.response?.data
                    ? `Error: ${error.response.data}`
                    : error instanceof Error
                        ? error.message
                        : "Unknown error";
            setUploadMessage(errorMessage);
        }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="avatar"
                    onChange={handleFileChange}
                    style={{ marginBottom: "10px" }}
                />
                <button type="submit">Submit</button>
            </form>
            {uploadMessage && <p>{uploadMessage}</p>}
            <CopyLink url={link}></CopyLink>
        </div>
    );
};

export default FileUploadForm;
