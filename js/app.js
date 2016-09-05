
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
    $scope.work_session_counter = 0;

    // Methods for timer buttons ---------------------------------------------

    var timer;
    var duration = 1000;

    $scope.start_work_timer = function(){

        $scope.session_title = 'Time to work hard & focused';
        $scope.seconds += 1;
        $scope.time += 1;

        timer = $timeout($scope.start_work_timer, duration);

        $scope.seconds_to_minutes_convert();

        if ($scope.time > 5) {

            $scope.work_session_counter += 1;

            $scope.stop_timer();
            $scope.set_to_zero_timer();
            $scope.start_break_timer();
        }

    };

    $scope.start_break_timer = function(){

        $scope.session_title = 'Time to have a break';
        $scope.seconds += 1;
        $scope.time += 1;

        timer = $timeout($scope.start_break_timer, duration);

        $scope.seconds_to_minutes_convert();

        if ($scope.time > 3) {

            $scope.stop_timer();
            $scope.set_to_zero_timer();
            $scope.start_work_timer();

        }

    };

    $scope.skip_timer = function(){
        $scope.seconds = 0;
        $scope.start_work_timer();
    };

    $scope.stop_timer = function(){

        $timeout.cancel(timer)

    };

    $scope.set_to_zero_timer = function(){

        $scope.seconds = 0;
        $scope.minutes = 0;
        $scope.time = 0;

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

    $scope.seconds_to_minutes_convert = function(){

        $scope.minutes = Math.floor($scope.time / 60);

        if ($scope.seconds == 60){
            $scope.seconds = 0;
        }

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

    $scope.tasks_title = 'You have a big task? Save it & track the time it took until finished.'
    $scope.tasks_list = [];
    $scope.add_task_btn = 'Add Task';

    $scope.task = {};

    $scope.addTask = function(task){
        $scope.tasks_list.push($scope.task);

        var parameter = JSON.stringify({'description': $scope.task});
        $http.post('tasks.json', parameter)
        .then(function (response) {
            return response;
        });

        $scope.task = {};
    };

    $http.get('tasks.json').success(function(data){

        $scope.tasks_list = data;

        });

    $scope.save_task = function(){

    };

  }]);

  app.controller('ReportsController', function($scope){

    $scope.reports_title = 'Tracking your time helps to analyze productivity, but only if its saved for future comparation';

  });

  app.controller('SettingsController', function($scope){

    $scope.settings_title = 'Wanna work in more personalized style? Set work & break duration due to your comfort zone';
    $scope.work_session_duration_title = 'Work session duration';
    $scope.short_break_duration_title = 'Short break duration';
    $scope.long_break_duration_title = 'Long break duration';

    $scope.work_session_duration = '10';
    $scope.break_duration = '5';

  });

})();

