import React, {Component} from 'react';

import TfidfService from '../services/TfidfService'

import TfidfVizSidebar from './TfidfVizSidebar'
import DocumentEditor from './DocumentEditor'
import DocumentResult from './DocumentResult'
import DocumentList from './DocumentList'

import '../style/TfidfViz.css';

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


