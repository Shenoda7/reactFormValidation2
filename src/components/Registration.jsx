import "./Registration.css";
import { useState } from "react";
import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualsToOtherValue,
} from "../../util/validation.js";
const INITIAL_VALUES = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const INITIAL_EDIT_STATE = {
  username: false,
  email: false,
  password: false,
  confirmPassword: false,
};

function Registration() {
  const [input, setInput] = useState(INITIAL_VALUES);
  const [didEdit, setDidEdit] = useState(INITIAL_EDIT_STATE);

  const usernameIsInvalid = didEdit.username && !isNotEmpty(input.username);
  const emailIsInvalid =
    didEdit.email && (!isEmail(input.email) || !isNotEmpty(input.email));
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(input.password, 8);
  const confirmPasswordIsInvalid =
    didEdit.confirmPassword &&
    !isEqualsToOtherValue(input.password, input.confirmPassword);

  function handleSubmit(e) {
    e.preventDefault();
    if (emailIsInvalid || passwordIsInvalid || confirmPasswordIsInvalid) {
      return;
    }
    console.log("submitted, ", input);
  }
  function handleInputChange(field, value) {
    setInput((prevInput) => ({ ...prevInput, [field]: value }));
    setDidEdit((prevInput) => ({ ...prevInput, [field]: false }));
  }

  function handleOnBlur(field) {
    setDidEdit((prevInput) => ({ ...prevInput, [field]: true }));
  }
  function handleReset() {
    setInput(INITIAL_VALUES);
    setDidEdit(INITIAL_EDIT_STATE);
  }
  return (
    <div className="container">
      <form action="#" id="form" onSubmit={handleSubmit}>
        <h1>Registration</h1>

        <div className="input-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={input.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            onBlur={() => handleOnBlur("username")}
            required
          />
          <div className="error">
            {usernameIsInvalid && "username must not be empty"}
          </div>
        </div>

        <div className="input-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={input.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={() => handleOnBlur("email")}
            required
          />
          <div className="error">
            {emailIsInvalid && "Please enter a valid email"}
          </div>
        </div>

        <div className="input-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            onBlur={() => handleOnBlur("password")}
            required
          />
          <div className="error">
            {passwordIsInvalid && "Password must be greater than 8 characters"}
          </div>
        </div>

        <div className="input-control">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={input.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            onBlur={() => handleOnBlur("confirmPassword")}
            required
          />
          <div className="error">
            {confirmPasswordIsInvalid && "Passwords do not match"}
          </div>
        </div>

        <div className="group-btns">
          <button type="submit">Sign Up</button>
          <button type="button" className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
