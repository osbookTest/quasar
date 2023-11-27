<template>
  <div class="q-pa-md">
    <Table :rows="rows">
      <template v-slot:btnAction="slotProps"
        ><EditBtn
          :selectRow="slotProps"
          @dialogOpen="(value) => (open = value)"
          @setSelectRow="(value) => (selectRow = value)"
        />
        <DeleteBtn :selectRow="slotProps" />
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue';
import Swal from 'sweetalert2';
import EditDialog from './Components/Table/Dialog/EditDialog.vue';
import Table from './Components/Table/QaTable.vue';
import EditBtn from './Components/Table/ActionBtn/EditBtn.vue';
import DeleteBtn from './Components/Table/ActionBtn/DeleteBtn.vue';

type SelectRow = {
  qa_id: number;
  qa_question: string;
  qa_answer: string;
  office_id: number;
  office_name: string;
  user_id: string;
  qa_asktime: string;
};
const initialize = {
  qa_id: -1,
  qa_question: '',
  qa_answer: '',
  office_id: -1,
  office_name: '',
  user_id: '',
  qa_asktime: '',
};

//子組件order/search
//actionBtn
const deleteSubmit = (qa_id: number) => {
  Swal.fire({
    showConfirmButton: false,
    title: '刪除成功',
    icon: 'success',
    timer: 1200,
  });
};

//editPop
const open = ref(false);
const selectRow: Ref<SelectRow> = ref(initialize);
const editPop = (data: any) => {
  open.value = true;
  selectRow.value = data;
};

const editSubmit = () => {
  const officeId = offices.filter(
    (x) => x.office_name === selectRow.value.office_name
  )[0].office_id;

  const editData = { ...selectRow.value, office_id: officeId };
  Swal.fire({
    showConfirmButton: false,
    title: '修改成功',
    icon: 'success',
    timer: 1200,
  });
};

watch(open, () => {
  if (open.value) return;
  selectRow.value = initialize;
});

const options = computed(() => {
  return offices
    .filter((x) => x.office_name !== selectRow.value.office_name)
    .map((x) => x.office_name);
});
const offices = [
  { office_id: 1, office_name: '資管' },
  { office_id: 2, office_name: '統資' },
  { office_id: 3, office_name: '圖資' },
];
const options1 = [
  { label: '資管', value: '1' },
  { label: '圖資', value: '2' },
];

//fetch data
const rows = [
  {
    qa_id: 1,
    qa_question: 'Frozen Yogurt',
    qa_answer: 'answer',
    office_id: 1,
    office_name: '資管',
    user_id: '121',
    qa_asktime: new Date(),
    qa_checktime: null,
    qa_check: false,
  },
  {
    qa_id: 2,
    qa_question: 'Frozen Yogurt',
    qa_answer: 'answer',
    office_id: 1,
    office_name: '資管',
    user_id: '121',
    qa_asktime: new Date(),
    qa_checktime: null,
    qa_check: false,
  },
  {
    qa_id: 3,
    qa_question: 'Frozen Yogurt',
    qa_answer: 'answer',
    office_id: 1,
    office_name: '資管',
    user_id: '121',
    qa_asktime: new Date(),
    qa_checktime: null,
    qa_check: false,
  },
  {
    qa_id: 4,
    qa_question: 'Frozen Yogurt',
    qa_answer: 'answer',
    office_id: 1,
    office_name: '資管',
    user_id: '121',
    qa_asktime: new Date(),
    qa_checktime: null,
    qa_check: false,
  },
];

// :loading="true"
//loading-label="Gimme a sec and I'll fetch ya data!"
//no-data-label="I can't find any data 😞"
</script>
