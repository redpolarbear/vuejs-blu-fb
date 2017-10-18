<template>
  <modal
    :backdrop-closable="false" 
    :is-show="showLogin" 
    :width="420">
      <p class="title" slot="header">Login</p>
      <div class="box">
        <label class="label">Email</label>
        <p class="control has-icon">
          <input 
            class="input"
            v-bind:class="[
              { 'is-danger': $v.form.email.$error }
            ]"
            type="email" 
            placeholder="Email" 
            v-model="form.email"
            @input="$v.form.email.$touch()"
            @blur="$v.form.email.$touch()">
          <i class="fa fa-envelope"></i>
          <span class="help is-danger" v-if="$v.form.email.$error">{{ emailErrors[0] }}</span>
        </p>
        <label class="label">Password</label>
        <p class="control has-icon">
          <input 
            class="input"
            v-bind:class="[
              { 'is-danger': $v.form.password.$error }
            ]"
            type="password" 
            placeholder="Password" 
            v-model="form.password"
            @input="$v.form.password.$touch()"
            @blur="$v.form.password.$touch()">
          <i class="fa fa-lock"></i>
          <span class="help is-danger" v-if="$v.form.password.$error">{{ passwordErrors[0] }}</span>
        </p>
      </div>
      <p class="control" slot="footer">
        <a 
          class="button is-primary" 
          v-bind:class="[{ 'is-loading': getLoading }, { 'is-disabled': $v.form.$invalid}]"
          @click.stop="onLogin" 
          >Login</a>
        <!-- <a class="button is-default" @click.stop="$emit('closeLogin', false)">Cancel</a> -->
        <a class="button is-default" @click="onCancel">Cancel</a>
      </p>
  </modal>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import * as types from '../../store/types'

export default {
  name: 'login',
  mixins: [validationMixin],
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  props: ['showLogin'],
  computed: {
    ...mapGetters({
      getUser: types.USER,
      getLoading: types.LOADING,
      getError: types.ERROR
    }),
    emailErrors () {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.email && errors.push('Must be valid e-mail.')
      !this.$v.form.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.form.password.$dirty) return errors
      !this.$v.form.password.required && errors.push('Password is required.')
      return errors
    }
  },
  methods: {
    onLogin () {
      this.$store.dispatch(types.ACTION_USER_LOGIN_ASYNC, {email: this.form.email, password: this.form.password})
    },
    onCancel () {
      this.$store.commit(types.TOGGLE_LOGIN_MODAL, false)
    },
    onDismissed () {
      this.$store.dispatch(types.CLEAR_ERROR)
    }
  }
}
</script>

<style>

</style>
