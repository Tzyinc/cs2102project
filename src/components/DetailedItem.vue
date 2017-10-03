<template>
  <div class="container detailed-item">
    <div class = "detailed-title">Listing Details</div>
    <div class="row">
      <ItemPicture></ItemPicture>
      <ItemDescription :description = "item.description"></ItemDescription>
    </div>
    <div class="row">
      <ItemOwnerInfo
          :owner = "item.owner_username"
          :name = "item.name"
          :location = "item.location"
          :status = "item.status"
          :timelisted = "item.timelisted">
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

  //var iid //= this.$route.params.iid
  var api_url = api_ep.API_URL + api_ep.ITEM + '?iid='


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
        item: [],
        iid: 0
    }
  },
  created: function () {
    this.iid = this.$route.params.iid
    this.$http.get(api_url + iid)
      .then(response => {
        this.item = response.data;
        console.log(this.item);
      });
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

</style>
