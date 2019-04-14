 export class MoviesService {
  constructor($http) {
    this.$http = $http;
    this.movies = [];
  }

   findMovieById(id) {
    return Promise.resolve(this.movies.data.find(element => Number(element.id) === Number(id)));
  }

   getAllMovies() {
    return this.$http({
      method: 'GET',
      url: 'https://gist.githubusercontent.com/dmk1111/2714c5d780a1cdc723075ec7bec38501/raw/72479f9c108f26b009afef7b02e7b2243736d1c8/movies.json'
    }).then((result) => {
      return this.movies = result.data;
    });
  }
}

MoviesService.serviceName = 'moviesService';
MoviesService.$inject = ['$http'];