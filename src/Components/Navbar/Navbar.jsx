import { Home, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { getCartItemCount, setIsCartOpen } = useCart();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl uppercase">
          Best Buy
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="text-xl flex gap-2">
              <Home />
              Home
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button
          onClick={() => setIsCartOpen(true)}
          className="btn relative btn-outline"
        >
          <ShoppingCart />
          {getCartItemCount() > 0 && (
            <span className="badge badge-error absolute -top-2 -right-2">
              {getCartItemCount()}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
