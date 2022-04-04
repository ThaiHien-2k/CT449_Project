<template>
<div class="page row">
<div class="col-md-10">
<InputSearch v-model="searchText" />
</div>
<div class="mt-3 col-md-6">
<h4>
Danh sách phòng:
<i class="fa-solid fa-hotel"></i>
</h4>
<roomList
v-if="filteredroomsCount > 0"
:rooms="filteredrooms"
v-model:activeIndex="activeIndex"
/>
<p v-else>Không có phòng nào.</p>
<div class="mt-3 row justify-content-around align-items-center">
<button class="btn btn-sm btn-primary" @click="refreshList()">
<i class="fas fa-redo"></i> Làm mới
</button>
<button class="btn btn-sm btn-success" @click="goToAddroom">
<i class="fas fa-plus"></i> Thêm mới
</button>
<button
class="btn btn-sm btn-danger"
@click="removeAllrooms"
>
<i class="fas fa-trash"></i> Xóa tất cả
</button>
</div>
</div>
<div class="mt-3 col-md-6">
<div v-if="activeroom">
<h4>
Chi tiết phòng
<i class="fa-solid fa-hotel"></i>
</h4>
<roomCard :room="activeroom" />
<router-link
:to="{
name: 'Editroom',
params: { id: activeroom.id },
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
import roomCard from "@/components/RoomCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import roomList from "@/components/RoomList.vue";
import roomService from "@/services/room.service";
export default {
components: {
roomCard,
InputSearch,
roomList,
},
data() {
return {
rooms: [],
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
// Chuyển các đối tượng room thành chuỗi để tiện cho tìm kiếm.
roomStrings() {
return this.rooms.map((room) => {
const { name, cost, type } = room;
return [name, cost, type ].join("");
});
},
// Trả về các room có chứa thông tin cần tìm kiếm.
filteredrooms() {
if (!this.searchText) return this.rooms;
return this.rooms.filter((room, index) =>
this.roomStrings[index].includes(this.searchText)
);
},
activeroom() {
if (this.activeIndex < 0) return null;
return this.rooms[this.activeIndex];
},
filteredroomsCount() {
return this.filteredrooms.length;
},
},
methods: {
async retrieverooms() {
try {
this.rooms = await roomService.getAll();
} catch (error) {
console.log(error);
}
},
refreshList() {
this.retrieverooms();
this.activeIndex = -1;
},
async removeAllrooms() {
if (confirm("Bạn muốn xóa tất cả phòng?")) {
try {
await roomService.deleteAll();
this.refreshList();
} catch (error) {
console.log(error);
}
}
},
goToAddroom() {
this.$router.push({ name: "Addroom" },);
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