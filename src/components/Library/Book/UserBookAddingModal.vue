<template>
  <modal 
    :width="520" 
    :is-show="showAddingModal" 
    transition="fadeDown"
    @close="$emit('showAddingModal', false)"
    :backdrop-closable="false">
    <div slot="header" class="modal-header">
      <div class="is-pulled-left">
        <p class="title">Your Collections</p>
      </div>
      <div class="is-pulled-right">
        <a class="button is-small is-white" @click="addNewCollection">
          <span class="icon is-small">
            <i class="fa fa-plus-circle"></i>
          </span>
          <span style="font-weight: bold">Add</span>
        </a>
      </div>
    </div>

    <div class="columns" v-for="(item, index) in getCollections" :key="index">
      <!-- <div class="column is-2 has-text-centered collection-image">
        <img src="http://placehold.it/64x64">
      </div> -->
      <div class="column collection-name">
        <p class="control">
          <!-- <input class="input" v-bind:class="{ 'is-static': isEntered }" type="text" placeholder="Text input" value="hello" v-on:keyup.enter="newCollectionEnter" :readonly="isEntered"> -->
          <input 
            class="input" 
            v-bind:class="{ 'is-static': !item.isEditing }" 
            :readonly="!item.isEditing" 
            :placeholder="item.isEditing ? 'collection name' : false"
            @focus="$event.target.select()"
            v-on:keyup.enter="completeEditing(item, index)"
            type="text" 
            v-focus
            v-model="item.name" 
            >
        </p>
        <p v-if="!item.isEditing">0 Books</p>
      </div>
      <div class="column is-3 is-pulled-right" v-if="!item.isEditing && item.name !== 'My Reading Collection' && item.name !== 'My Read Collection'">
        <p class="control has-addons collection-buttons">
          <a class="button is-white" @click="toggleEdit(index)">
            <span class="icon">
              <i class="fa fa-edit"></i>
            </span>
          </a>
          <a class="button is-danger is-inverted" @click="trashCollection(index)">
            <span class="icon">
              <i class="fa fa-trash"></i>
            </span>
          </a>
        </p>          
      </div>
    </div>

    <p v-for="(item, index) in getCollections" :key="index">
      {{ item.name }}
    </p>

    <!-- <p v-for="(value, key, index) in getCollections" :key="key">
      {{ value.name }}
      {{ key }}
      {{ index }}
    </p> -->
<!-- 
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
    </div> -->



  </modal>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '../../../store/types'

const focus = {
  inserted (el) {
    el.focus()
  }
}

export default {
  name: 'userbookadding',
  props: [ 'showAddingModal' ],
  directives: { focus },
  computed: {
    ...mapGetters({
      getCollections: types.COLLECTIONS
    })
  },
  data () {
    return {
      isEntered: false
    }
  },
  methods: {
    addNewCollection () {
      this.$store.commit(types.ADD_ONE_EMPTY_COLLECTION)
    },
    completeEditing (item, index) {
      if (item.name) {
        this.$store.commit(types.UPDATE_ONE_COLLECTION, {
          index,
          name: item.name
        })
      } else {
        this.$store.commit(types.REMOVE_ONE_EMPTY_COLLECTION, { index })
      }
    },
    toggleEdit (index) {
      this.$store.commit(types.TOGGLE_COLLECTION_EDITING, { index })
    },
    trashCollection (index) {
      this.$store.commit(types.REMOVE_ONE_EMPTY_COLLECTION, { index })
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
  padding-left: 30px;
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
</style>
