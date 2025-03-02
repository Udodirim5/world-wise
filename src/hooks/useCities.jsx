import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext"; 

const useCities = () => {
  const contexts = useContext(CitiesContext);
  if (!contexts || contexts === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return contexts;
};

export { useCities };
