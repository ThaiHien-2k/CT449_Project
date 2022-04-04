<script>
export default {
props: {
bills: { type: Array, default: [] },
activeIndex: { type: Number, default: -1 },
},
emits: ["update:activeIndex"],
watch: {
activeIndex(newValue) {
if (newValue === -1) {
this.selectedIndex = -1;
}
},
},
data() {
return {
selectedIndex: this.activeIndex,
};
},
methods: {
select(index) {
this.selectedIndex = index;
this.$emit("update:activeIndex", index);
},
},
};
</script>
<template>
<ul class="list-group">
<li
class="list-group-item"
v-for="(bill, index) in bills"
:key="bill.id"
:class="{ active: index === selectedIndex }"
@click="select(index)"
><strong>Phòng số:</strong>
{{ bill.room_name }}
</li>
</ul>
</template>