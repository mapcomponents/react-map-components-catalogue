import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const websiteUrl = 'https://mapcomponents.org';

export default function WebsiteHeader(props) {
  return (
    <ul className={"menu" + (props.expanded?' expanded':'')}>
      <li>
        <a href={websiteUrl + "/entdecken"} title="MapComponents entdecken" style={{transitionDelay: "0.15s"}}>
          Entdecken
        </a>
      </li>
      <li>
        <a href={websiteUrl + "/dokumentation"} title="Dokumentation" style={{transitionDelay: "0.2s"}}>
          Dokumentation
        </a>
      </li>
      <li>
        <a href={websiteUrl + "/aktuelles"} title="Aktuelles" style={{transitionDelay: "0.25s"}}>
          Aktuelles
        </a>
      </li>
      <li>
        <a href={websiteUrl + "/service"} className="has-sub" style={{transitionDelay: "0.30s"}}>
          Service<FontAwesomeIcon icon={faChevronDown} />
        </a>
        <ul className="menu-lvl2">
          <li>
            <a href={websiteUrl + "/wartung"} title="Wartung">
              Wartung
            </a>
          </li>
          <li>
            <a href={websiteUrl + "/support"} title="Support">
              Support
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href={"https://catalogue.mapcomponents.org/"} className="btn btn-primary" style={{transitionDelay: "0.35s"}}>
          Jetzt ausprobieren
        </a>
      </li>
    </ul>
  );
}
