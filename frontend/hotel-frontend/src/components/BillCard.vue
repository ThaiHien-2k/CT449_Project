<script>
export default {
    props: {
    bill: { type: Object, required: true },
    },
    
};
</script>
<template>
    <div>
    <div class="p-1">
        <strong>Số phòng:</strong>
{{ bill.room_name}}
</div>
    <div class="p-1">
        <strong>Loại Phòng:</strong>
    {{ bill.type }}
    </div>
    <div class="p-1">
        <strong>Giá:</strong>
    {{ bill.cost}} (đ/24h)
    </div>
    <div class="p-1">
        <strong>Tên người thuê:</strong>
    {{ bill.name}}
    </div>
    <div class="p-1">
        <strong>CMND:</strong>
    {{ bill.CMND}}
    </div>
    <div class="p-1">
        <strong>Số điện thoại:</strong>
    {{ bill.phone}}
    </div>
          <div class="p-1">
<strong>Nam:&nbsp;</strong>
<i v-if="bill.nam" class="fas fa-check"></i>
<i v-else class="fas fa-times"></i>
</div>

    <div class="p-1">
        <strong>Thời gian thuê:</strong>
    {{ bill.time}} ngày
    
    </div>
    <div class="p-1">
        <strong>Nhân viên xác nhận:</strong>
    {{ bill.staff_name}}
    
    </div>
    <div class="p-1">
        <strong>Tổng tiền:</strong>
    {{ bill.cost*bill.time}}
    
    </div>
    </div>
</template>

<style scoped>

</style>