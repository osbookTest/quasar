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
import { successs } from './Success';
const props = defineProps<{
  selectRow: any;
}>();
const deleteSubmit = (qa_id: number) => {
  console.log(props.selectRow.props.row.qa_id);
  //刪除邏輯
  successs('刪除成功');
};
</script>
