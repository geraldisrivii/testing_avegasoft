<script setup lang="ts">
import { getModalById, useModalHooks } from "~/components/modal";
import { TASKS_UPDATE_PLATE } from "~/constants/constants.plates";
import * as yup from "yup";
import { TaskStatus, type TaskDTO } from "@dapp/dto/dto.task";

const modal = getModalById(TASKS_UPDATE_PLATE)!;

const { onModalMounted } = useModalHooks(TASKS_UPDATE_PLATE);

const task = modal.getStoreProperty<TaskDTO>("task");

const taskStore = useTasks();

// form
const schema = {
  name: yup.string().max(20).min(3).required("Title is required"),
  description: yup
    .string()
    .min(10)
    .max(200)
    .required("Description is required"),
};

const { value: name, errors: nameErrors } = useField<string>(
  "name",
  schema.name
);
const { value: description, errors: descriptionErrors } = useField<string>(
  "description",
  schema.description
);

async function onSubmit(name: string, description: string) {
  modal.setState(false);
  await taskStore.updateTask(task.value.id, {
    name,
    description,
  });
}

const buttonDisabled = computed(() => {
  return (
    !name.value ||
    !description.value ||
    nameErrors.value.length ||
    descriptionErrors.value.length
  );
});

// hooks
onModalMounted(() => {
  name.value = task.value.name;
  description.value = task.value.description;
});
</script>

<template>
  <modal-template
    align-title="center"
    title="Update Task"
    :id="TASKS_UPDATE_PLATE"
  >
    <div
      class="w-full max-w-[500px] md:w-[500px] flex flex-col gap-2.5 pt-[30px]"
    >
      <form
        @submit.prevent="onSubmit(name, description)"
        class="flex flex-col gap-3"
      >
        <div class="flex flex-col">
          <common-input v-model="name" placeholder="Title" />
          <label :class="['text-red-500']" v-if="nameErrors">{{
            nameErrors[0]
          }}</label>
        </div>
        <div class="flex flex-col">
          <common-input v-model="description" placeholder="Description" />
          <label :class="['text-red-500']" v-if="descriptionErrors">{{
            descriptionErrors[0]
          }}</label>
        </div>

        <common-button :disabled="buttonDisabled" class="w-full mb-2">
          <span>Update</span>
        </common-button>
      </form>
    </div>
  </modal-template>
</template>

<style lang="scss" scoped></style>
