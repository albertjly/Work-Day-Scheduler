$(function () {
    // 1. insert currentDay to html
    $('#currentDay').text(moment().format('LLLL'));

    // 2. save toDoList to localStorage
    var toDoList = JSON.parse(localStorage.getItem('todolist')) || [];
    var mediaBody = $('.media-body');

    mediaBody.each(function(){
        var $time = $(this).parents('.media').children('.media-left').children().text();
        // console.log($time);
        var foundEl = toDoList.find(function(el){
            if (el.time === $time){
                return el;
            }
        });

        if (foundEl && foundEl.todo) {
            $(this).children().text(foundEl.todo);
        }
        

        var now = $time.split(':')[0];
        if (now < 9 && now > 0){
            now = parseInt(now) + 12;
        }else {
           now = parseInt(now);
        }
        // console.log(now);
        var realHour = parseInt(moment().format('HH'));
        if (now === realHour){
            $(this).addClass('present');
        }else if(now < realHour){
            $(this).addClass('past');
        }else {
            $(this).addClass('future');
        }

    });

    // click and change content
    mediaBody.on('click', '.content', function (event) {
        event.preventDefault();

        var text = $(this).text().trim();
        var $time = $(this).data('time');
        // console.log($time);

        // replace p element with a new input
        var textInput = $('<textarea>')
            .addClass('content')
            .val(text).data('time', $time);
        $(this).replaceWith(textInput);

        
        
        // auto focus new element
        textInput.trigger("focus");
        
    });
    
    mediaBody.on("blur", 'textarea', function (ev) {
        ev.preventDefault();
        // get current value of textarea
        var text = $(this).val();
        var $time = $(this).data('time');
        
        // console.log($time);
        $(this).text = text;

        var contentP = $("<p>")
            .addClass('p-0 m-1 content')
            .text(text).data('time', $time);

        $(this).replaceWith(contentP);

    });


    $('.save-icon').on('click', function () {

        var $todo = $(this).parents('.media').children('.media-body').children().text();
        var $time = $(this).parents('.media').children('.media-body').children().data('time');


        if ($todo !== ''){
            toDoList.push({
                time: $time,
                todo: $todo
            });
        }

        var filterToDoList = toDoList.filter(function (el) {
            if (el.time == $time){
                return el;
                // el.todo = $todo;
                // console.log();
            }
        });

        console.log(filterToDoList);
        saveToDos(toDoList);
        // saveToDos(toDoList);
    });

    function saveToDos(toDoList) {
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