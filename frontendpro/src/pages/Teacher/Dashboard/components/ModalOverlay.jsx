// components/ModalOverlay.jsx
import React from "react";

const ModalOverlay = ({ visible, title, content, onConfirm, onCancel }) => {
  if (!visible) return null;

  return (
    <div
      className="overlay"
      style={{ background: "rgba(0, 0, 0, 0.6)", zIndex: 500 }}
    >
      <div
        style={{
          maxWidth: "400px",
          margin: "100px auto",
          background: "var(--card)",
          color: "var(--text)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px var(--card-shadow)",
          textAlign: "center",
          position: "relative",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>{title}</h2>
        <div>{content}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={onConfirm}
            style={{
              padding: "8px 16px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
            }}
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            style={{
              padding: "8px 16px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOverlay;
