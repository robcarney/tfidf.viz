import React, {Component} from 'react';
import TfidfService from '../services/TfidfService'

import DocumentEditor from './DocumentEditor'
import DocumentResult from './DocumentResult'
import TfidfVizSidebar from "./TfidfViz";

class DocumentList extends Component  {
    constructor(props)  {
        super(props);

        this.tfidfService = new TfidfService();

        this.changeContent = this.changeContent.bind(this);
        this.newEditDocument = this.newEditDocument.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);

        this.runTfidf = this.runTfidf.bind(this);
        this.returnToEditMode = this.returnToEditMode.bind(this);

        this.renderEdit = this.renderEdit.bind(this);

        this.state = {
            docs: [
                {content: "Some content"},
                {content: "More content about different things"},
                {content: "Things about tfidf"}
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
        this.tfidfService.getTfidfResult(this.state.docs)
            .then(docs => this.setState({ docs: docs, isEdit: false }));
    }

    returnToEditMode()  {
        this.setState({
            docs: this.state.docs,
            isEdit: true
        });
    }

    renderEdit()  {
        let docEditors = this.state.docs.map((doc, key) =>
            <DocumentEditor content={doc.content}
                            index={key}
                            onDelete={this.deleteDocument}
                            onEdit={this.changeContent}/>
        );
        return (
            <div className="col-9 h-100">
                <button type="button"
                        onClick={this.runTfidf}
                        className="btn btn-primary m-2">
                    Run TF-IDF
                </button>
                {docEditors}
                <button type="button"
                        onClick={this.newEditDocument}
                        className="btn btn-block btn-success">New</button>
            </div>
        );
    }

    renderResult()  {
        let docEditors = this.state.docs.map((doc, key) =>
            <DocumentResult document={doc} index={key}/>
        );
        return (
            <div className="col-9 h-100">
                <button type="button"
                        onClick={this.returnToEditMode}
                        className="btn btn-primary m-2">
                    Edit
                </button>
                {docEditors}
            </div>
        );
    }

    render()  {
        if (this.state.isEdit)  {
            return this.renderEdit();
        } else {
            return this.renderResult();
        }
    }
}

export default DocumentList;

