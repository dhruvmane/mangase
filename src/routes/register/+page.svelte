<script lang=ts>
     import { goto } from "$app/navigation";
    import Navbar from "$lib/components/Navbar.svelte";
     
     let name: string = $state("")
     let date: string = $state("")
     let email: string = $state("");
     let password: string = $state("");
     let confirmPassword: string = $state("");
     let passwordsMatch = $state(false)

     $effect(() => {
          if (confirmPassword === password) {
               passwordsMatch = true
          } else {
               passwordsMatch = false
          }
     })


</script>
<svelte:head>
     <title>Register — Mangase</title>
</svelte:head>

<div class="m-2 p-2">
     <Navbar />
</div>
<div class="mx-4 p-4 bg-black rounded-2xl">
     <form class="flex flex-col gap-2 my-12 text-neutral-400" method="POST">
          <label class="capitalize">
               enter username
               <input type="text" name="name" bind:value={name} class="bg-neutral-950 rounded border-0 focus:ring-0 w-full">
          </label>
          <label class="capitalize">
               enter date of birth
               <input type="date" name="date" bind:value={date} class="bg-neutral-950 rounded border-0 focus:ring-0 w-full">
          </label>
          <label class="capitalize">
               enter email
               <input type="email" name="email" bind:value={email} class="bg-neutral-950 rounded border-0 focus:ring-0 w-full">
          </label>
          
          <label class="capitalize flex flex-col gap-1">
               enter password
               {#if passwordsMatch === true}
                    <input type="password" name="password" bind:value={password} class="bg-neutral-950 rounded border-0 focus:ring-0 w-full">
                    {:else}
                    <input type="password" name="password" bind:value={password} class="bg-neutral-950 rounded border-red-600 border-2 focus:ring-0 w-full">
                    {/if}
               </label>
               
               <label class="capitalize flex flex-col gap-1">
                    confirm password
               {#if passwordsMatch === true}
                    <input type="password" name="comparePlainPassword" bind:value={confirmPassword} class="bg-neutral-950 rounded border-0 focus:ring-0 w-full">
               {:else}
                    <input type="password" name="comparePlainPassword" bind:value={confirmPassword} class="bg-neutral-950 border-red-600 rounded border-2 focus:ring-0 w-full">
                    <p class="text-[13px] text-red-900">Passwords don't match!</p>
               {/if}
          </label>
          <button class="p-2 bg-neutral-900 rounded w-full" type="submit">Create Account</button>
     </form>
     
     <p class="text-center text-[12px] text-neutral-600 my-2">Already have an account? <a href="/login" class="underline">Login here.</a></p>

</div>