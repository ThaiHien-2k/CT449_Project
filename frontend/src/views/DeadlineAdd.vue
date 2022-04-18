<template>
	<div class="page">
		<div>
			<h4>Thêm deadline</h4>
			<DeadlineForm
				:deadline="{}"
				:resetAfterSubmit="false"
				@submit:deadline="saveDeadline"
			/>
		</div>
	</div>
</template>

<script>
import { swtoast } from "@/mixins/swal.mixin";
import DeadlineForm from "@/components/DeadlineForm.vue";
import DeadlineService from "@/services/deadline.service";

export default {
	components: {
		DeadlineForm,
	},
	methods: {
		async saveDeadline(data) {
			try {
				await DeadlineService.create(data);
				swtoast.success({
					text: "Deadline được thêm thành công.",
				});
				this.$router.push({ name: "deadline" });
			} catch (error) {
				console.log(error);
				swtoast.error({
					text: "Đã có lỗi xảy ra.",
				});
			}
		},
	},
};
</script>
