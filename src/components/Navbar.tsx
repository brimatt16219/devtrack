import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {

    const { theme, toggle } = useTheme();

    return (
        <header className="app-header">
            <div className="header-inner">
                <span className="app-title">DevTrack</span>

                <nav className="nav-links">
                    <NavLink to="/dashboard" className={({ isActive }) =>
                        isActive ? "nav-link-active" : "nav-link"
                    }>
                        Dashboard
                    </NavLink>
                    <NavLink to="/add" className={({ isActive }) =>
                        isActive ? "nav-link-active" : "nav-link"
                    }>
                        + Add Job
                    </NavLink>
                    <NavLink to="/explore" className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }>
                        Explore
                    </NavLink>
                </nav>
                

                <div className="nav-right">
                    <button className="theme-toggle-placeholder" onClick={toggle}>
                        {theme === "dark" ? "Light" : "Dark"}
                    </button>
                </div>
            </div>
        </header>
    )
}