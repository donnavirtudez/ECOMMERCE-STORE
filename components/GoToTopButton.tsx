"use client";

import React, { useState, useEffect } from "react";

const GoToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        background: "rgba(10, 10, 10, 0.9)",
        border: "none",
        borderRadius: "50%",
        width: "2.5rem",
        height: "2.5rem",
        fontSize: "1.25rem",
        color: "#e5e7eb",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease, background-color 0.3s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(10, 10, 10, 1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(10, 10, 10, 0.9)")
      }
      aria-label="Go to top"
    >
      ↑
    </button>
  );
};

export default GoToTopButton;
