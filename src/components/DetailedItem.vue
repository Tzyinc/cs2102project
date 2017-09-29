<template>
  <div class="container" id="detailed-item">
  <LoginHeader></LoginHeader>
  <ItemPicture></ItemPicture>
  <ItemOwnerInfo></ItemOwnerInfo>
  </div>
</template>

<script>
import LoginHeader from './components/LoginHeader'
import ItemPicture from './components/ItemPicture'
import ItemOwnerInfo from './components/ItemOwnerInfo'

export default {
  name: 'DetailedItem',
  data() {
    return {
      msg: 'testing'
    }
  }
}
</script>
