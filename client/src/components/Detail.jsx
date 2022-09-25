import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../store/actions";
import ActivityCard from "./ActivityCard";
import NavBar from "./NavBar";
import "./Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  });

  const myCountry = useSelector((state) => state.detail);

  return (
    <div class="contenedor">
      <NavBar />

      <div class="contenedor2">
        <h5 className="caracteristic">
          <u>COUNTRY</u>: {myCountry.name}
        </h5>
        <h5 className="caracteristic">
          <u>ABBREVIATION</u>: {myCountry.id}
        </h5>
        <img
          src={myCountry.flags}
          alt="img not found"
          width="200px"
          height="200px"
          class="detalle"
        />
        <h5 className="caracteristic">
          <u>CONTINENT</u>: {myCountry.continents}
        </h5>
        <h5 className="caracteristic">
          <u>CAPITAL</u>: {myCountry.capital}
        </h5>
        <h5 className="caracteristic">
          <u>SUBREGION</u>: {myCountry.subregion}
        </h5>
        <h5 className="caracteristic">
          <u>AREA</u>: {myCountry.area} km²
        </h5>
        <h5 className="caracteristic">
          <u>TOTAL POPULATION</u>: {myCountry.population} habitants
        </h5>

        {myCountry.activities?.map((el) => (
          <ActivityCard
            id={el.id}
            name={el.name}
            difficult={el.difficult}
            duration={el.duration}
            season={el.season}
            key={el.id}
          />
        ))}
      </div>
      <NavLink to="/home">
        <button class="return">Return to Home</button>
      </NavLink>
      <footer class="footer">
        <p className="pepe">
          Created by Micael Picco
          <a
            className="enlaces"
            href="https://linkedin.com/in/micaelpicco"
            target="_blank"
            rel="noreferrer"
          >
            Linkedin
          </a>
          <a
            className="enlaces"
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
