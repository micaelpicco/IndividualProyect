import React from "react";
import "./ActivityCard.css";

export default function ActivityCard({
  id,
  name,
  difficult,
  duration,
  season,
}) {
  return (
    <div class="div">
      <h5 className="titulo">TOURIST ACTIVITY</h5>
      <ul class="lista">
        <li>
          <u class="title">Type</u>: {name}
        </li>
        <li>
          <u class="title">Difficult (1-5)</u>: {difficult}
        </li>
        <li>
          <u class="title">Duration</u>: {duration} minutes
        </li>
        <li>
          <u class="title">Season</u>: {season}
        </li>
        <li>
          <u class="title">Identifier</u>: {id}
        </li>
      </ul>
    </div>
  );
}
