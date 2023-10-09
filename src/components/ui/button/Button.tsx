import { useMemo } from "react";

import "./Button.scss";

interface IButton {
  form?: string;
  type: any;
  variant: string;
  hasMargin?: boolean;
  className?: string;
  disabled: boolean;
  tabIndex: number;
  icon?: any;
  onClick?: any;
  children: any;
}

const Button = ({
  form = "",
  type = "",
  variant = "primary",
  hasMargin = false,
  className = "",
  disabled = false,
  tabIndex = 0,
  icon = null,
  onClick,
  children,
}: IButton) => {
  const classList = useMemo(() => {
    const classes = `mb-btn ${className} ${
      hasMargin ? "has-margin" : ""
    } mb-btn-${variant}`;
    return classes;
  }, [className, hasMargin, variant]);

  const text = useMemo(() => {
    return children ? (
      <span className={icon ? "mb-btn-text" : ""}>{children}</span>
    ) : null;
  }, []);

  return (
    <button
      form={form}
      type={type}
      className={classList}
      disabled={disabled}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
