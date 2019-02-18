(function()  {
    var $currId;

    $(main);

    function main()  {
        $currId = 2;

        $(".tv-doc-title-input").change(function()  {
            var newTitle = $(this).val();
            var id = $(this).parent().parent().attr("id");
            var idClass = "." + id;
            $(idClass).find(".tab-link").text(newTitle);
        });

        markParagraph();
    }

    function markParagraph()  {
        var paragraphText = $(".tv-doc-result-text").text();
        paragraphText = paragraphText.replace(/[,\.]/, "");
        console.log(paragraphText);
        paragraphText = paragraphText.replace(/\s{2,}/," ");
        var words = paragraphText.split(" ");
        console.log(words);
    }
})();