<template>
  <div class="container" id="detailed-item">
    <h1>{{msg}} hi</h1>
    <ItemPicture></ItemPicture>
    <ItemOwnerInfo></ItemOwnerInfo>
  </div>
</template>

<script>
  import ItemPicture from './ItemPicture'
  import ItemOwnerInfo from './ItemOwnerInfo'

  export default {
  name: 'DetailedItem',
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
