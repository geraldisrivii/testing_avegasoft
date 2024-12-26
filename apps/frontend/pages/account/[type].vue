<template>
  <main class="h-screen flex items-center justify-center">
    <section class="my-auto container">
      <h1 :class="['text-6xl text-center font-bold', 'font-sherif mb-[60px]']">
        {{ route.params.type === "login" ? "Login" : "Register" }}
      </h1>
      <form @submit.prevent="onSubmit(email, password)">
        <div :class="['flex flex-col gap-2 mb-8']">
          <div class="flex flex-col">
            <common-input v-model="email" placeholder="Email" />
            <label :class="['text-red-500']" v-if="emailErrors">{{
              emailErrors[0]
            }}</label>
          </div>
          <div class="flex flex-col">
            <common-input v-model="password" placeholder="Pasword" />
            <label :class="['text-red-500']" v-if="passwordErrors">{{
              passwordErrors[0]
            }}</label>
          </div>
        </div>
        <common-button :disabled="buttonDisabled" class="w-full mb-2">
          <span>{{
            route.params.type === "login" ? "Login" : "Register"
          }}</span>
        </common-button>
      </form>
      <router-link
        :to="`/account/${route.params.type === 'login' ? 'register' : 'login'}`"
        class="text-center block text-gray-700 underline"
        >{{
          route.params.type === "register"
            ? "Already have an account"
            : "Don't have an account"
        }}</router-link
      >
    </section>
  </main>
</template>

<script setup lang="ts">
import * as yup from "yup";

const router = useRouter();

const route = useRoute();

const schema = {
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(8).max(20),
};

const { value: email, errors: emailErrors } = useField<string>(
  "email",
  schema.email
);

const { value: password, errors: passwordErrors } = useField<string>(
  "password",
  schema.password
);

const authStore = useAuthData();

const buttonDisabled = computed(() => {
  return (
    !email.value ||
    !password.value ||
    emailErrors.value.length ||
    passwordErrors.value.length
  );
});

async function onSubmit(email: string, password: string) {
  if (route.params.type === "register") {
    await authStore.register({ email, password });
  } else {
    await authStore.login({ email, password });
  }
  router.push("/");
}
</script>

<style lang="scss" scoped></style>
