import React from "react";
import "../home.css";
import art from "../SugarhouseSVG.svg";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const washington = {
  lat: 38.9072,
  lng: -77.0369,
};
const losAngeles = {
  lat: 34.0522,
  lng: -118.2437,
};
const newYork = {
  lat: 40.7128,
  lng: -74.006,
};
const boston = {
  lat: 42.3601,
  lng: -71.0589,
};

export default function Home() {
  return (
    <main>
      <div>
        <h2>InstaSpots</h2>
        <h3>Take your feed to the next level</h3>
        <button
          className="map-it"
          onClick={() => {
            window.location.assign("/map");
          }}
        >
          <h4 className="map-it-text">map me</h4>
        </button>
        <Card>
          <Card.Body>
            <Card.Header>Take a Tour</Card.Header>
            <ListGroup>
              <ListGroup.Item>
                <Link
                  className="tourButtons"
                  to={{ pathname: "/map", state: { centeredOn: washington } }}
                >
                  Washington, DC
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link
                  className="tourButtons"
                  to={{ pathname: "/map", state: { centeredOn: losAngeles } }}
                >
                  Los Angeles, CA
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link
                  className="tourButtons"
                  to={{ pathname: "/map", state: { centeredOn: newYork } }}
                >
                  New York, NY
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link
                  className="tourButtons"
                  to={{ pathname: "/map", state: { centeredOn: boston } }}
                >
                  Boston, MA
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
      <div className="artContainer">
        <h5>Sugarhouse Studios</h5>
        <p>
          The inspiration for this site, a<br></br> colorful wall in london.
          <br></br>Click to learn more.
        </p>
        <a href="https://99percentinvisible.org/episode/instant-gramification/">
          <img src={art} alt="Sugarhouse Studios" className="art"></img>
        </a>
      </div>
    </main>
  );
}
