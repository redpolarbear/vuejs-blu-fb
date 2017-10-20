<template>
  <modal 
    :width="520" 
    :is-show="showAddingModal" 
    transition="fadeDown"
    @close="closeModal"
    :backdrop-closable="true">
    <!-- :on-ok="addToCollection" -->
    <!-- :on-cancel="closeModal" -->
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
    <alert title="warning!" type="warning" :closable="false" v-if="infoFlag">{{ infoMessage }}</alert>
    <div class="columns" v-for="(item, index) in getCollections" :key="index">
      <div class="column is-1 has-text-centered collection-check">
        <a class="button is-large is-white collection-check-button" v-bind:class="{ 'is-disabled': isAddingLocked }" @click="checkCollection(item, index)">
          <span class="icon is-large collection-check-button-icon">
            <i class="fa fa-folder-o" v-if="!item.meta.isChecked"></i>
            <i class="fa fa-folder-open-o" v-else></i>
          </span>
        </a>
      </div>
      <div class="column collection-name">
        <p class="collection-name-static" v-if="!item.meta.isEditing">
          {{ item.collection.name }}
        </p>
        <p class="control" v-bind:class="{ 'is-loading': item.meta.isLoading }" v-else>
          <input 
            class="input" 
            v-bind:class="{ 'is-danger': item.meta.isExisted }" 
            placeholder="collection name"
            @focus="$event.target.select()"
            v-on:keyup.enter="completeEditing(item, index)"
            v-on:keyup.esc="cancelEditing(item, index)"
            type="text" 
            v-focus
            v-model="item.collection.name">
            <!-- v-on:blur="completeEditing(item, index)" -->
            <span class="help is-danger" v-if="item.meta.isExisted">The Collection has been existed.</span>
        </p>
        <p v-if="!item.meta.isEditing">{{ item.meta.booksNo }} Book(s)</p>
      </div>
      <div class="column is-3 is-pulled-right" v-if="!item.meta.isEditing && item.collection.name !== 'My Reading Collection' && item.collection.name !== 'My Read Collection'">
        <p class="control has-addons collection-buttons-group">
          <a class="button is-white" @click="enableEditing(item, index)" v-bind:class="{ 'is-disabled': isAddingLocked }">
            <span class="icon">
              <i class="fa fa-edit"></i>
            </span>
          </a>
          <a class="button is-danger is-inverted" @click="trashCollection(item, index)" v-bind:class="{ 'is-disabled': isAddingLocked }">
            <span class="icon">
              <i class="fa fa-trash"></i>
            </span>
          </a>
        </p>          
      </div>
    </div>
    <p class="control" slot="footer">
      <a class="button is-default" @click="closeModal">Cancel</a>
      <a class="button is-primary" 
        v-bind:class="{ 'is-disabled': isAddingLocked || !checkedIndex }"
        @click.stop="addToCollection">
        OK
      </a>
    </p>
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
    }),
    isAddingLocked: function () {
      return this.addingLock
    }
  },
  watch: {
    infoFlag: function (value) {
      if (value === true) {
        setTimeout(() => {
          this.infoFlag = false
        }, 2000)
      }
    }
  },
  data () {
    return {
      addingLock: false,
      checkedIndex: null,
      originalItemName: '',
      infoMessage: '',
      infoFlag: false
    }
  },
  methods: {
    closeModal () {
      this.addingLock = false
      this.checkedIndex = null
      this.originalItemName = ''
      this.infoFlag = false
      this.infoMessage = ''
      this.$store.commit(types.CLEAR_COLLECTIONS)
      this.$emit('showAddingModal', false)
    },
    addNewCollection () {
      this.$store.commit(types.ADD_ONE_EMPTY_COLLECTION)
      this.addingLock = true
    },
    completeEditing (item, index) {
      if (item.collection.name.trim()) {
        const isExisted = _.findIndex(this.getCollections.filter((e, indx) => indx !== index), e => e.collection.name.trim() === item.collection.name.trim())
        if (isExisted === -1) {
          this.$store.commit(types.TOGGLE_COLLECTION_ISEXISTED, { index, switch: false })
        } else {
          this.$store.commit(types.TOGGLE_COLLECTION_ISEXISTED, { index, switch: true })
        }
        if (!item.meta.isExisted) { // not existed
          this.$store.dispatch(types.ACTION_SAVE_ONE_COLLECTION_INTO_FB, Object.assign({ index }, item))
          this.$store.commit(types.DISABLE_COLLECTION_EDITING, { index })
          this.$store.commit(types.TOGGLE_COLLECTION_ISEXISTED, { index, switch: false })
        } else { // existed already
          return
        }
      } else {
        if (item.meta.booksNo === 0) {
          this.$store.commit(types.REMOVE_ONE_COLLECTION, { index })
        } else {
          this.cancelEditing(item, index)
        }
      }
      this.addingLock = false
    },
    cancelEditing (item, index) {
      this.$store.commit(types.UPDATE_ONE_COLLECTION_NAME, { index, collection: { name: this.originalItemName } })
      this.$store.commit(types.DISABLE_COLLECTION_EDITING, { index })
      this.$store.commit(types.TOGGLE_COLLECTION_ISEXISTED, { index, switch: false })
      this.addingLock = false
    },
    enableEditing (item, index) {
      this.$store.commit(types.ENABLE_COLLECTION_EDITING, { index })
      this.originalItemName = item.collection.name
      this.addingLock = true
    },
    trashCollection (item, index) {
      if (item.meta.booksNo !== 0) {
        this.infoMessage = 'The collection is not empty.'
        this.infoFlag = true
      } else if (item.meta.booksNo === 0) {
        this.$store.dispatch(types.ACTION_REMOVE_ONE_COLLECTION_FROM_FB, { index, collection: { uid: item.collection.uid } })
      }
    },
    checkCollection (item, index) {
      if (this.checkedIndex !== null && this.checkedIndex === index) {
        this.$store.commit(types.TOGGLE_COLLECTION_CHECK, { index: this.checkedIndex })
        this.checkedIndex = null
      } else if (this.checkedIndex !== null && this.checkedIndex !== index) {
        this.$store.commit(types.TOGGLE_COLLECTION_CHECK, { index: this.checkedIndex })
        this.$store.commit(types.TOGGLE_COLLECTION_CHECK, { index })
        this.checkedIndex = index
      } else {
        this.$store.commit(types.TOGGLE_COLLECTION_CHECK, { index })
        this.checkedIndex = index
      }
    },
    addToCollection () {
      if (this.checkedIndex !== null) {
        this.$store.dispatch(types.ACTION_SAVE_THE_BOOK_INTO_COLLECTION_IN_FB, { checkedIndex: this.checkedIndex })
      }
      this.closeModal()
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
.collection-name-static {
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  color: #363636;
  display: inline-flex;
  height: 32px;
  justify-content: flex-start;
  line-height: 24px;
  position: relative;
  vertical-align: top;
  max-width: 100%;
  margin-bottom: 2px;
  width: 100%;
  background-color: transparent;
  border-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 1.5rem;
  padding-left: 0;
  padding-right: 0;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: start;
}
</style>
