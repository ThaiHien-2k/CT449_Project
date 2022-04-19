<template>
	<Form
		ref="deadlineForm"
		@submit="submitDeadline"
		:validation-schema="deadlineFormSchema"
	>
		<div class="form-group">
			<label for="name">Tên deadline:</label>
			<Field
				name="name"
				type="text"
				class="form-control"
				v-model="deadlineLocal.name"
				placeholder="Nhập vào tên của deadline"
			/>
			<ErrorMessage name="name" class="error-feedback" />
		</div>

		<div class="form-group">
			<label for="decripsion">Mô tả:</label>
			<textarea v-model="deadlineLocal.decripsion" class="form-control" placeholder="Nhập vào mô tả của deadline"></textarea>

			<ErrorMessage name="decripsion" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="deadline">Hạn cuối:</label>
			<Field
				name="day"
				type="number"
				class=""
				style="width: 30%; "
				v-model="deadlineLocal.day"
				placeholder="Ngày"
			/>
			<Field
				name="month"
				type="number"
				class=""
				style="width: 30%; margin-left: 20px;"
				v-model="deadlineLocal.month"
				placeholder="Tháng"
			/>
			<Field
				name="year"
				type="number"
				class=""
				style="width: 30%; margin-left: 20px;"
				v-model="deadlineLocal.year"
				placeholder="Năm"
			/>
			<ErrorMessage name="deadline" class="error-feedback" />
		</div>
		

		<div class="form-group form-check">
			<input
				name="done"
				type="checkbox"
				class="form-check-input"
				v-model="deadlineLocal.done"
			/>
			<label for="done" class="form-check-label">
				<strong>Đã hoàn thành</strong>
			</label>
		</div>

		<div class="form-group">
			<button class="btn btn-primary">
				<i class="fas fa-save"></i> Lưu
			</button>
			<button
				v-if="deadlineLocal._id"
				type="button"
				class="ml-2 btn btn-danger"
				@click="deleteDeadline"
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
	emits: ["submit:deadline", "delete:deadline"],
	props: {
		deadline: { type: Object, required: true },
		resetAfterSubmit: { type: Boolean, default: false },
	},
	data() {
		const deadlineFormSchema = yup.object().shape({
			name: yup
				.string()
				.required("Tên phải có giá trị.")
				.min(2, "Tên phải ít nhất 2 ký tự.")
				.max(50, "Tên có nhiều nhất 50 ký tự."),
			decripsion: yup.string().max(4, "Mô tả tối đa 1000 ký tự."),
			day: yup.number(),
			month: yup.number(),
			year: yup.number(),
		});
		return {
			deadlineLocal: this.deadline,
			deadlineFormSchema,
		};
	},
	methods: {
		submitDeadline() {
			this.$emit("submit:deadline", this.deadlineLocal);
			if (this.resetAfterSubmit) {
				this.$refs.deadlineForm.resetForm();
			}
		},
		deleteDeadline() {
			this.$emit("delete:deadline", this.deadlineLocal._id);
		},
	},
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
