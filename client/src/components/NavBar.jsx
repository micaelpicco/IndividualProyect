import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div class="nav-bar">
      <p class="nav-bar_description">
        HERNY INDIVIDUAL PROYECT - COUNTRIES APP
      </p>
      <NavLink class="nav-bar_link" to="/home">
        Home
      </NavLink>
      <NavLink class="nav-bar_link" to="/favorites">
        Favorite countries
      </NavLink>
      <NavLink class="nav-bar_link" to="/activity">
        Create tourist activity
      </NavLink>
    </div>
  );
}
