(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// To Buy controller
  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService){
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItems();

    toBuy.message = function() {
      return ShoppingListCheckOffService.toBuyMessage();
    }
/*
    console.log(toBuy.message());

    toBuy.message = ShoppingListCheckOffService.toBuyMessage();
    console.log(toBuy.message)
*/
    toBuy.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeItem(itemIndex);
    }
  }

// Already Bought Controller
  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
    var bought = this;


    bought.items = ShoppingListCheckOffService.boughtItems();

    bought.message = function() {
      return ShoppingListCheckOffService.boughtMessage();
    }
/*
    bought.message = function() {
      return bought.items.length == 0;
    }

    bought.message = ShoppingListCheckOffService.boughtMessage();
    console.log(bought.message)
*/
  }

// Shopping List service
  function ShoppingListCheckOffService(){
    var service = this;

    service.bought = [];
    service.toBuy = [
      {
      name: "Fruit",
      quantity: 20
      },
      {
      name: "Tomatoes",
      quantity: 10
      },
      {
      name: "Oatmeal",
      quantity: 5
      },
      {
      name: "Eggs",
      quantity: 12
      },
      {
      name: "Chocolate",
      quantity: 10
      }
    ];

    service.addItem = function (itemName, quantity){
      var item = {
        name: itemName,
        quantity: quantity
      };
      service.bought.push(item);
    };

    service.removeItem = function (itemIndex) {
      var item = service.toBuy[itemIndex];
      service.toBuy.splice(itemIndex, 1);
      service.addItem(item.name, item.quantity);
    };

    service.getItems = function () {
      return service.toBuy;
    };

    service.boughtItems = function () {
      return service.bought;
    };

    service.toBuyMessage = function () {
        return service.toBuy.length === 0;
    };

    service.boughtMessage = function (){
        return service.bought.length === 0;
    };

  }
})();
