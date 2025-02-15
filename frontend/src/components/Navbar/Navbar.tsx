import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbarstyle.css";
import { FirebaseContext } from "../../context/firebaseContext";
import { NavLink } from "react-router-dom";

let isOpen = false;

const Toggle1 = (y: any, x: any) => {
  y.style.display = "none";
  x[0].style.transform = "none";
  x[1].style.opacity = "100";
  x[2].style.transform = "none";
  isOpen = false;
};
const Toggle2 = (y: any, x: any) => {
  y.style.display = "block";
  y.style.animation = "fade-in 1s ease-in";
  x[0].style.transform = "rotate(-45deg) translate(-5px,6px)";
  x[0].style.transition = "transform 0.4s ease-in";
  x[1].style.opacity = "0";
  x[1].style.transition = "opacity 0.2s ease-in";
  x[2].style.transform = "rotate(45deg) translate(-5px,-6px)";
  x[2].style.transition = "transform 0.4s ease-in";
  isOpen = true;
};

const handleClick = () => {
  const y = document.getElementById("drop-down");
  const x = document.getElementById("nav_parent")!.children;
  isOpen ? Toggle1(y, x) : Toggle2(y, x);
};

export default function Navbar() {
  const { auth } = useContext(FirebaseContext);

  const [signedIn, setSignedIn] = useState(false);
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 120) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setSignedIn(!!auth.currentUser);
  }, [auth.currentUser]);
  return (
    <div
      className={
        !colorChange
          ? `block text-black lg:px-12 md:px-8 px-4 lg:pt-6 z-50 sticky top-0 md:bg-transparent bg-white`
          : `block text-black lg:px-12 md:px-8 px-4 lg:pt-6 z-50 sticky top-0 bg-white`
      }
      style={{ backgroundColor: "#dbffff" }}
    >
      <div className="h-16 flex justify-between justify-items-center">
        <div className="inline-flex md:pt-0 pt-5" style={{ width: "20%" }}>
          <div className="">
            <Link to="/" onClick={scrollToTop}>
              <img
                src="/assets/images/logo.png"
                alt="logo"
                className="rounded-md"
              />
            </Link>
          </div>
          <div className="text-md lg:text-3xl pl-2 md:text-black text-white align-middle select-none font-bold pt-2">
            MovieHall
          </div>
        </div>
        {/* <div className="lg:border-r-2 border-black"></div> */}
        <div className="hidden sm:flex text-md py-3" id="">
          <div>
            <NavLink
              exact
              to="/"
              activeClassName=""
              className="navbar-link-hover"
              activeStyle={{
                fontWeight: "bold",
                color: "black",
              }}
              onClick={scrollToTop}
            >
              <div className="mx-2 md:px-1 py-1 lg:mx-2 hover:text-blue-600 block sm:inline-block navbar-link">
                <div className="flex items-center mt-2 -mx-2 sm:mt-0">
                  {!signedIn && (
                    <NavLink
                      to="/"
                      className="px-3 py-2 mx-2 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-800"
                    >
                      Sign In
                    </NavLink>
                  )}

                  {signedIn && (
                    <div> Hello {auth.currentUser?.displayName} !</div>
                  )}
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        <div
          className="sm:hidden py-4 cursor-pointer"
          id="nav_parent"
          onClick={handleClick}
        >
          <div id="div1" className="h-1 w-6 m-1 md:bg-black bg-white"></div>
          <div id="div2" className="h-1 w-6 m-1 md:bg-black bg-white"></div>
          <div id="div3" className="h-1 w-6 m-1 md:bg-black bg-white"></div>
        </div>
      </div>
      <div className="hidden sm:hidden text-black text-sm py-3" id="drop-down">
        <div>
          <NavLink
            exact
            to="/"
            activeClassName=""
            className="navbar-link-hover"
            activeStyle={{
              fontWeight: "bold",
            }}
            onClick={scrollToTop}
          >
            <div className="mx-2 md:px-1 md:text-black text-white py-1 lg:mx-2 hover:text-blue-600 block sm:inline-block navbar-link">
              <div>
                {!signedIn && <NavLink to="/"> Sign IN </NavLink>}
                {signedIn && (
                  <div> Hello {auth.currentUser?.displayName} !</div>
                )}
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
