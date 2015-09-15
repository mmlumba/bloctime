var app = require('./app.js');

app.factory('submitTask', ['$firebaseArray', function($firebaseArray) {

  var ref = new Firebase("https://pomipomi.firebaseio.com");
  var sync = $firebase(ref);
  var taskList = [];
  taskList = sync.$firebaseArray(ref);

  var getTasks = function (){
    return taskList;
  }

  var add = function(taskName){
    var item = {
      content: taskName
    };

    taskList.$add(item)
    taskList.$save(item)
  }

  /*var update = function(){
    tasks.$save(item)
  };*/

  return {
    getTasks: getTasks,
    add: add
  }

}]);
