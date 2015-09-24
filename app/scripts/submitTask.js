var app = require('./app.js');

app.factory('submitTask', ['$firebaseArray', function($firebaseArray) {

  var ref = new Firebase("https://pomipomi.firebaseio.com/tasks"); //Firebase reference
  var taskList = [];
  taskList =  $firebaseArray(ref); //AngularFire reference to data; downloads tasks into local array

  /*ref.endAt().limit(100).on('value', update);

  var reverseTasks = function(snap){
    var list = [];
    snap.forEach(function(ss) {
       var data = ss.val();
       data['.priority'] = ss.getPriority();
       data['.name'] = ss.name();
       list.unshift(data);
    });
  }*/

  ref.child('tasks').startAt().limitToFirst(20).on('child_added', function(fbdata) {
    console.log(fbdata.exportVal());
  })

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
    taskList.$save(item)
  };*/

  return {
    getTasks: getTasks,
    add: add
  }

}]);
