import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../constants/FormFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import Services from "../services/Services";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

function Login({ setIsLogIn }) {
  const [loginState, setLoginState] = useState(fieldsState);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  const authenticateUser = async () => {
    const user = {
      email: loginState.emailaddress,
      password: loginState.password,
    };

    try {
      let val = await Services.logInUser(user);
      if (val.data) {
        setIsLogIn(true);
      } else {
        alert("Incorrect UserName or Password!! Try Again!!!!!");
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      alert(
        "An error occurred while trying to log in. Please try again later."
      );
    }
  };

  return (
    <form className="mt-8 space-y-6">
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormExtra></FormExtra>

      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}

export default Login;
