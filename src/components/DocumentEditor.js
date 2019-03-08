import React, {Component} from 'react';


const DocumentEditor = ({index, content, onDelete, onEdit, deleteDisabled}) =>
    <div className="doc-editor container-fluid w-100">
        <div className="row">
            <div className="col-9"><h3>{"Document #" + (index + 1)}</h3></div>
            <div className="col-3">
                <button className="btn btn-danger"
                        disabled={deleteDisabled}
                        onClick={() => onDelete(index)}>Delete</button>
            </div>
        </div>
        <div className="row">
            <form className="w-100">
                <div className="form-group">
                    <textarea className="form-control doc-editor-text-area"
                              rows="5"
                              maxLength="1000"
                              value={content}
                              onChange={(e) => onEdit(index, e.target.value)}>
                    </textarea>
                </div>
            </form>
        </div>
    </div>


export default DocumentEditor;