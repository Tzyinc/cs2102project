<template>
  <div class="container" id="detailed-item">
    <h1>{{msg}}</h1>
    <ItemPicture></ItemPicture>
    <ItemOwnerInfo></ItemOwnerInfo>
  </div>
</template>

<script>
  import LoginHeader from './LoginHeader'
  import ItemPicture from './ItemPicture'
  import ItemOwnerInfo from './ItemOwnerInfo'

  export default {
  name: 'DetailedItem',
  data() {
    return {
      msg: 'testing'
    }
  }
}
</script>
