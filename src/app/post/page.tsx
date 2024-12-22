"use client";

import RichTextEditor from "@/components/ui/RichTextEditor/RichTextEditor";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import PopUp from "@/components/ui/PopUp";
import { useContext, useState } from "react";
import { AuthContext } from "@/components/shared/AuthProvider";
// import AllProducts from "@/components/ui/AllProducts";

function extractTextFromHTML(html: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent?.trim() || "";
}

// Define the form schema with name, imgUrl, and description fields
const formSchema = z.object({
    name: z.string().min(1, { message: "name is required" }),
    imgUrl: z.string().url({ message: "Please enter a valid URL" }),
    description: z.string().refine(
        (value) => {
            return extractTextFromHTML(value).trim().length >= 5;
        },
        {
            message: "The text must be at least 5 characters long after trimming",
        }
    ),
});

const AddPage = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        // Handle the case where AuthContext is null
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    const { value, changeValue } = authContext

    const form = useForm({
        mode: "onTouched",
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imgUrl: "",
            description: "",
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post("base-url/product", data);
            console.log("Data successfully submitted:", response.data);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <>
            <div className={value ? "block" : "hidden"}>
                <PopUp></PopUp>
            </div>

            <div>
                <span>Upload image to get url </span>
                <Button className="ml-4" onClick={() => changeValue()}>Upload</Button>
            </div>
            <div className="p-4">
                <div className="max-w-3xl mx-auto py-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {/* Name Field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <br />
                                        <FormControl>
                                            <input
                                                type="text"
                                                className="bg-slate-200 rounded-sm p-2"
                                                placeholder="Enter name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Image URL Field */}
                            <FormField
                                control={form.control}
                                name="imgUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <br />
                                        <FormControl>
                                            <input
                                                type="url"
                                                className="bg-slate-200 rounded-sm p-2"
                                                placeholder="Enter image URL"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description Field with RichTextEditor */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <RichTextEditor
                                                content={field.value}
                                                onChange={(value: any) => field.onChange(value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className="mt-4">Submit</Button>
                        </form>
                    </Form>
                </div>
                {/* <AllProducts></AllProducts> */}
            </div>
        </>
    );
}

export default AddPage;