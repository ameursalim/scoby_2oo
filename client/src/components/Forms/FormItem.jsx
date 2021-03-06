import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import "../../styles/form.css";

class ItemForm extends Component {
  state = {
    name: "",
    category: "",
    quantity: 0,
    adress: "",
    location : {coordinates:[0]},
    
    description: "",
    image: "",
    doesCode: false,
    submitted: false,
  };

  createItem() {
    //   const fd = new FormData();

    //   for (let key in this.state) {
    //   fd.append(key, this.state[key]);
    // }

    apiHandler
      .create("/api/items/", this.state)
      .then((apiRes) => {
        this.props.history.push("/");
        console.log("apiRes:",apiRes);
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  

    if (this.props.action === "edit") {
      this.updateItem();
    } else {
      this.createItem();
    }

    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )

    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
  };

  handlePlace = (place) => {

   const location = place.geometry
    this.setState({location: place.geometry });
    // location : {coordinates:[0]}
    // place.geometry.coordinates


    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.
    console.log("place :",place);
  };

  render() {
    console.log("this.state :",this.state);
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              name="name"
              type="text"
              placeholder="What are you giving away ?"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select
              id="category"
              name="category"
              defaultValue="-1"
              onChange={this.handleChange}
              value={this.state.category}
            >
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="input"
              name="quantity"
              id="quantity"
              type="number"
              onChange={this.handleChange}
              value={this.state.quantity}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="text-area"
              name="description"
              onChange={this.handleChange}
              placeholder="Tell us something about this item"
              value={this.state.description}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input
              className="input"
              name="image"
              id="image"
              type="file"
              onChange={this.handleChange}
            />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input type="radio" name="contact" value="email" />
              user email
            </div>
            <input type="radio" name="contact" value="phone" />
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
