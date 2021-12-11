import React, { useState, useEffect, useContext } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

//Warning: You provided a `value` prop to a form field without an `onChange` handler.
// Keep in Mind How React Works: Every time React detects a change anywhere, it reruns its render cycle
// Now When i write a key to input a react is gonna kick rerender cycle, the component will rerender with the same state
// With the location prop

// to be triple secure freeze will make it read only
const ANIMALS = Object.freeze(["bird", "cat", "dog", "rabbit", "reptile"]);

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle,WA");
  const [animal, setAnimal] = useState("dog");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breedList, status] = useBreedList(animal);
  const [theme] = useContext(ThemeContext);

  useEffect(() => {
    console.log("useEffect runs agian");
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //creating inside of the render, coz now we have a closure where I can access all useStates
  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
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
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
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
