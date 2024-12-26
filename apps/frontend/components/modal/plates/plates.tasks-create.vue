<script setup lang="ts">
import { getModalById } from "~/components/modal";
import { TASKS_CREATE_PLATE } from "~/constants/constants.plates";
import * as yup from "yup";

const modal = getModalById(TASKS_CREATE_PLATE)!;

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

const onSubmit = (name: string, description: string) => {
  modal.setState(false);
  taskStore.createTask({ name, description });
};
</script>

<template>
  <modal-template
    align-title="center"
    title="Create Task"
    :id="TASKS_CREATE_PLATE"
  >
    <div
      class="w-full max-w-[500px] md:w-[500px] flex flex-col gap-2.5 pt-[30px]"
    >
      <form
        @submit.prevent="onSubmit(name, description)"
        class="flex flex-col gap-3"
      >
        <div class="flex flex-col">
          <common-input name="name" v-model="name" placeholder="Title" />
          <label :class="['text-red-500']" v-if="nameErrors">{{
            nameErrors[0]
          }}</label>
        </div>
        <div class="flex flex-col">
          <common-input
            name="description"
            v-model="description"
            placeholder="Description"
          />
          <label :class="['text-red-500']" v-if="descriptionErrors">{{
            descriptionErrors[0]
          }}</label>
        </div>

        <common-button
          :disabled="!name || !description || nameErrors.length || descriptionErrors.length"
          class="w-full mb-2"
        >
          <span>Create</span>
        </common-button>
      </form>
    </div>
  </modal-template>
</template>

<style lang="scss" scoped></style>
