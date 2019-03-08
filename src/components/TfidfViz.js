import React, {Component} from 'react';

import TfidfVizSidebar from './TfidfVizSidebar'
import DocumentList from './DocumentList'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faGithubAlt } from '@fortawesome/free-brands-svg-icons'

import '../style/TfidfViz.css';

library.add(faGithub, faGithubAlt);

class TfidfViz extends Component  {
    constructor(props)  {
        super(props);

    }

    render()  {
        return (
            <div className="container-fluid h-100">
                <div className="row main-row h-100">
                    <TfidfVizSidebar />
                    <DocumentList />
                </div>
            </div>
        );
    }
}

export default TfidfViz;


