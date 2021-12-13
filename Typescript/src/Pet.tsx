import React from "react";
import { Link } from "react-router-dom";
import { FunctionComponent } from "react";


interface IProps {
  name: string;
  animal: string;
  breed: string;
  id: number;
}

const Pet: React.FC<IProps> = ({ name, animal, breed, id }) => {
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
