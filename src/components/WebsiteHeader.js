import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const websiteUrl = 'https://mapcomponents.org';

export default function WebsiteHeader() {
  return (
    <ul class="menu">
      <li>
        <a href={websiteUrl + "/entdecken"} title="MapComponents entdecken">
          Entdecken
        </a>
      </li>
      <li>
        <a href={websiteUrl + "/dokumentation"} title="Dokumentation">
          Dokumentation
        </a>
      </li>
      <li>
        <a href={websiteUrl + "/aktuelles"} title="Aktuelles">
          Aktuelles
        </a>
      </li>
      <li>
        <a href={websiteUrl + "/service"} class="has-sub">
          Service<FontAwesomeIcon icon={faChevronDown} />
        </a>
        <ul class="menu-lvl2">
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
        <a href={websiteUrl + "/jetzt-ausprobieren"} class="btn btn-primary">
          Jetzt ausprobieren
        </a>
      </li>
    </ul>
  );
}
