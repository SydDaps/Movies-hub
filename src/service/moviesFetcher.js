import axios from 'axios';

export default {

fetchMovies(keyWord, page = 1, singleMovie = false) {
    this.setParams = {
      apikey: "b3e1466b",
      s: keyWord,
      plot: "full",
      page: page
    }
    if(singleMovie){
      delete this.setParams.s
      this.setParams.i = keyWord
    }
    return axios({
      method: 'get',
      url: 'http://www.omdbapi.com/',
      params: this.setParams
    }).then( (response) => {
        
        return response.data
      }
    ).catch( error => {
      console.log(error)
    }
    )
  }
}


