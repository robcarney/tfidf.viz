import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithubAlt, faGithub } from "@fortawesome/free-brands-svg-icons";

const TfidfVizSidebar = () =>
    <div className="col-3 sidebar no-float h-100">
        <div className="sidebar-content">
            <h1>Tfidf.Viz</h1>
            <p>A visualization tool for the TF-IDF algorithm.</p>
            <a className="github-link" href="https://github.com/robcarney/tfidf.viz">
                <FontAwesomeIcon size="2x" icon={faGithub}/>
            </a>
        </div>
        <div className="sidebar-footer">
            <p>Made by Robert Carney</p>
            <a className="github-link" href="https://github.com/robcarney/tfidf.viz">
                <FontAwesomeIcon size="lg" icon={faGithubAlt}/>
            </a>
        </div>
    </div>;

export default TfidfVizSidebar;