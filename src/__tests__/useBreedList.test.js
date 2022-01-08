import { expect, test } from "@jest/globals";
import { render } from '@testing-library/react';
import { list } from "postcss";
import { StaticRouter } from "react-router-dom";
import useBreedList from "../useBreedList";
import { renderHook } from "@testing-library/react-hooks"

function getBreedList(animal) {
let list;
    
function TestComponent () {
        list = useBreedList(animal);
        return null;
    }

    render(<TestComponent />)
    return list;
}



test("display breedlist according animal", async () => {
   const [breedList, status] =  getBreedList();

    expect(breedList).toHaveLength(0);
    expect(status).toBe("unloaded");

    console.log('breed',breedList);
})