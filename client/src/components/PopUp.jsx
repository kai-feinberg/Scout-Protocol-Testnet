import React from "react";

const PopUp = (props) => {

  const handleClick = () => {
    this.props.toggle();
  };

    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={handleClick}>
            &times;
          </span>
          <form>
            <h3>Register!</h3>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }

  export default PopUp;
