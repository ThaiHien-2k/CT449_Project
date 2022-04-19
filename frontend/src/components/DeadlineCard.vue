<script>
export default {
	props: {
		deadline: { type: Object, required: true },
	},
};
</script>

<template>
	<div>
		<div class="p-1">
			<strong>Tên deadline:</strong>
			{{ deadline.name }}
		</div>
		<div class="p-1">
			<strong>Mô tả:</strong>
			{{ deadline.decripsion }}
		</div>
		<div class="p-1">
			<strong>Hạn cuối:</strong>
			{{ deadline.day }}/{{ deadline.month }}/{{ deadline.year }}
		</div>
		<div class="p-1">
			<strong>Đã hoàn thành:&nbsp;</strong>
			<i v-if="deadline.done" class="fas fa-check"></i>
			<i v-else class="fas fa-times"></i>
		</div>
	</div>
</template>
