<template>
<div class="imageupload form-group">
	<div v-if="!image">
		<input class="form-control" type="file" @change="onFileChange">
	</div>
	<div v-else class="displayImage">
		<img :src="image" />
		<button class="btn btn-info"@click="removeImage">Remove image</button>
	</div>
</div>
</template>

<script>
export default {
  	name: 'ImageUpload',
	data () {
		return {
	    	image: ''
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
		}
	}
}
</script>
<style>
.imageupload img {
  width: 70%;
  max-height: 300px;
  margin: auto;
  display: block;
  margin-bottom: 5px;
}
.imageupload {
	border-style: solid;
    border-width: 0.7px;
    border-radius: 4px;
    border-color: rgba(0, 0, 0, 0.15);
}
.displayImage{
	padding-top: 10px;
	padding-bottom: 5px;
}
</style>