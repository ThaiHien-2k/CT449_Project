<script>
export default {
    props: {
    room: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
    <div class="p-1">
        <strong>Tên phòng:</strong>
{{ room.name }}
    </div>
    <div class="p-1">
        <strong>Loại Phòng:</strong>
    {{ room.type }}
    </div>  
    <div class="p-1">
        <strong>Giá:</strong>
{{ room.cost }} (đ/24h)
    </div>
            <div class="p-1">
<strong>Còn phòng:&nbsp;</strong>
<i v-if="room.status" class="fas fa-check"></i>
<i v-else class="fas fa-times"></i>
</div>
    </div>

</template>