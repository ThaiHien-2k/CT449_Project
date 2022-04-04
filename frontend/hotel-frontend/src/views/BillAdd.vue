<template>
  <div class="page">
    <h4>Thêm hóa đơn</h4>
    <billForm :bill="defaultFormValues" @submit:bill="createbill" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import billForm from "@/components/BillForm.vue";
import billService from "@/services/bill.service";
export default {
  components: {
    billForm,
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
    const createbill = async (value) => {
      try {
        const res = await billService.create(value);
        message.value = "Hóa đơn được thêm thành công.";
      } catch (err) {
        console.log(err);
      }
    };
    return { createbill, defaultFormValues, message };
  },
};
</script>