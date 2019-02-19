import React, {Component} from 'react';

import DocumentEditor from './DocumentEditor'

import '../style/TfidfViz.css';

class TfidfViz extends Component  {
    constructor(props)  {
        super(props);

        this.changeContent = this.changeContent.bind(this);
        this.newEditDocument = this.newEditDocument.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);

        this.renderEdit = this.renderEdit.bind(this);

        this.state = {
            docs: [
                "Some content"
            ],
            isEdit: true
        }
    }

    newEditDocument()  {
        let newDocs = this.state.docs;
        newDocs.push("");
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
        newDocs[index] = newContent;
        this.setState({
            docs: newDocs,
            isEdit: this.state.isEdit
        });
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

    render()  {
        if (this.state.renderEdit)  {
            return this.renderEdit();
        } else {
            return this.renderEdit();
        }
    }



}

export default TfidfViz;


