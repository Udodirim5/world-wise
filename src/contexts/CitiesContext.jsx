/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

const CitiesContext = createContext(); // Ensure this is exported

// API endpoint for fetching cities
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: true,
  currentCity: {},
  error: "",
  alertMsg: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        alertMsg: "City added successfully!",
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
        alertMsg: "City deleted successfully!",
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Invalid action");
  }
};

const CitiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // eslint-disable-next-line no-unused-vars
  const { cities, isLoading, currentCity, alertMsg, error } = state;

  // Fetch cities from API
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There has been a problem with your fetch operation",
        });
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id) => {
    if (id === null || id === undefined) {
      return;
    }
    if (currentCity.id === Number(id)) {
      return currentCity;
    }

    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Something went wrong, Please try again later",
      });
    }
  };

  const createCity = async (newCity) => {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "Something went wrong, Please try again later",
      });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Update the cities state with the remaining cities after deletion
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city",
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        alertMsg,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

// Ensure both CitiesContext and CitiesProvider are exported
export { CitiesContext, CitiesProvider };
