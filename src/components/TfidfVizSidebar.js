import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {faGithubAlt, faGithubSquare} from "@fortawesome/free-brands-svg-icons";

const TfidfVizSidebar = () =>
    <div className="col-3 sidebar no-float h-100">
        <div className="sidebar-content">
            <h1>Tfidf.Viz</h1>
            <p>A visualization tool for the TF-IDF algorithm.</p>
            <a className="github-link" href="https://github.com/robcarney/tfidf.viz">
                <FontAwesomeIcon size="2x" icon={faGithub}/>
            </a>
        </div>
    </div>;

export default TfidfVizSidebar;