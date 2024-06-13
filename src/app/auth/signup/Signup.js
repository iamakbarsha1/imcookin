import React, { useEffect, useState } from "react";
import InputTag from "../../../components/InputTag";
import SignupNav from "../../../components/SignupNav";
import { toFormData } from "axios";
import { ax_signup } from "../../../api/auth";
import { debounce } from "../../../utils/debounce";
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

  // const query = { email: "", password: "", name: "", username: "" };

  const sendQuery = async (currField) => {
    const ax = await ax_signup(query);
    console.log("ax ---> " + JSON.stringify(ax));
  };

  // const debouncedSendQuery = debounce(sendQuery, 300);
  const debouncedSendQuery = debounce((query) => sendQuery(query), 1000);
  console.log("debouncedSendQuery " + debouncedSendQuery());
  // const sendQuery =

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setCurrField(name); // captures the focused field

    setSignupData({
      ...signupData,
      [name]: value,
    });

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

    if (signupData.email !== "" || signupData.username !== "") {
      debouncedSendQuery(query);
    }
  };

  /**
   * Handles the click event when the "Continue" button is clicked.
   *
   * @param {Event} e - The click event object.
   * @param {Array} arr - The array of form inputs.
   * @param {number} i - The index of the current form input.
   */
  const onContinueClick = (e, arr, i) => {
    e.preventDefault();

    setFormArr((prevArr) =>
      prevArr.map((input, index) =>
        index === i + 1 ? { ...input, isNext: true, isComplete: true } : input
      )
    );
  };

  useEffect(() => {
    if (signupData.email !== "" || signupData.username !== "") {
      if (currField === formArr[0].name && formArr[0].isComplete === true) {
        setQuery(signupData.email);
      } else if (
        currField === formArr[3].name &&
        formArr[3].isComplete === true
      ) {
        setQuery(signupData.username);
      }
      console.log("test");
    }
  }, [currField, signupData]);

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
                  <main className="flex items-end" key={input.name}>
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
                        onClick={(e) => onContinueClick(e, formArr[i + 1], i)}
                        // onClick={(e) => onContinueClick()}
                      >
                        Continue
                      </button>
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
