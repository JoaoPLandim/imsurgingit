'use client';

import { signIn } from "@/lib/authService";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await signIn(email, password);
            alert("Sign in successful!");
            router.push("/planner");
        } catch (error: any) {
            switch (error.code) {
                case "auth/user-not-found":
                    alert("No account found with that email.");
                    break;
                case "auth/wrong-password":
                    alert("Incorrect password.");
                    break;
                case "auth/invalid-email":
                    alert("Invalid email address.");
                    break;
                case "auth/invalid-credential":
                    alert("Invalid email or password.");
                    break;
                default:
                    alert(error.message || "Sign in failed.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="bg-card border border-border rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-foreground mb-2">Sign In</h1>
                    <p className="text-muted-foreground">Welcome back to Uniplanner</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-secondary transition-colors font-medium mt-6 disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
                
                <div className="text-center mt-6">
                    <p className="text-muted-foreground text-sm">
                        Don't have an account?{" "}
                        <Link href="/sign-up" className="text-accent hover:text-primary transition-colors underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}