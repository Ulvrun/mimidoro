(function(){

  // Module for application --------------------------------------------------

  var app = angular.module('mimidoro', [ ]);

  // Controllers section -----------------------------------------------------

  app.controller('TimerController', function($scope, $timeout){

    console.log($scope);

    $scope.start_btn = 'Start';
    $scope.stop_btn = 'Stop';
    $scope.skip_btn = 'Skip';

    $scope.seconds = 0;
    $scope.minutes = 0;
    $scope.time = 0;

    // Methods for timer buttons ---------------------------------------------

    var timer;

    $scope.start_timer = function(){

        $scope.seconds += 1;
        $scope.time += 1;

        timer = $timeout($scope.start_timer, 500);
        $scope.minutes = Math.floor($scope.time / 60);

        if ($scope.seconds == 60){$scope.seconds = 0}

    };

    $scope.skip_timer = function(){
        $scope.seconds = 0;
        $scope.start_timer
    };

    $scope.stop_timer = function(){

        $timeout.cancel(timer)

    };

    // Function - flag if preceding zero should should be shown --------------

    $scope.is_zero_shown = function(){

       // Preceding zero for minutes is hiding with preceding zero for seconds
       // Parameter for function is needed
       if (($scope.seconds > 9) || ($scope.minutes > 9))
          return true;
        else
          return false;

    };

  });

  app.controller('MenuController', function($scope){

    $scope.app_name = 'Mimidoro';
    $scope.tasks_btn = 'Tasks';
    $scope.reports_btn = 'Reports';
    $scope.settings_btn = 'Settings';

    this.tab = 1;

    this.selectTab = function(setTab){

        this.tab = setTab;
    };

    this.isSelected = function(checkTab){

        return this.tab === checkTab;
    };

  });

  app.controller('TasksController', ['$scope', '$http', '$log', function($scope, $http, $log){

    $scope.tasks_list = [];
    $scope.add_task_btn = 'Add Task';

    $scope.task = {};

    $scope.addTask = function(task){
        $scope.tasks_list.push($scope.task);


        $http.post('tasks.json', {'description': $scope.task})
        .then(function (response) {
            return response;
        });

        $scope.task = {};
    };

    $http.get('tasks.json').success(function(data){

        $scope.tasks_list = data;

        });

  }]);

  app.controller('ReportsController', function($scope){

    $scope.reports = 'Reports - will be implemented';

  });

  app.controller('SettingsController', function($scope){

    $scope.settings = 'Settings - will be implemented';

  });

  // Variables section -------------------------------------------------------

//  var tasks = [{
//    title: 'Task 1',
//    description: 'Finish course "Shaping Up with AngularJS" on CodeSchool'
//  },
//  {
//    title: 'Task 2',
//    description: 'Implement on click action for "Start" button -> Timer starts'
//  },
//  {
//    title: 'Task 3',
//    description: 'Entering value into task field appends new task into the list'
//  }];

})();