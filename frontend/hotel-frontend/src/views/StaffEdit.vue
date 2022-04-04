<template>
<div v-if="staff" class="page">
<h4>Hiệu chỉnh nhân viên</h4>
<staffForm
:staff="staff"
@submit:staff="updatestaff"
@delete:staff="deletestaff"
/>
<p>{{ message }}</p>
</div>
</template>
<script>
import staffForm from "@/components/StaffForm.vue";
import staffService from "@/services/staff.service";
export default {
components: {
staffForm,
},
props: {
id: { type: String, required: true },
},
data() {
return {
staff: null,
message: "",
};
},
methods: {
async getstaff(id) {
try {
this.staff = await staffService.get(id);
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
async updatestaff(data) {
try {
await staffService.update(this.staff.id, data);
this.message = "nhân viên được cập nhật thành công.";
} catch (error) {
console.log(error);
}
},
async deletestaff() {
if (confirm("Bạn muốn xóa nhân viên này?")) {
try {
await staffService.delete(this.staff.id);
this.$router.push({ name: "staff" });
} catch (error) {
console.log(error);
}
}
},
},
created() {
this.getstaff(this.id);
this.message = "";
},
};
</script>