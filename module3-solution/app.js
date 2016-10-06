(function () {
'use strict'

angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'ctrl',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  list.searchTerm = "";
  list.found = [];

  list.itemsFound = function() {
     MenuSearchService.getMatchedMenuItems(list.searchTerm.toLowerCase())
     .then(function (response) {
        list.found = response
        console.log(list.found.length)
        if(list.found.length == 0){
          list.empty = true;
        }else {
          list.empty = false;
        }
    });
    //console.log(list.found)
  }

  list.removeItem = function(itemIndex){
    //console.log(list.found)
    MenuSearchService.removeItem(itemIndex, list.found);
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    var foundItems = [];

      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
        }).then (function (response) {
          var items = response.data.menu_items;
          if (searchTerm != ""){
            for (var i = 0; i < items.length; i++) {
              var description = items[i].description
              if (description.toLowerCase().indexOf(searchTerm) !== -1){
                foundItems.push(items[i]);
              }
            }
          }
        //console.log(foundItems);
        return foundItems;
      });

  };

  service.removeItem = function (itemIndex, items) {
    items.splice(itemIndex, 1);
    return items;
  };
}


})();
