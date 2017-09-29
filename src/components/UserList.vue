<template>
  <div class="userlist">
    <h1>{{msg}}</h1>
    {{users}}
    <li v-for = "user in users">
      userid : {{user.uid}}
    </li>
    <form id="search">
    Search <input name="query" v-model="searchQuery">
    </form>
    <grid
      :data="users"
      :columns="gridColumns"
      :filter-key="searchQuery">
    </grid>
    <itemsquare
      :name="name"
      :owner='owner'
      :price= '5.5'
      :image="image"></itemsquare>
  </div>
</template>


<script>
import Grid from './Grid'
import ItemSquare from './ItemGridSquare'

export default {
  name: 'userlist',
  components: {
    Grid, 
    'itemsquare' : ItemSquare,
  },
  data () {
    return {
      searchQuery: '',
      users: [],
      msg: 'User List',
      gridColumns: [],
      name: 'Book',
      owner: 'tom',
      price: 5.5,
      image: '/static/images/book.png'

    }
  },
  methods: {
    userKeys: function(user){
      var key;
      var keys = new Array();
      var x = 0;

      for (key in user)
      {
          keys[x] = key;
          ++ x;
      }

      this.gridColumns = keys;
      console.log(user);
    }
  },
  created: function () {
    this.$http.get('http://localhost:8080/api/example')
      .then(response => {
        this.users = response.data;
        // alert(response);
        msg = response;
        document.write(response);
        console.log(this.users);
        userKeys(users[0]);
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
