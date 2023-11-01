import React, { useEffect } from "react";
import "./ModalPopup.scss";

export default function ModalPopup({
  title,
  bottomText,
  children,
  onClose,
}: {
  title?: string;
  bottomText?: string;
  children?: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    // Add event listener for Esc key
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="modalpopup">
      <button
        className="close-button"
        onClick={() => {
          onClose();
        }}
      >
        ⨯
      </button>
      <div className="popup-content">
        {title && <span className="title">{title}</span>}
        {children && children}
        {bottomText && <span className="bottom-text">{bottomText}</span>}
      </div>
    </div>
  );
}
