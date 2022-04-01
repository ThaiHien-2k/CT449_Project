<template>
  <div class="page">
    <h4>Thêm Liên hệ</h4>
    <staffForm :staff="defaultFormValues" @submit:staff="createstaff" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import staffForm from "@/components/StaffForm.vue";
import staffService from "@/services/staff.service";
export default {
  components: {
    staffForm,
  },
  setup() {
    const defaultFormValues = {
      // doc: {
      //   name: "",
      //   address: "",
      //   phone: "",
      //   favorite: "",
      //   id: "",
      //   message: "",
      // },
    };
    const message = ref("");
    const router = useRouter();
    const createstaff = async (value) => {
      try {
        const res = await staffService.create(value);
        message.value = "Liên hệ được thêm thành công.";
      } catch (err) {
        console.log(err);
      }
    };
    return { createstaff, defaultFormValues, message };
  },
};
</script>