# Integrating TypeScript with Inertia.js and Vue.js

Why use Typescript?

If you are like me and have been web projecting in Laravel using Inertia and Vue you might think adding Typescript is a bit of overkill and too much of a learning curve. Why add another layer of complexity?

But adding Typescript to your project can be a great way to add some structure to your code and make it easier to maintain. It can also help you catch bugs before they happen.

Luckily, Typescript plays nicely with Vue 3 and adding it to your Inertia/Vue project is pretty easy. In this post, I will show you how to add Typescript to your Inertia/Vue project and how to use it.
Setup

Before getting started, you will need to have the following installed:

    Node.js
    Yarn/NPM/PNPM (I prefer Yarn which is what I will be using in this post)
    A new Laravel project with Inertia and Vue installed (You can use Jetstream if you want to make it super easy)

    Small note: If you are using VSCode, I highly recommend installing the Volar extension. It will make working with Typescript in Vue much easier. Here are the links to that extension: Vue.volar > Vue.vscode-typescript-vue-plugin

Lets start by creating a new Laravel project.

composer create-project laravel/laravel:^10.0 ts-inertia-vue && cd ts-inertia-vue

Next, we can install Jetstream. Alternatively, you could use Breeze or you can install Inertia and Vue manually if you want to.

composer require inertiajs/inertia-laravel

composer require laravel/breeze
php artisan breeze:install --dark




Install the needed dependencies.

php artisan jetstream:install inertia


php artisan inertia:middleware


Now lets setup a basic tsconfig.json file.



And can add the following to it.

{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowJs": true,
    "lib": ["esnext", "dom"],
    "types": ["@types/node", "@types/ziggy-js"],
    "paths": {
      "@/*": ["./resources/js/*"]
    },
    "outDir": "./public/build/assets"
  },
  "typeRoots": ["./node_modules/@types", "resources/js/types"],
  "include": [
    "resources/js/**/*.ts",
    "resources/js/**/*.d.ts",
    "resources/js/**/*.vue"
  ],
  "exclude": ["node_modules", "public"]
}

Now lets install the needed dependencies for npm/yarn.

pnpm i

Add some extra dependencies for Typescript

pnpm add -D @types/lodash @types/node @types/ziggy-js typescript ziggy-js

Now we are pretty close to being ready to start using Typescript. I like to create a resources/js/types directory and add a few files to it. The files could be named anything you want, but I like to name them vue-shim.d.ts, inertia.d.ts, and env.d.ts.

inertia.d.ts - is where we will add the types for our Inertia props. This will allow us to use the inertia namespace in our components and have access to the props that are passed to the component.

env.d.ts - is where you can list out any environment variables you want to use in your project. Making them easier to find and use in your code base.

mkdir resources/js/types && touch resources/js/types/vue-shim.d.ts

Can add the following to vue-shim.d.ts.

declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

And the following to inertia.d.ts.

touch resources/js/types/inertia.d.ts

export {};
declare global {
  export namespace inertia {
    export interface Props {
      user: {
        id: number;
        name: string;
        email: string;
        created_at: Date;
        updated_at: Date;
      };
      jetstream: {
        [key: string]: boolean;
      };
      errorBags: unknown;
      errors: unknown;
    }
  }
}

Here you can create a env.d.ts file and add any environment variables you want to use in your project.

touch resources/js/types/env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  // ... could include environment variables

  /** Stripe API Key */
  readonly VITE_STRIPE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

Alright lets update the resources/js/Pages/Welcome.vue

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import route from 'ziggy-js'
import { Head, Link, usePage } from '@inertiajs/vue3'

defineProps({
  canLogin: Boolean as PropType<boolean>,
  canRegister: Boolean as PropType<boolean>,
  laravelVersion: String as PropType<string>,
  phpVersion: String as PropType<string>,
})

const user = computed(() => usePage().props?.user)
</script>

<template>
  <Head title="Welcome" />

  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0"
  >
    <div v-if="canLogin" class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
      <Link
        v-if="user"
        :href="route('dashboard')"
        class="text-sm text-gray-700 dark:text-gray-500 underline"
      >
        Dashboard
      </Link>

      <template v-else>
        <Link
          :href="route('login')"
          class="text-sm text-gray-700 dark:text-gray-500 underline"
        >
          Log in
        </Link>

        <Link
          v-if="canRegister"
          :href="route('register')"
          class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
        >
          Register
        </Link>
      </template>
    </div>
    <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
      <div class="flex justify-center mt-4 sm:items-center sm:justify-between">
        <div
          class="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0"
        >
          Laravel v{{ laravelVersion }} (PHP v{{ phpVersion }})
        </div>
      </div>
    </div>
  </div>
</template>

And that is it. You should now be able to use Typescript in your Jetstream project!

A few things you will now notice when using the <Link> component I can strongly type my expected inertia props. Which makes it easier to define things like what is a User, which you can define a type or interface for. To learn more about that checkout my Generating TypeScript Interfaces & Types from Laravel Models to learn how you can easily generate types for your models.

TLDR: A link to the example repo: ts-inertia-vue
Note:

I recently updated this post to upgrade to Inertia.js v1.0 not much has changed from this post but how you would previously use the usePage has changed. You can read more about that in the Inertia.js Upgrade Guide.

There does not seem like an easy way to cast the props to a type like before, but since the usePage is now a method you could define a type for it in theory. I have not tried this yet, but I will update this post if I find a way to do it.