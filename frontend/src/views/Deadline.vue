<template>
	<div class="page row">
		<div class="col-md-10">
			<InputSearch v-model="searchText" />
		</div>
		<div class="mt-3 col-md-6">
			<h4>
				Danh sách deadline
				<i class="fa-solid fa-calendar"></i>
			</h4>
			<DeadlineList
				v-if="filteredDeadlinesCount > 0"
				:deadlines="filteredDeadlines"
				v-model:activeIndex="activeIndex"
			/>
			<p v-else>Không có liên hệ nào.</p>

			<div class="mt-3 row justify-content-around align-items-center">
				<button class="btn btn-sm btn-primary" @click="refreshList()">
					<i class="fas fa-redo"></i> Làm mới
				</button>

				<button class="btn btn-sm btn-success" @click="goToAddDeadline">
					<i class="fas fa-plus"></i> Thêm mới
				</button>

				<button
					class="btn btn-sm btn-danger"
					@click="removeAllDeadlines"
				>
					<i class="fas fa-trash"></i> Xóa tất cả
				</button>
			</div>
		</div>
		<div class="mt-3 col-md-6">
			<div v-if="activeDeadline">
				<h4>
					Chi tiết deadline
					<i class="fa-solid fa-calendar-check"></i>
				</h4>
				<DeadlineCard :deadline="activeDeadline" />
				<router-link
					:to="{
						name: 'deadline.edit',
						params: { id: activeDeadline._id },
					}"
				>
					<span class="mt-2 badge badge-warning">
						<i class="fas fa-edit"></i> Chỉnh sửa</span
					>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { swalert } from "@/mixins/swal.mixin";
import DeadlineCard from "@/components/DeadlineCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import DeadlineList from "@/components/DeadlineList.vue";
import DeadlineService from "@/services/deadline.service";

export default {
	components: {
		DeadlineCard,
		InputSearch,
		DeadlineList,
	},
	data() {
		return {
			deadlines: [],
			activeIndex: -1,
			searchText: "",
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

		async removeAllDeadlines() {
			swalert
				.fire({
					title: "Xóa tất cả deadline",
					icon: "warning",
					text: "Bạn muốn xóa tất cả deadline?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
							await DeadlineService.deleteAll();
							this.refreshList();
						} catch (error) {
							console.log(error);
						}
					}
				});
		},

		goToAddDeadline() {
			this.$router.push({ name: "deadline.add" });
		},
	},
	created() {
		this.refreshList();
	},
};
</script>

<style scoped>
.page {
	text-align: left;
	max-width: 750px;
}

</style>
