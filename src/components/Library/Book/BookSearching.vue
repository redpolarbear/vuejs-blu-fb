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
        <a class="button is-primary is-large" @click.stop="searchBook">
          Search
        </a>
      </p>
      <app-book-card></app-book-card>
    </div>
  </section>
</template>

<script>
import BookCardComponent from './BookCard'

export default {
  name: 'createbook',
  data () {
    return {
      isbnCode: '',
      bookObj: {}
    }
  },
  components: {
    'app-book-card': BookCardComponent
  },
  methods: {
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
