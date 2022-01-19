<template>
  <div class="tw-relative">
    
    <div class="tw-grid tw-grid-cols-12" v-if="resultsReady">
      <div class="tw-col-span-1"></div>
      <div class="tw-col-span-10 tw-pt-5">
        <span class="tw-bg-green tw-h-10 tw-inline-block tw-p-2 tw-text-white tw-text-base tw-rounded-t-sm" v-if="!errorPage">Search results for "{{searchData}}"</span>
        <span class="tw-bg-red-400 tw-h-10 tw-inline-block tw-p-2 tw-text-white tw-text-base tw-rounded-t-sm" v-else-if="errorPage">{{ errorMessage }} for "{{searchData}}"</span>
        
        
          <div class="tw-grid tw-grid-cols-8 tw-gap-6 tw-mt-10 xs:tw-grid-cols-2 md:tw-grid-cols-4 lg:tw-grid-cols-12" v-if="movies.length > 0">  
            <div 
            v-for="(movie, index) in movies" :key="movie.id"
            @mousemove="showIconAction(index, $event)" @mouseleave="mouseLeaveAction()"
            class="tw-relative tw-rounded-lg movie-card"
            :style="{ background:`linear-gradient(rgba(0,0,0,0) 20%, rgba(0,0,0,1)), url(${movie.Poster})`, backgroundSize: `100% 100%`}">
              <span class="tw-text-white tw-inline-block tw-mt-20 tw-text-center tw-w-full tw-absolute tw-inset-x-0 tw-bottom-0 tw-mb-1"> {{movie.Title}}</span>
              <span class="tw-text-black tw-text-xs tw-font-medium tw-absolute tw-bg-yellow-400 tw-rounded-sm  tw-p-1 tw-top-2 tw-right-2">{{ movie.Quality }}</span>
              <span
              v-show="showIcon === index"
              
              class="tw-bg-green tw-inline-block tw-rounded-full tw-absolute tw-p-1 tw-top-20 tw-right-12"><v-icon x-large class="tw-text-white" >mdi-play</v-icon></span>
            </div>
          </div>
        
      </div>
      <div class="tw-col-span-1 "></div>
    </div>
    <div class="loader tw-h-20 tw-w-20 tw-container tw-mx-auto tw-mt-60" v-if="searching">

      <v-progress-circular
      :size="100"
      color="primary"
      class=" tw-text-lightGreen"
      indeterminate
    ></v-progress-circular>
    </div>
    <div class="info-dailog tw-bg-red-500 tw-absolute tw-rounded-lg " v-bind:style="dailogStyle" v-if="showDailog" @mousemove="onDailog = true" @mouseleave="mouseLeaveDailog()" >
      <movie-detail :movieRequest="this.movies[this.currentIndex]"></movie-detail>
    </div>
  </div>
</template>
<script>
import fetcher from "../service/moviesFetcher"
import movieDetail from "../components/movieDetail.vue"

export default {
  components: {
    movieDetail: movieDetail 
  },
  props: ['searchData'],
  data () {
    return {
      movies: [],
      movieFormats: ["WEBRIp","BRRrip","HD"],
      page: 1,
      showIcon: null,
      dailogStyle: {},
      currentIndex: 0,
      showDailog: false,
      currentMovie: null,
      searching: false,
      resultsReady: false,
      onDailog: false,
      errorPage: false,
      errorMessage: ""
    }
  },
  methods: {
    getMovies: async function getMovies() {
      this.resultsReady = false
      this.errorPage = false
      this.searching = true

      let moviesData = await fetcher.fetchMovies(this.searchData)

      
      this.searching = false
      this.resultsReady = true
      if(moviesData.Error){
        
        this.errorPage = true
        this.errorMessage = moviesData.Error
        return
      }
      

      this.movies = (moviesData.Search)

      let totalPages = Math.round(moviesData.totalResults / 10)
      this.fetchMore(totalPages)
    },
    async getMovie(keyword, page, singleMovie){
      

      let movieData = await fetcher.fetchMovies(keyword, page, singleMovie)
      
      this.currentMovie = movieData
      
      

      return this.currentMovie
    },
    fetchMore: async function fetch(totalPages){
      
      for (let page = 2; page < totalPages; page++) {
        if(page > 6){
          break;
        }
        
        let moviesData = await fetcher.fetchMovies(this.searchData, page)
        this.movies = this.movies.concat(moviesData.Search)
        
      }

      for(let movie = 0; movie < this.movies.length; movie++){
        this.movies[movie].Quality = this.randomFormat()
      }
    },
    randomFormat(){
      return this.movieFormats[Math.floor(Math.random() * 3)]
    },
    showIconAction(index, event){
      this.showIcon = index;
      
      if(Object.keys(this.dailogStyle).length == 0 ){
        this.dailogStyle = {top: `${event.pageY - 60}px`, left: `${event.pageX}px`}
        this.currentIndex = index
      }
      this.showDailog = true
    },
    async mouseLeaveAction(){
      await new Promise((resolve)=>setTimeout(() => {
        resolve();
      },100));
      
      if(!this.onDailog){
      this.showIcon = null
      this.dailogStyle = {}
      this.showDailog = false
      }
      
    },
    mouseLeaveDailog(){
      this.onDailog = false
      this.showIcon = null
      this.dailogStyle = {}
      this.showDailog = false
      
    }

  },
  created(){
    console.log("created started");
    if (this.searchData != ""){
      this.getMovies()
    }
  },
  watch: {
    searchData: function (){
      this.getMovies()
    }
  }
}
</script>

<style lang="scss" scoped>

.movie-card:hover{
  border: solid 4px;
  border-color: #79c142;
}


.movie-card {
  height: 230px;
  width: 100%;
}

.v-icon {
  color: white !important;
}

.info-dailog {
  background-color: #444444;
  width: 18%;
}

.info-dailog:hover {
  
  cursor: text !important;
}
</style>