<template>
<div class="browseFilter col-11">
	<div class="row filterRow justify-content-end">
		<div class="col-2 align-self-end">
			<button type="button" class="filterbtn btn btn-light" data-toggle="collapse" data-target="#collaspeContent" aria-expanded="false" aria-controls="collaspeContent">
				<i class="fa fa-filter" aria-hidden="true"></i>
				Filter
			</button>
		</div>
	</div>
	<div class="collapse" id="collaspeContent">
		<div class="row justify-content-end" id="displayFilter">
			<div class="list col-sm-5">
				<div class="row filterTitle justify-content-start"> 
					<h3>Sort by</h3>
				</div>
				<div class="row">
					<div class="col filterOption" v-on:click="sortChange('latest', $event)">Newest</div>
					<div class="col filterOption" v-on:click="sortChange('earliest', $event)">Oldest</div>

				</div>
				<div class="row">
					<div class="col filterOption" v-on:click="sortChange('atoz', $event)">Name (A to Z)</div>
					<div class="col filterOption" v-on:click="sortChange('ztoa', $event)">Name (Z to A)</div>
				</div>
				<div class="row">
					<div class="col filterOption" v-on:click="sortChange('cheap', $event)">
						Price 
						<i class="fa fa-long-arrow-up" aria-hidden="true"></i>
					</div>
					<div class="col filterOption" v-on:click="sortChange('expensive', $event)">
						Price 
						<i class="fa fa-long-arrow-down" aria-hidden="true"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
  	name: 'BrowseFilter',
  	props: {
      sortChange:{
        type: Function
      }
    },
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
	padding-bottom: 5px;
	margin-bottom: 10px;
}
#displayFilter{
	padding-bottom :10px;
	/*transition: all 0.5s;*/
	border-bottom: 1px solid;
	border-color: rgba(0, 0, 0, 0.15);
}
.filterRow{
	align-content:  right;
	padding: 10px;
}

.filterTitle{
	padding: 0px 0px 2px 5px;
	color: rgba(0, 0, 0, 0.7);
}

.filterOption{
	padding: 3px 0px 3px 10px;
	color: rgba(0, 0, 0, 0.4);
	text-align: left;
}

.filterOption:hover{
	color: rgba(0, 0, 0, 0.8);
}

/*
.fade-enter-active, .fade-leave-active {
  transition: 0.5s
}
.fade-enter, .fade-leave-to {
	height: 0%;
}
.fade-enter-to, .fade-leave /* .fade-leave-active below version 2.1.8  {
	height: 100%;
}*/
</style>