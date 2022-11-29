import React from "react";
import Result from "./Result";
import SecondResult from "./SecondResult";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const JoinResult = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });
  return (
    <>
      {user ? (
        <div className="JoinResult">
          <Result></Result>
          <SecondResult></SecondResult>
        </div>
      ) : (
        <div>
          <h1>
            {" "}
            Please <Link to="/Login">LogIn</Link>{" "}
          </h1>
        </div>
      )}
    </>
  );
};

export default JoinResult;
