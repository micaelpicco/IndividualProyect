import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearDetails } from "../store/actions";
import ActivityCard from "./ActivityCard";
import NavBar from "./NavBar";
import "./Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  });

  const myCountry = useSelector((state) => state.detail);

  const returnToHome = async (e) => {
    e.preventDefault();
    dispatch(clearDetails());
    history.push("/home");
  };

  return (
    <div class="total-container">
      <NavBar />

      <div class="total-container_detail">
        <h5 class="detail_caracteristic">
          <u>COUNTRY</u>: {myCountry.name}
        </h5>
        <h5 class="detail_caracteristic">
          <u>ID</u>: {myCountry.id}
        </h5>
        <img
          src={myCountry.flags}
          alt="img not found"
          width="200px"
          height="200px"
          class="detail_img"
        />
        <h5 class="detail_caracteristic">
          <u>CONTINENT</u>: {myCountry.continents}
        </h5>
        <h5 class="detail_caracteristic">
          <u>CAPITAL</u>: {myCountry.capital}
        </h5>
        <h5 class="detail_caracteristic">
          <u>SUBREGION</u>: {myCountry.subregion}
        </h5>
        <h5 class="detail_caracteristic">
          <u>AREA</u>: {myCountry.area} km²
        </h5>
        <h5 class="detail_caracteristic">
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
      <div>
        <button class="btn-return" onClick={(e) => returnToHome(e)}>
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
