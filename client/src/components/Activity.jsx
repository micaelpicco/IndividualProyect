import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postActivity,
  clearNameCountriesForm,
  getNameCountriesForm,
  getActivities,
} from "../store/actions";
import NavBar from "./NavBar";
import "./Activity.css";

export default function Activity(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const newCountry = useSelector((state) => state.activityForm);

  const [activity, setActivity] = useState("");
  const [difficult, setDifficult] = useState(null);
  const [duration, setDuration] = useState(null);
  const [season, setSeason] = useState(null);
  const [nameCountry, setNameCountry] = useState("");
  const [countriesId, setCountriesId] = useState([]);
  const [countries, setCountries] = useState([]);

  const [errorActivity, setErrorActivity] = useState(true);
  const [errorDifficult, setErrorDifficult] = useState(true);
  const [errorDuration, setErrorDuration] = useState(true);
  const [errorSeason, setErrorSeason] = useState(true);
  const [errorNameCountry, setErrorNameCountry] = useState(true);

  //GLOBAL STATE
  useEffect(() => {
    setCountries(
      [...countries, ...newCountry].reduce((arr, el) => {
        if (!arr.find((d) => d.id === el.id)) {
          arr.push(el);
        }

        return arr;
      }, [])
    );
  }, [dispatch, newCountry]);

  //LOCAL STATE
  useEffect(() => {
    setCountriesId([...new Set(countries.map((el) => el.id))]);
  }, [dispatch, countries]);

  //SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postActivity(activity, difficult, duration, season, countriesId));
    dispatch(getActivities());
    alert("The activity has been created successfully");
    dispatch(clearNameCountriesForm());
    history.push("/home");
  };

  //INPUTS
  function handleActivity(value) {
    if (
      !isNaN(parseInt(value)) ||
      value.length === 0 ||
      /[$%&|<>#0-9]/.test(value)
    ) {
      setErrorActivity(
        "The activity cannot be empty or contain special characters or numbers."
      );
    } else {
      setErrorActivity("");
    }
    setActivity(value);
  }

  function handleDifficult(value) {
    if (value === "") return setErrorDifficult("");
    if (isNaN(parseInt(value)) || value < 1 || value > 5) {
      setErrorDifficult("The difficulty must be a number between 1 and 5.");
    } else {
      setErrorDifficult("");
    }
    setDifficult(value);
  }

  function handleDuration(value) {
    if (value === "") return setErrorDuration("");
    if (isNaN(parseInt(value)) || value < 1) {
      setErrorDuration("The duration must be a number greater than 0.");
    } else {
      setErrorDuration("");
    }
    setDuration(value);
  }

  function handleSeason(value) {
    if (value === "") return setErrorSeason("");
    if (
      !(
        value === "Summer" ||
        value === "Winter" ||
        value === "Spring" ||
        value === "Autumn"
      )
    ) {
      setErrorSeason("The season must be Summer, Winter, Spring or Autumn.");
    } else {
      setErrorSeason("");
    }
    setSeason(value);
  }

  function handleNameCountry(value) {
    if (!isNaN(parseInt(value)) || /[$%&|<>#0-9]/.test(value)) {
      setErrorNameCountry(
        "The country name cannot be empty and must contain at least 2 letters and no numbers."
      );
    } else {
      setErrorNameCountry("");
      setNameCountry(value);
    }
  }

  //GET COUNTRIES
  const handleGetNameCountries = async (e) => {
    e.preventDefault();
    if (nameCountry.length < 2)
      return setErrorNameCountry(
        "The country name must contain at least 2 letters and no numbers."
      );
    setErrorNameCountry("");
    dispatch(getNameCountriesForm(nameCountry));
  };

  //DELETE COUNTRIES
  const handleDeleteAllCountries = async (e) => {
    e.preventDefault();
    setCountries([]);
  };

  const handleDeleteCountry = async (e, id) => {
    e.preventDefault();
    setCountries(countries.filter((el) => el.id !== id));
  };

  //HOME
  const returnToHome = async (e) => {
    e.preventDefault();
    dispatch(clearNameCountriesForm());
    history.push("/home");
  };

  return (
    <div class="activity-container">
      <NavBar />

      <form
        class="activity-container_form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div class="form_input">
          <label class="input_label">ACTIVITY</label>
          <input
            class="input_select"
            type="text"
            placeholder="Activity..."
            onChange={(e) => {
              handleActivity(e.target.value);
            }}
          />
          <div class="input_error">
            {" "}
            {!errorActivity ? null : <span>{errorActivity}</span>}
          </div>
        </div>

        <div class="form_input">
          <label class="input_label">DIFFICULTY (1-5)</label>
          <input
            type="text"
            class="input_select"
            placeholder="Difficulty..."
            onChange={(e) => {
              handleDifficult(e.target.value);
            }}
          />
          <div class="input_error">
            {!errorDifficult ? null : <span>{errorDifficult}</span>}
          </div>
        </div>

        <div class="form_input">
          <label class="input_label">DURATION (min)</label>
          <input
            class="input_select"
            type="text"
            placeholder="Duration..."
            onChange={(e) => {
              handleDuration(e.target.value);
            }}
          />
          <div class="input_error">
            {!errorDuration ? null : <span>{errorDuration}</span>}
          </div>
        </div>

        <div class="form_input">
          <label class="input_label">SEASON</label>
          <input
            class="input_select"
            type="text"
            placeholder="Season..."
            onChange={(e) => {
              handleSeason(e.target.value);
            }}
          />
          <div class="input_error">
            {!errorSeason ? null : <span>{errorSeason}</span>}
          </div>
        </div>

        <div class="form_input">
          <label class="input_label">COUNTRIES</label>
          <input
            class="input_select"
            type="text"
            placeholder="Search country..."
            onChange={(e) => {
              handleNameCountry(e.target.value);
            }}
          />
          <div class="input_error">
            {!errorNameCountry ? null : <span>{errorNameCountry}</span>}
          </div>
          <button
            class="form_btn-search"
            onClick={(e) => handleGetNameCountries(e)}
          >
            Search
          </button>

          <div>
            {countries?.map((el) => (
              <div class="container_input_countries">
                <p class="countries_name">{el.id}</p>
                <img
                  src={el.flags}
                  alt="img not found"
                  class="countries_img"
                  key={el.id}
                />
                <button
                  class="countries_delete"
                  onClick={(e) => handleDeleteCountry(e, el.id)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <button
            class="form_btn-search"
            onClick={(e) => handleDeleteAllCountries(e)}
          >
            Delete all
          </button>
        </div>

        <button
          type="submit"
          class="form_btn-send"
          disabled={errorActivity || errorNameCountry || !countries.length}
        >
          Send activity
        </button>
      </form>
      <div>
        <button class="btn_activity-return" onClick={(e) => returnToHome(e)}>
          Return to Home
        </button>
      </div>
      <footer class="footer">
        <p class="footer_description">
          Created by Micael Picco
          <a
            class="footer_link"
            href="https://linkedin.com/in/micaelpicco"
            target="_blank"
            rel="noreferrer"
          >
            Linkedin
          </a>
          <a
            class="footer_link"
            href="https://github.com/micaelpicco"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
