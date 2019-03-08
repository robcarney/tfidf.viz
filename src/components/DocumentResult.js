import React from 'react';

import WordVisualization from './WordVisualization';
import SplitterVisualization from './SplitterVizualization'

import '../style/DocumentResult.css';


const DocumentResult = ({document, index}) => {
    const content = getContentListFromDocument(document).map(contentEntryToComponent);
    return (
        <div className="document-result">
            <h3 className="document-result-title">{"Document #" + (index + 1)}</h3>
            <div className="document-result-content">
                {content}
            </div>
        </div>
    )
};


// getContentListFromDocument converts the given document into a list of content entries.
function getContentListFromDocument(doc)  {
    let contentList = [];
    let currWord = doc.content[0];
    let isSplitter = isPunctuationOrWhitespace(doc.content[0]);
    for (let i = 1; i < doc.content.length; i++)  {
        let currLetter = doc.content[i];
        if (isPunctuationOrWhitespace(currLetter))  {
            if (isSplitter)  {
                currWord = currWord + currLetter;
            } else {
                let currWordScore = getWordScoreForWord(currWord, doc);
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
                let currWordScore = getWordScoreForWord(currWord, doc);
                contentList.push({
                    word: currWord,
                    isSplitter: false,
                    value: currWordScore.value,
                    valueNormalized: currWordScore.valueNormalized
                });
            }
        }
    }
    return contentList;
}

// getScoreForWord retrieves the word score object corresponding to the given word
function getWordScoreForWord(word, document)  {
    for (let i = 0; i < document.wordScores.length; i++)  {
        let currWordScore = document.wordScores[i];
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


// contentEntryToComponent maps a given content entry to the correct word or splitter component.
function contentEntryToComponent(contentEntry)  {
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
}


// isPunctuationOrWhitespace returns true if the character is a splitter character, false otherwise.
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
        case '-':
            return true;
        default:
            return false;
    }
}


export default DocumentResult;






