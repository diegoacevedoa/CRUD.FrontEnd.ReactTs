import { useCallback, ChangeEvent, useMemo } from "react";
import "./Field.scss";

interface IField {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  placeHolder: string;
  tabIndex: number;
  required: boolean;
  disabled: boolean;
  className: string;
  onChange: Function;
  onBlur: Function;
}

const Field = ({
  id = "",
  name = "",
  type = "",
  label = "",
  value = "",
  placeHolder = "",
  tabIndex = 0,
  required = false,
  disabled = false,
  className = "",
  onChange,
  onBlur,
}: IField) => {
  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange({ name, value: event.target.value, event });
  }, []);

  const handleOnBlur = useCallback(() => {
    if (onBlur != undefined) {
      onBlur();
    }
  }, []);

  const classList = useMemo(() => {
    return type !== "radio" && type !== "switch" && type !== "checkbox"
      ? `mb-field ${className}`
      : className;
  }, [className]);

  return (
    <>
      {label && (
        <label htmlFor={name}>
          {label}&nbsp;
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        tabIndex={tabIndex}
        value={value ?? ""}
        placeholder={placeHolder}
        required={required}
        disabled={disabled}
        className={
          type === "password"
            ? "mb-field-control mb-input-group"
            : "mb-field-control"
        }
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    </>
  );
};

export default Field;
