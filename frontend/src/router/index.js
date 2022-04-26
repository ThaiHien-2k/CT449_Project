import { createWebHistory, createRouter } from "vue-router";
import UserLogin from "@/views/UserLogin.vue";
import { useAuthStore } from "@/stores/auth.store";

const redirectIfLoggedIn = (_to, _from) => {
	if (useAuthStore().isUserLoggedIn) {
		return {
			name: "project",
		};
	}
};

const routes = [
	{
		path: "/login",
		name: "login",
		component: UserLogin,
		meta: {
			publicPage: true,
		},
		beforeEnter: redirectIfLoggedIn,
	},
	{
		path: "/register",
		name: "register",
		component: () => import("@/views/UserRegister.vue"),
		meta: {
			publicPage: true,
		},
		beforeEnter: redirectIfLoggedIn,
	},
	{
		path: "/profile",
		name: "profile",
		component: () => import("@/views/UserProfile.vue"),
	},
	{
		path: "/",
		name: "project",
		component: () => import("@/views/Project.vue"),
	},
	{
		path: "/projects/edit/:id",
		name: "project.edit",
		component: () => import("@/views/ProjectEdit.vue"),
		props: true,
	},
	{
		path: "/projects/add",
		name: "project.add",
		component: () => import("@/views/ProjectAdd.vue"),
	},
// deadline
	{
		path: "/deadlines",
		name: "deadline",
		component: () => import("@/views/Deadline.vue"),
	},
	{
		path: "/deadlines/edit/:id",
		name: "deadline.edit",
		component: () => import("@/views/DeadlineEdit.vue"),
		props: true,
	},
	{
		path: "/deadlines/add",
		name: "deadline.add",
		component: () => import("@/views/DeadlineAdd.vue"),
	},

	{
		path: "/:pathMatch(.*)*",
		name: "notfound",
		component: () => import("@/views/NotFound.vue"),
	},
	{
		path: "/status",
		name: "status",
		component: () => import("@/views/Status.vue"),
	},
	{
		path: "/weather",
		name: "weather",
		component: () => import("@/views/Weather.vue"),
	},

];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, _from) => {
	const authRequired = !to.meta.publicPage;
	const auth = useAuthStore();

	if (authRequired && !auth.isUserLoggedIn) {
		const query = to.fullPath === "/" ? {} : { redirect: to.fullPath };
		return {
			name: "login",
			query,
		};
	}
});

export default router;
