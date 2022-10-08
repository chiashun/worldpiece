import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import validator from 'validator'
import ErrorMsg from "../ErrorsMsg";
const LogIn = () => {
  let history = useHistory();
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const [error,setError]=useState(false)
  const [errorvalue,setErrorValue]=useState("")
  const [errorval, setErrorVal] = useState({
    cognito: "",
    blankfield:false,
  });
  const [errorcode, setErrorCode] = useState({
    cognito: "",
    blankfield:false,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(error)
    {
      setError(false)
    }
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const { username, password } = formValue;
  const logIn = async () => {
    try {
      await Auth.signIn({
        username,
        password,
      });
      history.push("./home");
    } catch (error) {
      setError(true)
      setErrorVal((prevState) => {
        return {
          ...prevState,
          cognito: error,
        };
      });
      console.error("error", error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-xl rounded px-12 pt-8 pb-8 mb-4" style={{width:400}}>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h3>
          <div className={error?"bg-red-100 py-2 px-2 text-red-500 text-sm":"hidden"}>          <ErrorMsg errors={errorval} /></div>
          <div className="mt-4">Email</div>
          <input
            type="text"
            name="username"
            className="account-input bg-white focus:outline-none focus:shadow-outline border focus:border-primary rounded-sm py-1 px-2 block w-full appearance-none leading-normal"
            value={username}
            onChange={handleInputChange}
          />
          <div className="mt-4">Password</div>
          <input
            type="password"
            name="password"
            value={password}
            className="account-input bg-white focus:outline-none focus:shadow-outline border focus:border-primary rounded-sm py-1 px-2 block w-full appearance-none leading-normal"
            onChange={handleInputChange}
          />
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => logIn()}
              className=" rounded inline-flex items-center items-center border-2 border-secondary hover:bg-secondary text-secondary-main hover:text-white py-2 px-8 font-semibold tracking-wide focus:outline-none"
            >
              Sign In
            </button>
            <Link
              to={{
                pathname: "/forget",
              }}
             className="font-semibold" style={{ fontSize: 12 }}>
              Forgot password?
            </Link>
          </div>
          <div className="w-full flex mt-4">
            <p className="text-gray-700 pb-2 pt-2 text-sm">
              Don't have an account?
            </p>
            <Link
              to={{
                pathname: "/signup",
              }}
              className="pt-2 text-sm text-blue-500 hover:text-blue-600"
            >
              <div className="pl-2 text-secondary font-bold">Sign Up</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
