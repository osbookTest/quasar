<template>
  <q-btn
    dense
    round
    flat
    icon="delete"
    class="q-mx-md"
    @click="deleteSubmit(selectRow.props.row.qa_id)"
  ></q-btn>
</template>
<script setup lang="ts">
import Swal from 'sweetalert2';

const props = defineProps<{
  selectRow: any;
}>();
const deleteSubmit = (qa_id: number) => {
  console.log(props.selectRow.props.row.qa_id);
  //刪除邏輯
  Swal.fire({
    showConfirmButton: false,
    title: '刪除成功',
    icon: 'success',
    timer: 1200,
  });
};
</script>
