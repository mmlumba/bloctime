var app = angular.module("PomiPomi", ["firebase", "ui.router", "angularMoment"]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    views: {
      'timerclock@home' : {
        controller: 'Timer.controller',
        templateUrl: '/templates/home.html'
      },
      'taskList@home': {
        controller: 'Timer.controller',
        templateUrl: '/templates/taskList.html'
      }
    }
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

app.constant('Times', {
  WORKTIME: '00:00:10',
  BREAKTIME: '00:00:05',
  LONGBREAK: '00:00:20'
});

app.controller("Timer.controller", ["$scope", "$interval", "ButtonText", "Times", "submitTask",
  function($scope, $interval, ButtonText, Times, submitTask){

    //var mySound = null;

    var workCount = 0;
    var breakCount = 0;

    $scope.tasks = submitTask.getTasks();

    $scope.addNewTask = function() {
      submitTask.add($scope.task);
      $scope.task = "";
    };

    $scope.isStarted = false; //executes javascript code that subtracts the time
    var timeDuration = moment.duration(Times.WORKTIME);
    $scope.onBreak = false;

    $scope.message = {
      time: timeDuration
    };

    $scope.buttonText = ButtonText.START;
    $scope.breakText = ButtonText.STARTBREAK;

    var mySound = new buzz.sound( "/sounds/done", {
      format: ['mp3'],
      preload: true
    });

    $scope.$watch('message.time', function(newVal, oldVal){
      //console.log(newVal, oldVal);
      if ( newVal.seconds() === 0 ) {
        //mySound.load();
        mySound.bind("error", function(e){
          console.log(this.getErrorMessage());
        });
        mySound.play();

        if ($scope.onBreak){
          $scope.onBreak = false;
          $scope.message.time = moment.duration(Times.WORKTIME);
          $scope.buttonText = ButtonText.START;
          breakCount++
          //console.log("break count: " + breakCount);
          alert("BACK TO WORK");
        }
        else {
          $scope.onBreak = true;
          workCount++
          //console.log("work session count: " + workCount);
          alert("BREAK TIME");
        }

        $scope.isStarted = false;
      }
    }, true);

    $interval(function(){
      if ($scope.isStarted){
        $scope.message.time = $scope.message.time.subtract(1, 's');
      }
    }, 1000);

    $scope.startTimer = function(){

      $scope.isStarted = !$scope.isStarted; //this does opposite affect every time button is clicked

      if ($scope.isStarted){
        $scope.buttonText = ButtonText.RESET;
      }
      else {
        $scope.message.time = moment.duration(Times.WORKTIME);
        $scope.buttonText = ButtonText.START;
      }

    }

    $scope.startBreakTimer = function(){
      if ($scope.onBreak){
        $scope.message.time = moment.duration(Times.BREAKTIME);
        if (workCount % 4 == 0){
          $scope.message.time = moment.duration(Times.LONGBREAK);
          workCount = 0;
          //alert("LONG BREAK TIME");
        }
        $scope.isStarted = true;
      }
    }

  }]);

module.exports = app;
