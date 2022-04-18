<script>
export default {
	props: {
		project: { type: Object, required: true },
	},
	el: '#container',
//   data() {
//     return {
//       text: 'Text to copy',
//     }
//   },
  methods: {
    copy() {
      try {
        navigator.clipboard.writeText(this.project.link);
		alert('Bạn đã copy thành công link dự án '+ this.project.name);
      } catch (e) {
        throw e
      }
    }
  },
};

</script>

<template>
	<div>
		<div class="p-1">
			<strong>Tên dự án:</strong>
			{{ project.name }}
		</div>
		<div class="p-1">
			<strong>Mô tả:</strong>
			{{ project.decripsion }}
		</div>
		<div class="p-1">
			<strong>Nơi lưu trữ:</strong><br>
			{{ project.link }} 
			
		</div>
		<div class="p-1">
			<button @click="copy" style="background-color:darkgrey; border-radius: 5px; float: right;  font-weight: bold;">Copy link</button>
		</div>	

	</div>
</template>
