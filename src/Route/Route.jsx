import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayouut/MainLayout";
import Home from "../Home";
import ProductDetails from "../productDetails/ProductDetails";

const Route = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <h2 className="text-center text-5xl h-screen">
            404! Page not found.
            </h2>,
        children: [
            {
                path: "/",
                element: <Home />
            },

            {
                path: "productDetails/:id",
                element: <ProductDetails />
            }
        ]
    }
]);

export default Route;