<script>
export default {
    props: {
    staff: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
    <div class="p-1">
        <strong>Họ Tên Nhân Viên:</strong>
{{ staff.name }}
    </div>
    <div class="p-1">
        <strong>Email:</strong>
{{ staff.email }}
    </div>
    <div class="p-1">
        <strong>Địa chỉ:</strong>
    {{ staff.address }}
    </div>
    <div class="p-1">
        <strong>SĐT:</strong>
    {{ staff.phone }}
    </div>
    <div class="p-1">
        <strong>Lương:</strong>
    {{ staff.salary }} đ
    </div>
    <div class="p-1">
<strong>Nam:&nbsp;</strong>
<i v-if="staff.men" class="fas fa-check"></i>
<i v-else class="fas fa-times"></i>
</div>
    </div>
</template>