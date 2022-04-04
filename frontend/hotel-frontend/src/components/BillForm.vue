<template>
<Form
@submit="$emit('submit:bill', billLocal)"
:validation-schema="billFormSchema"
>
<div class="form-group">
<label for="room_name">Số phòng</label>
<Field
name="room_name"
type="text"
class="form-control"
v-model="billLocal.room_name"
/>
<ErrorMessage name="room_name" class="error-feedback" />
</div>



<div class="form-group">
<label for="type">Loại phòng</label>
<Field
name="type"
type="text"
class="form-control"
v-model="billLocal.type" 
/>
<ErrorMessage name="type" class="error-feedback" />
</div>

<div class="form-group">
<label for="cost">Giá</label>
<Field
name="cost"
type="text"
class="form-control"
v-model="billLocal.cost" 
/>
<ErrorMessage name="cost" class="error-feedback" />
</div>

<div class="form-group">
<label for="name">Tên Người thuê</label>
<Field
name="name"
type="text"
class="form-control"
v-model="billLocal.name" 
/>
<ErrorMessage name="name" class="error-feedback" />
</div>

<div class="form-group">
<label for="CMND">CMND</label>
<Field
name="CMND"
type="text"
class="form-control"
v-model="billLocal.CMND" 
/>
<ErrorMessage name="CMND" class="error-feedback" />
</div>

<div class="form-group">
<label for="phone">Số điện thoại</label>
<Field
name="phone"
type="text"
class="form-control"
v-model="billLocal.phone" 
/>
<ErrorMessage name="phone" class="error-feedback" />
</div>

<div class="form-group form-check">
<input
name="nam"
type="checkbox"
class="form-check-input"
v-model="billLocal.nam"
/>
<label for="nam" class="form-check-label">
<strong>Nam</strong>
</label>
</div>

<div class="form-group">
<label for="time">Thời gian thuê</label>
<Field
name="time"
type="text"
class="form-control"
v-model="billLocal.time" 
/>
<ErrorMessage name="time" class="error-feedback" />
</div>

<div class="form-group">
<label for="staff_name">Nhân viên phục vụ</label>
<Field
name="staff_name"
type="text"
class="form-control"
v-model="billLocal.staff_name" 
/>
<ErrorMessage name="staff_name" class="error-feedback" />
</div>


<div class="form-group">
<button class="btn btn-primary">Lưu</button>
<button
v-if="billLocal.id"
type="button"
class="ml-2 btn btn-danger"
@click="$emit('delete:bill', billLocal.id)">
Xóa
</button>
</div>
</Form>
</template>


<script>


import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { array } from 'yup/lib/locale';
export default {
components: {
Form,
Field,
ErrorMessage,
},
emits: ["submit:bill", "delete:bill"],
props: {
bill: { type: Object, required: true },

},
data() {
const billFormSchema = yup.object().shape({
room_name: yup
.string()
.required("Tên phải có giá trị.")
.min(2, "Tên phải ít nhất 2 ký tự.")
.max(50, "Tên có nhiều nhất 50 ký tự."),

type: yup.string(),
cost: yup.string(),
staff_name: yup.string(),
name:yup.string(),
CMND: yup.string(),
total_money: yup.string(),
time:yup.string(),
phone: yup
.string()
.matches(
/((09|03|07|08|05)+([0-9]{8})\b)/g,
"Số điện thoại không hợp lệ."
),
});
return {
// Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
// để liên kết với các input trên form
billLocal: this.bill,
billFormSchema,

          
};

},



};
</script>
<style scoped>
@import "@/assets/form.css";
</style>




