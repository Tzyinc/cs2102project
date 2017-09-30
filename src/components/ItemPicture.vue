<template>
  <div class="item-picture">
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
  display: inline-block;
  /*background-color: #cecece;*/
  text-align:left;
  vertical-align: top;
  height: 270px;
}

.item-picture img {
  max-width:100%;
  object-fit: cover;
  margin: auto;
}

.item-name {
  padding-bottom: 2%;

}

</style>
