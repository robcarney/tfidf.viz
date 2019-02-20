import React, {Component} from 'react';

import DocumentEditor from './DocumentEditor'
import DocumentResult from './DocumentResult'

import '../style/TfidfViz.css';

class TfidfViz extends Component  {
    constructor(props)  {
        super(props);

        this.changeContent = this.changeContent.bind(this);
        this.newEditDocument = this.newEditDocument.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);

        this.runTfidf = this.runTfidf.bind(this);

        this.renderEdit = this.renderEdit.bind(this);

        this.state = {
            docs: [
                {content: "Some content"}
            ],
            isEdit: true
        }

    }

    newEditDocument()  {
        let newDocs = this.state.docs;
        newDocs.push({content: ""});
        this.setState({
            docs: newDocs,
            isEdit: this.state.isEdit
        });
    }

    deleteDocument(index)  {
        let newDocs = this.state.docs;
        newDocs.splice(index, 1);
        console.log(newDocs);
        this.setState({
            docs: newDocs,
            isEdit: this.state.isEdit
        })
    }

    changeContent(index, newContent)  {
        let newDocs = this.state.docs;
        newDocs[index] = { content: newContent };
        this.setState({
            docs: newDocs,
            isEdit: this.state.isEdit
        });
    }

    runTfidf()  {
        let newDocs = [{
                content: "Boston is a cool city.",
                wordScores: [{
                    name: "Boston",
                    score: 0.123
                },{
                    name: "is",
                    score: 0.199
                },{
                    name: "a",
                    score: 0.423
                },{
                    name: "cool",
                    score: 0.223
                },{
                    name: "city",
                    score: 0.923
                }]
            },{
            content: "I like the city.",
            wordScores: [{
                name: "I",
                score: 0.123
            },{
                name: "like",
                score: 0.199
            },{
                name: "the",
                score: 0.423
            },{
                name: "city",
                score: 0.923
            }]
        },{
            content: "New York is a city.",
            wordScores: [{
                name: "New",
                score: 0.123
            },{
                name: "York",
                score: 0.223
            },{
                name: "is",
                score: 0.199
            },{
                name: "a",
                score: 0.423
            },{
                name: "city",
                score: 0.923
            }]
        }];
        this.setState({
            docs: newDocs,
            isEdit: false
        })
    }

    renderEdit()  {
        let docEditors = this.state.docs.map((doc, key) =>
            <DocumentEditor content={doc}
                            index={key}
                            onDelete={this.deleteDocument}
                            onEdit={this.changeContent}/>
        );
        return (
            <div className="container-fluid h-100">
                <div className="row main-row h-100">
                    <div className="col-3 sidebar no-float h-100">
                        <div className="">
                            <h1>Tfidf.Viz</h1>
                        </div>
                    </div>
                    <div className="col-9 h-100">
                        <button type="button"
                                className="btn btn-primary m-2">
                            Run TF-IDF
                        </button>
                        {docEditors}
                        <button type="button"
                                onClick={this.newEditDocument}
                                className="btn btn-block btn-success">New</button>
                    </div>
                </div>
            </div>
        );
    }

    renderResult()  {
        let docEditors = this.state.docs.map((doc, key) =>
            <DocumentResult/>
        );
        return (
            <div className="container-fluid h-100">
                <div className="row main-row h-100">
                    <div className="col-3 sidebar no-float h-100">
                        <div className="">
                            <h1>Tfidf.Viz</h1>
                        </div>
                    </div>
                    <div className="col-9 h-100">
                        <button type="button"
                                className="btn btn-primary m-2">
                            Run TF-IDF
                        </button>
                        {docEditors}
                        <button type="button"
                                onClick={this.newEditDocument}
                                className="btn btn-block btn-success">New</button>
                    </div>
                </div>
            </div>
        );
    }

    render()  {
        if (this.state.renderEdit)  {
            return this.renderEdit();
        } else {
            return this.renderEdit();
        }
    }



}

export default TfidfViz;


