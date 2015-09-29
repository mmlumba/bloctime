var app = require('./app.js');

app.factory('submitTask', ['$firebaseArray', function($firebaseArray) {

  var ref = new Firebase("https://pomipomi.firebaseio.com/tasks"); //Firebase reference
  var taskList = [];
  taskList =  $firebaseArray(ref); //AngularFire reference to data; downloads tasks into local array

  ref.child('tasks').startAt().limitToFirst(20).on('child_added', function(fbdata) {
    console.log(fbdata.exportVal());
  })

  var getTasks = function (){
    return taskList;
  }

  var add = function(taskName){
    var item = {
      content: taskName,
      createdAt: moment().toString()
    };

    taskList.$add(item);
    taskList.$save(item);
  }

  //future feature maybe?
  /*var update = function(){
    taskList.$save(item)
  };*/

  return {
    getTasks: getTasks,
    add: add
  }

}]);
