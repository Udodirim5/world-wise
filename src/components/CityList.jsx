/* eslint-disable react/prop-types */

import Spinner from "../components/Spinner";
import Message from "./Message";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import { useCities } from "../hooks/useCities";

const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </div>
  );
};

export default CityList;
