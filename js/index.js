$(function () {
    // 1. insert currentDay to html
    $('#currentDay').text(moment().format('LLLL'));

    // 2. save toDoList to localStorage
    var toDoList = JSON.parse(localStorage.getItem('todolist'));


    // click and change content
    var mediaBody = $('.media-body');

    mediaBody.on('click', function (event) {
        event.preventDefault();

        mediaBody.on('click', '.content', function () {
            var text = $(this).text().trim();

            // replace p element with a new input
            var textInput = $('<textarea>')
                .addClass('content')
                .val(text);
            $(this).replaceWith(textInput);

            // auto focus new element
            textInput.trigger("focus");
        });

        // editable field was un-focused
        mediaBody.on("blur", 'textarea', function () {
            // get current value of textarea
            var text = $(this).val();

            $(this).text = text;

            var contentP = $("<p>")
                .addClass('content')
                .text(text);

            $(this).replaceWith(contentP);
        });

        // get to-do value from the <p> and store into localstorage
        var $todo = $('.media-body .content').val();
        console.log($todo);

        toDoList.push($todo);

        // renderTodos(toDoList);
        localStorage.setItem('todolist', JSON.stringify(toDoList));
    });







   /* // title
    clickAndOutFocusText(mediaBody, '.title', "<input>", 'title col-12', 'input', "title mt-2 col-12");


    // content
    clickAndOutFocusText(mediaBody, '.content', '<textarea>', 'content col-12', 'textarea', 'content col-12');*/


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
        $parent.on('click', selector1, function (event) {
            event.preventDefault();
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

    renderTodos(toDoList);

    function renderTodos(todolist) {

    }
});