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
    <hr>
    <a class="button" @click="toggleAddingModal">
      <span class="icon">
        <i class="fa fa-plus"></i>
      </span>
      <span>Add</span>
    </a>
    <app-user-book-adding :showAddingModal="showAddingModal" @showAddingModal="showAddingModal=$event"></app-user-book-adding>

    <a class="button is-danger">
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
    <a class="button is-primary">
      <span class="icon">
        <i class="fa fa-gift"></i>
      </span>
      <span>Wish List</span>
    </a>
  </div>
</template>

<script>
import he from 'he'
import UserBookAddingModalComponent from './UserBookAddingModal'
import * as types from '../../../store/types'

export default {
  name: 'bookcard',
  props: [ 'book' ],
  components: {
    'app-user-book-adding': UserBookAddingModalComponent
  },
  data () {
    return {
      showAddingModal: false
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
    async toggleAddingModal () {
      try {
        await this.$store.dispatch(types.ACTION_LOAD_COLLECTIONS_ASYNC)
        this.showAddingModal = !this.showAddingModal
      } catch (error) {
      }
    },
    newCollectionEnter () {
      console.log('enter pressed')
      this.isEntered = true
    }
  }
}
</script>

<style scoped>



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
