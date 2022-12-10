import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'


export default function WebsiteHeader() {
  return (
    <ul class="menu">
      <li>
        <a href="/entdecken" title="MapComponents entdecken">
          Entdecken
        </a>
      </li>
      <li>
        <a href="/dokumentation" title="Dokumentation">
          Dokumentation
        </a>
      </li>
      <li>
        <a href="/aktuelles" title="Aktuelles">
          Aktuelles
        </a>
      </li>
      <li>
        <a href="/service" class="has-sub">
          Service<FontAwesomeIcon icon={faChevronDown} />
        </a>
        <ul class="menu-lvl2">
          <li>
            <a href="/wartung" title="Wartung">
              Wartung
            </a>
          </li>
          <li>
            <a href="/support" title="Support">
              Support
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="/jetzt-ausprobieren" class="btn btn-primary">
          Jetzt ausprobieren
        </a>
      </li>
    </ul>
  );
}
