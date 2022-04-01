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
        <strong>Số bàn:</strong>
{{ bill.table_name }}
    </div>
    <div class="p-1">
        <strong>Tên món ăn:</strong>
{{ bill.product_name }}
    </div>
    <div class="p-1">
        <strong>Số Lượng:</strong>
    {{ bill.amount }}
    </div>
    <div class="p-1">
        <strong>Nhân Viên phục vụ:</strong>
    {{ bill.staff_name }}
    </div>
    <div class="p-1">
        <strong>Tiền Tip:</strong>
    {{ bill.tip }}
    </div>
    <div class="p-1">
        <strong>Tổng hóa đơn:</strong>
    {{ bill.total_money }}
    </div>
    </div>
</template>