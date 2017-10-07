<template>
<div class="browseFilter col-11">
	<div class="row filterRow justify-content-end">
		<div class="col-2 align-self-end">
			<button type="button" class="filterbtn btn btn-light" v-on:click="isOpened = !isOpened">
				<i class="fa fa-filter" aria-hidden="true"></i>
				Filter
			</button>
		</div>
	</div>
	<transition name="fade">
		<div v-if="isOpened" class="displayFilter row justify-content-end">
			<div class="list col-sm-3">
				<div class="row filterTitle"> 
					<h2>Sort by</h2>
				</div>
				<div class="row filterOption">Latest Date</div>
				<div class="row filterOption">Earliest Date</div>
			</div>
		</div>
	</transition>
</div>
</template>

<script>
export default {
  	name: 'BrowseFilter',
	data () {
		return {
	    	isOpened: false,
	    }
  	},
	methods: {
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

.browseFilter{
	border-bottom: 1px solid;
	border-color: rgba(0, 0, 0, 0.15);
	padding-bottom: 5px;
	margin-bottom: 10px;
}
.displayFilter{
	padding-bottom :5px;
	transition: all 1s;
}
.filterRow{
	align-content:  right;
	padding: 10px;
}

.filterTitle{
	padding: 10px 0px 10px 5px;
	color: rgba(0, 0, 0, 0.7);
}

.filterOption{
	padding: 3px 0px 3px 10px;
	color: rgba(0, 0, 0, 0.4);
}

.filterOption:hover{
	color: rgba(0, 0, 0, 0.8);
}

.fade-enter-active, .fade-leave-active {
  transition: 1s
}
.fade-enter, .fade-leave-to {
	height: 0%;
}
.fade-enter-to, .fade-leave /* .fade-leave-active below version 2.1.8 */ {
	height: 100%;
}
</style>