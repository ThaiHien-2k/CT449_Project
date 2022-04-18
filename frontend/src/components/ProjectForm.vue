<template>
	<Form
		ref="projectForm"
		@submit="submitProject"
		:validation-schema="projectFormSchema"
	>
		<div class="form-group">
			<label for="name">Tên dự án:</label>
			<Field
				name="name"
				type="text"
				class="form-control"
				v-model="projectLocal.name"
				placeholder="Nhập vào tên dự án"
			/>
			<ErrorMessage name="name" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="decripsion">Mô tả:</label>
			<textarea v-model="projectLocal.decripsion" class="form-control" placeholder="Nhập vào mô tả của dự án"></textarea>

			<ErrorMessage name="decripsion" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="link">Địa chỉ lưu trữ:</label>
			<Field
				name="link"
				type="text"
				class="form-control"
				v-model="projectLocal.link"
				placeholder="Nhập link lưu trữ của dự án"
			/>
			<ErrorMessage name="link" class="error-feedback" />
		</div>



		<div class="form-group">
			<button class="btn btn-primary">
				<i class="fas fa-save"></i> Lưu
			</button>
			<button
				v-if="projectLocal._id"
				type="button"
				class="ml-2 btn btn-danger"
				@click="deleteProject"
			>
				<i class="fas fa-trash"></i> Xóa
			</button>
		</div>
	</Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	emits: ["submit:project", "delete:project"],
	props: {
		project: { type: Object, required: true },
		resetAfterSubmit: { type: Boolean, default: false },
	},
	data() {
		const projectFormSchema = yup.object().shape({
			name: yup
				.string()
				.required("Tên phải có giá trị.")
				.min(2, "Tên phải ít nhất 2 ký tự.")
				.max(50, "Tên có nhiều nhất 50 ký tự."),
		
			decripsion: yup.string().max(1000, "Mô tả tối đa 1000 ký tự."),
			link:yup.string(),
		
		});
		return {
			projectLocal: this.project,
			projectFormSchema,
		};
	},
	methods: {
		submitProject() {
			this.$emit("submit:project", this.projectLocal);
			if (this.resetAfterSubmit) {
				this.$refs.projectForm.resetForm();
			}
		},
		deleteProject() {
			this.$emit("delete:project", this.projectLocal._id);
		},
	},
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
