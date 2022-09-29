import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavourites } from "../store/actions";
import NavBar from "./NavBar";
import "./Favourites.css";

export default function Favourites() {
  const dispatch = useDispatch();
  const history = useHistory();

  const favourites = useSelector((state) => state.favourites);

  return (
    <div class="container-favorites">
      <NavBar />
      <div class="container-favorites_countries-fav">
        {favourites.length ? (
          favourites?.map((el) => (
            <div class="countries-fav_country-fav">
              <img
                src={el.flags}
                alt="img not found"
                class="country-fav_image"
              />
              <p class="country-fav_description">{el.name}</p>
              <p class="country-fav_description">{el.continents}</p>
              <button
                class="country-fav_btn-remove "
                onClick={() => dispatch(deleteFavourites(el.id))}
              >
                Remove from Fav
              </button>
            </div>
          ))
        ) : (
          <div class="country-fav_not-exist">
            THERE ARE NO COUNTRIES ADDED TO FAVORITES
          </div>
        )}
      </div>
      <button
        class="btn_favorites-return"
        onClick={(e) => history.push("/home")}
      >
        Return to Home
      </button>
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
