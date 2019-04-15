$(document).ready(function () {

    var topics = ["Rick Sanchez", "Dennis Reynolds", "Stewie Griffin", "Tobias Funke"]
    GIFArea = " "

    function renderButtons() {

        $("#topics-view").empty();

        for (var i = 0; i < topics.length; i++) {

            var a = $('<button>');
            a.addClass('character')
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $("#topics-view").append(a);
        }
        s =
            $("#character-input").focus();
    }

    renderButtons();

    $("#add-character").on('click', function () {

        event.preventDefault();
        var character = $("#character-input").val().trim();
        topics.push(character);
        renderButtons();

    });

    $(document).on('click', 'button', function () {

        $('#GIFArea').empty();
        var b = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=1t3ACO9fsTKPJ2EVXW8DXXkTnWwu96Tj";


        $.ajax({
                url: queryURL,
                method: 'GET'
            })

            .done(function (response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div class="item">');
                    var rating = results[i].rating;
                    var r = $('<p>').text("Rating: " + rating);
                    var gifImage = $('<img>');

                    gifImage.attr('src', results[i].images.fixed_height_still.url)
                        .attr('data-still', results[i].images.fixed_height_still.url)
                        .attr('data-animate', results[i].images.fixed_height.url)
                        .attr('data-state', "still")
                        .addClass("showImage");

                    gifDiv.append(r)
                        .append(gifImage);
                        
                    $('#GIFArea').prepend(gifDiv);
                }

            });
    });

    $(document).on('click', '.showImage', function () {

        var state = $(this).data('state');

        if (state == "still") {

            $(this).attr('src', $(this).data('animate'))
                .data('state', 'animate');
        } else {

            $(this).attr('src', $(this).data('still'))
                .data('state', 'still');
        }

    });

});
