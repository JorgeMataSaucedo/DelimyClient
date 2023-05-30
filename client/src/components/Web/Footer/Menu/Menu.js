import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Menu.scss";

export function Menu() {
  return (
    <div className="footer-menu">
      <h4>Navegación</h4>

      <Grid columns={1}>
        <Grid.Column>
          <Link to="#">
            <Icon name="book" /> Cursos online
          </Link>
          <Link to="#">
            <Icon name="food" /> Tutoriales de cocina
          </Link>
        </Grid.Column>
      </Grid>
    </div>
  );
}
