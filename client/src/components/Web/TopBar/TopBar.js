import React, { useState, useEffect } from "react";
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { Menu } from "../../../api";
import "./TopBar.scss";

const menuController = new Menu();

export function TopBar() {
  const [menu, setMenu] = useState(null);
  const firstname = localStorage.getItem("firstname");


  useEffect(() => {
    (async () => {
      try {
        const response = await menuController.getMenu(true);
        setMenu(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="top-bar">
      <Container>
        <div className="top-bar__left">
          <Link to="/" className="logo">
            <h2 className="delimy"> Delimy </h2>
          </Link>

          <div className="menu">
            {map(menu, (item) => (
              <a key={item._id} href={item.path}>
                {item.title}
              </a>
            ))}
          </div>
        </div>

        <div>
          <Button className="top-bar__left-register" as={Link} to="/admin">
            {firstname ? `Hola, ${firstname}` : "Ingresa"}
          </Button>        </div>
      </Container>
    </div>
  );
}
