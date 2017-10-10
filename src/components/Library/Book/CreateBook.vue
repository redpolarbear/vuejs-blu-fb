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
import axios from 'axios'

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
    async searchBook () {
      console.log(this.isbnCode)
      const url = 'http://feedback.api.juhe.cn/ISBN'
      const params = {
        sub: '9787544258975',
        key: '436d9b993fd3c3138954fd6fc9f89053'
      }
      const res = await axios.get(url, {
        params,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      })
      console.log(res.data.result)
      this.bookObj = Object.assign({}, res.data.result)
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
