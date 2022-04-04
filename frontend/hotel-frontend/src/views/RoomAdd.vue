<template>
  <div class="page">
    <h4>Thêm phòng</h4>
    <roomForm :room="defaultFormValues" @submit:room="createroom" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import roomForm from "@/components/RoomForm.vue";
import roomService from "@/services/room.service";
export default {
  components: {
    roomForm,
  },
  setup() {
    const defaultFormValues = {
      doc: {
        // name: "",
        // address: "",
        // phone: "",
        // favorite: "",
        // id: "",
        // message: "",
      },
    };
    const message = ref("");
    const router = useRouter();
    const createroom = async (value) => {
      try {
        const res = await roomService.create(value);
        message.value = "phòng được thêm thành công.";
      } catch (err) {
        console.log(err);
      }
    };
    return { createroom, defaultFormValues, message };
  },
};
</script>