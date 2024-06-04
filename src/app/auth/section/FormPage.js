import React from "react";
import GoogleSigninBtn from "../../../components/GoogleSigninBtn";

const FormPage = () => {
  return (
    <main className="h-fit w-72 flex flex-col items-center justify-center">
      <section>
        <img alt="logo" />
      </section>
      <section>
        <h1 className="mb-3 text-2xl font-light">Sign in to Imcookin!</h1>
      </section>
      <section className="p-4 w-full bg-secondary rounded-lg border border-borderWhite">
        <form>
          <div className="inputCon">
            <label className="labelTag">Username or email address</label>
            <input className="inputTag" type="text" />
          </div>
          <div className="inputCon mt-3">
            <label className="labelTag flex">
              <span className="flex-grow">Password</span>
              <span className="text-blue-400">Forgot password?</span>
            </label>
            <input className="inputTag" type="password" />
          </div>
          <div className="mt-3 px-2 py-1 text-center bg-green-700 rounded-lg">
            <button>Sign in</button>
          </div>
        </form>
      </section>
      <section className="mt-4 p-4 w-full flex flex-col items-center justify-center rounded-lg border border-borderWhite">
        <GoogleSigninBtn />
        <label className="labelTag mt-2 flex">
          <span className="flex-grow">New to Imcookin?</span>
          <span className="text-blue-400">Create an account</span>
        </label>
      </section>
    </main>
  );
};

export default FormPage;
