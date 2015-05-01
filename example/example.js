angular.module('ExampleApp', ['jbDatePickable'])
.controller('exampleCtrl', function($scope) {
  $scope.momentDate = function (newDate) {
    return moment(newDate).toDate()
  }
})
