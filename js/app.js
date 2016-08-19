(function(){

  // Module for application --------------------------------------------------

  var app = angular.module('mimidoro', [ ]);

  // Controllers section -----------------------------------------------------

  app.controller('TimerController', function(){

    this.start_btn = start;
    this.stop_btn = stop;
    this.skip_btn = skip;

  });

  app.controller('MenuController', function(){

    this.tab = 1;

    this.selectTab = function(setTab){

        this.tab = setTab;
    };

    this.isSelected = function(checkTab){

        return this.tab === checkTab;
    };

  });

  app.controller('TasksController', function(){

    this.task = {};

    this.addTask = function(task){
        tasks.push(this.task);
        this.task = {};
    };

    this.list = tasks;
    this.add_task = add;

  });

  app.controller('ReportsController', function(){

    this.reports_list = reports;

  });

  app.controller('SettingsController', function(){

    this.settings_list = settings;

  });

  // Variables section -------------------------------------------------------

  var start = {

    caption: 'Start'

  }

   var stop = {

    caption: 'Stop'

  }

   var skip = {

    caption: 'Skip'

  }

  var add = {

    caption: 'Add Task'

  }

  var reports = {

    report_name: 'Reports - will be implemented'

  }

  var settings = {

    setting_name: 'Settings - will be implemented'
  }

  var tasks = [{
    title: 'Task 1',
    description: 'Finish course "Shaping Up with AngularJS" on CodeSchool'
  },
  {
    title: 'Task 2',
    description: 'Implement on click action for "Start" button -> Timer starts'
  },
  {
    title: 'Task 3',
    description: 'Entering value into task field appends new task into the list'
  }];

})();