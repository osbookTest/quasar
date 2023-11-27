<template>
  <q-dialog v-model="open">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-input v-model="selectRow.qa_question" dense type="textarea" autogrow
          ><template v-slot:prepend>
            <span class="text-subtitle1">Q:&nbsp;</span>
          </template>
        </q-input>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input v-model="selectRow.qa_answer" dense type="textarea" autogrow
          ><template v-slot:prepend>
            <span class="text-subtitle1">A:&nbsp;</span>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions>
        <q-select
          filled
          v-model="selectRow.office_name"
          :options="options"
          class="q-mr-sm"
          dense
          options-dense
        >
          <template v-slot:prepend>
            <span class="text-subtitle2">指派單位:</span>
          </template>
        </q-select>
        <q-btn flat label="取消" color="primary" v-close-popup />
        <q-btn
          flat
          label="修改"
          color="primary"
          v-close-popup
          @click="editSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue';
import Swal from 'sweetalert2';

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
</script>
