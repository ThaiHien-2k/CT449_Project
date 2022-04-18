<template>
	<div class="page row">
	
		<div class="mt-3 col-md-6">
			<h4>
				Tình trạng deadline
				<i class="fa-solid fa-bars-progress"></i>
			</h4>
            <br>
			<StatusDeadline
				v-if="filteredDeadlinesCount > 0"
				:deadlines="filteredDeadlines"
				v-model:activeIndex="activeIndex"
			/>
			
		</div>
		
	</div>
</template>

<script>
import { swalert } from "@/mixins/swal.mixin";


import StatusDeadline from "@/components/StatusDeadline.vue";
import DeadlineService from "@/services/deadline.service";

export default {
	components: {
		StatusDeadline,
	},
	data() {
		return {
			deadlines: [],
			activeIndex: -1,
		};
	},
	watch: {
		searchText() {
			this.activeIndex = -1;
		},
	},
	computed: {
		deadlineStrings() {
			return this.deadlines.map((deadline) => {
				const { name, decripsion, day, month, year,done } = deadline;
				return [name, decripsion, day, month, year,done].join("");
			});
		},
		filteredDeadlines() {
			if (!this.searchText) return this.deadlines;
			return this.deadlines.filter((_deadline, index) =>
				this.deadlineStrings[index].includes(this.searchText)
			);
		},
		activeDeadline() {
			if (this.activeIndex < 0) return null;
			return this.filteredDeadlines[this.activeIndex];
		},
		filteredDeadlinesCount() {
			return this.filteredDeadlines.length;
		},
	},
	methods: {
		async retrieveDeadlines() {
			try {
				this.deadlines = await DeadlineService.getAll();
				this.deadlines.sort((current, next) =>
					current.name.localeCompare(next.name)
				);
			} catch (error) {
				console.log(error);
			}
		},

		refreshList() {
			this.retrieveDeadlines();
			this.activeIndex = -1;
		},

	
	},
	created() {
		this.refreshList();
	},
};
</script>

<style scoped>
.page {
    margin-left: 150px;
	text-align: left;
	max-width: 2000px;
}

</style>
