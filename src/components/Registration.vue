<template>
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Register</h2>
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
		register_msg: '',
        error: ''
      }
    },
    methods: {
      submit() {
		
        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        // We need to pass the component's this context
        // to properly make use of http in the auth service
		//this.$http.put('http://localhost:8080/api/user', credentials)
		//	.then(response => {
		//	register_msg = JSON.parse(response);
		//	});
  
        //this.register_msg = auth.signup(this, credentials, '/')
		
		$.ajax({ url: 'http://localhost:8080/api/user', //Your api url 
	  type: 'PUT', //type is any HTTP method 
	  data: { data: credentials }, //Data as js object 
	  success: function (response) {
		if(response.success == true) {
			console.log('success');
			this.register_msg = 'Creation success!';
		} else {
					
			this.register_msg = 'Username already exist!';
			console.log('fail');
		}} }) ;
      }
    }
  }
  </script>