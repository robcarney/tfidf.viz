import React, {Component} from 'react';

class DocumentResult extends Component  {

    constructor(props)  {
        super(props);

        this.getContent = this.getContent.bind(this);
    }

    getContent()  {
        let doc = this.props.document;
        let currWord = "";
        let isSplitter = true;
        for (let i = 0; i < doc.content.length; i=i)  {
            
        }


        return <h1>Content</h1>
    }

    getBackgroundColorStyleObject(scale)  {
        return {
            backgroundColor: '#100000'
        }
    }


    render()  {
        return (
            <div>
                <span style={this.getBackgroundColorStyleObject(0.1)}>Boston</span>
                <span> </span>
                <span style={this.getBackgroundColorStyleObject(0.1)}>is</span>
                <span> </span>
                <span style={this.getBackgroundColorStyleObject(0.1)}>a</span>
                <span> </span>
                <span style={this.getBackgroundColorStyleObject(0.1)}>cool</span>
                <span> </span>
                <span style={this.getBackgroundColorStyleObject(0.1)}>city</span>
                <span>.</span>
            </div>
        )
    }


}






