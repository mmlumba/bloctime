var app = require('./app.js');

app.factory('submitTask', ['$firebaseArray', function($firebaseArray) {

  var ref = new Firebase("https://pomipomi.firebaseio.com/tasks"); //Firebase reference
  var taskList =  $firebaseArray(ref); //AngularFire reference to data
  //var taskList = [];
  //taskList = sync.$firebaseArray(ref); //downloads tasks into local array
/*
  var getTasks = function (){
    return taskList;
  }
*/
  var add = function(taskName){
    var item = {
      content: taskName
    };

    taskList.$add(item)
    taskList.$save(item)
  }

  var update = function(){
    tasks.$save(item)
  };

  return {
    add: add,
    update: update
  }

}]);
