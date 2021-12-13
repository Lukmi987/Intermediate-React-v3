import { useState, useEffect } from "react";
import { Animal, BreedListAPIResponse } from './APIResponseTypes';

const localCache: {[index: string]: string[]} = {};

type Status = "unloaded" | "loading" | "loaded";

//Anytime animal changes we are gonna get a new BreedList from Api
export default function useBreedList(animal: Animal): [string[], Status] {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState<Status>("unloaded" as Status);
  console.log("v hook");
 
  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
     void requestBreedList(); // void to ignore returned promise
    }
    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = (await res.json() as BreedListAPIResponse);
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
