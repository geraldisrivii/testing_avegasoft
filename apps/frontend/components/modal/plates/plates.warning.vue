<script setup lang="ts">
import { getModalById } from "~/components/modal";
import { WARNING_PLATE } from "~/constants/constants.plates";

const modal = getModalById(WARNING_PLATE)!;
</script>

<template>
  <modal-template align-title="center" :id="WARNING_PLATE">
    <div
      class="w-full max-w-[500px] md:w-[500px] flex flex-col gap-2.5 pt-[30px]"
    >
      <icon-wrapper class="mx-auto mb-5" width="140" height="140">
        <icons-error />
      </icon-wrapper>
      <p class="text-center font-bold text-5xl font-sherif">
        {{ modal.getStoreProperty("message").value }}
      </p>
      <p class="text-center text-lg text-gray-600">
        {{ "Error - " + modal.getStoreProperty("code").value }}
      </p>
    </div>
  </modal-template>
</template>

<style lang="scss" scoped></style>
