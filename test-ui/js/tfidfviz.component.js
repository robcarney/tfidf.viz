(function()  {
    $(main);

    function main()  {
        $(".tv-doc-title-input").change(function()  {
            var newTitle = $(this).val();
            var id = $(this).parent().parent().attr("id");
            var idClass = "." + id;
            $(idClass).find(".tab-link").text(newTitle);
        });
    }
})();