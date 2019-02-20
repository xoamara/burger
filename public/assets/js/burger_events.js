// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".list-group").on("click", "button", function (event) {
        var id = $(this).data("id");
        var devoured = $(this).attr("devoured");

        console.log(id);
        console.log(devoured);

        // Send the PUT request.
        $.ajax({
            url: "/api/burgers/" + id,
            type: "PUT"
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

        if ($("#newburger").val() === "") {
            alert("Please enter the name of a Burger you want to add to the list");
            
            return false;
        }

        var newBurger = {
            name: $("#newburger").val().trim(),
        };

        console.log("New Burger ", newBurger);

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
