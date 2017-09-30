<template>
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Log In</h2>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          v-model="credentials.username"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          v-model="credentials.password"
        >
      </div>
      <button class="btn btn-primary" @click="submit()">Log in</button>
	  <p style="color:red">{{login_msg}}</p>
    </div>
  </template>

  <script>
  import auth from '../auth/auth'
  export default {
    data() {
      return {
        // We need to initialize the component with any
        // properties that will be used in it
        credentials: {
          username: '',
          password: ''
        },
		login_msg: '',
        error: ''
      }
    },
    methods: {
      submit() {
	  this.login_msg = 'test';
        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        this.login_msg = auth.login(this, credentials, '/Register')
      }
    }
  }
  </script>