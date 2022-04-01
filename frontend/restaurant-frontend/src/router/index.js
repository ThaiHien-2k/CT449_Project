import { createWebHistory, createRouter } from "vue-router";
import billBook from "@/views/Bill.vue";
import Addbill from "@/views/BillAdd.vue";

import staff from "@/views/Staff.vue";
import Addstaff from "@/views/StaffAdd.vue";

const routes = [{
    
    path: "/",
    name: "bill",
    component: billBook,


},

   
    {
        path: "/staffs/:id",
        name: "Editstaff",
        component: () => import("@/views/StaffEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
        },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
        },
        {
            path: "/addStaff",
            name: "AddStaff",
            component: Addstaff,
            
         },   
         {
         path: "/staffs",
         name: "staff",
         component: staff,
        }, 
         {
            path: "/staffs/:id",
            name: "Editbill",
            component: () => import("@/views/BillEdit.vue"),
            props: true // Truyền các biến trong $route.params vào làm props
            },
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: () => import("@/views/NotFound.vue"),
            },
            {
                path: "/addbill",
                name: "Addbill",
                component: Addbill,
                
             },   
         
    ];
    const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    });
    export default router;
    
    