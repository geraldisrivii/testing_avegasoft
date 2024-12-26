<script setup lang="ts">
export type CommonButtonVariant =
  | "primary"
  | "outline"
  | "rounded"
  | "rounded-dark";

export type CommonButtonSize = "sm" | "md";

export interface CommonButtonProps {
  variant?: CommonButtonVariant;
  size?: CommonButtonSize;
}

const props = withDefaults(defineProps<CommonButtonProps>(), {
  variant: "primary",
  size: "md",
});
</script>

<template>
  <button
    :class="[
      `button_${props.variant} button text-center`,
      'rounded-md py-4 px-6 min-w-24',
      `button_${props.variant}_${props.size}`,
    ]"
  >
    <span
      :class="[
        'text-lg text-center',
        'flex justify-center items-center font-medium',
      ]"
    >
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  &:disabled {
    @apply cursor-not-allowed bg-opacity-80 bg-gray-800;
  }
  &_primary {
    @apply bg-blue-700 text-white;

    &_sm {
      @apply py-2 px-4;
    }
  }

  &_outline {
    @apply border border-b-gray text-white;
  }

  &_rounded {
    @apply bg-blue-700 rounded-full;
  }
}
</style>
