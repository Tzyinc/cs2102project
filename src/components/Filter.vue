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
					<div class="col filterOption" v-on:click="onclickSort('latest', 0, $event)" v-bind:class="{ active: isActive('latest')}" >Newest</div>
					<div class="col filterOption" v-on:click="onclickSort('earliest', 1, $event)" v-bind:class="{ active: isActive('earliest')}">Oldest</div>

				</div>
				<div class="row">
					<div class="col filterOption" v-on:click="onclickSort('atoz', 2, $event)" v-bind:class="{ active: isActive('atoz')}">Name (A to Z)</div>
					<div class="col filterOption" v-on:click="onclickSort('ztoa', 3, $event)" v-bind:class="{ active: isActive('ztoa')}">Name (Z to A)</div>
				</div>
				<div class="row">
					<div class="col filterOption" v-on:click="onclickSort('cheap', 4, $event)" v-bind:class="{ active: isActive('cheap')}">Price 
						<i class="fa fa-long-arrow-up" aria-hidden="true"></i>
					</div>
					<div class="col filterOption" v-on:click="onclickSort('expensive', 5, $event)" v-bind:class="{ active: isActive('expensive')}"> Price 
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
	    	activeItem: 'latest'
	    }
  	},
	methods: {
		onclickSort(newSort,index, e){
			this.sortChange(newSort, e)
			//this.isActive = isActive.map(x => x = false)
			this.activeItem = newSort
		},
		isActive(selected) {
      		return this.activeItem === selected
    	},
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
	border-bottom: 1px solid;
	border-color: rgba(0, 0, 0, 0.15);
}
.filterRow{
	align-content:  right;
	padding: 10px;
}

.filterTitle{
	padding: 0px 0px 2px 5px;
	color: rgba(0, 0, 0, 0.9);
}

.filterOption{
	padding: 3px 0px 3px 10px;
	color: rgba(0, 0, 0, 0.4);
	text-align: left;
}

.filterOption:hover{
	color: rgba(0, 0, 0, 0.8);
}

.active {
	font-weight: bold;
	color: rgba(0, 0, 0, 1);
}
</style>