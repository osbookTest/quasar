<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="qa_id"
    class="q-pt-lg"
    title="待審核問題"
    v-model:pagination="pagination"
    hide-pagination
  >
    <template v-slot:top-right>
      {{ (search, orderArr) }}
      <SearchTable v-model:search="search" />
      <OrderSelect v-model:currentOption="orderArr" :options="options1" />
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <slot name="btnAction" :props="props"></slot>

        <q-btn
          dense
          round
          flat
          icon="delete"
          class="q-mx-md"
          @click="deleteSubmit(props.row.qa_id)"
        ></q-btn>
      </q-td>
    </template>
    <template #bottom>
      <div style="right: 30px; position: absolute">
        <PaginationTable v-model:pagina-table="pagination" />
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue';
import { columns } from './Columns';
import Swal from 'sweetalert2';
import SearchTable from './Toolbar/SearchTable.vue';
import OrderSelect from './Toolbar/OrderTable.vue';
import PaginationTable from './Pagination/PaginationTable.vue';
import { QA } from './data ';

const search = ref('');
const orderArr = ref({ label: '最新', value: 'desc' });

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

//pagination
const pagination = ref({
  page: 1,
  rowsPerPage: 3,
});

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

const props = defineProps<{
  rows: QA[];
}>();

// :loading="true"
//loading-label="Gimme a sec and I'll fetch ya data!"
//no-data-label="I can't find any data 😞"
</script>
