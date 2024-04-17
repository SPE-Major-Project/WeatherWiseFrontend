import { useState } from "react";
import { signupFields } from "../constants/FormFields";
import FormAction from "./FormAction";
import Input from "./Input";
import Services from "../services/Services";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: signupState.emailaddress,
      password: signupState.password,
    };
    try {
      await Services.addUser(user);
      alert("User added successfully!");
      setSignupState(fieldsState);
    } catch (error) {
      console.error("Error adding user:", error);
      alert(
        "An error occurred while trying to add the user. Please try again later."
      );
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}

export default Signup;
