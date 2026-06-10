'use client';

import { signUp } from "@/lib/authService";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signUp(formData.email, formData.password, formData.name, formData.surname);
            router.push("/planner");
        } catch (err) {
            const code = (err as { code?: string }).code;
            switch (code) {
                case "auth/email-already-in-use":
                    setError("Email is already in use.");
                    break;
                case "auth/invalid-email":
                    setError("Invalid email address.");
                    break;
                case "auth/weak-password":
                    setError("Password is too weak. Use at least 6 characters.");
                    break;
                default:
                    setError("Sign up failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="bg-card border border-border rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-foreground mb-2">Sign Up</h1>
                    <p className="text-muted-foreground">Join Uniplanner today</p>
                </div>
                
                {error && (
                    <div role="alert" className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="surname" className="block text-sm font-medium text-foreground mb-1">
                            Surname
                        </label>
                        <input
                            id="surname"
                            name="surname"
                            type="text"
                            placeholder="Enter your surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a password (min. 6 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-secondary transition-colors font-medium mt-6 disabled:opacity-50"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                
                <div className="text-center mt-6">
                    <p className="text-muted-foreground text-sm">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-accent hover:text-primary transition-colors underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}