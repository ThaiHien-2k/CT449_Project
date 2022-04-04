<template>
<div class="page row">
<div class="col-md-10">
<InputSearch v-model="searchText" />
</div>
<div class="mt-3 col-md-6">
<h4>
Danh sách nhân viên :
<i class="fa-solid fa-user-group"></i>
</h4>
<staffList
v-if="filteredstaffsCount > 0"
:staffs="filteredstaffs"
v-model:activeIndex="activeIndex"
/>
<p v-else>Không có nhân viên nào.</p>
<div class="mt-3 row justify-content-around align-items-center">
<button class="btn btn-sm btn-primary" @click="refreshList()">
<i class="fas fa-redo"></i> Làm mới
</button>
<button class="btn btn-sm btn-success" @click="goToAddstaff">
<i class="fas fa-plus"></i> Thêm mới
</button>
<button
class="btn btn-sm btn-danger"
@click="removeAllstaffs"
>
<i class="fas fa-trash"></i> Xóa tất cả
</button>
</div>
</div>
<div class="mt-3 col-md-6">
<div v-if="activestaff">
<h4>
Chi tiết nhân viên
<i class="fa-solid fa-user-group"></i>
</h4>
<staffCard :staff="activestaff" />
<router-link
:to="{
name: 'Editstaff',
params: { id: activestaff.id },
}"
>
<span class="mt-2 badge badge-warning">
<i class="fas fa-edit"></i> Hiệu chỉnh</span
>
</router-link>
</div>
</div>
</div>
</template>
<script>
import staffCard from "@/components/StaffCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import staffList from "@/components/StaffList.vue";
import staffService from "@/services/staff.service";
export default {
components: {
staffCard,
InputSearch,
staffList,
},
data() {
return {
staffs: [],
activeIndex: -1,
searchText: "",
};
},
watch: {
// Giám sát các thay đổi của biến searchText.
// Bỏ chọn phần tử đang được chọn trong danh sách.
searchText() {
this.activeIndex = -1;
},
},
computed: {
// Chuyển các đối tượng staff thành chuỗi để tiện cho tìm kiếm.
staffStrings() {
return this.staffs.map((staff) => {
const { name, email, address, phone, salaryperhour,men } = staff;
return [ name, email, address, phone, salaryperhour,men].join("");
});
},
// Trả về các staff có chứa thông tin cần tìm kiếm.
filteredstaffs() {
if (!this.searchText) return this.staffs;
return this.staffs.filter((staff, index) =>
this.staffStrings[index].includes(this.searchText)
);
},
activestaff() {
if (this.activeIndex < 0) return null;
return this.staffs[this.activeIndex];
},
filteredstaffsCount() {
return this.filteredstaffs.length;
},
},
methods: {
async retrievestaffs() {
try {
this.staffs = await staffService.getAll();
} catch (error) {
console.log(error);
}
},
refreshList() {
this.retrievestaffs();
this.activeIndex = -1;
},
async removeAllstaffs() {
if (confirm("Bạn muốn xóa tất cả nhân viên?")) {
try {
await staffService.deleteAll();
this.refreshList();
} catch (error) {
console.log(error);
}
}
},
goToAddstaff() {
this.$router.push({ name: "AddStaff" },);
},
},
mounted() {
this.refreshList();
},

};
</script>
<style scoped>
.page {
text-align: left;
max-width: 750px;
}
</style>