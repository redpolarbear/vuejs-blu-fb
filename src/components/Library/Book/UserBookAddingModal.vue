<template>
  <modal 
    :width="520" 
    :is-show="showAddingModal" 
    transition="fadeDown"
    @close="closeModal"
    :backdrop-closable="false">
    <div slot="header" class="modal-header">
      <div class="is-pulled-left">
        <p class="title">Your Collections</p>
      </div>
      <div class="is-pulled-right">
        <a class="button is-small is-white" @click="addNewCollection" :disabled="isAddingLocked">
          <span class="icon is-small">
            <i class="fa fa-plus-circle"></i>
          </span>
          <span style="font-weight: bold">Add</span>
        </a>
      </div>
    </div>

    <div class="columns" v-for="(item, index) in getCollections" :key="index">
      <div class="column is-1 has-text-centered collection-check">
        <a class="button is-large is-white collection-check-button" v-bind:class="{ 'is-disabled': item.isExisted || item.isEditing }" @click="checkCollection(item, index)">
          <span class="icon is-large collection-check-button-icon">
            <i class="fa fa-folder-o" v-if="!item.isChecked"></i>
            <i class="fa fa-folder-open-o" v-else></i>
          </span>
        </a>
      </div>
      <div class="column collection-name">
        <p class="control" v-bind:class="{ 'is-loading': item.isLoading }">
          <input 
            class="input" 
            v-bind:class="{ 'is-static': !item.isEditing, 'is-danger': item.isExisted }" 
            :readonly="!item.isEditing" 
            :placeholder="item.isEditing ? 'collection name' : false"
            @focus="$event.target.select()"
            v-on:keyup.enter="completeEditing(item, index)"
            type="text" 
            v-focus
            v-model="item.collection.name">
            <span class="help is-danger" v-if="item.isExisted">The Collection has been existed.</span>
            <!-- v-on:blur="item.isEditing ? completeEditing(item, index) : null" -->
        </p>
        <p v-if="!item.isEditing">0 Books</p>
      </div>
      <div class="column is-3 is-pulled-right" v-if="!item.isEditing && item.collection.name !== 'My Reading Collection' && item.collection.name !== 'My Read Collection'">
        <p class="control has-addons collection-buttons-group">
          <a class="button is-white" @click="enableEdit(index)">
            <span class="icon">
              <i class="fa fa-edit"></i>
            </span>
          </a>
          <a class="button is-danger is-inverted" @click="trashCollection(item.collection.uid, index)">
            <span class="icon">
              <i class="fa fa-trash"></i>
            </span>
          </a>
        </p>          
      </div>
    </div>

    <!-- <div class="columns">
      <div class="column is-1 has-text-centered collection-check">
        <a class="button is-large is-white collection-check-button">
          <span class="icon is-large collection-check-button-icon">
            <i class="fa fa-folder-open-o"></i>
          </span>
        </a>
      </div>
      <div class="column collection-name">
        <p class="control">
          <input 
            class="input is-static" 
            readonly
            type="text" 
            value="My Testing Collection">
        </p>
        <p>0 Books</p>
      </div>
      <div class="column is-3 is-pulled-right">
        <p class="control has-addons collection-buttons-group">
          <a class="button is-white">
            <span class="icon is-medium">
              <i class="fa fa-edit"></i>
            </span>
          </a>
          <a class="button is-danger is-inverted">
            <span class="icon is-medium">
              <i class="fa fa-trash"></i>
            </span>
          </a>
        </p>          
      </div>
    </div> -->
<!-- 
    <p v-for="(item, index) in getCollections" :key="index">
      {{ item.collection.name }}
    </p> -->

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
import _ from 'lodash'

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
      // getAddingLock: types.ADDING_LOCK
    }),
    isAddingLocked: function () {
      return this.addingLock
    }
  },
  data () {
    return {
      addingLock: false,
      checkedIndex: null
    }
  },
  methods: {
    closeModal () {
      this.$emit('showAddingModal', false)
      // this.$store.commit(types.SET_ADDING_LOCK, false)
      this.addingLock = false
      this.checkedIndex = null
    },
    addNewCollection () {
      this.$store.commit(types.ADD_ONE_EMPTY_COLLECTION)
      // this.$store.commit(types.SET_ADDING_LOCK, true)
      this.addingLock = true
    },
    completeEditing (item, index) {
      if (item.collection.name.trim()) {
        const isExisted = _.findIndex(this.getCollections.filter((e, indx) => indx !== index), e => e.collection.name.trim() === item.collection.name.trim())
        isExisted === -1 ? item.isExisted = false : item.isExisted = true
        if (!item.isExisted) {
          this.$store.dispatch(types.ACTION_SAVE_ONE_COLLECTION_INTO_FB, {
            collection: item.collection,
            index,
            isChecked: false,
            isEditing: false,
            isExisted: false,
            isLoading: false
          })
        } else {
          return
        }
      } else {
        this.$store.commit(types.REMOVE_ONE_COLLECTION, { index })
      }
      // this.$store.commit(types.SET_ADDING_LOCK, false)
      this.addingLock = false
    },
    enableEdit (index) {
      this.$store.commit(types.ENABLE_COLLECTION_EDITING, { index })
      // this.$store.commit(types.SET_ADDING_LOCK, !this.getAddingLock)
      this.addingLock = true
    },
    trashCollection (uid, index) {
      // this.$store.commit(types.REMOVE_ONE_COLLECTION, { index })
      this.$store.dispatch(types.ACTION_REMOVE_ONE_COLLECTION_FROM_FB, { index, collection: { uid } })
    },
    checkCollection (item, index) {
      if (this.checkedIndex !== null) {
        this.$store.commit(types.TOGGLE_COLLECTION_CHECK, { index: this.checkedIndex })
      }
      this.$store.commit(types.TOGGLE_COLLECTION_CHECK, { index })
      this.checkedIndex = index
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
.column.collection-check {
  margin: auto;
}
.button.collection-check-button {
  padding-left: 10px;
  padding-right: 10px;
}
.column.collection-name {
  padding-right: 30px;
  padding-left: 40px;
}
.icon.collection-check-button-icon {
  margin-right: 0;
  margin-left: 0;
}
.column.collection-name > p.control {
  margin-bottom: 2px;
}
.control.has-addons.collection-buttons-group {
  justify-content: center;
  text-align: center;
}
.control.has-addons.collection-buttons-group > .button .icon {
  margin-left: 0;
  margin-right: 0;
}
</style>
