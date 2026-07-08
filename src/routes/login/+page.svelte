<script>

</script>

<div class="m-4 p-4 bg-black rounded-2xl">
     <form class="flex flex-col gap-2 my-12 text-neutral-400" method="POST">
          <label>
               Enter Username/Email
               <input type="text" name="nameOrEmail" class="bg-neutral-950 rounded border-0 focus:ring-0 w-full">
          </label>
          <label class="flex flex-col gap-1">
               Enter Password
               <input type="password" name="password" class="bg-neutral-950 rounded border-0 focus:ring-0 w-full">
               <button class="text-left text-[12px] text-neutral-500">Forgot Password?</button>
          </label>
          <button class="p-2 bg-neutral-900 rounded w-full" type="submit">Login</button>
     </form>
     
     <p class="text-center text-[12px] text-neutral-600 my-2">new user? <a href="/register" class="underline">Register here.</a></p>

</div>