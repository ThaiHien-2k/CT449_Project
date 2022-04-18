<template>
	<div v-if="deadline" class="page">
		<h4>Chỉnh sửa deadline</h4>
		<DeadlineForm
			:deadline="deadline"
			@submit:deadline="updateDeadline"
			@delete:deadline="deleteDeadline"
		/>
	</div>
</template>

<script>
import { swtoast, swalert } from "@/mixins/swal.mixin";
import DeadlineForm from "@/components/DeadlineForm.vue";
import DeadlineService from "@/services/deadline.service";

export default {
	components: {
		DeadlineForm,
	},
	props: {
		id: { type: String, required: true },
	},
	data() {
		return {
			deadline: null,
		};
	},
	methods: {
		async getDeadline(id) {
			try {
				this.deadline = await DeadlineService.get(id);
			} catch (error) {
				console.log(error);
				this.$router.push({
					name: "notfound",
					params: { pathMatch: this.$route.path.split("/").slice(1) },
					query: this.$route.query,
					hash: this.$route.hash,
				});
			}
		},

		async updateDeadline(data) {
			try {
				await DeadlineService.update(this.deadline._id, data);
				swtoast.success({
					text: "Deadline được cập nhật thành công.",
				});
				this.$router.push({ name: "deadline" });
			} catch (error) {
				console.log(error);
				swtoast.error({
					text: "Đã có lỗi xảy ra.",
				});
			}
		},

		async deleteDeadline() {
			swalert
				.fire({
					title: "Xóa deadline",
					icon: "warning",
					text: "Bạn muốn xóa deadline này?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
							await DeadlineService.delete(this.deadline._id);
							swtoast.success({
								text: "Deadline được xóa thành công.",
							});
							this.$router.push({ name: "deadline" });
						} catch (error) {
							console.log(error);
							swtoast.error({
								text: "Đã có lỗi xảy ra.",
							});
						}
					}
				});
		},
	},
	created() {
		this.getDeadline(this.id);
	},
};
</script>
