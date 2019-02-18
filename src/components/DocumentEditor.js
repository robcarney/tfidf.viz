import React, {Component} from 'react';


class DocumentEditor extends Component  {
    constructor(props)  {
        super(props);

        this.contentChanged = this.contentChanged.bind(this);

        this.state = {
            index: this.props.index,
            content: this.props.content
        }
    }

    contentChanged(e)  {
        this.setState({
            index: this.state.index,
            content: e.target.value
        });
        this.props.onContentChange(this.state.index, this.state.content)
    }

    render()  {
        return(
            <div className="doc-editor ml-4 mt-4">
                <form>
                    <div className="form-group">
                        <textarea className="form-control"
                            value={this.state.content}
                            onChange={this.contentChanged}>
                        </textarea>
                    </div>
                </form>
            </div>
        )
    }

}


export default DocumentEditor;