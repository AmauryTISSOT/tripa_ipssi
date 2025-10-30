import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";

import RootLayout from "./layouts/RootLayout";
import Accueil from "./pages/Accueil";
import Recherche from "./pages/Recherche";
import Service from "./pages/Service";
import Compilation from "./pages/Compilation";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Accueil /> },
            { path: "recherche", element: <Recherche /> },
            { path: "compilation", element: <Compilation /> },
            { path: "service/:id", element: <Service /> },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
