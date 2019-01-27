// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".change-burger").on("click", function (event) {
        var id = $(this).data("id");
        var devoured = $(this).data("true");

        console.log(id);
        console.log(devoured);

        var eaten = {
            devoured: true
        };

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: eaten
        }).then(
            function () {
                console.log("changed burger to", devoured);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            name: $("#newburger").val().trim(),
        };

        console.log ("New Burger " + newBurger);

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

});
