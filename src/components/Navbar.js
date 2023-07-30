import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../Context/auth";

const Navbar = () => {
  const Navigate=useNavigate();
  const { user } = useContext(AuthContext);

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      isOnline: false,
    });
    await signOut(auth)
    Navigate("/auth/login");
  };


  return (
    <nav className="navbar navbar-expand-md bg-light navbar-light sticky-top shadow-sm bg-purple-950">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Expense Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleSignout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/auth/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/auth/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
