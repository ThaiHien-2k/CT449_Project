<template>
<Form
@submit="$emit('submit:staff', staffLocal)"
:validation-schema="staffFormSchema"
>
<div class="form-group">
<label for="name">Họ và tên</label>
<Field
name="name"
type="text"
class="form-control"
v-model="staffLocal.name"
/>
<ErrorMessage name="table_name" class="error-feedback" />
</div>
<div class="form-group">
<label for="email">Email</label>
<Field
name="email"
type="text"
class="form-control"
v-model="staffLocal.email"
/>
<ErrorMessage name="email" class="error-feedback" />
</div>
<div class="form-group">
<label for="address">Địa chỉ</label>
<Field
name="address"
type="text"
class="form-control"
v-model="staffLocal.address"
/>
<ErrorMessage name="address" class="error-feedback" />
</div>
<div class="form-group">
<label for="phone">Điện thoại</label>
<Field
name="phone"
type="tel"
class="form-control"
v-model="staffLocal.phone"
/>
<ErrorMessage name="phone" class="error-feedback" />
</div>

<div class="form-group">
<label for="salaryperhour">Tiền lương trên giờ</label>
<Field
name="salaryperhour"
type="text"
class="form-control"
v-model="staffLocal.salaryperhour"
/>
<ErrorMessage name="salaryperhour" class="error-feedback" />
</div>

<div class="form-group form-check">
<input
name="men"
type="checkbox"
class="form-check-input"
v-model="staffLocal.men"
/>
<label for="men" class="form-check-label">
<strong>Nam</strong>
</label>
</div>



<div class="form-group">
<button class="btn btn-primary">Lưu</button>
<button
v-if="staffLocal.id"
type="button"
class="ml-2 btn btn-danger"
@click="$emit('delete:staff', staffLocal.id)">
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
emits: ["submit:staff", "delete:staff"],
props: {
staff: { type: Object, required: true }
},
data() {
const staffFormSchema = yup.object().shape({
name: yup
.string()
.required("Tên phải có giá trị.")
.min(2, "Tên phải ít nhất 2 ký tự.")
.max(50, "Tên có nhiều nhất 50 ký tự."),

email: yup
.string()
.email("E-mail không đúng.")
.max(50, "E-mail tối đa 50 ký tự."),
address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
phone: yup
.string()
.matches(
/((09|03|07|08|05)+([0-9]{8})\b)/g,
"Số điện thoại không hợp lệ."
),
salaryperhour: yup.string(),

});
return {
// Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
// để liên kết với các input trên form
staffLocal: this.staff,
staffFormSchema,
};
},
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
