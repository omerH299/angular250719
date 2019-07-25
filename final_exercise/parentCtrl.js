
module.controller("parentCtrl", ParentCtrl)

// DI dependency injection - IOC
function ParentCtrl($scope, serviceService, dataService) {

    serviceService.getAllPosts()
    $scope.id
    $scope.ds = dataService 
    $scope.getPost = function (id) 
    {
        serviceService.getPostById(id)
    }

}
