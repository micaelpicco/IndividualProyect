import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavourites } from "../store/actions";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import "./Favourites.css";

export default function Favourites() {
  const dispatch = useDispatch();
  const history = useHistory();

  const favourites = useSelector((state) => state.favourites);

  return (
    <div className="container-total">
      <NavBar />
      <div className="containter-fav">
        {favourites.length ? (
          favourites?.map((el) => (
            <div className="fav">
              <NavLink class="link" to={`/home/${el.id}`}>
                <img src={el.flags} alt="img not found" class="image" />
                <p class="descrip">{el.name}</p>
                <p class="descrip">{el.continents}</p>
              </NavLink>
              <button
                class="btn-remove "
                onClick={() => dispatch(deleteFavourites(el.id))}
              >
                Remove from Fav
              </button>
            </div>
          ))
        ) : (
          <div class="not-exist">THERE ARE NO COUNTRIES ADDED TO FAVORITES</div>
        )}
      </div>
      <button class="return-home" onClick={(e) => history.push("/home")}>
        Return to Home
      </button>
      <footer class="footer">
        <p class="pepe">
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
