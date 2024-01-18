import React, { useState, useEffect } from "react";
import "../styles/ScrollTop.css";
import { FaArrowTurnUp } from "react-icons/fa6";

const ScrollTop: React.FC = () => {
    const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div className="top-to-btm">
                {showTopBtn && (
                    <button className="icon-position icon-style" onClick={goToTop}>
                        <FaArrowTurnUp className="icon" />
                    </button>
                )}
            </div>
        </>
    );
};

export default ScrollTop;
