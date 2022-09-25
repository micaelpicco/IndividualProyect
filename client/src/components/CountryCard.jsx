import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFavourites } from "../store/actions";
import "./CountryCard.css";

export default function CountryCard({ name, flags, continents, id }) {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.countries);
  const favouriteCountries = useSelector((state) => state.favourites);

  const [favourite, setFavourite] = useState([]);

  useEffect(() => {
    dispatch(postFavourites(favourite));
  }, [dispatch, favourite]);

  const handleFavouriteCountry = async (e, id) => {
    e.preventDefault();
    if ((favouriteCountries?.filter((el) => el.id === id)).length) {
      return alert("The country has already been added to the favorites list.");
    }
    setFavourite(countries.filter((el) => el.id === id));
  };

  return (
    <div className="pais">
      <img src={flags} alt="img not found" class="imagen" />
      <div className="caracteristicas">
        <p class="description">{name}</p>
        <p class="description">{continents}</p>
        <button
          class="btn-country"
          onClick={(e) => handleFavouriteCountry(e, id)}
        >
          Add to Fav
        </button>
      </div>
    </div>
  );
}
