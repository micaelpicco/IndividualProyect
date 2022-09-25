import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="barra1">
      <p class="countries-app">HERNY INDIVIDUAL PROYECT - COUNTRIES APP</p>
      <NavLink class="link-barra1" to="/home">
        Home
      </NavLink>
      <NavLink class="link-barra1" to="/favorites">
        Favorite countries
      </NavLink>
      <NavLink class="link-barra1" to="/activity">
        Create tourist activity
      </NavLink>
    </div>
  );
}
