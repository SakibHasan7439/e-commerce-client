import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayouut/MainLayout";
import Home from "../Home";
import ProductDetails from "../productDetails/ProductDetails";
import { Link } from "lucide-react";


const Route = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <div className="text-center text-5xl h-screen flex items-center justify-center">
            <div>
                <h2>404! Page not found.</h2>
                <Link to="/" className="text-blue-600 hover:underline text-lg mt-4 block">
                    Go back to Home
                </Link>
            </div>
        </div>,
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