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
    <div class="card">
      <h5 class="card_title">TOURIST ACTIVITY</h5>
      <ul class="card_list">
        <li>
          <u class="card_list_item">Type</u>: {name}
        </li>
        {difficult ? (
          <li>
            <u class="card_list_item">Difficulty (1-5)</u>: {difficult}
          </li>
        ) : (
          ""
        )}
        {duration ? (
          <li>
            <u class="card_list_item">Duration</u>: {duration} minutes
          </li>
        ) : (
          ""
        )}
        {season ? (
          <li>
            <u class="card_list_item">Season</u>: {season}
          </li>
        ) : (
          ""
        )}
        <li>
          <u class="card_list_item">Id</u>: {id}
        </li>
      </ul>
    </div>
  );
}
