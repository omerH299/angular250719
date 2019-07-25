module.service("serviceService", function (globalConst, dataService, $http) {

    this.getAllPosts = function () {
        let p = $http.get(`${globalConst.url}`)
    p.then( (resp) => {
        dataService.allPosts = resp.data 
    }, (err) => {
        dataService.allPosts = err  
    })
    };

   this.getPostById = function (id) {
        let p = $http.get(`${globalConst.url}/${id}`)
    p.then( (resp) => {
        dataService.post = resp.data 
        dataService.allPosts = null
    }, (err) => {
        dataService.postError = err  
        dataService.post = null
    })
    };
});