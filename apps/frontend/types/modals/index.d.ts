import type { ShallowRef, ComputedRef } from "vue";

export type Modal = {
  inject: string;
  id: string;
  state: ShallowRef<boolean>;
  metadata: ComputedRef<T>;
  setState(_state: boolean, store?: Record<string, unknown>): void;
  getStoreProperty<T>(key: string, defaultValue?: T): ComputedRef<T>;
  getModalMetadata<T>(): ComputedRef<T>;
  setStoreProperty(key: string, value: unknown): void;
};

export type ModalTypeToExpose = {
  modal: Modal;
  modalId: string;
};
