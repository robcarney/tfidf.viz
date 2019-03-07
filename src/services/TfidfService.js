const TFIDF_API_URL = "http://localhost:3000/tfidf";


export default class TfidfService  {

    // Make API call to run TF-IDF, and return array of doc objects
    getTfidfResult(docs)  {
        return fetch(TFIDF_API_URL,
            {
                method: "POST",
                body: JSON.stringify({ docs: docs }),
                headers: {
                    "Content-Type": "application/json"
                },
                mode: 'cors'
            }).then(response => response.json().then(this.responseToDocs));
    }

    // Converts the JSON response from TFIDF_API_URL to an array of doc objects
    responseToDocs(responseJson)  {
        let docs = [];
        // Create result docs array
        for (let i = 0; i < responseJson.docs.length; i++)  {
            let currWordScores = [];
            // WordToScore comes in with words as props, convert this to an array of wordToScore objects
            for (let prop in responseJson.docs[i].wordToScore)  {
                if (responseJson.docs[i].wordToScore.hasOwnProperty(prop))  {
                    if (responseJson.docs[i].wordToScore[prop] !== 0) {
                        currWordScores.push({
                            name: prop.toString(),
                            value: responseJson.docs[i].wordToScore[prop]
                        })
                    }
                }
            }
            docs.push({
                content: responseJson.docs[i].content,
                wordScores: currWordScores
            })
        }
        // Normalize word score values (set to values b/w 0 and 1)
        let max = 0.0;
        for (let i = 0; i < docs.length; i++)  {
            for (let j = 0; j < docs[i].wordScores.length; j++)  {
                let currWordScore = docs[i].wordScores[j]
                if (currWordScore.value > max)  {
                    max = currWordScore.value
                }
            }
        }
        //console.log(max);
        for (let i = 0; i < docs.length; i++)  {
            for (let j = 0; j < docs[i].wordScores.length; j++)  {
                docs[i].wordScores[j].valueNormalized = docs[i].wordScores[j].value / max;
            }
        }
        console.log(docs);
        return docs;
    }

}

