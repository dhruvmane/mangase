<script lang=ts>
     import { goto } from "$app/navigation";
     
     let name: string = $state("")
     let email: string = $state("");
     let password: string = $state("");

     async function signUp() {
     }

</script>

<div class="m-4 p-4 bg-black rounded-2xl">
     <form class="flex flex-col gap-2 my-12 text-neutral-400">
          <label class="capitalize">
               enter username
               <input type="email" bind:value={name} class="bg-neutral-950 rounded border-0 focus:ring-0 w-full">
          </label>

          <label class="capitalize">
               enter email
               <input type="email" bind:value={email} class="bg-neutral-950 rounded border-0 focus:ring-0 w-full">
          </label>
          
          <label class="capitalize flex flex-col gap-1">
               enter password
               <input type="password" class="bg-neutral-950 rounded border-0 focus:ring-0 w-full">
          </label>

          <label class="capitalize flex flex-col gap-1">
               confirm password
               <input type="password" bind:value={password} class="bg-neutral-950 rounded border-0 focus:ring-0 w-full">
          </label>
     </form>
     
     <button class="p-2 bg-neutral-900 rounded w-full" onclick={() => {signUp()}}>Create Account</button>
     <p class="text-center text-[12px] text-neutral-600 my-2">Already have an account? <a href="/login" class="underline">Login here.</a></p>

</div>