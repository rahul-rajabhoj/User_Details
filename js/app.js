var module = angular.module('app', []);

module.service('UserService', function () {
    //to create unique user id
    var uid = 1;
    
    //users array to hold list of all users
    var users = [{
        id: 0,
        'fname': 'Rahul',
        'lname': 'Rajabhoj',
        'phone': '9527692789',
        'email': 'rahulrajabhoj@gmail.com',
        'address': 'Bhagatsingh Ward, Bhandara'
    }];
    
    //save method create a new user if not already exists
    //else update the existing object
    this.save = function (user) {
        if (user.id == null) {
            //if this is new user, add it in users array
            user.id = uid++;
            users.push(user);
        } else {
            //for existing user, find this user using id
            //and update it.
            for (i in users) {
                if (users[i].id == user.id) {
                    users[i] = user;
                }
            }
        }

    }

    //simply search users list for given id
    //and returns the user object if found
    this.get = function (id) {
        for (i in users) {
            if (users[i].id == id) {
                return users[i];
            }
        }

    }
    
    //iterate through users list and delete 
    //user if found
    this.delete = function (id) {
        for (i in users) {
            if (users[i].id == id) {
                users.splice(i, 1);
            }
        }
    }

    //simply returns the users list
    this.list = function () {
        return users;
    }
});

module.controller('UserController', function ($scope, UserService) {

	$scope.ph_numbr = /^\+?\d{10}$/;
    $scope.eml_add = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    $scope.users = UserService.list();

    $scope.saveUser = function () {
        UserService.save($scope.newuser);
        $scope.newuser = {};
    }


    $scope.delete = function (id) {

        UserService.delete(id);
        if ($scope.newuser.id == id) $scope.newuser = {};
    }


    $scope.edit = function (id) {
        $scope.newuser = angular.copy(UserService.get(id));
    }
})