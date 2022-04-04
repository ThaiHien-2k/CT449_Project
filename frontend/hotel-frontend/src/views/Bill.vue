<template>
<div class="page row">
<div class="col-md-10">
<InputSearch v-model="searchText" />
</div>
<div class="mt-3 col-md-6">
<h4>
Danh sách hóa đơn :
<i class="fa-solid fa-cart-shopping"></i>
</h4>
<billList
v-if="filteredbillsCount > 0"
:bills="filteredbills"
v-model:activeIndex="activeIndex"
/>
<p v-else>Không có hóa đơn nào.</p>
<div class="mt-3 row justify-content-around align-items-center">
<button class="btn btn-sm btn-primary" @click="refreshList()">
<i class="fas fa-redo"></i> Làm mới
</button>
<button class="btn btn-sm btn-success" @click="goToAddbill">
<i class="fas fa-plus"></i> Thêm mới
</button>
<button
class="btn btn-sm btn-danger"
@click="removeAllbills"
>
<i class="fas fa-trash"></i> Xóa tất cả
</button>
</div>
</div>
<div class="mt-3 col-md-6">
<div v-if="activebill">
<h4>
Chi tiết hóa đơn
<i class="fa-solid fa-cart-shopping"></i>
</h4>
<billCard :bill="activebill" />
<router-link
:to="{
name: 'Editbill',
params: { id: activebill.id },
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
import billCard from "@/components/BillCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import billList from "@/components/BillList.vue";
import billService from "@/services/bill.service";
export default {
components: {
billCard,
InputSearch,
billList,
},
data() {
return {
bills: [],
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
// Chuyển các đối tượng bill thành chuỗi để tiện cho tìm kiếm.
billStrings() {
return this.bills.map((bill) => {
const { room_name, type, cost, name,tip,CMND,phone,nam,staff_name,time } = bill;
return [room_name, type, cost, name,tip,CMND,phone,nam,staff_name,time ].join("");
});
},
// Trả về các bill có chứa thông tin cần tìm kiếm.
filteredbills() {
if (!this.searchText) return this.bills;
return this.bills.filter((bill, index) =>
this.billStrings[index].includes(this.searchText)
);
},
activebill() {
if (this.activeIndex < 0) return null;
return this.bills[this.activeIndex];
},
filteredbillsCount() {
return this.filteredbills.length;
},
},
methods: {
async retrievebills() {
try {
this.bills = await billService.getAll();
} catch (error) {
console.log(error);
}
},
refreshList() {
this.retrievebills();
this.activeIndex = -1;
},
async removeAllbills() {
if (confirm("Bạn muốn xóa tất cả hóa đơn?")) {
try {
await billService.deleteAll();
this.refreshList();
} catch (error) {
console.log(error);
}
}
},
goToAddbill() {
this.$router.push({ name: "Addbill" },);
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