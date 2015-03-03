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
    vm.generateWeeks = generateWeeks;

    vm.visibleMonths = 2;

    //
    updateVisibleDates();

    function updateVisibleDates () {
      vm.visibleDates = [vm.visibleDate];
      for(var i = 1; i < vm.visibleMonths; i++) {
        vm.visibleDates.push(vm.visibleDate.clone().add(i, 'month').startOf('month'));  
      }
    }

    var weeksCache = {};

    function setPrevMonth() {
      vm.visibleDate = vm.visibleDate.add(-1, 'month').startOf('month'); 
      updateVisibleDates();
    }

    function setNextMonth() {
      vm.visibleDate = vm.visibleDate.add(1, 'month').startOf('month'); 
      updateVisibleDates();
    }

    function generateWeeks (date) {
      var start = date.clone().startOf('month'); 
      var end   = date.clone().endOf('month');

      var cacheKey = start.format('YYYY-MM');
      // check if we have already generated the days for this month, hacky memoization
      if (weeksCache[cacheKey])
        return weeksCache[cacheKey];

      var range = moment().range(start.startOf('week'), end.endOf('week'));

      var weeks = [];
      range.by('weeks', function(week) {
        var days = [];
        moment().range(week.clone().startOf('week'), week.clone().endOf('week')).by('days', function(day) {
          days.push(day.startOf('day').toDate()); 
        });
        weeks.push(days);
      });

      weeksCache[cacheKey] = weeks

      return weeks;
    }

    function selectDate(date) {
      console.log('date picked', date) 
      // both dates are already selected, but user clicked a new date
      // reset them both
      if (vm.startDate && vm.endDate) {
        vm.endDate = null;
        vm.startDate = null;
      }

      // both dates are unselected, select the start date
      if (!vm.startDate && !vm.endDate) {
        vm.startDate = date;
        vm.selectedDate = date;
        return;
      }

      if (vm.startDate && moment(date).isBefore(vm.startDate)) {
        vm.endDate = vm.startDate;
        vm.startDate = date;
        vm.selectedDateRange = moment().range(vm.startDate, vm.endDate);
        vm.selectedDate = date;
        return;
      }

      if (vm.startDate && moment(date).isAfter(vm.startDate)) {
        vm.selectedDateRange = moment().range(vm.startDate, vm.endDate);
        vm.endDate = date;
        return;
      }

    }
  }
}
