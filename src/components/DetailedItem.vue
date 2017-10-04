<template>
  <div class="container detailed-item">
    <div class="btn btn-success boton" v-on:click="load(iid)">
    <span class="glyphicon glyphicon-pencil"></span> Edit </div>
    <div class = "detailed-title">Listing Details</div>
    <div class="row">
      <ItemPicture></ItemPicture>
      <ItemDescription
        :description = "item.description">
      </ItemDescription>
    </div>
    <div class="row">
      <ItemOwnerInfo
          :owner_username = "item.owner_username"
          :name = "item.name"
          :location = "item.location"
          :status = "item.status"
          :timelisted = "item.timelisted"
          :startdate = "item.startdate"
          :enddate = "item.enddate">
      </ItemOwnerInfo>
      <ItemBidding></ItemBidding>
    </div>
  </div>
  </div>
</template>

<script>

  import api_ep from '../api.json'
  import ItemPicture from './ItemPicture'
  import ItemOwnerInfo from './ItemOwnerInfo'
  import ItemDescription from './ItemDescription'
  import ItemBidding from './ItemBidding'

  var api_url = api_ep.API_URL + api_ep.ITEM + 'Info?iid='

  export default {
  name: 'DetailedItem',
  components: {
    ItemPicture,
    ItemDescription,
    ItemOwnerInfo,
    ItemBidding
  },
  data() {
    return {
        item: []
    }
  },

  methods: {
  	load (iid){
  		this.$router.push({ name: 'UpdateItem', params: { iid: this.$route.params.iid }})
  	}
  },

  created: function () {

    console.log("the full url is:" + api_url + this.$route.params.iid)
    this.$http.get(api_url + this.$route.params.iid)
      .then(response => {
        this.item = response.data[0];
        console.log("asdf" + this.item);
      });
    console.log("got data?")
  }
}
</script>

<style scoped>
.detailed-item {
  width: 80%;
  margin:auto;
  /*background-color: #efefef; /*to remove later*/
  padding: 2%;
}

.detailed-item * {
  padding:3%;
}

.detailed-title {
  background-color: #cecece;
  font-weight:bold;
  font-size: 2em;
}

.boton {
  position: fixed;
  right: 10%;
}

</style>
