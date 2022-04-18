<script>
export default {
props: {
deadlines: { type: Array, default: [] },

},

watch: {

},
data: () => ({
  day: "",
  month: "",
  year: "",
}),
methods: {
//  getDate: function () {
//     return new Date().toLocaleDateString();
//   },
  getDay: function () {
    return new Date().getDate();
  },
  getMonth: function () {
    return new Date().getMonth();
  },
  
  getYear: function () {
    return new Date().getFullYear();
  },
},
mounted: function () {
  this.day = this.getDay();
  this.month = this.getMonth()+1;
  this.year = this.getYear();
  if(this.month == 13){
    this.month = 1;
  }
  
},
};


</script>
<template>
<div class="container">
  <div><Strong>Hôm nay là:</Strong> {{this.day}}/{{this.month}}/{{this.year}}</div>
  <br>
  <table class="table table-bordered">
    <thead>
      <th style="background-color: greenyellow;"> <center>Đã hoàn thành</center></th>
      <th style="background-color: gold;"><center>Chưa hoàn thành</center></th>
      <th style="background-color: red;"><center>Trễ hạn</center></th>
    </thead>
    <tbody>
      <tr v-for="(deadline, index) in deadlines"
        >

        <td 
        v-if="deadline.done === true" style="background-color: greenyellow;"
        ><span style="font-size: 17px;">{{ deadline.name }}</span></td>
        <td></td>
        <td 
        v-if="deadline.done === false &&(this.day <= deadline.day && this.month <= deadline.month && this.year <= deadline.year) "  style="background-color:gold;"       
        ><span style="font-size: 17px;">{{ deadline.name }}</span><br><br><strong style="font-size: 15px;">Hạn cuối:</strong><h6> {{deadline.day}}/{{deadline.month}}/{{deadline.year}}</h6></td>
        <td></td>
        <td 
        v-if="deadline.done === false && (this.day > deadline.day || this.month > deadline.month || this.year > deadline.year)"  style="background-color: red;"       
        ><span style="font-size: 17px;">{{deadline.name}}</span><br><br><strong style="font-size: 15px;">Hạn cuối:</strong> {{deadline.day}}/{{deadline.month}}/{{deadline.year}}</td>
        

      </tr>

    </tbody>
  </table>
</div>

</template>