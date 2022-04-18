<template>
	<div class="page">
		<div>
			<h4>Thêm dự án</h4>
			<ProjectForm
				:project="{}"
				:resetAfterSubmit="false"
				@submit:project="saveProject"
			/>
		</div>
	</div>
</template>

<script>
import { swtoast } from "@/mixins/swal.mixin";
import ProjectForm from "@/components/ProjectForm.vue";
import ProjectService from "@/services/project.service";

export default {
	components: {
		ProjectForm,
	},
	methods: {
		async saveProject(data) {
			try {
				await ProjectService.create(data);
				swtoast.success({
					text: "Dự án được thêm thành công.",
					
				});
					this.$router.push({ name: "project" });
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
