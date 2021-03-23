$(function () {
    // 1. insert currentDay to html
    $('#currentDay').text(moment().format('LLLL'));

    // 2. save toDoList to localStorage
    var toDoList = JSON.parse(localStorage.getItem('todolist')) || [];

    // 3. looping mediaBody for rendering data from localStorage and set the bgColor of present, past and future
    var mediaBody = $('.media-body');
    mediaBody.each(function(){
        // get time from each hour
        var $time = $(this).parents('.media').children('.media-left').children().text();
        var foundEl = toDoList.find(function(el){
            if (el.time === $time){
                return el;
            }
        });

        if (foundEl && foundEl.todo) {
            $(this).children().text(foundEl.todo);
        }

        // check time with current time and set different class name
        var now = $time.split(':')[0];
        if (now < 9 && now > 0){
            now = parseInt(now) + 12;
        }else {
           now = parseInt(now);
        }

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

        // replace p element with a new textarea
        var textInput = $('<textarea>')
            .addClass('content')
            .val(text).data('time', $time);
        $(this).replaceWith(textInput);

        // auto focus new element
        textInput.trigger("focus");
    });

    // when mouse blur the textarea
    mediaBody.on("blur", 'textarea', function (ev) {
        ev.preventDefault();
        // get current value of textarea
        var text = $(this).val();
        var $time = $(this).data('time');
        // set the changed value
        $(this).text = text;
        // change textarea to p element
        var contentP = $("<p>").addClass('p-0 m-1 content').text(text).data('time', $time);

        $(this).replaceWith(contentP);
    });


    $('.saveIcon').on('click', function () {
        // get every todo and time
        var $todo = $(this).parents('.media').children('.media-body').children().text();
        var $time = $(this).parents('.media').children('.media-body').children().data('time');

        // check localStorage before unshift a new todo
        checkArr($time);

        if ($todo !== ''){
            toDoList.unshift({
                time: $time,
                todo: $todo
            });
        }

        localStorage.setItem('todolist', JSON.stringify(toDoList));
    });

    /**
     * check the same items in array and delete the same
     * @param {string}$time
     */
    function checkArr($time){
        for (var i = 0; i < toDoList.length; i++){
            if (toDoList[i].time === $time){
                toDoList.splice(i, 1);
            }
        }
    }

});