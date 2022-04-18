<template>
	<div v-if="currentUser">
		<header class="jumbotron">
			<h3>
				Xin chào người dùng
				<strong>{{ currentUser.username }}</strong>
				<br>
				<br>
				<span style="font-style: italic;"> Đã đến với ứng dụng quản lý học tập</span> 
			</h3>
		</header>
		<div class="row">
			<div class="col-md-8">
				<p class="text-break">
					<strong>Token:</strong>
					{{ currentUser.accessToken }}
				</p>
				<p>
					<strong>Id:</strong>
					{{ currentUser._id }}
				</p>
				<p>
					<strong>E-mail:</strong>
					{{ currentUser.email }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

export default {
	computed: {
		...mapState(useAuthStore, {
			currentUser: "user",
		}),
	},
	created() {
		if (!this.currentUser) {
			this.$router.push({ name: "login" });
		}
	},
};
</script>
