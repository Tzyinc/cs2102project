<template>
  <div class="item-picture card">
    <div class="item-picture-title card-header">Image</div>
    <div class="item-image card-body"><img :src="imagesrc"/></div>
  </div>
</template>

<script>
export default {
  name: 'ItemPicture',
  props: ['imagesrc'],
  data() {
      return {
        item: {
          id: '12345',
          name: 'A book about cats',
          imagesrc: '/static/images/book.png',
        }
      }
  }
}
</script>

<style scoped>
.item-picture {
  text-align: left;
  width: 100%;
  height: 350px;
  /*
  width: 30%;
  display: inline-block;*/
  /*background-color: #cecece;*/
}

.item-picture-title {
  font-weight:bold;
  font-size:1.5em;
  padding-bottom: 2%;
}

.item-picture img {
  max-width:100%;
  object-fit: cover;
  margin: auto;
}

</style>
