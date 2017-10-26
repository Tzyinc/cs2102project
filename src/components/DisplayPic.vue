<template>
<div v-if="!image">
	<div  class="displayimageupload">
		<img :src="defaultPic" />
	</div>
	<div class="row editBtn">
	<label class="btn btn-info">
		<input type="file" id="displayimageinput" @change="onFileChange">
		<i class="fa fa-camera" aria-hidden="true"></i>
	</label>
	</div>
</div>
<div v-else>
	<div  class="displayimageupload">
		<img :src="image" />
	</div>
	<div class="row editBtn">
	<button class="btn btn-danger" @click="removeImage">
		<i class="fa fa-times" aria-hidden="true"></i>
	</button>
	</div>
</div>
</template>

<script>
export default {
  	name: 'DisplayPic',
  	props: ['oldImage'],
	data () {
		return {
	    	image: '',
	    	defaultPic: '/static/images/default_profile.jpg'
	    }
  	},
	methods: {
		onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length)
				return;
			this.createImage(files[0]);
			
			
		},
		createImage(file) {
			var image = new Image();
		  	var reader = new FileReader();
		  	var vm = this;

			reader.onload = (e) => {
			    vm.image = e.target.result;
			    
			    var value = {name:file.name, image:this.image};
			    console.log("loaded image :" + value.name);
			    this.$emit('changed', value);
			};
		  	reader.readAsDataURL(file);
		},
		removeImage: function (e) {
		  	this.image = '';
		},
  		retrieveImageUrl(source){
	  		if(source != ''){
	  			this.image = source;
		    	console.log(this.image);
	  		}

	    }
	},
	watch: { 
      		oldImage: function(newVal, oldVal) { // watch it
          	if(newVal != ''){
          		console.log(this.oldImage)
		  		this.retrieveImageUrl(this.oldImage);
	  		}
        }
      }

}
</script>
<style>
.displayimageupload img {
    height:100%;
    position: absolute;
    top: -9999px;
    bottom: -9999px;
    left: -9999px;
    right: -9999px;
    margin: auto;
}

#displayimageinput{
    display: none;
}

.editBtn {
  margin-top: 170px;
  margin-left: 10px;
  position: relative;
}
</style>