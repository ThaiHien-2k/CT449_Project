<template>
<div v-if="room" class="page">
<h4>Hiệu chỉnh phòng</h4>
<roomForm
:room="room"
@submit:room="updateroom"
@delete:room="deleteroom"
/>
<p>{{ message }}</p>
</div>
</template>
<script>
import roomForm from "@/components/roomForm.vue";
import roomService from "@/services/room.service";
export default {
components: {
roomForm,
},
props: {
id: { type: String, required: true },
},
data() {
return {
room: null,
message: "",
};
},
methods: {
async getroom(id) {
try {
this.room = await roomService.get(id);
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
async updateroom(data) {
try {
await roomService.update(this.room.id, data);
this.message = "phòng được cập nhật thành công.";
} catch (error) {
console.log(error);
}
},
async deleteroom() {
if (confirm("Bạn muốn xóa phòng này?")) {
try {
await roomService.delete(this.room.id);
this.$router.push({ name: "room" });
} catch (error) {
console.log(error);
}
}
},
},
created() {
this.getroom(this.id);
this.message = "";
},
};
</script>