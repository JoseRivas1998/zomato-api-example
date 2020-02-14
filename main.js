$("#main-btn").click(function () {
    var $mainResults = $("#main-results");
    var $loading = $("<li></li>");
    $loading.addClass("list-group-item");
    $loading.text("Loading...");
    $mainResults.html($loading);
    navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        $.ajax('https://developers.zomato.com/api/v2.1/geocode?' + $.param({ lat: latitude, lon: longitude }), {
            type: "GET",
            headers: {
                'user-key': 'b7bcd557ca5b73de7b19d8dfb6cc07cd'
            }
        }
        )
            .then(function (response) {
                $mainResults.html("");
                $.each(response.nearby_restaurants, function(index, restaurant) {

                    var $link = $("<a></a>");
                    $link.attr("href", restaurant.restaurant.url);

                    var $nameHeading = $("<h3></h3>");
                    $nameHeading.text(restaurant.restaurant.name);
                    $link.html($nameHeading);

                    var location = restaurant.restaurant.location;
                    
                    var $listItem = $("<li></li>");
                    $listItem.addClass("list-group-item");
                    $listItem.append($link);
                    $listItem.append(location.address);

                    $mainResults.append($listItem);

                });
            });

    })

});