# Tfidf.Viz
Tfidf.Viz is a visualization tool for the [TF-IDF Algorithm](https://en.wikipedia.org/wiki/Tf–idf "TF-IDF Wiki"). You can try it out [here](httpd://tfidfviz.com)!

## How it works...
To use the tool, first add some documents to be analyzed.
![Editor](/images/edit-sample.png "Editor")

Then, press "Run TF-IDF" to run the algorithm on the documents to be added. You should get something that looks like this, where the words with the darker background are considered more relevant and those with the lighter background are considered less relevant:
![Result](/images/result-sample.png "Result")

You can also hover over specific words to see what their actual score is (note that these scores may round down to 0 for particularly low values). Below, we can see that the word "markets" has a score of 0.012628.
![Popover](/images/popover-sample.png "Popover")


## The code
The front end of the app is build with React, and it makes use of a simple API I set up using AWS Lambda on the backend. Feel free to explore the code!


