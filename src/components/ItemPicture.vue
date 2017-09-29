<template>
  <div class="item-picture">
    <div class="item-name">{{item.name}}</div>
    <div class="item-image"><img :src="item.imagesrc"/></div>
  </div>
</template>

<script>
export default {
  name: 'ItemPicture',
  data() {
      return {
        item: {
          id: '12345',
          name: 'A book about cats',
          imagesrc: 'https://en.facebookbrand.com/wp-content/uploads/2016/05/FB-fLogo-Blue-broadcast-2.png',
        }
      }
  }
}
</script>

<style scoped>
.item-picture {
  width: 30%;
  text-align: left;
  padding: 2%;
}

.item-picture img {
  max-width:100%;
}

.item-name {
  padding-bottom: 2%;

}

</style>
