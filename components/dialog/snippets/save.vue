<template>
  <Dialog ref="dialog" title="Save Snippet" btn-ok="Save" @ok="onSave" @show="onShow">
    <form class="flex flex-col gap-2">
      <label for="name">Snippet name</label>
      <input name="name" type="text" v-model="formData!.name" />
      <label for="category">Category</label>
      <input name="category" type="text" v-model="formData!.category" />
      <label for="description">Description</label>
      <textarea name="description" v-model="formData!.description" />
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import type Dialog from '@/components/dialog/index.vue';

export interface SaveSnippetFormData {
  name: string;
  category: string;
  description: string;
};

const emit = defineEmits<{
  save: [formData: SaveSnippetFormData]
}>();

const { categories } = useSavedSnippets();

const formData = ref<SaveSnippetFormData>();
const dialog = ref<InstanceType<typeof Dialog>>();

const reset = () => {
  formData.value = { name: '', category: '', description: '' };
}

const onShow = () => {
  reset();
}

const onSave = () => {
  emit('save', formData.value!);
}

</script>