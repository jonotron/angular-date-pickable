angular.module('jbDatePickable', [])
.directive('jbDatePickable', jbDatePickableDirective);

function jbDatePickableDirective () {
  return {
    restrict: 'E',
    templateUrl: '../angular-date-pickable.html',
    controllerAs: 'vm',
    controller: controller
  }

  function controller ($scope) {
    var vm = this;

    var start = moment().startOf('month');
    var end = moment().endOf('month');

    var range = moment().range(start, end);

    var weeks = [];
    range.by('weeks', function(week) {
      var days = [];
      moment().range(week.clone().startOf('week'), week.clone().endOf('week')).by('days', function(day) {
        days.push(day.startOf('day').toDate()); 
      });
      weeks.push(days);
    });

    vm.weeks = weeks;

    return vm;
  }
}
