import React, {Component} from 'react';

import DocumentEditor from './DocumentEditor'

import '../style/TfidfViz.css';

class TfidfViz extends Component  {
    constructor(props)  {
        super(props);

        this.changeContent = this.changeContent.bind(this);

        this.state = {
            docs: [
                "Some content"
            ]
        }
    }

    changeContent(index, newContent)  {
        let newDocs = this.state.docs;
        newDocs[index] = newContent;
        this.setState({
            docs: newDocs
        })
    }

    render()  {
        const docEditors = this.state.docs.map((doc, key) =>
            <DocumentEditor content={doc} index={key} onContentChanged={this.changeContent}/>
        );
        return (
            <div className="container-fluid h-100">
                <div className="row main-row h-100">
                    <div className="col-3 sidebar no-float h-100">
                        <div className="">
                            <h1>Tfidf.Viz</h1>
                        </div>
                    </div>
                    <div id="col-6 no-float h-100 ml-2 mt-2">
                        {docEditors}
                    </div>
                </div>
            </div>
        );
    }

}

export default TfidfViz;


