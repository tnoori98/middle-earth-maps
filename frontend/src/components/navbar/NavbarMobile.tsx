import React, { useState } from "react";
import NavLinks from "./NavLinks";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import "./Navbar.css";

function NavbarMobile() {
    const [open, setOpen] = useState(false);

    const hamburgerIcon = (
        <GiHamburgerMenu className="hamburger" onClick={() => setOpen(!open)} />
    );

    const closeIcon = (
        <VscChromeClose className="hamburger" onClick={() => setOpen(!open)} />
    );

    return (
        <div
            className={
                open ? "contentMobile contentMobileActive" : "contentMobile"
            }
        >
            <label className="logo">Middle Earth Maps</label>
            {open ? closeIcon : hamburgerIcon}
            {open && <NavLinks />}
        </div>
    );
}

export default NavbarMobile;
