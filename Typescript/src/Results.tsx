import React from "react";
import Pet from "./Pet";
import {  Pet as PetProps } from "./APIResponseTypes";

const Results: React.FC<{pets: PetProps[]}> = ({pets}) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No pets found!!!</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            key={pet.id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
