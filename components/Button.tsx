import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "success";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  const baseStyles =
    "py-2 px-4 rounded-lg font-heading font-semibold text-sm hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  //inline css
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "#fff",
      color: "#7c3aed",
    },
    secondary: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "#fff",
    },
    danger: {
      backgroundColor: "#DC2626",
      color: "#fff",
    },
    success: {
      backgroundColor: "#EAB308",
      color: "#fff",
    },
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={variantStyles[variant]}
      className={`${baseStyles} ${widthStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
