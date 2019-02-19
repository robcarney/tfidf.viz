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



    render()  {
        return this.getContent();
    }


}






