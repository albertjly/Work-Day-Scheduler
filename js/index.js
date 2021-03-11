$(function () {
    var mediaBody = $('.media-body');
    // title
    clickAndOutFocusText(mediaBody, '.title', "<input>", 'title mt-2 mb-2', 'input', "title mt-3 mb-2");


    // content
    clickAndOutFocusText(mediaBody, '.content', '<textarea>', '', 'textarea', 'content');


    /**
     * className2 must be the same to selector1's classname or more than that
     * @param {String}$parent
     * @param {String}selector1
     * @param {String}creatTag
     * @param {String}className1
     * @param {String}selector2
     * @param {String}className2
     */
    function clickAndOutFocusText($parent, selector1, creatTag, className1, selector2, className2) {
        $parent.on('click', selector1, function () {
            // get current text of p element
            var text = $(this).text().trim();

            // replace p element with a new input
            var textInput = $(creatTag)
                .addClass(className1)
                .val(text);
            $(this).replaceWith(textInput);

            // auto focus new element
            textInput.trigger("focus");
        });

        // editable field was un-focused
        $parent.on("blur", selector2, function () {
            // get current value of textarea
            var text = $(this).val();

            $(this).text = text;

            var contentP = $("<p>")
                .addClass(className2)
                .text(text);

            $(this).replaceWith(contentP);
        });
    }


});