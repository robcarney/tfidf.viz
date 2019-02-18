import React, {Component} from 'react';

import '../style/TfidfViz.css';

class TfidfViz extends Component  {
    constructor(props)  {
        super(props);
    }

    render()  {
        return (
            <div>
                <nav className="sidebar">
                    <div className="sidebar-header">
                        <h1>Tfidf.Viz</h1>
                    </div>
                </nav>
            </div>
        );
    }

}

export default TfidfViz;


