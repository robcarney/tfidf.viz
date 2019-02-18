import React, {Component} from 'react';

import '../style/TfidfViz.css';

class TfidfViz extends Component  {
    constructor(props)  {
        super(props);
        this.state = {
            docs: [
                {
                    idx: 0,
                    content: ""
                }
            ]
        }
    }

    render()  {
        return (
            <div>
                <nav className="sidebar">
                    <div className="sidebar-header">
                        <h1>Tfidf.Viz</h1>
                    </div>
                </nav>
                <div className="content">

                </div>
            </div>
        );
    }

}

export default TfidfViz;


