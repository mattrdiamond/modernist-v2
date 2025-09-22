import "./form-input.styles.scss";

const defaultAutocompleteMap = {
  displayName: "name",
  email: "email",
  password: "new-password",
  confirmPassword: "new-password",
};

const FormInput = ({ handleChange, label, children, name, ...otherProps }) => {
  const autoComplete =
    otherProps.autoComplete || defaultAutocompleteMap[name] || "off";

  return (
    <div className='form-input-container'>
      <input
        className='form-input'
        onChange={handleChange}
        name={name}
        autoComplete={autoComplete}
        {...otherProps}
      />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
      {children}
    </div>
  );
};

export default FormInput;
