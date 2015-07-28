var app = angular.module("BlocTime", ["firebase", "ui.router", "angularMoment"]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    controller: 'Timer.controller',
    templateUrl: '/templates/home.html'
  });

  moment.locale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s:  "%d seconds",
        m:  "a minute",
        mm: "%d minutes",
        h:  "an hour",
        hh: "%d hours",
        d:  "a day",
        dd: "%d days",
        M:  "a month",
        MM: "%d months",
        y:  "a year",
        yy: "%d years"
    }
  });
}]);

app.controller("Timer.controller", ["$scope", "$interval",
  function($scope){

    var duration = moment.duration({
        'seconds': 00,
        'minutes': 25
      });

      var timestamp = new Date(0,0,0,0,25,00);

    $interval(function(){
      $scope.timeStamp = +(new Date);
    }, 100);

  }]);

  app.directive('controltimer', function () {
    return {
        restrict: 'A',
        template: '/templates/button.html',
        link: function (scope, elem, attrs) {
            elem.bind("click", function () {
                if (elem.val() == "Start the timer!") {
                    elem.val("Stop the timer!");
                } else {
                    elem.val("Start the timer!");
                }
            })
        }
    }
});
