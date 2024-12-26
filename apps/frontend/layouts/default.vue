<template>
  <div class="default">
    <slot />

    <lazy-client-only>
      <modal-container />
      <safe-teleport to="#modal-container">
        <plates-warning />
        <plates-tasks-create />
        <plates-tasks-update />
      </safe-teleport>
    </lazy-client-only>
  </div>
</template>

<script setup lang="ts">
import modalContainer from "~/components/modal/modal.container.vue";
</script>

<style lang="sccs" scoped></style>
