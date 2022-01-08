import { expect, test } from "@jest/globals";
import { render } from '@testing-library/react';
import { list } from "postcss";
import { StaticRouter } from "react-router-dom";
import useBreedList from "../useBreedList";
import { renderHook } from "@testing-library/react-hooks"


// function getBreedList(animal) {
// let list;
    
// function TestComponent () {
//         list = useBreedList(animal);
//         return null;
//     }

//     render(<TestComponent />)
//     return list;
// }



test("display emtpy breedList", async () => {
   const { result } =  renderHook( () => useBreedList());
    const [ breedList, status] = result.current;
    
    expect(breedList).toHaveLength(0);
    expect(status).toBe("unloaded");
})

    test("gives back breeds with an animal", async () => {
        const breeds = [
            "Havanese",
            "Bichon Frise",
            "Poodle",
            "Corgie"
        ];
        fetch.mockResponseOnce(JSON.stringify({
            animal: "dog",
            breeds
        }))

        const {result , waitForNextUpdate} = renderHook(() => useBreedList("dog"))

        // wait for that update and then we can test it
        await waitForNextUpdate();

        const [breedList, status] = result.current;
        expect(status).toBe("loaded");
        expect(breedList).toEqual(breeds);
    })
