import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { AppContext } from "context/AppContext";
import {
  postFavourites,
  deleteCountry,
  getCountries,
  deleteCountryCard,
} from "../store/actions";
import "./CountryCard.css";

export default function CountryCard({ name, flags, continents, id }) {
  const dispatch = useDispatch();

  const {
    filterByContinent,
    filterByActivity,
    nameCountry,
    sort,
    order,
    pages,
  } = useContext(AppContext);

  const countries = useSelector((state) => state.countries);
  const favouriteCountries = useSelector((state) => state.favourites);

  const handleFavouriteCountry = async (e, id) => {
    e.preventDefault();
    if ((favouriteCountries?.filter((el) => el.id === id)).length) {
      return alert("The country has already been added to the favorites list.");
    }
    dispatch(postFavourites(countries.filter((el) => el.id === id)));
  };

  // const handleDeleteCountry = async (e, id) => {
  //   e.preventDefault();
  //   dispatch(deleteCountry(id));
  //   dispatch(deleteCountryCard(id));
  //   dispatch(
  //     getCountries(
  //       nameCountry,
  //       pages,
  //       sort,
  //       order,
  //       filterByContinent,
  //       filterByActivity
  //     )
  //   );
  // };

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
        {/* <button
          class="country_btn-fav"
          onClick={(e) => handleDeleteCountry(e, id)}
        >
          Delete
        </button> */}
      </div>
    </div>
  );
}
