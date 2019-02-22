const TFIDF_API_URL = "http://localhost:3000/tfidf";


export default class TfidfService  {

    getTfidfResult(docs)  {
        return fetch(TFIDF_API_URL,
            {
                method: "POST",
                body: JSON.stringify({ docs: docs }),
                headers: {
                    "Content-Type": "application/json"
                },
                mode: 'cors'
            }).then(response => response.json().then(this.responseToDocs))
            .catch(error => alert(error))
    }

    responseToDocs(responseJson)  {
        let docs = [];
        for (let i = 0; i < responseJson.docs.length; i++)  {
            let currWordScores = [];
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
        return docs;
    }

}

