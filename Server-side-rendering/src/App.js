import { useState, StrictMode } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Details from "./Details";
import SearchParams from "./SearchParams";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("darkblue");
  return (
    <StrictMode>
    <ThemeContext.Provider value={theme}>
      <div
      className="p-0 m-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)"
      }}
      >
          <header
          className="w-full mb-10 mt-[20px] text-center bg-gradient-to-b from-purple-400 via-pink-100 to-red-500"
          >
            <Link to="/" className="text-6xl text-white hover:text-gray-200">Adopt Me!</Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
      </div>
    </ThemeContext.Provider>
    </StrictMode>
  );
};

export default App;
