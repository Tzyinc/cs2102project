<template>
  <div class="detailed-item">
    <h1>Listing Details</h1>
    <ItemPicture></ItemPicture>
    <ItemOwnerInfo></ItemOwnerInfo>
  </div>
</template>

<script>
  import ItemPicture from './ItemPicture'
  import ItemOwnerInfo from './ItemOwnerInfo'

  export default {
  name: 'DetailedItem',
  components: {
    ItemPicture,
    ItemOwnerInfo
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
</style>
