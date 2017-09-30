<template>
  <div class="container detailed-item">
    <h1>Listing Details</h1>
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
}

.detailed-item * {
  padding:2%;
}
</style>
