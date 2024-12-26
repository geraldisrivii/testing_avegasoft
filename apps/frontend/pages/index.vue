<template>
  <client-only>
    <main class="tasks container pt-10">
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-3xl font-bold font-sherif">
          Hello, {{ authData?.user.email }}
        </h1>
        <button @click="authStore.logout">
          <icon-wrapper color="red">
            <icons-logout />
          </icon-wrapper>
        </button>
      </div>
      <div class="flex items-center justify-between mb-6">
        <common-button
          size="sm"
          variant="primary"
          @click="modal.setState(true)"
        >
          <span>create task</span>
        </common-button>
      </div>
      <div class="flex flex-col gap-2">
        <global-task
          v-for="(task, index) in tasks"
          :key="task.id"
          v-bind="task"
          :user="authData!.user"
          @update:status="
            (status) => tasksStore.updateTask(task.id, { status })
          "
        />
      </div>
    </main>
  </client-only>
</template>

<script setup lang="ts">
import { getModalById } from "~/components/modal";
import { TASKS_CREATE_PLATE } from "~/constants/constants.plates";
import middlewaresAuth from "~/middlewares/middlewares.auth";

// middlewares

// global
const authStore = useAuthData();
const { authData } = storeToRefs(authStore);

const tasksStore = useTasks();
const { tasks } = storeToRefs(tasksStore);

const modal = getModalById(TASKS_CREATE_PLATE)!;

// hooks
onMounted(async () => {
  await tasksStore.fetchTasks();
});

definePageMeta({ middleware: [middlewaresAuth] });
</script>

<style scoped></style>
