<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a href="/" class="navbar-brand a">ỨNG DỤNG QUẢN LÝ NHÀ HÀNG</a>
    <div class="mr-auto navbar-nav">
<li class="nav-item">
<router-link :to="{ name: 'bill' }" class="nav-link">
                Hoá đơn
<i class="fa-solid fa-cart-shopping"></i>
</router-link>
</li>
<li class="nav-item">

 <router-link :to="{ name: 'staff' }" class="nav-link">
                Nhân viên
<i class="fa-solid fa-user-group"></i>
</router-link>
</li>
 </div>
</nav>
</template>

