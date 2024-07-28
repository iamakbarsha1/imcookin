import React, { useEffect, useState } from "react";
import InputTag from "../../../components/InputTag";
import SignupNav from "../../../components/SignupNav";
import { toFormData } from "axios";
import { ax_isEmailUsernameUnique, ax_signup } from "../../../api/auth";
import { debounce } from "../../../utils/debounce";
import useDebounce from "../../../hooks/useDebounce";
// import FormPage from "./section/FormPage";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });
  const [formArr, setFormArr] = useState([
    {
      label: "Enter your email address",
      name: "email",
      value: signupData.email,
      isComplete: true,
      isNext: true,
      isValid: false,
      isMandatory: true,
    },
    {
      label: "Create a password",
      name: "password",
      value: signupData.password,
      isComplete: false,
      isNext: false,
      isValid: false,
      isMandatory: true,
    },
    {
      label: "Enter your name",
      name: "name",
      value: signupData.name,
      isComplete: false,
      isNext: false,
      isValid: false,
      isMandatory: true,
    },
    {
      label: "Enter username",
      name: "username",
      value: signupData.username,
      isComplete: false,
      isNext: false,
      isValid: false,
      isMandatory: true,
    },
  ]);

  const [apiResponse, setApiResponse] = useState({
    email: "",
    username: "",
  });
  const [query, setQuery] = useState("");
  const [currentField, setCurrentField] = useState("");
  const [valid, setValid] = useState(false);

  const updateIsValidKey = (i, bool) => {
    setFormArr((prevArr) =>
      prevArr.map((input, index) =>
        index === i ? { ...input, isValid: bool } : input
      )
    );
  };

  const validateFields = (name, value, i) => {
    console.log("currentField - name " + name);
    let validPass = true;
    if (name === "password" && validPass && value.length > 0) {
      updateIsValidKey(i, true);
    } else if (name === "name" && value.length > 0) {
      updateIsValidKey(i, true);
    } else {
      updateIsValidKey(i, false);
    }
  };

  const sendQuery = async (currField, value, i) => {
    try {
      console.log("i: " + i);
      // const ax = await ax_signup({ [currField]: value });
      const ax = await ax_isEmailUsernameUnique({ [currField]: value });
      console.log("currField " + currField);
      console.log("query: " + JSON.stringify({ [currField]: value }));
      console.log("ax - Response: ", JSON.stringify(ax));
      if (ax.data.code === 201) {
        // setApiResponse(...apiResponse, { [currField]: ax.data.description });
        if (ax.data.type === "email") {
          setApiResponse((prevState) => ({
            ...prevState,
            email: ax.data.description,
          }));
        } else if (ax.data.type === "username") {
          setApiResponse((prevState) => ({
            ...prevState,
            username: ax.data.description,
          }));
        }
        setValid(false);
        updateIsValidKey(i, false);
      } else if (ax.data.code === 200) {
        setApiResponse((prevState) => ({
          ...prevState,
          email: "",
        }));
        setApiResponse((prevState) => ({
          ...prevState,
          username: "",
        }));
        updateIsValidKey(i, true);
      } else {
        setApiResponse((prevState) => ({
          ...prevState,
          email: "",
        }));
        setApiResponse((prevState) => ({
          ...prevState,
          username: "",
        }));
        setValid(false);
        updateIsValidKey(i, false);
      }
    } catch (error) {
      console.error("Error: ", JSON.stringify(error));
    }
  };

  // Use the custom debounce hook
  const debouncedSendQuery = useDebounce(sendQuery, 500);

  const onHandleChange = (e, i) => {
    const { name, value } = e.target;

    setSignupData({
      ...signupData,
      [name]: value,
    });
    setCurrentField(name); // captures the focused field

    /**
     * Updates the form array by setting the value of a specific input.
     * @param {Array} prevArr - The previous form array.
     * @param {string} name - The name of the input to update.
     * @param {string} value - The new value for the input.
     * @returns {Array} - The updated form array.
     */
    setFormArr((prevArr) => {
      // Check if prevArr is defined
      if (prevArr) {
        return prevArr.map((input) =>
          input.name === name
            ? {
                ...input,
                value: value,
              }
            : input
        );
      } else {
        // Handle the case when prevArr is undefined
        return [];
      }
    });
    console.log("name: " + name);
    console.log("value: " + value);
    if (name === "email" || name === "username") {
      setQuery(value);
      debouncedSendQuery(name, value, i);
    } else {
      validateFields(name, value, i);
    }
  };

  console.log("apiResponse: " + JSON.stringify(apiResponse));
  /**
   * Handles the click event when the "Continue" button is clicked.
   *
   * @param {Event} e - The click event object.
   * @param {Array} arr - The array of form inputs.
   * @param {number} i - The index of the current form input.
   */
  const onContinueClick = (e, i) => {
    e.preventDefault();

    if (formArr[i].isValid) {
      setFormArr((prevArr) =>
        prevArr.map((input, index) =>
          index === i + 1 ? { ...input, isNext: true, isComplete: true } : input
        )
      );
    }
  };
  console.log("formArr[1].isValid: " + formArr[1].isValid);

  return (
    <main className="h-screen max-w-6xl mx-auto">
      {/* <FormPage /> */}
      <section className="h-full w-full">
        <SignupNav />
        <main className="flex justify-center">
          <section className="p-4 mt-20 w-[450px] h-fit bg-secondary rounded-lg border border-borderWhite">
            <div className="text-base mb-1 tracking-wider text-stone-400">
              Welcome to Imcookin!
            </div>
            <div className="text-base tracking-wider text-stone-400">
              Let's begin the adventure
            </div>
            {JSON.stringify(valid)}
            <form className="mt-5">
              {formArr.map((input, i) => {
                return input.isNext ? (
                  <main>
                    {`${JSON.stringify(apiResponse)}`}
                    <section className="flex items-end" key={input.name}>
                      <section className="mt-3 w-full">
                        <InputTag
                          label={input.label}
                          name={input.name}
                          type={"text"}
                          value={input.value}
                          // isMandatory={}
                          onChange={(e) => onHandleChange(e, i)}
                        />
                      </section>
                      {input.isComplete && (
                        <button
                          className={`${
                            formArr[i].isValid ? "text-green-500" : "text-white"
                          } py-1 px-3 ml-2 text-sm border border-borderWhite bg-secondaryDark rounded-md shadow-md`}
                          onClick={(e) => onContinueClick(e, i)}
                          // onClick={(e) => onContinueClick()}
                        >
                          Continue
                        </button>
                      )}
                    </section>
                    {apiResponse !== "" && formArr[i].isValid === false && (
                      <p className={`mt-1.5 labelTag text-red-500`}>
                        {formArr[i].isValid === false &&
                          formArr[i].name === "email" &&
                          apiResponse.email}
                        {formArr[i].isValid === false &&
                          formArr[i].name === "username" &&
                          apiResponse.username}
                      </p>
                    )}
                  </main>
                ) : null;
              })}
            </form>
            <section>{/* <div>{apiResponse}</div> */}</section>
          </section>
        </main>
      </section>
    </main>
  );
};

export default Signup;
