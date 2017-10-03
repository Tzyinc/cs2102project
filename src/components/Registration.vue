<template>
  <div class="container registrationPage">
    <h1>Register</h1>
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
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Confirm Password"
        v-model="confirmPassword"
      >
    </div>
    <button class="btn btn-primary" @click="submit()">Submit</button>
  <p style="color:red">{{register_msg}}</p>
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
      confirmPassword: '',
	    register_msg: '',
      error: ''
    }
  },
  methods: {
    submit() {
  		var bcrypt = require('bcryptjs');
  		var hash = bcrypt.hashSync(this.credentials.password, 8);
      var credentials = {
        username: this.credentials.username,
        password: hash
      }
      // We need to pass the component's this context
      // to properly make use of http in the auth service
	//this.$http.put('http://localhost:8080/api/user', credentials)
	//	.then(response => {
	//	register_msg = JSON.parse(response);
	//	});
      if(this.confirmPassword == this.credentials.password) {
        console.log('Same password')
        this.register_msg = auth.signup(this, credentials, '/')
      } else {
        console.log('Password mismatch')
        this.register_msg = 'Passwords do not match!'
      }
    }
  }
}
</script>

<style scoped>
.registrationPage{
  width: 400px;
  margin:auto;
  /*background-color: #efefef; /*to remove later*/
  padding: 2%;
}

.registrationPage h1{
    margin-top: 20px;
}
</style>