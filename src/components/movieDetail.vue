<template>
  <div class="pointer">
    <div class="tw-grid tw-grid-cols-4 pointer">
      <div class="tw-text-lightGreen tw-text-sm tw-font-bold  tw-m-3 tw-col-span-3">{{ `${movieRequest.Title}(${movieRequest.Year})` }} </div>
      <div class="">
        <span class="tw-absolute tw-p-1 tw-top-3 tw-right-1 tw-mr-3 tw-bg-back tw-text-white tw-text-xs">{{movieRequest.Quality }}</span>
      </div>
    </div>
    <div class="tw-bg-back tw-h-10 tw-relative pointer">
      <span class="tw-text-xs tw-font-bold tw-inline-block tw-bg-yellow-400 tw-m-2 tw-p-1">IMDB: 6.5</span>
      <span class="tw-text-lightGreen tw-text-xs tw-font-bold tw-ml-3">{{ movieRequest.Year.substring(0, 4) }}</span>
      <span class="tw-text-white tw-text-xs tw-font-bold tw-ml-3">105min</span>
    </div>
    <div v-if="dailogReady" class="pointer">
      <div class="tw-text-white tw-text-xs tw-p-3" v-if="this.movie.Plot">
      {{ setPlot(movie.Plot) }}
      </div>
      <div class="tw-p-3 tw-h-25 tw-mb-6 tw-text-white" v-if="this.movie.Plot">
        <v-btn
        color="blue-grey"
        class="tw-w-full tw-bg-lightGreen dButton tw-mb-3">
        <div class="icon-div tw-mr-3 tw-bg-white">
          <v-icon class="icon ">
            mdi-play
          </v-icon>
        </div>
          Download Movie
        </v-btn>

        <v-btn
          color="blue-grey"
          class="tw-w-full tw-bg-lightGreen dButton-2"
        >
        <div class="icon-div tw-mr-3 tw-bg-white">
          <v-icon class="icon-2">
            mdi-heart
          </v-icon>
        </div> 
          Favorite
        </v-btn>
      </div>
    </div>
    <div class="loader tw-h-20 tw-w-20 tw-container tw-mx-auto tw-mt-10 tw-mb-10" v-if="dailogSearching">

        <v-progress-circular
        :size="50"
        color="primary"
        class=" tw-text-lightGreen"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>
<script>
import fetcher from "../service/moviesFetcher";
export default {
  props: ['movieRequest'],
  data() {
    return {
      movie: "",
      dailogSearching: false,
      dailogReady: false
    }
  },
  methods: {
    async getMovie(){
      this.dailogReady = false
      this.dailogSearching = true

      let movieData = await fetcher.fetchMovies(this.movieRequest.imdbID, 1, true)
      this.movie = movieData

      this.dailogSearching = false
      this.dailogReady = true
      
    },
    setPlot(plot){
      if (plot.length > 150) {
       return plot.substring(0, 150) + '...';
      }
      return plot;
    }
  },
  created(){
    this.getMovie()
  }

}
</script>

<style lang="scss" scoped>
.icon {
  color: #79c142 !important;
  
  
  
}
.icon-div {
  border-radius: 100%;
}

.dButton {
  background-color: #79c142 !important;
  color: white !important;
  text-transform: capitalize !important;
  font-weight: 500;
  letter-spacing: -0.025em;
}

.dButton-2 {
  text-transform: capitalize !important;
  font-weight: 500;
  letter-spacing: -0.025em;
}

.pointer:hover {
  cursor: text !important;
}
</style>