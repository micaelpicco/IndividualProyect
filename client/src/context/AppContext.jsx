import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  //Home filters states
  const [filterByContinent, setFilterByContinent] = useState("");
  const [filterByActivity, setFilterByActivity] = useState("");
  const [nameCountry, setNameCountry] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("ASC");
  const [pages, setPages] = useState(0);

  const context = {
    filterByContinent,
    setFilterByContinent,
    filterByActivity,
    setFilterByActivity,
    nameCountry,
    setNameCountry,
    sort,
    setSort,
    order,
    setOrder,
    pages,
    setPages,
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
