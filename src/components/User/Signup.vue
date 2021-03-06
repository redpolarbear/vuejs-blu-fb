<template>
  <modal
    :backdrop-closable="false" 
    :is-show="showSignup" 
    :width="420">
      <p class="title" slot="header">Register an Account</p>
      <div class="box">
        <label class="label">Name</label>
        <p class="control has-icon">
          <input 
            class="input"
            v-bind:class="[
              { 'is-danger': $v.form.name.$error }
            ]"
            type="text" 
            placeholder="Full name" 
            v-model="form.name"
            @input="$v.form.name.$touch()"
            @blur="$v.form.name.$touch()">
          <i class="fa fa-user"></i>
          <span class="help is-danger" v-if="$v.form.name.$error">{{ nameErrors[0] }}</span>
        </p>
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
        <label class="label">Confirm Password</label>
        <p class="control has-icon">
          <input 
            class="input" 
            v-bind:class="[
              { 'is-danger': $v.form.confirmPassword.$error }
            ]"
            type="password" 
            placeholder="Confirm Password" 
            v-model="form.confirmPassword"
            @input="$v.form.confirmPassword.$touch()"
            @blur="$v.form.confirmPassword.$touch()">
          <i class="fa fa-lock"></i>
          <span class="help is-danger" v-if="$v.form.confirmPassword.$error">{{ confirmPasswordErrors[0] }}</span>
        </p>
      </div>
      <p class="control" slot="footer">
        <a class="button is-primary" v-bind:class="[{ 'is-loading': getLoading }, { 'is-disabled': $v.form.$invalid }]" @click.stop="onSignup" >Register</a>
        <a class="button is-default" @click="onCancel">Cancel</a>
      </p>
  </modal>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import md5 from 'md5'
import shortid from 'shortid'

import * as types from '../../store/types'

export default {
  name: 'signup',
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(15)
      },
      email: {
        required,
        email
      },
      password: {
        minLength: minLength(6),
        required
      },
      confirmPassword: {
        sameAsPassword: sameAs('password'),
        required
      }
    }
  },
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  props: [ 'showSignup' ],
  computed: {
    ...mapGetters({
      getUser: types.USER,
      getLoading: types.LOADING
    }),
    nameErrors () {
      const errors = []
      if (!this.$v.form.name.$dirty) return errors
      !this.$v.form.name.maxLength && errors.push(`Name must be at most ${this.$v.form.name.$params.maxLength.max} characters long.`)
      !this.$v.form.name.required && errors.push('Name is required.')
      return errors
    },
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
      !this.$v.form.password.minLength && errors.push('Password must have at least 6 letters.')
      !this.$v.form.password.required && errors.push('Password is required.')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.form.confirmPassword.$dirty) return errors
      !this.$v.form.confirmPassword.sameAsPassword && errors.push('Passwords do not match!')
      !this.$v.form.confirmPassword.required && errors.push('Confirm Password is required.')
      return errors
    }
  },
  methods: {
    onSignup () {
      const defaultUserProfile = {
        id: shortid.generate(),
        displayName: this.form.name,
        email: this.form.email,
        password: this.form.password,
        photoURL: `https://www.gravatar.com/avatar/${md5((this.form.email.trim()).toLowerCase())}?d=mm&s=200`,
        location: null,
        about: null
      }
      this.$store.dispatch(types.ACTION_USER_SIGNUP_ASYNC, defaultUserProfile)
    },
    onCancel () {
      this.$store.commit(types.TOGGLE_SIGNUP_MODAL, false)
    },
    onDismissed () {
      this.$store.dispatch(types.CLEAR_ERROR)
    }
  }
}
</script>

<style>

</style>
