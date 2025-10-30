import { Outlet, Link } from "react-router";

export default function RootLayout() {
    return (
        <div>
            <nav>
                <Link to="/">Accueil</Link> |{" "}
                <Link to="/recherche">Recherche</Link> |{" "}
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}
