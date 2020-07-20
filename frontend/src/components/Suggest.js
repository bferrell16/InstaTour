import React from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import '../index.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { libraries } from "../App.js";
import "bootstrap/dist/css/bootstrap.min.css";

class Suggest extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      tempTitle: "",
      tempLat: "",
      tempLng: "",
      tempType: "./art.svg",
      tempInsta: "",
      submittedBy: "",
      tips: [],
      tempApproved: false,
      sucess: true,
    };
    this.autocomplete = null;
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  onLoad(autocomplete) {
    this.autocomplete = autocomplete;
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      let address = this.autocomplete.getPlace();
      this.setState({
        tempLat: address.geometry.location.lat(),
        tempLng: address.geometry.location.lng(),
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  putData() {
    let data = {
      title: this.state.tempTitle,
      lat: this.state.tempLat,
      lng: this.state.tempLng,
      insta: this.state.tempInsta,
      icon: this.state.tempType,
      submittedBy: this.state.submittedBy,
      tips: this.state.tips,
      approved: false,
    };
    let options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("/items", options);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <button
          className="btn-white"
          onClick={() => {
            window.location.assign("/");
          }}
        >
          Home
        </button>
        <LoadScript
          libraries={libraries.lib}
          googleMapsApiKey="AIzaSyCFtt_CERjJShclgxZ65yz400JFuZkWkVQ"
        >
          <Card>
            <Card.Body>
              <Card.Title>Suggest a new photo location</Card.Title>
              <Form
                onSubmit={() => {
                  this.putData();
                }}
              >
                <Form.Group controlId="suggestion.title">
                  <Form.Label>Suggest a title for your spot</Form.Label>
                  <Form.Control
                    name="tempTitle"
                    value={this.state.tempTitle}
                    onChange={this.handleChange}
                    type="input"
                    placeholder="A Pink Wall"
                  />
                </Form.Group>
                <Form.Group controlId="suggestion.type">
                  <Form.Label>What type of spot is it?</Form.Label>
                  <Form.Control
                    name="tempType"
                    value={this.state.tempType}
                    onChange={this.handleChange}
                    as="select"
                  >
                    <option value="./art.svg">Art / Mural</option>
                    <option value="./history.svg">Historical</option>
                    <option value="./leaf.svg">Nature</option>
                    <option value="./triangle.svg">Urban</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="suggestion.insta">
                  <Form.Label>
                    Provide a link to an insta pic at the spot
                  </Form.Label>
                  <Form.Control
                    name="tempInsta"
                    value={this.state.tempInsta}
                    onChange={this.handleChange}
                    type="input"
                    placeholder="https://www.instagram.com/p/B0lwoIUhYQK/"
                  />
                </Form.Group>
                <Form.Group controlId="suggestion.address">
                  <Form.Label>Address</Form.Label>
                  <Autocomplete
                    className="autocomp"
                    onLoad={this.onLoad}
                    onPlaceChanged={this.onPlaceChanged}
                  >
                    <input className="autocomp" type="text" />
                  </Autocomplete>
                </Form.Group>
                <Form.Group controlId="suggestion.submittedBy">
                  <Form.Label>
                    What is your instagram handle? (optional, will be public, to credit you for finding it)
                  </Form.Label>
                  <Form.Control
                    name="submittedBy"
                    value={this.state.submittedBy}
                    onChange={this.handleChange}
                    type="input"
                    placeholder="brandonferrell16"
                  />
                </Form.Group>
                <Form.Group controlId="suggestion.tips">
                  <Form.Label>
                    Have any tips for the spot? (optional)
                  </Form.Label>
                  <Form.Control
                    name="tips"
                    value={this.state.tips}
                    onChange={this.handleChange}
                    as="textarea"
                    rows="4"
                    placeholder="Park at the bottom of the hill. Better at night. Admission is $5..."
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </LoadScript>
      </div>
    );
  }
}

export default Suggest;
