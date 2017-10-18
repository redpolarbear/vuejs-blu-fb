<template>
  <div v-if="book">
    <p>
      <img :src="book.images_large" alt="">
    </p>
    <p>{{ book.title }}</p>
    <p>{{ book.subtitle }}</p>
    <p>{{ book.author }}</p>
    <p>{{ book.translator }}</p>
    <p>{{ book.pages }}</p>
    <p>{{ book.pubdate }}</p>
    <p>{{ book.publisher }}</p>
    <p>{{ book.isbn10 }}</p>
    <p>{{ book.isbn13 }}</p>
    <p>{{ summary }}</p>
    <a class="button" @click="toggleAdd">
      <span class="icon">
        <i class="fa fa-plus"></i>
      </span>
      <span>Add</span>
    </a>
    <modal :width="520" :is-show="isShow" transition="fadeDown" @close="isShow=false" :backdrop-closable="false">
      <div slot="header" class="modal-header">
        <div class="is-pulled-left">
          <p class="title">Your Collections</p>
        </div>
        <div class="is-pulled-right">
          <a class="button is-small is-white">
            <span class="icon is-small">
              <i class="fa fa-plus-circle"></i>
            </span>
            <span style="font-weight: bold">Add</span>
          </a>
        </div>
      </div>

      <!-- <a class="button is-white" style="width: 100%">
        <div class="columns">
          <div class="column is-2 has-text-centered">
            <img src="http://place-hold.it/64x64" alt="">
          </div>
          <div class="column">
            <p class="control">
              <input class="input" type="text" placeholder="Text input">
            </p>
          </div>
        </div>
      </a> -->

      <div class="columns">
        <div class="column is-2 has-text-centered collection-image">
          <img src="http://placehold.it/64x64">
        </div>
        <div class="column collection-name">
          <p class="control">
            <input class="input" v-bind:class="{ 'is-static': isEntered }" type="text" placeholder="Text input" value="hello" v-on:keyup.enter="newCollectionEnter" :readonly="isEntered">
          </p>
          <p v-if="isEntered">0 Books</p>
        </div>
        <div class="column is-3 is-pulled-right" v-if="isEntered">
          <p class="control has-addons collection-buttons">
            <a class="button is-white">
              <span class="icon">
                <i class="fa fa-edit"></i>
              </span>
            </a>
            <a class="button is-danger is-inverted">
              <span class="icon">
                <i class="fa fa-trash"></i>
              </span>
            </a>
          </p>          
        </div>
      </div>


    </modal>
    <a class="button">
      <span class="icon">
        <i class="fa fa-heart-o"></i>
      </span>
      <span>Favourite</span>
    </a>
    <!-- <a class="button">
      <span class="icon">
        <i class="fa fa-info-circle"></i>
      </span>
      <span>Information</span>
    </a> -->
    <a class="button">
      <span class="icon">
        <i class="fa fa-tags"></i>
      </span>
      <span>Tags</span>
    </a>
    <a class="button">
      <span class="icon">
        <i class="fa fa-gift"></i>
      </span>
      <span>Wish List</span>
    </a>
  </div>
</template>

<script>
import he from 'he'

export default {
  name: 'bookcard',
  props: [ 'book' ],
  data () {
    return {
      isShow: false,
      isEntered: false
      // book: {
      //   author: '[哥伦比亚] 加西亚·马尔克斯',
      //   binding: '精装',
      //   images_large: 'http://open.6api.net/lpic/s11284102.jpg',
      //   images_medium: 'http://open.6api.net/mpic/s11284102.jpg',
      //   isbn10: '7544258971',
      //   isbn13: '9787544258975',
      //   levelNum: '9',
      //   origin_title: '',
      //   pages: '401',
      //   price: '39.50',
      //   pubdate: '2012-9-1',
      //   publisher: '南海出版公司',
      //   subtitle: '',
      //   summary: '★马尔克斯唯一正式授权，首次完整翻译↵★《霍乱时期的爱情》是我最好的作品，是我发自内心的创作。——加西亚•马尔克斯↵★这部光芒闪耀、令人心碎的作品是人类有史以来最伟大的爱情小说。——《纽约时报》↵《霍乱时期的爱情》是加西亚•马尔克斯获得诺贝尔文学奖之后完成的第一部小说。讲述了一段跨越半个多世纪的爱情史诗，穷尽了所有爱情的可能性：忠贞的、隐秘的、粗暴的、羞怯的、柏拉图式的、放荡的、转瞬即逝的、生死相依的……再现了时光的无情流逝，被誉为“人类有史以来最伟大的爱情小说”，是20世纪最重要的经典文学巨著之一。',
      //   title: '霍乱时期的爱情',
      //   translator: '杨玲'
      // }
    }
  },
  computed: {
    summary () {
      return he.decode(this.book.summary)
    }
  },
  methods: {
    toggleAdd () {
      this.isShow = !this.isShow
    },
    newCollectionEnter () {
      console.log('enter pressed')
      this.isEntered = true
    }
  }
}
</script>

<style scoped>
.modal-header {
  display: block;
  margin-bottom: -10px;
  width: 100%;
}

input.is-static {
  background-color: transparent;
  border-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 1.5rem;
  padding-left: 0;
  padding-right: 0;
}

.column.collection-image {
  margin-left: 10px;
}

.column.collection-name {
  padding-right: 30px;
}

.column.collection-name > p.control {
  margin-bottom: 2px;
}

.control.has-addons.collection-buttons {
  justify-content: center;
  text-align: center;
}

.control.has-addons.collection-buttons > .button .icon {
  margin-left: 0;
  margin-right: 0;
}


.boards .board .outside-box.is-gray {
  background-color: #F5F5F5;
  border-radius: 5px;
  box-shadow: 0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);
  display: block;
  margin: 40px 0;
}

.head {
  text-align: right;
}

.delete {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-top: 5px;
}

.inside-box {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);
  display: block;
  padding: 20px;
  margin-right: 28px;
  margin-left: 28px;
}

.boards .board .outside-box .items {
  padding-bottom: 25px;
}

.control-label {
  margin-right: 16px;
}

.label.subtitle {
  font-size: 16px;
}



/* .box .head .name {
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  color: #2C2C30;
}

.box .head .count {
  display: inline-block;
  padding-left: 5px;
  font-size: 20px;
  font-weight: bold;
  color: #AAAAAA;
} */

/* .box .head .options {
  display: inline-block;
  float: right;
  color: #CCCCCC;
} */
/* 


.items .inside-box .meta img {
  border-radius: 30px;
  margin-right: 10px;
}

.items .box .meta .fa {
  margin: 3px 7px;
  color: #CCCCCC;
}

.items .add-card div {
  color: #AAAAAA;
  font-weight: bold;
  font-size: 16px;
} */

.form-control-plaintext {
  padding-top: .5rem;
  padding-bottom: .5rem;
  margin-bottom: 0;
  line-height: 1.25;
  border: solid transparent;
  border-width: 1px 0;
  font-size: 16px;
  color: #363636;
  font-weight: 300;
  word-break: break-word;
}
</style>
