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

app.filter('durationDisplay', function(){
  return function(d){
    return moment.utc(d.asMilliseconds()).format('mm:ss');
  }
});

app.constant('ButtonText', {
  START: 'Start the Timer!',
  RESET: 'Reset the Timer!',
  STARTBREAK: 'Break Time!'
});

app.controller("Timer.controller", ["$scope", "$interval", "ButtonText",
  function($scope, $interval, ButtonText){

    var isStarted = false; //executes javascript code that subtracts the time
    var timeDuration = moment.duration('00:00:15');
    $scope.onBreak = false;

    $scope.message = {
      time: timeDuration
    };

    $scope.buttonText = ButtonText.START;
    $scope.breakText = ButtonText.STARTBREAK;

    $interval(function(){
      if (isStarted){
        $scope.message.time = $scope.message.time.subtract(1, 's');

        if ( (+$scope.message.time) === 0){
          if ($scope.onBreak){
            $scope.onBreak = false;
            $scope.message.time = moment.duration('00:00:15');
            $scope.buttonText = ButtonText.START;
          }
          else {
            $scope.onBreak = true;
          }
          isStarted = false;
        }
      }
    }, 1000);

    $scope.startTimer = function(){

      isStarted = !isStarted; //this does opposite affect every time button is clicked

      if (isStarted){
        $scope.buttonText = ButtonText.RESET;
      }
      else {
        $scope.message.time = moment.duration('00:00:15');
        $scope.buttonText = ButtonText.START;
      }

    }

    $scope.startBreakTimer = function(){
      if ($scope.onBreak){
        $scope.message.time = moment.duration('00:00:10');
        isStarted = true;
      }
    }

  }]);
