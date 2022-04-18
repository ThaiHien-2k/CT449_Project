<script>
export default {
	props: {
		projects: { type: Array, default: [] },
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
			v-for="(project, index) in projects"
			:class="{ active: index === activeIndex }"
			:key="project._id"
			@click="updateActiveIndex(index)"
		>
			{{ project.name }}
		</li>
	</ul>
</template>
