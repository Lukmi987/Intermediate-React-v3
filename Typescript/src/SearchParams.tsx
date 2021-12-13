import React, { useState, useEffect, useContext } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import { PetAPIResponse, Animal, Pet } from "./APIResponseTypes";
import { RouteComponentProps } from "react-router-dom";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams: React.FC = () => {
  const [location, setLocation] = useState("Seattle,WA" as Animal);
  const [animal, setAnimal] = useState("dog" as Animal);
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breedList, status] = useBreedList(animal);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    void requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //creating inside of the render, coz now we have a closure where I can access all useStates
  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = (await res.json() as PetAPIResponse);
    const { pets } = json;
    setPets(pets);
  }
  console.log("pets are", pets);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          //prevent from submitting otherwise it will refresh the page
          console.log("calling on submit");
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          location
          <input
            id="location"
            onChange={(e) => setLocation(e.target.value as any)}
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value as Animal)}
            onBlur={(e) => setAnimal(e.target.value as Animal)}
          >
            <option />
            {ANIMALS.map((animal) => {
              return (
                <option value={animal} key={animal}>
                  {animal}{" "}
                </option>
              );
            })}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breedList.map((breed) => {
              return (
                <option value={breed} key={breed}>
                  {breed}{" "}
                </option>
              );
            })}
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
