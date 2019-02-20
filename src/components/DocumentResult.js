import React, {Component} from 'react';

import '../style/DocumentResult.css';

class DocumentResult extends Component  {

    constructor(props)  {
        super(props);

        this.getContent = this.getContent.bind(this);
    }

    getContent()  {
        let contentList = [];
        let doc = this.props.document;
        let currWord = doc.content[0];
        let isSplitter = isPunctuationOrWhitespace(doc.content[0]);
        for (let i = 1; i < doc.content.length; i++)  {
            let currLetter = doc.content[i];
            if (isPunctuationOrWhitespace(currLetter))  {
                if (isSplitter)  {
                    currWord = currWord + currLetter;
                } else {
                    contentList.push({
                        word: currWord,
                        isSplitter: false,
                        value: 0.1
                    });
                    currWord = currLetter;
                    isSplitter = true;
                }
                if (i === doc.content.length - 1)  {
                    contentList.push({
                        word: currWord,
                        isSplitter: true,
                        value: 0.1
                    });
                }
            } else {
                if (isSplitter)  {
                    contentList.push({
                        word: currWord,
                        isSplitter: true,
                        value: 0.1
                    });
                    currWord = currLetter;
                    isSplitter = false;
                } else {
                    currWord = currWord + currLetter;
                }
                if (i === doc.content.length - 1)  {
                    contentList.push({
                        word: currWord,
                        isSplitter: false,
                        value: 0.1
                    });
                }
            }
        }
        return contentList.map(contentEntry => {
            if (contentEntry.isSplitter)  {
                return (
                    <span>{contentEntry.word}</span>
                )
            } else {
                return (
                    <span style={this.getBackgroundColorStyleObject(contentEntry.value)}>{contentEntry.word}</span>
                )
            }
        });
    }

    getBackgroundColorStyleObject(scale)  {
        return {
            backgroundColor: '#902020'
        }
    }


    render()  {
        let content = this.getContent();
        return (
            <div className="document-result">
                {content}
            </div>
        )
        /*
        return (
            <div className="document-result">
                <span style={this.getBackgroundColorStyleObject(0.1)}>Boston</span>
                <span> </span>
                <span style={this.getBackgroundColorStyleObject(0.1)}>is</span>
                <span> </span>
                <span style={this.getBackgroundColorStyleObject(0.1)}>a</span>
                <span>, </span>
                <span style={this.getBackgroundColorStyleObject(0.1)}>cool</span>
                <span> </span>
                <span style={this.getBackgroundColorStyleObject(0.1)}>city</span>
                <span>.</span>
            </div>
        )*/
    }
}

function isPunctuationOrWhitespace(letter)  {
    switch (letter) {
        case ' ':
            return true;
        case '.':
            return true;
        case '!':
            return true;
        case '?':
            return true;
        case ';':
            return true;
        case ',':
            return true;
        case ':':
            return true;
        case '\'':
            return true;
        default:
            return false;
    }
}



export default DocumentResult;






