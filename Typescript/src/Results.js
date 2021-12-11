import React from "react";
import Pet from "./Pet";

const Results = ({ pets }) => {
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
          // this would also work but not a good idea, but hard to hear, only work if the props in the pet are named the same as in map keys
          // Anyway don't do that hard to work with this
          // <Pet
          // {...pet}
          // key={pet.id}
          // />
        ))
      )}
    </div>
  );
};

export default Results;
