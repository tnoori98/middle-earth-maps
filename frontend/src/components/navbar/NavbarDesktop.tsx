import "./Navbar.css";
import NavLinks from "./NavLinks";
import React from "react";

function NavbarDesktop() {
    return (
        <div className="content">
            <label className="logo">Middle Earth Maps</label>
            <NavLinks />
        </div>
    );
}

export default NavbarDesktop;
