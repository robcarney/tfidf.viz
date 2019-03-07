import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

import DocumentEditor from './DocumentEditor';
import DocumentResult from './DocumentResult';

import TfidfService from '../services/TfidfService'


const EXAMPLE_DOC_1 = "First, I want to say to all of you that, as you might imagine, I have been on quite a " +
    "journey these last few weeks to get to the end of this, to the rock bottom truth of where " +
    "I am and where we all are.";
const EXAMPLE_DOC_2 = "It is important to me that everybody who has been hurt know that the sorrow I feel is " +
    "genuine: first and most important, my family; also my friends, my staff, my Cabinet, Monica Lewinsky and " +
    "her family, and the American people. I have asked all for their forgiveness.";
const EXAMPLE_DOC_3 = "Now, what does all this mean for me and for us? First, I will instruct my lawyers to mount " +
    "a vigorous defense, using all available appropriate arguments. But legal language must not obscure the fact " +
    "that I have done wrong. Second, I will continue on the path of repentance, seeking pastoral support and that " +
    "of other caring people so that they can hold me accountable for my own commitment.";

class DocumentList extends Component  {
    constructor(props)  {
        super(props);

        this.tfidfService = new TfidfService();

        this.changeContent = this.changeContent.bind(this);
        this.newEditDocument = this.newEditDocument.bind(this);
        this.deleteDocument = this.deleteDocument.bind(this);

        this.runTfidf = this.runTfidf.bind(this);
        this.showErrorModal = this.showErrorModal.bind(this);
        this.hideErrorModal = this.hideErrorModal.bind(this);
        this.returnToEditMode = this.returnToEditMode.bind(this);

        this.renderEdit = this.renderEdit.bind(this);

        this.state = {
            docs: [
                {content: EXAMPLE_DOC_1},
                {content: EXAMPLE_DOC_2},
                {content: EXAMPLE_DOC_3}
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

