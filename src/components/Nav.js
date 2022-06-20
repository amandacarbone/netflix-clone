import { useState, useEffect } from "react";
import "../styles/Nav.css";

export default function Nav() {

    const [ show, setShow ] = useState(false);

    function transitionNavBar() {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);

    return (
        <div className={`nav ${show && "navBlack"}`}>
            <div className="navContents">
                <img
                    className="navLogo"
                    src="https://i.imgur.com/rOIeFnc.png"
                    alt="netflix"
                />
                <img
                    className="navAvatar"
                    src="https://i.imgur.com/uIfWTTL.png"
                    alt="avatar"
                />
            </div>
        </div>
    );

};