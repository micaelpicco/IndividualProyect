const initialState = {
  countries: [],
  activityForm: [],
  detail: [],
  activities: [],
  favourites: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };
    case "GET_NAME_COUNTRIES_FORM":
      return {
        ...state,
        activityForm: action.payload,
      };
    case "CLEAR_NAME_COUNTRIES_FORM":
      return {
        ...state,
        activityForm: [],
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };
    case "POST_FAVOURITE":
      return {
        ...state,
        favourites: state.favourites.concat(action.payload),
      };
    case "DELETE_FAVOURITE":
      return {
        ...state,
        favourites: state.favourites.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
}

export default rootReducer;
