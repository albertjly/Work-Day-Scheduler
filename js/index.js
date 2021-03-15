$(function () {
    // 1. insert currentDay to html
    $('#currentDay').text(moment().format('LLLL'));

    // 2. save toDoList to localStorage
    var toDoList = JSON.parse(localStorage.getItem('todolist')) || [];


    // click and change content
    var mediaBody = $('.media-body');
    
    mediaBody.on('click', '.content', function (event) {
        event.preventDefault();

        var text = $(this).text().trim();

        // replace p element with a new input
        var textInput = $('<textarea>')
            .addClass('content')
            .val(text);
        $(this).replaceWith(textInput);
        

        // auto focus new element
        textInput.trigger("focus");

    });

    mediaBody.on("blur", 'textarea', function () {
        // get current value of textarea
        var text = $(this).val();

        $(this).text = text;

        var contentP = $("<p>")
            .addClass('p-0 m-1 content')
            .text(text);

        $(this).replaceWith(contentP);
        // console.log(contentP.text());
        // console.log($(this).parents('.media'));
        updateToDo($(this).text(), contentP.text());
    });

    var updateToDo = function($time, $todo) {
        var tempArr = [];

        tempArr.push({
            time: $time,
            todo: $todo
        });

        console.log(tempArr);

        saveToDos();
    };
    

    $('.save-icon').on('click', function () {

        var $todo = $(this).parents('.media').children('.media-body').children().text();


        if ($todo !== ''){
            toDoList.unshift({
                time: $(this).parents('.media').children('.media-left').children().text(),
                todo: $todo
            });
        }

        saveToDos();
    });

    function saveToDos() {
        localStorage.setItem('todolist', JSON.stringify(toDoList));
    }


    function renderTodos(toDoList) {
        // Empties out the html
        $('.media-body .content').val('');

        if (
            toDoList.time === $('')
        ){
            
        }
    }
});