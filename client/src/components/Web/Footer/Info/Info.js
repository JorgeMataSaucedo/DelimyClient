import React from "react";
import { Button } from "semantic-ui-react";
import { map } from "lodash";
import { Icon } from "../../../../assets";
import { socialData } from "../../../../utils";
import "./Info.scss";

export function Info() {
  return (
    <div className="footer-info">
      <h4>Delimy</h4>
      <p>
          Únete a nuestra comunidad de amantes de la cocina y descubre el placer de crear platos excepcionales. ¡Empieza tu aventura culinaria hoy mismo!
      </p>
    </div>
  );
}
