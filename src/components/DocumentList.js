import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

import DocumentEditor from './DocumentEditor';
import DocumentResult from './DocumentResult';

import TfidfService from '../services/TfidfService'


const EXAMPLE_DOC_1 = "Here we are going to talk about Alice. Alice is a person. We are talking about Alice a lot," +
    " so Alice should get a pretty high score, higher than John or George. You can hover over the word Alice to see " +
    "the score that Alice got.";
const EXAMPLE_DOC_2 = "Here we're talking about John. His score will not be as high, since we are not saying much " +
    "about him.";
const EXAMPLE_DOC_3 = "Now let's talk about George. George is also a person. George likes pizza. We have talked a " +
    "lot about George, so he should also get a pretty high score, but less high since he was mentioned in the " +
    "first document too.";

class DocumentList extends Component  {
    constructor(props)  {
        super(props);

        this.tfidfService = new TfidfService();

        this.changeContent = this.changeContent.bind(this);
        this.newEditDocument = this.newEditDocument.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);

        this.runTfidf = this.runTfidf.bind(this);
        this.runExample = this.runExample.bind(this);
        this.showErrorModal = this.showErrorModal.bind(this);
        this.hideErrorModal = this.hideErrorModal.bind(this);
        this.returnToEditMode = this.returnToEditMode.bind(this);

        this.renderEdit = this.renderEdit.bind(this);

        this.state = {
            docs: [
                {content: ""},
                {content: ""}
            ],
            isEdit: true,
            showErrorModal: false
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
            .then(docs => this.setState({ docs: docs, isEdit: false }))
            .catch(err => this.showErrorModal());
    }

    runExample()  {
        this.tfidfService.getTfidfResult([
            { content: EXAMPLE_DOC_1 },
            { content: EXAMPLE_DOC_2 },
            { content: EXAMPLE_DOC_3 }
        ])
            .then(docs => this.setState({ docs: docs, isEdit: false }))
            .catch(err => this.showErrorModal());
    }

    showErrorModal()  {
        this.setState({
            docs: this.state.docs,
            isEdit: this.state.isEdit,
            showErrorModal: true
        })
    }

    hideErrorModal()  {
        this.setState({
            docs: this.state.docs,
            isEdit: this.state.isEdit,
            showErrorModal: false
        })
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
                            deleteDisabled={this.state.docs.length <= 2}
                            onDelete={this.deleteDocument}
                            onEdit={this.changeContent}/>
        );
        return (
            <div className="document-list h-100">
                <button type="button"
                        onClick={this.runTfidf}
                        className="btn btn-primary m-2">
                    Run TF-IDF
                </button>
                <button type="button"
                        onClick={this.runExample}
                        className="btn btn-secondary">
                    Check out an example...
                </button>
                {docEditors}
                <button type="button"
                        onClick={this.newEditDocument}
                        className="btn btn-block btn-success">New</button>
                <Modal show={this.state.showErrorModal} onHide={this.hideErrorModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Oops, something went wrong...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Something went wrong when running the TF-IDF algorithm.
                        If you <a href="https://github.com/robcarney/tfidf.viz/issues">report the issue on GitHub</a>,
                        we can take a look.
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    renderResult()  {
        let docEditors = this.state.docs.map((doc, key) =>
            <DocumentResult document={doc} index={key}/>
        );
        return (
            <div className="document-list h-100">
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

