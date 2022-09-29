import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFavourites } from "../store/actions";
import "./CountryCard.css";

export default function CountryCard({ name, flags, continents, id }) {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.countries);
  const favouriteCountries = useSelector((state) => state.favourites);

  const handleFavouriteCountry = async (e, id) => {
    e.preventDefault();
    if ((favouriteCountries?.filter((el) => el.id === id)).length) {
      return alert("The country has already been added to the favorites list.");
    }
    dispatch(postFavourites(countries.filter((el) => el.id === id)));
  };

  return (
    <div class="container-country">
      <img src={flags} alt="img not found" class="country_img" />
      <div>
        <p class="country_description">{name}</p>
        <p class="country_description">{continents}</p>
        <button
          class="country_btn-fav"
          onClick={(e) => handleFavouriteCountry(e, id)}
        >
          Add to Fav
        </button>
      </div>
    </div>
  );
}
