import React from "react";
import { Link } from "react-router-dom";
// const Pet = (props) => {
//     return React.createElement("div", {}, [
//       React.createElement("h2", {}, props.name),
//       React.createElement("h3", {}, props.animal),
//       React.createElement("h4", {}, props.breed),
//     ]);
//   };

// export default Pet;

// the same thing as above, in reality we are writing JS here that imitates markup
// The browser does not speak JSX engine, it expetcs html,
// we have babel, parcel and so on to transpile it and output result above
const Pet = ({ name, animal, breed, id }) => {
  return (
    <Link to={`/details/${id}`} className="pet">
      <div>
        <div className="info">
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed}`}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Pet;
