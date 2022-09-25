import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getCountriesByActivity,
  getActivities,
} from "../store/actions";
import CountryCard from "./CountryCard";
//import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();

  //estados locales
  const [filterByContinent, setFilterByContinent] = useState("");
  const [filterByActivity, setFilterByActivity] = useState("");
  const [nameCountry, setNameCountry] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("ASC");
  const [pages, setPages] = useState(0);

  //ahora uso el useEffect el cual se ejecuta cuando se renderiza el componente Home o cuando algunos de los estados locales cambie listados en el array de dependencias. Cuando se ejecuta el use Effect entonces se dispara la accion getCountries, a la cual le paso todas las querys y le pega al back, que dependiendo las querys que le mande, me brinda una u otra info como un ARREGLO DE OBJETOS, donde cada objeto es un pais dependiendo si cumple o no con las querys que le paso. Esta info brindada la uso luego para  actualizar mi estado global de redux llamado countries, el cual e sun arreglod e objetos, el cual luego uso para renderizar lo que quiera en el componente.
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

  //me guardo todos los paises en la variable allCountries
  const allCountries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  const handleClickShowAll = (e) => {
    e.preventDefault();
    document.querySelector("select[name=activity]").value =
      "Filter by Activity";
    document.querySelector("select[name=continent]").value =
      "Filter by Continent";
    // document.querySelector("select[name=sort]").value = "Sort by...";
    // document.querySelector("select[name=order]").value = "Order by...";
    // document.querySelector("input[name=text]").value = "";

    setPages(0);
    setSort("name");
    setOrder("ASC");
    setFilterByContinent("");
    setFilterByActivity("");
    setNameCountry("");
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

  //BUSQUEDA
  const handleNameCountry = (e) => {
    e.preventDefault();
    setNameCountry(e.target.value);
  };

  //ORDENAMIENTO 1
  const changeSort = (e) => {
    e.preventDefault();
    setPages(0);
    setSort(e.target.value);
  };

  //ORDENAMIENTO 2
  const changeOrder = (e) => {
    e.preventDefault();
    setPages(0);
    setOrder(e.target.value);
  };

  //FILTRADO 1
  const changeFilterByContinent = (e) => {
    e.preventDefault();
    setPages(0);
    setFilterByContinent(e.target.value);
  };

  //FILTRADO 2
  const handleNameActivity = (e) => {
    e.preventDefault();
    setFilterByActivity(e.target.value);
  };

  const handleClickNameActivity = (e) => {
    e.preventDefault();
    if (filterByActivity === "") {
      return alert("A tourist activity must be selected.");
    }
    dispatch(getCountriesByActivity(filterByActivity));
  };

  //PAGINADO
  const start = (e) => {
    e.preventDefault();
    setPages(0);
  };

  const prev = (e) => {
    e.preventDefault();
    if (pages <= 0) {
      setPages(0);
    } else {
      setPages(pages - 10);
    }
  };

  const next = (e) => {
    e.preventDefault();
    if (allCountries.length < 10) {
      return;
    } else {
      setPages(pages + 10);
    }
  };

  //RETORNO
  return (
    <div className="contenedortotal">
      <NavBar />
      <div class="barra-total">
        <div className="barra2">
          <select
            class="filtrado"
            name="continent"
            onChange={(e) => changeFilterByContinent(e)}
          >
            <option disabled selected>
              Filter by Continent
            </option>
            <option value="">All</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Africa">Africa</option>
          </select>
          <select
            class="filtrado"
            name="activity"
            onChange={(e) => handleNameActivity(e)}
          >
            <option name="holaa" disabled selected>
              Filter by Activity
            </option>
            {[...new Set(activities?.map((e) => e.name))]?.map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </select>
          <button
            class="btn-filtrado"
            onClick={(e) => handleClickNameActivity(e)}
          >
            Search
          </button>
          <select
            class="ordenado"
            name="sort"
            value={sort}
            onChange={(e) => changeSort(e)}
          >
            <option disabled selected>
              Sort by...
            </option>
            <option value="name">Alphabetical order</option>
            <option value="population">Amount of population</option>
          </select>
          <select
            class="ordenado"
            name="order"
            value={order}
            onChange={(e) => changeOrder(e)}
          >
            <option disabled selected>
              Order by...
            </option>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
          <button
            class="show-all"
            onClick={(e) => {
              handleClickShowAll(e);
            }}
          >
            Show all
          </button>
        </div>
        <div class="barra4">
          <input
            class="buscador"
            id="text"
            name="text"
            type="text"
            value={nameCountry}
            placeholder="Search country..."
            onChange={(e) => handleNameCountry(e)}
          />
        </div>
        <div className="barra2">
          <button
            class="paginado"
            onClick={(e) => {
              start(e);
            }}
            disabled={pages <= 0}
          >
            {"Start"}
          </button>
          <button
            class="paginado"
            onClick={(e) => {
              prev(e);
            }}
            disabled={pages <= 0}
          >
            {"Prev"}
          </button>
          <button class="num-pag">{pages / 10}</button>
          <button
            class="paginado"
            onClick={(e) => {
              next(e);
            }}
            disabled={allCountries.length < 10}
          >
            {"Next"}
          </button>
        </div>
      </div>

      <div class="contenedorpaises">
        {allCountries?.map((el) => {
          return (
            <NavLink class="link" to={`/home/${el.id}`}>
              <CountryCard
                name={el.name}
                flags={el.flags}
                continents={el.continents}
                key={el.id}
                id={el.id}
              />
            </NavLink>
          );
        })}
      </div>
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
