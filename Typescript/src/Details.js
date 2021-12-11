import React, { useState } from "react";
import Modal from "./Modal";
import ThemeContext from "./ThemeContext";

const Details = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => setIsShowModal(!isShowModal);
  const adopt = () => (window.location = "http://bit.ly/pet-adopt");

  return (
    <div>
      <ThemeContext.Consumer>
        {([theme]) => (
          <button onClick={toggleModal} style={{ backgroundColor: theme }}>
            Adopt
          </button>
        )}
      </ThemeContext.Consumer>
      {isShowModal ? (
        // Modal lives outside of root
        <Modal>
          <div>
            <h1>Wou you like to adopt me</h1>
            <div className="buttons">
              <button onClick={adopt}>Yes</button>
              <button onClick={toggleModal}>NO</button>
            </div>
          </div>
        </Modal>
      ) : // if we give react null do not render anything
      null}
    </div>
  );
};

export default Details;
