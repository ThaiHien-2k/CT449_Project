<script>
export default {
	props: {
		deadlines: { type: Array, default: [] },
		activeIndex: { type: Number, default: -1 },
	},
	emits: ["update:activeIndex"],
	methods: {
		updateActiveIndex(index) {
			this.$emit("update:activeIndex", index);
		},
	},
};
</script>

<template>
	<ul class="list-group">
		<li
			class="list-group-item"
			v-for="(deadline, index) in deadlines"
			:class="{ active: index === activeIndex }"
			:key="deadline._id"
			@click="updateActiveIndex(index)"
		>
			{{ deadline.name }}
		</li>
	</ul>
</template>
