<template>
<div v-if="bill" class="page">
<h4>Hiệu chỉnh hóa đơn</h4>
<billForm
:bill="bill"
@submit:bill="updatebill"
@delete:bill="deletebill"
/>
<p>{{ message }}</p>
</div>
</template>
<script>
import billForm from "@/components/BillForm.vue";
import billService from "@/services/bill.service";
import staffService from "@/services/staff.service";
export default {
components: {
billForm,
},
props: {
id: { type: String, required: true },
},
data() {
return {
staff:null,
bill: null,
message: "",
};
},
methods: {
async getbill(id) {
try {
this.bill = await billService.get(id);
} catch (error) {
console.log(error);
// Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
this.$router.push({
name: "NotFound",
params: {
pathMatch: this.$route.path.split("/").slice(1)
},
query: this.$route.query,
hash: this.$route.hash,
});
}
},
async updatebill(data) {
try {
await billService.update(this.bill.id, data);
this.message = "Hóa đơn được cập nhật thành công.";
} catch (error) {
console.log(error);
}
},
async deletebill() {
if (confirm("Bạn muốn xóa hóa đơn này?")) {
try {
await billService.delete(this.bill.id);
this.$router.push({ name: "bill" });
} catch (error) {
console.log(error);
}
}
},
},
created() {
this.getbill(this.id);
this.message = "";
},
};
</script>