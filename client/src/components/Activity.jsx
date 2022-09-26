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

  const country = useSelector((state) => state.activityForm); //este estado global se va a ir pisando continuamente ya que solo va a tener un objeto con el pais que me acaban de buscar

  const [activity, setActivity] = useState(""); //nombre de la actividad
  const [difficult, setDifficult] = useState("");
  const [duration, setDuration] = useState("");
  const [season, setSeason] = useState("");
  const [nameCountry, setNameCountry] = useState("");
  const [countriesId, setCountriesId] = useState([]); //id de los paises que buscan
  const [countObj, setCountObj] = useState([]); //estado local donde me guardo todos los paises que buscan como un array de objetos
  const [errorActivity, setErrorActivity] = useState(true);
  const [errorDifficult, setErrorDifficult] = useState(true);
  const [errorDuration, setErrorDuration] = useState(true);
  const [errorSeason, setErrorSeason] = useState(true);
  const [errorNameCountry, setErrorNameCountry] = useState(true);

  //uso un useEffect para que cada vez que me agreguen un pais, se vuelva a ejecutar, ya que al aregar un pais, cambia el estado global country. Por lo tanto esto useeffect se ejcuta cuando me agregan un pais, donde seteo el estado local que tiene todas los paises que me agregaron, con el pais nuevo y ademas setea el estado local countriesId el cual tiene todos los id de los paises que me agregaron. Saber que el set en este caso lo que espera es un arreglo de numeros y lo que hace es devolver un OBJETO con esos numeros eliminando los repetidos, pero como yo quiero un ARREGLO con esos numeros sin repetir, hago el spread operator donde [...{1,2,3,4}]=[1,2,3,4]
  useEffect(() => {
    let hash = {};
    setCountObj(
      [...countObj, ...country].filter((el) =>
        hash[el.id] ? false : (hash[el.id] = true)
      )
    );
    setCountriesId([...new Set(countObj.map((el) => el.id))]);
  }, [dispatch, country]);

  //este useeffect sirve para cuando me eliminan un pais que agregaron, ya que al eliminarlo, este pais debe eliminarse del estado local counObj que tiene todos los paises agregados y del estado local countriesId que tiene el id de todos los paises.
  useEffect(() => {
    setCountriesId([...new Set(countObj.map((el) => el.id))]);
  }, [dispatch, countObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postActivity(activity, difficult, duration, season, countriesId));
    dispatch(getActivities());
    alert("The activity has been created successfully");
    dispatch(clearNameCountriesForm()); //dispacho la accion ya que debo vaciar el estado global activityForm ya que sino me quedaria con un pais, y luego a la hora de entrar nuevamente en crear capitulo, se disparan los useeffect y me setearia cosas que no quiero.
    history.push("/home");
  };

  function handleActivity(value) {
    if (
      !isNaN(parseInt(value)) ||
      value.length === 0 ||
      /[$%&|<>#0-9]/.test(value)
    ) {
      setErrorActivity(
        "The activity type cannot contain special characters or numbers."
      );
    } else {
      setErrorActivity("");
    }
    setActivity(value);
  }

  function handleDifficult(value) {
    if (
      isNaN(parseInt(value)) ||
      value.length === 0 ||
      value < 1 ||
      value > 5
    ) {
      setErrorDifficult("The difficulty must be a number between 1 and 5.");
    } else {
      setErrorDifficult("");
    }
    setDifficult(value);
  }

  function handleDuration(value) {
    if (isNaN(parseInt(value)) || value.length === 0 || value < 1) {
      setErrorDuration("The duration must be a number greater than 0.");
    } else {
      setErrorDuration("");
    }
    setDuration(value);
  }

  function handleSeason(value) {
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
        "The country name must contain at least 2 letters and no numbers."
      );
    } else {
      setErrorNameCountry("");
      setNameCountry(value);
    }
  }

  const handleGetNameCountries = async (e) => {
    e.preventDefault();
    if (nameCountry.length < 2)
      return setErrorNameCountry(
        "The country name must contain at least 2 letters and no numbers."
      );
    setErrorNameCountry("");
    dispatch(getNameCountriesForm(nameCountry));
  };

  const handleDeleteAllCountries = async (e) => {
    e.preventDefault();
    setCountObj([]);
  };

  const handleDeleteCountry = async (e, id) => {
    e.preventDefault();
    setCountObj(countObj.filter((el) => el.id !== id));
    setCountriesId([...new Set(countObj.map((el) => el.id))]);
  };

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
            {countObj?.map((el) => (
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
          disabled={
            errorActivity ||
            errorDifficult ||
            errorDuration ||
            errorSeason ||
            errorNameCountry ||
            !countObj.length
          }
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
