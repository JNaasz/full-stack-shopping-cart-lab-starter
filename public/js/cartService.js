var app = angular.module("shoppingCart");

app.service("cartService", function($http) {

    // Call the Node Server API to get all the items. Return a promise that
    // resolves to an array of products. (The promise should NOT resolve to the
    // entire response object.)
    this.getAllItems = function() {
      return $http.get("/api/items").then(function(response) {
        console.log(response.data);
        return (response.data);
      });
      //Make the HTTP request to the server and return a promise.
    };

    this.getItemTotals = function(){
      return $http.get("/api/items/totals").then(function(response) {
        console.log(response.data);
        return response.data;
      });
    };

    // Call the Node Server API to add an item.
    // The item parameter will be an object, for example:
    // { product: "Apples", price: 1.89 }
    // Return a promise that resolves when the request finishes. It doesn't
    // matter what the value of the promise is.
    this.addItem = function(item) {

        // var newItem = {'product': item.product, 'price': item.price}
        return $http.post("/api/items", item).then(function(response) {
                  console.log(item);
                  return response;

        })// POST /api/items
        // body -> { product: "...", price: ... }
        // Make the HTTP request to the server and return a promise.
    };

    // Call the Node Server API to delete an item.
    // The itemId parameter will be the ID of the item to delete.
    // Return a promise that resolves when the request finishes. It doesn't
    // matter what the value of the promise is.
    this.deleteItem = function(itemId) {
        return $http.delete("/api/items/" + itemId).then(function(response) {
            console.log(itemId);
            return response;
        });
        // DELETE /api/items/{ID}
        // TODO Make the HTTP request to the server and return a promise.
    };



});
