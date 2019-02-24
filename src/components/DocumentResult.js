import React, {Component} from 'react';

import WordVisualization from './WordVisualization';
import SplitterVisualization from './SplitterVizualization'

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
                    let currWordScore = this.getWordScoreForWord(currWord);
                    contentList.push({
                        word: currWord,
                        isSplitter: false,
                        value: currWordScore.value,
                        valueNormalized: currWordScore.valueNormalized
                    });
                    currWord = currLetter;
                    isSplitter = true;
                }
                if (i === doc.content.length - 1)  {
                    contentList.push({
                        word: currWord,
                        isSplitter: true
                    });
                }
            } else {
                if (isSplitter)  {
                    contentList.push({
                        word: currWord,
                        isSplitter: true
                    });
                    currWord = currLetter;
                    isSplitter = false;
                } else {
                    currWord = currWord + currLetter;
                }
                if (i === doc.content.length - 1)  {
                    let currWordScore = this.getWordScoreForWord(currWord);
                    contentList.push({
                        word: currWord,
                        isSplitter: false,
                        value: currWordScore.value,
                        valueNormalized: currWordScore.valueNormalized
                    });
                }
            }
        }
        return contentList.map(contentEntry => {
            if (contentEntry.isSplitter)  {
                return (
                    <SplitterVisualization content={contentEntry.word}/>
                )
            } else {
                return (
                    <WordVisualization word={contentEntry.word}
                                       value={contentEntry.value}
                                       valueNormalized={contentEntry.valueNormalized}/>
                )
            }
        });
    }

    // Retrieves the word score object corresponding to the given word
    getWordScoreForWord(word)  {
        for (let i = 0; i < this.props.document.wordScores.length; i++)  {
            let currWordScore = this.props.document.wordScores[i];
            if (word.toLowerCase() === currWordScore.name)  {
                return currWordScore
            }
        }
        return {
            name: word.toLowerCase(),
            value: 0.,
            valueNormalized: 0.
        }
    }

    getBackgroundColorStyleObject(scale)  {
        scale = (0.7 * scale) + .3;
        return {
            backgroundColor: 'rgba(255, 99, 71, ' + scale + ')'
        }
    }


    render()  {
        let content = this.getContent();
        return (
            <div className="document-result">
                <h3>{"Document #" + (this.props.index + 1)}</h3>
                <div className="document-result-content">
                    {content}
                </div>
            </div>
        )
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






