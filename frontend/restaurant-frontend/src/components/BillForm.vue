<template>
<Form
@submit="$emit('submit:bill', billLocal)"
:validation-schema="billFormSchema"
>
<div class="form-group">
<label for="table_name">Số bàn</label>
<Field
name="table_name"
type="text"
class="form-control"
v-model="billLocal.table_name"
/>
<ErrorMessage name="table_name" class="error-feedback" />
</div>
<div class="form-group">
<label for="product_name">Tên món ăn</label>
<Field
name="product_name"
type="text"
class="form-control"
v-model="billLocal.product_name"
/>
<ErrorMessage name="product_name" class="error-feedback" />
</div>
<div class="form-group">
<label for="amount">Số lượng</label>
<Field
name="amount"
type="text"
class="form-control"
v-model="billLocal.amount"
/>
<ErrorMessage name="amount" class="error-feedback" />
</div>
<div class="form-group">
<label for="staff_name">Tên nhân viên</label>
<Field
name="staff_name"
type="text"
class="form-control"
v-model="billLocal.staff_name"
/>
<ErrorMessage name="staff_name" class="error-feedback" />
</div>

<div class="form-group">
<label for="tip">Tiền tip</label>
<Field
name="tip"
type="text"
class="form-control"
v-model="billLocal.tip"
/>
<ErrorMessage name="tip" class="error-feedback" />
</div>

<div class="form-group">
<label for="total_money">Tổng số tiền</label>
<Field
name="total_money"
type="text"
class="form-control"
v-model="billLocal.total_money"
/>
<ErrorMessage name="total_money" class="error-feedback" />
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
export default {
components: {
Form,
Field,
ErrorMessage,
},
emits: ["submit:bill", "delete:bill"],
props: {
bill: { type: Object, required: true }
},
data() {
const billFormSchema = yup.object().shape({
table_name: yup
.string()
.required("Tên phải có giá trị.")
.min(2, "Tên phải ít nhất 2 ký tự.")
.max(50, "Tên có nhiều nhất 50 ký tự."),

product_name: yup.string(),
amount: yup.string(),
staff_name: yup.string(),
tip: yup.string(),
total_money: yup.string()

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
