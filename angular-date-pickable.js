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
    vm.visibleDate = moment().startOf('month');

    vm.setPrevMonth = setPrevMonth;
    vm.setNextMonth = setNextMonth;

    vm.selectDate = selectDate;

    //

    generateCalendar();

    return vm;

    function setPrevMonth() {
      vm.visibleDate = vm.visibleDate.add('month', -1).startOf('month'); 
      generateCalendar();
    }

    function setNextMonth() {
      vm.visibleDate = vm.visibleDate.add('month', 1).startOf('month'); 
      generateCalendar();
    }

    function generateCalendar() {
      var start = vm.visibleDate.clone().startOf('month');
      var end = vm.visibleDate.clone().endOf('month');

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
    }

    function selectDate(date) {
      console.log('date picked', date) 
    }
  }
}
