import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../auth/auth";

export default function Navbar({ user }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const initials = user.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : user.email[0].toUpperCase();

    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <Link to="/videos" className="logo">
                        sk-flips
                    </Link>
                </div>

                <div className="navbar-right">
                    <Link to="/videos" className="nav-link">
                        Videos
                    </Link>

                    <Link to="/upload" className="nav-link">
                        Upload
                    </Link>

                    <div
                        className="avatar"
                        onClick={() => setOpen(true)}
                    >
                        {initials}
                    </div>
                </div>
            </nav>

            {open && (
                <div className="modal-overlay" onClick={() => setOpen(false)}>
                    <div
                        className="modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-avatar">{initials}</div>

                        <div className="modal-info">
                            <div className="modal-name">
                                {user.name || "User"}
                            </div>
                            <div className="modal-email">
                                {user.email}
                            </div>
                            <div className="modal-date">
                                Joined{" "}
                                {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
