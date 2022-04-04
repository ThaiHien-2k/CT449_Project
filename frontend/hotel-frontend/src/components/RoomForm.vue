<template>
<Form
@submit="$emit('submit:room', roomLocal)"
:validation-schema="roomFormSchema"
>
<div class="form-group">
<label for="name">Tên phòng</label>
<Field
name="name"
type="text"
class="form-control"
v-model="roomLocal.name"
/>
<ErrorMessage name="name" class="error-feedback" />
</div>

<div class="form-group">
<label for="type">Loại phòng</label>
<Field
name="type"
type="text"
class="form-control"
v-model="roomLocal.type"
/>
<ErrorMessage name="type" class="error-feedback" />
</div>

<div class="form-group">
<label for="cost">Giá</label>
<Field
name="cost"
type="text"
class="form-control"
v-model="roomLocal.cost"
/>
<ErrorMessage name="cost" class="error-feedback" />
</div>

<div class="form-group form-check">
<input
name="status"
type="checkbox"
class="form-check-input"
v-model="roomLocal.status"
/>
<label for="status" class="form-check-label">
<strong>Còn phòng</strong>
</label>
</div>



<div class="form-group">
<button class="btn btn-primary">Lưu</button>
<button
v-if="roomLocal.id"
type="button"
class="ml-2 btn btn-danger"
@click="$emit('delete:room', roomLocal.id)">
Xóa
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
emits: ["submit:room", "delete:room"],
props: {
room: { type: Object, required: true }
},
data() {
const roomFormSchema = yup.object().shape({
name: yup
.string()
.required("Tên phải có giá trị.")
.min(2, "Tên phải ít nhất 2 ký tự.")
.max(50, "Tên có nhiều nhất 50 ký tự."),

cost: yup.string(),
type: yup.string(),


});
return {
// Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
// để liên kết với các input trên form
roomLocal: this.room,
roomFormSchema,
};
},
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
