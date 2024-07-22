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
      isMandatory: true,
    },
    {
      label: "Create a password",
      name: "password",
      value: signupData.password,
      isComplete: false,
      isNext: false,
      isMandatory: true,
    },
    {
      label: "Enter your name",
      name: "name",
      value: signupData.name,
      isComplete: false,
      isNext: false,
      isMandatory: true,
    },
    {
      label: "Enter username",
      name: "username",
      value: signupData.username,
      isComplete: false,
      isNext: false,
      isMandatory: true,
    },
  ]);

  const [apiResponse, setApiResponse] = useState("");
  const [query, setQuery] = useState("");
  const [currField, setCurrField] = useState("");

  const sendQuery = async (currField, value) => {
    try {
      // const ax = await ax_signup({ [currField]: value });
      const ax = await ax_isEmailUsernameUnique({ [currField]: value });
      console.log("currField " + currField);
      console.log("query: " + JSON.stringify({ [currField]: value }));
      console.log("ax - Response: ", JSON.stringify(ax));
      if (ax.data.code === 201) {
        setApiResponse(ax.data.description);
      } else {
        setApiResponse("");
      }
    } catch (error) {
      console.error("Error: ", JSON.stringify(error));
    }
  };

  // Use the custom debounce hook
  const debouncedSendQuery = useDebounce(sendQuery, 500);

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setSignupData({
      ...signupData,
      [name]: value,
    });
    setCurrField(name); // captures the focused field

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
      debouncedSendQuery(name, value);
    }
  };

  console.log("query: " + query);
  /**
   * Handles the click event when the "Continue" button is clicked.
   *
   * @param {Event} e - The click event object.
   * @param {Array} arr - The array of form inputs.
   * @param {number} i - The index of the current form input.
   */
  const onContinueClick = (e, i) => {
    e.preventDefault();

    setFormArr((prevArr) =>
      prevArr.map((input, index) =>
        index === i + 1 ? { ...input, isNext: true, isComplete: true } : input
      )
    );
  };

  // useEffect(() => {
  //   if (signupData.email !== "" || signupData.username !== "") {
  //     if (currField === "email" && formArr[0].isComplete) {
  //       setQuery(signupData.email);
  //     } else if (currField === "username" && formArr[3].isComplete) {
  //       setQuery(signupData.username);
  //     }
  //     console.log("test");
  //   }
  // }, [currField, signupData]);
  // }, [currField, signupData, formArr]);

  // console.log("formArr --> " + JSON.stringify(formArr));
  // console.log("currField --> " + JSON.stringify(currField));
  // console.log("query --> " + JSON.stringify(query));

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
            {JSON.stringify(query)}
            <form className="mt-5">
              {formArr.map((input, i) => {
                return input.isNext ? (
                  <main>
                    <section className="flex items-end" key={input.name}>
                      <section className="mt-3 w-full">
                        <InputTag
                          label={input.label}
                          name={input.name}
                          type={"text"}
                          value={input.value}
                          // isMandatory={}
                          onChange={onHandleChange}
                        />
                      </section>
                      {input.isComplete && (
                        <button
                          className={` py-1 px-3 ml-2 text-sm border border-borderWhite bg-secondaryDark rounded-md shadow-md`}
                          onClick={(e) => onContinueClick(e, i)}
                          // onClick={(e) => onContinueClick()}
                        >
                          Continue
                        </button>
                      )}
                    </section>
                    {apiResponse !== "" && (
                      <p className={`mt-1.5 labelTag text-red-500`}>
                        {apiResponse}
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
