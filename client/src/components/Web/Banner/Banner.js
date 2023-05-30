import React from "react";
import { Container } from "semantic-ui-react";
import "./Banner.scss";

export function Banner() {
  return (
    <div className="banner">
      <Container>
        <h1>
            Satisface tu pasión : <br /> por la cocina
        </h1>
        <h2>
            ¡Descubre recetas creativas
          <br />
            y técnicas culinarias innovadoras!
        </h2>
      </Container>

      <div className="banner__dark" />
    </div>
  );
}
