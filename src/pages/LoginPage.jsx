import { useState } from "react";
import FormFieldset from "../components/FormFieldSet.jsx";
import { useNavigate } from "react-router-dom"; 
import { api } from "../services/api";

export default function LoginPage() {
    const [form, setForm] = useState({ nim: "", pin: "" });
    const navigate = useNavigate();

    const loginFields = [
        { name: "nim", label: "NIM", placeholder: "202311420009" },
        { name: "pin", label: "PIN", type: "password", placeholder: "••••" }
    ];

    async function handleLogin(e) {
    e.preventDefault();
    
    try {
        const res = await api.postLogin(form);
        localStorage.setItem("adminToken", res.token);
        // success → redirect
        navigate("/dashboard");
    } catch (err) {
        // controlled error → show message
        console.error(err.message);
        alert("Login failed: " + err.message);
    }
}

    return (
        <div className="flex justify-center items-center min-h-screen">
            <FormFieldset
                title="Login"
                fields={[
                    { name: "nim", label: "NIM" },
                    { name: "pin", label: "PIN", type: "password" }
                ]}
                form={form}
                setForm={setForm}
                onSubmit={handleLogin}
                buttonLabel="Login"
                footerText="Don’t have an account?"
                footerLink={{ label: "Register", href: "/register" }}
            />
        </div>
    );
}
