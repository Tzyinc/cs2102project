<template>
  <div class="item-picture card">
    <div class="item-picture-title card-header"><i class="fa fa-picture-o" aria-hidden="true"></i> Image</div>
    <div class="item-image card-body"><img :src="imagesrc"/></div>
    <div class="card-body">
      <div class="item-picture-name"><i class="fa fa-gift" aria-hidden="true"></i> <b>Name</b><br/> {{name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemPicture',
  props: ['imagesrc', 'name'],
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
  height: 350px auto;
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

.item-picture-name {
}

</style>
