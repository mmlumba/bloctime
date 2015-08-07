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

app.constant('ButtonText', {
  START: 'Start the Timer!',
  RESET: 'Reset the Timer!'
});

app.controller("Timer.controller", ["$scope", "$interval", "ButtonText",
  function($scope, $interval, ButtonText){

    var duration = moment.duration({
        'seconds': 00,
        'minutes': 25
      });

      var timestamp = new Date(0,0,0,0,25,00);

      var isStarted = false;

    $scope.message = {
      time: timestamp
    };

    $scope.buttonText = ButtonText.START;

    $interval(function(){
      if (isStarted){
        $scope.timeStamp = +(new Date);
        $scope.message.time = moment($scope.message.time).subtract(1, 's');
      }
    }, 1000);

    $scope.startTimer = function(){
      isStarted = !isStarted; //this does opposite affect every time button is clicked
      if (isStarted){
        $scope.buttonText = ButtonText.RESET;
      }
      else {
        $scope.buttonText = ButtonText.START;
        $scope.message.time = new Date(0,0,0,0,25,00);
      }
      //$scope.buttonText = isStarted ? ButtonText.RESET : ButtonText.START;
    }

  }]);

  app.directive('xcontroltimer', function () {
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
