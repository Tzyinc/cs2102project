<template>
  <div class="container detailed-item">
    <div class = "detailed-title">Listing Details</div>
    <div class="row">
      <ItemPicture></ItemPicture>
      <ItemDescription></ItemDescription>
    </div>
    <div class="row">
      <ItemOwnerInfo></ItemOwnerInfo>
      <ItemBidding></ItemBidding>
    </div>
  </div>
  </div>
</template>

<script>
  import ItemPicture from './ItemPicture'
  import ItemOwnerInfo from './ItemOwnerInfo'
  import ItemDescription from './ItemDescription'
  import ItemBidding from './ItemBidding'

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

    }
  }
}
</script>

<style scoped>
.detailed-item {
  width: 80%;
  margin:auto;
  background-color: #efefef; /*to remove later*/
  padding: 2%;
}

.detailed-item * {
  padding:3%;
}

.detailed-title {
  background-color: #b3ffec;
  font-weight:bold;
  font-size: 2em;
}

</style>
