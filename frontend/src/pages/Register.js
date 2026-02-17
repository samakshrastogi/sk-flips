import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!email || !password) return;

        try {
            setLoading(true);
            await api.post("/users/register", { email, password });
            navigate("/login");
        } catch {
            alert("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Register</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister} disabled={loading}>
                {loading ? "Creating account..." : "Register"}
            </button>
        </div>
    );
}
