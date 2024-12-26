<template>
  <div
    :class="[
      'flex items-center justify-between',
      'bg-gray-200 px-5 py-3 rounded-md',
      'border-2 border-gray-500',
    ]"
  >
    <div class="flex items-center gap-3">
      <common-checkbox
        :model-value="status === TaskStatus.COMPLETED"
        @update:modelValue="
          (value) =>
            emit(
              'update:status',
              value ? TaskStatus.COMPLETED : TaskStatus.ACTIVE
            )
        "
      />
      <p class="text-lg capitalize font-sherif">{{ name }}</p>
    </div>
    <div class="flex items-center gap-2">
      <button @click="modalTasksUpdate.setState(true, { task: props })">
        <icon-wrapper>
          <icons-pencil />
        </icon-wrapper>
      </button>
      <button @click="tasksStore.deleteTask(props.id)">
        <icon-wrapper width="30" height="30">
          <icons-trash />
        </icon-wrapper>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TaskStatus, type TaskDTO } from "@dapp/dto/dto.task";
import { getModalById } from "~/components/modal";
import { TASKS_UPDATE_PLATE } from "~/constants/constants.plates";

const modalTasksUpdate = getModalById(TASKS_UPDATE_PLATE)!;

const tasksStore = useTasks();

export interface GlobalTaskProps extends TaskDTO {}

export interface GlobalTaskEmits {
  (e: "update:status", status: TaskStatus): void;
}
const emit = defineEmits<GlobalTaskEmits>();
const props = defineProps<GlobalTaskProps>();
</script>

<style lang="scss" scoped></style>
