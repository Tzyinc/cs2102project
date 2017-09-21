import Grid from './Grid'

export default {
  name: 'userlist',
  components: {
    Grid
  },
  data() {
    return {
      searchQuery: '',
      users: [],
      msg: 'User List',
      gridColumns: []
    }
  },
  methods: {
    userKeys: function(user) {
      var key
      var keys = new Array()
      var x = 0

      for (key in user) {
        keys[x] = key
        ++x
      }

      this.gridColumns = keys
      console.log(user)
    }
  },
  created: function() {
    this.$http.get('http://localhost:8080/api/example').then(response => {
      this.users = response.data
      alert(response)
      msg = response
      document.write(response)
      console.log(this.users)
      userKeys(users[0])
    })
  }
}
