<template>
  <section class="section">
    <div class="container">
      <p class="control has-addons has-addons-centered">
        <a class="button is-static is-large">
          <span class="icon is-medium">
            <i class="fa fa-barcode"></i>
          </span>
        </a>
        <input class="input is-large" type="text" placeholder="ISBN Code" v-model="isbnCode">
        <a class="button is-large">
          <span class="icon is-medium">
            <i class="fa fa-camera"></i>
          </span> 
        </a>
      </p>
      <p class="has-text-centered">
        <a class="button is-primary is-large" 
          @click.stop="searchBook"
          v-bind:class="[{ 'is-loading': getLoading }]">
          Search
        </a>
      </p>
      <app-book-card :book="getBookInfo" ></app-book-card>
    </div>
  </section>
</template>

<script>
import validator from 'validator'
import { mapGetters } from 'vuex'
import BookCardComponent from './BookCard'
import * as types from '../../../store/types'

export default {
  name: 'createbook',
  data () {
    return {
      isbnCode: '7544258971',
      bookObj: {}
    }
  },
  computed: {
    ...mapGetters({
      getBookInfo: types.BOOK_INFO,
      getLoading: types.LOADING
    })
  },
  components: {
    'app-book-card': BookCardComponent
  },
  beforeRouteLeave (to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    this.$store.commit(types.SET_BOOK_INFO, null)
    next()
  },
  methods: {
    async searchBook () {
      if (typeof (this.isbnCode) !== undefined && validator.isISBN(this.isbnCode)) {
        await this.$store.dispatch(types.ACTION_SEARCH_BOOK_BY_ISBN_IN_FB_ASYNC, { isbn: this.isbnCode })
        console.log(this.getBookInfo)
        if (this.getBookInfo) {
          return // the book is found in the FB DB
        } else {
          await this.$store.dispatch(types.ACTION_SEARCH_BOOK_BY_ISBN_ASYNC, { isbn: this.isbnCode })
          if (this.getBookInfo) {
            // the book is found in the JUHE API and need to save to the FB DB
            await this.$store.dispatch(types.ACTION_SAVE_BOOK_INFO_INTO_FB_ASYNC)
          } else {
            return // unable to be found
          }
        }
      } else {
        this.$store.commit(types.SET_ERROR, 'Please input the valid ISBN.')
      }
    }
  }
}
</script>

<style scoped>
.button.is-static {
  background-color: whitesmoke;
  border-color: #dbdbdb;
  color: #7a7a7a;
  -webkit-box-shadow: none;
  box-shadow: none;
  pointer-events: none;
}
.button .icon {
  margin-left: auto;
  margin-right: auto;
}

</style>
