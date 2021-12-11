import { useState, useEffect } from "react";

//if the rasa is not gonna have changed, I do not need to re-request it, I am just store it locally,
const localCache = {};

//Anytime animal changes we are gonna get a new BreedList from Api
export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");
  console.log("v hook");
  // When does this effect runs : animal is the thing that we reference from outside of it, so every time we
  // get new animal back from the user run the effect
  useEffect(() => {
    console.log("jsem v useEffectu v hooku");
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      // if i have already requested previous time
      setBreedList(localCache[animal]);
    } else {
      // otherwise go to API and go get it for me !!!
      requestBreedList();
    }
    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
