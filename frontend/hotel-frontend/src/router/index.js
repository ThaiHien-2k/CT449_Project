import { createWebHistory, createRouter } from "vue-router";
import billBook from "@/views/Bill.vue";
import Addbill from "@/views/BillAdd.vue";

import staff from "@/views/Staff.vue";
import Addstaff from "@/views/StaffAdd.vue";

import room from "@/views/Room.vue";
import AddRoom from "@/views/RoomAdd.vue";


const routes = [{
    
    path: "/",
    name: "bill",
    component: billBook,


},

// bill
{
    path: "/bills/:id",
    name: "Editbill",
    component: () => import("@/views/BillEdit.vue"),
    props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/addbill",
        name: "Addbill",
        component: Addbill,
        
     },   

// staff
{
    path: "/staffs",
    name: "staff",
    component: staff,
   }, 
    {
        path: "/staffs/:id",
        name: "Editstaff",
        component: () => import("@/views/StaffEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
        },

        {
            path: "/addStaff",
            name: "AddStaff",
            component: Addstaff,
            
         },   
       

        
// Room
        {
            path: "/rooms/:id",
            name: "Editroom",
            component: () => import("@/views/RoomEdit.vue"),
            props: true // Truyền các biến trong $route.params vào làm props
            },
    
            {
                path: "/addRoom",
                name: "Addroom",
                component: AddRoom,
                
             },   
             {
             path: "/rooms",
             name: "room",
             component: room,
            }, 



      

                //  error
                 {
                    path: "/:pathMatch(.*)*",
                    name: "NotFound",
                    component: () => import("@/views/NotFound.vue"),
                    },
                  
         
    ];
    const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    });
    export default router;
    
    