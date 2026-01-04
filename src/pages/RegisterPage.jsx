import { useState } from "react";
import FormFieldset from "../components/FormFieldSet.jsx";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom"; 

export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        kelompok: "",
        nim: "",
        role: "admin",
        pin: ""
    });

    const registerFields = [
        { name: "name", label: "Name" },
        { name: "kelompok", label: "Kelompok", placeholder: "P1" },
        { name: "nim", label: "NIM", placeholder: "202311420001" },
        { name: "role", label: "Role", placeholder: "admin" },
        { name: "pin", label: "PIN", type: "password", placeholder: "••••" }
    ];

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const res = await api.postRegister(form);
            // success → redirect
            navigate("/");
        } catch (err) {
            // controlled error → show message
            console.error(err.message);
            alert("Login failed: " + err.message);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <FormFieldset
                title="Register"
                fields={[
                    { name: "name", label: "Name" },
                    { name: "kelompok", label: "Kelompok" },
                    { name: "nim", label: "NIM" },
                    { name: "pin", label: "PIN", type: "password" }
                ]}
                form={form}
                setForm={setForm}
                onSubmit={handleRegister}
                buttonLabel="Register"
                footerText="Already have an account?"
                footerLink={{ label: "Login", href: "/" }}
            />
        </div>
    );
}
