import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountries } from "../store/actions";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div class="container">
      <h3 class="container_welcome">Welcome</h3>
      <h1>Countries App</h1>
      <div>
        <Link to="/home" class="container_btn">
          Discover your next destination!
        </Link>
      </div>
    </div>
  );
}
