import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities } from "../store/actions";
import { useContext } from "react";
import { AppContext } from "context/AppContext";
import CountryCard from "./CountryCard";
import NavBar from "./NavBar";
import { useLocalStorage } from "./useLocalStorage";

import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();

  // const {
  //   filterByContinent,
  //   setFilterByContinent,
  //   filterByActivity,
  //   setFilterByActivity,
  //   nameCountry,
  //   setNameCountry,
  //   sort,
  //   setSort,
  //   order,
  //   setOrder,
  //   pages,
  //   setPages,
  // } = useContext(AppContext);

  const [filterByContinent, setFilterByContinent] = useLocalStorage(
    "filterByContinent",
    ""
  );
  const [filterByActivity, setFilterByActivity] = useLocalStorage(
    "filterByActivity",
    ""
  );
  const [nameCountry, setNameCountry] = useLocalStorage("nameCountry", "");
  const [sort, setSort] = useLocalStorage("sort", "");
  const [order, setOrder] = useLocalStorage("order", "");
  const [pages, setPages] = useLocalStorage("pages", "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      getCountries(
        nameCountry,
        pages,
        sort,
        order,
        filterByContinent,
        filterByActivity
      )
    );
    dispatch(getActivities());
  }, [
    dispatch,
    nameCountry,
    pages,
    sort,
    order,
    filterByContinent,
    filterByActivity,
  ]);

  const allCountries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  //SEARCH
  const handleNameCountry = (e) => {
    e.preventDefault();
    setLoading(false);
    setPages(0);
    setNameCountry(e.target.value);
  };

  //SORT
  const changeSort = (e) => {
    e.preventDefault();
    setPages(0);
    setSort(e.target.value);
  };

  //ORDER
  const changeOrder = (e) => {
    e.preventDefault();
    setPages(0);
    setOrder(e.target.value);
  };

  //FILTER CONTINENT
  const changeFilterByContinent = (e) => {
    e.preventDefault();
    setPages(0);
    setLoading(false);
    setFilterByContinent(e.target.value);
  };

  //FILTER ACTIVITY
  const handleNameActivity = (e) => {
    e.preventDefault();
    setFilterByActivity(e.target.value);
  };

  //PAGINATED
  const start = (e) => {
    e.preventDefault();
    setPages(0);
  };

  const prev = (e) => {
    e.preventDefault();
    setPages(pages - 10);
  };

  const next = (e) => {
    e.preventDefault();
    setPages(pages + 10);
  };

  //SHOW ALL
  const handleClickShowAll = (e) => {
    e.preventDefault();
    setPages(0);
    setFilterByContinent("");
    setFilterByActivity("");
    setNameCountry("");
    setOrder(order);
    setSort(sort);
    dispatch(
      getCountries(
        nameCountry,
        pages,
        sort,
        order,
        filterByContinent,
        filterByActivity
      )
    );
  };

  return (
    <div class="container-home">
      <NavBar />
      <div class="container-home_options">
        <div class="options">
          <b>Filter by Continent:</b>
          <select
            class="options_filter"
            name="continent"
            value={filterByContinent}
            onChange={(e) => changeFilterByContinent(e)}
          >
            <option value="">All</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Africa">Africa</option>
          </select>
          <b> Filter by Activity:</b>
          <select
            class="options_filter"
            name="activity"
            value={filterByActivity}
            onChange={(e) => handleNameActivity(e)}
          >
            {activities.length ? (
              <option value="">Select activity</option>
            ) : (
              <option value="">No activities yet</option>
            )}
            {[...new Set(activities?.map((e) => e.name))]?.map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </select>
          <b> Order by:</b>
          <select
            class="options_sort"
            value={sort}
            onChange={(e) => changeSort(e)}
          >
            <option value="name">Alphabetical order</option>
            <option value="population">Amount of population</option>
          </select>
          <select
            class="options_order"
            value={order}
            onChange={(e) => changeOrder(e)}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
          <button
            class="options_show-all"
            onClick={(e) => {
              handleClickShowAll(e);
            }}
          >
            Show all
          </button>
        </div>
        <div class="options_search">
          <input
            class="search_country"
            id="text"
            type="text"
            value={nameCountry}
            placeholder="Search country..."
            onChange={(e) => handleNameCountry(e)}
          />
        </div>

        <div class="options_paginated">
          <button
            class="paginated_pages"
            onClick={(e) => {
              start(e);
            }}
            disabled={pages <= 0}
          >
            {"Start"}
          </button>
          <button
            class="paginated_pages"
            value={pages}
            onClick={(e) => {
              prev(e);
            }}
            disabled={pages <= 0}
          >
            {"Prev"}
          </button>
          <button class="paginated_num">{pages / 10}</button>
          <button
            class="paginated_pages"
            onClick={(e) => {
              next(e);
            }}
            disabled={allCountries.length < 10 || filterByActivity}
          >
            {"Next"}
          </button>
        </div>
      </div>

      <div class="container_countries-cards">
        {allCountries.length ? (
          filterByActivity ? (
            allCountries
              .filter(
                (el) =>
                  el.activities &&
                  el.activities
                    .map((act) => act.name)
                    .includes(filterByActivity)
              )
              ?.map((el) => {
                return (
                  <NavLink class="countries-cards_link" to={`/home/${el.id}`}>
                    <CountryCard
                      name={el.name}
                      flags={el.flags}
                      continents={el.continents}
                      key={el.id}
                      id={el.id}
                    />
                  </NavLink>
                );
              })
          ) : pages === 0 ? (
            allCountries?.map((el) => {
              return (
                <NavLink class="countries-cards_link" to={`/home/${el.id}`}>
                  <CountryCard
                    name={el.name}
                    flags={el.flags}
                    continents={el.continents}
                    key={el.id}
                    id={el.id}
                  />
                </NavLink>
              );
            })
          ) : (
            allCountries?.map((el) => {
              return (
                <NavLink class="countries-cards_link" to={`/home/${el.id}`}>
                  <CountryCard
                    name={el.name}
                    flags={el.flags}
                    continents={el.continents}
                    key={el.id}
                    id={el.id}
                  />
                </NavLink>
              );
            })
          )
        ) : loading ? (
          <div class="country-fav_not-exist">LOADING...</div>
        ) : (
          <div>
            <div class="country-fav_not-exist">
              NO COUNTRIES
              <div>
                <br></br>
                <button
                  class="options_show-all"
                  onClick={(e) => {
                    handleClickShowAll(e);
                  }}
                >
                  Show all
                </button>
              </div>
            </div>
          </div>
        )}
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
