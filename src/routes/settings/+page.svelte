
<script>
     import Navbar from "$lib/components/Navbar.svelte";
</script>

<main class="p-2 flex flex-col gap-2 md:max-w-md lg:max-w-lg xl:max-w-xl m-auto w-full">
     <Navbar />
     <div class="flex flex-col gap-2 p-2 bg-black rounded-2xl">
          <!-- App Settings -->
          <div class="p-2">
               <h2 class="text-2xl">App Settings</h2>
               <div class="flex flex-col my-2 gap-5 p-2">
                    
                    <div class="flex flex-col gap-2 my-2">
                         <h2>Dark Mode</h2>
                         <p class="text-[12px] text-gray-600">Change modes for easier viewing.</p>
                         <select class="appearance-none bg-neutral-950 h-[40px]">
                              <option>Enabled</option>
                              <option>Disabled</option>
                         </select>
                    </div>

                    <div class="flex flex-col gap-2 ">
                         <h2>Themes</h2>
                         <p class="text-[12px] text-gray-600">Change the theme of the website to your liking.</p>
                         <select class="appearance-none bg-neutral-950 h-[40px]">
                              <option>Mangase</option>
                         </select>
                    </div>
               </div>


          </div>
          
     </div>

     <div class="flex flex-col gap-5 p-2 bg-black rounded-2xl">
          <!-- Content Settings -->
          <div class="p-2">
               <h2 class="text-2xl">Content Settings</h2>
               <div class="flex flex-col my-2 gap-5 p-2">
                    <div class="flex flex-col gap-2">
                         <h2>Explicit/NSFW</h2>
                         <p class="text-[12px] text-gray-600">Change how content and artwork related to it is displayed while using the service.</p>
                         <select class="appearance-none bg-neutral-950">
                              <option>Partially Covered</option>
                              <option>Completely Hidden</option>
                              <option>Fully Revealed</option>
                         </select>
                    </div>
                    <div class="flex flex-col gap-2">
                         <h2>Scrolling Behavior</h2>
                         <p class="text-[12px] text-gray-600">Change how you navigate chapters.</p>
                         <select class="appearance-none bg-neutral-950">
                              <option>Topdown</option>
                              <option>Side Scrolling</option>
                         </select>
                    </div>

               </div>
          </div>
          
          
     </div>
     
     <div class="flex flex-col gap-5 p-2 bg-black rounded-2xl">
          <!-- Account Settings -->
          <div class="p-2">
               <h2 class="text-2xl">Account Settings</h2>
               <div class="flex flex-col my-2 gap-5 p-2">
                    
                    <div class="flex flex-col gap-2">
                         <h2 class="text">Account Information</h2>
                         <label class="text-[13px] text-neutral-600">
                              your username
                              <div class="flex items-center gap-1">
                                   <input type="email" class="flex-1 bg-none w-full bg-neutral-950 focus:ring-0 border-0">
                                   <button class="bg-neutral-950 p-2.5 rounded text-[13px] my-2">Change</button>
                              </div>
                              
                         </label>
                         <label class="text-[13px] text-neutral-600">
                              your email
                              <div class="flex items-center gap-1">
                                   <input type="email" class="flex-1 bg-none w-full bg-neutral-950 focus:ring-0 border-0">
                                   <button class="bg-neutral-950 p-2.5 rounded text-[13px] my-2">Change</button>
                              </div>

                         </label>
                         <button class="bg-neutral-950 p-2 rounded text-[13px] my-2">Change Password</button>
                    </div>
                    

                    <div class="flex flex-col gap-2">
                         <h2 class="text">Account Status</h2>
                         <p class="text-[12px] text-gray-600">Change whether other users can see your activity, your followed list and reviews.</p>
                         <select class="appearance-none bg-neutral-950">
                              <option>Public</option>
                              <option>Partial</option>
                              <option>Private</option>
                         </select>

                         <div class="flex flex-col my-2">
                              <label class="flex items-center">
                                   Manga List
                                   <div class="flex gap-3 items-center ml-auto">
                                        <p>Visible</p>
                                        <input type="checkbox" class="">
                                   </div>

                              </label>

                              <label class="flex items-center">
                                   Your Reviews
                                   <div class="flex gap-3 items-center ml-auto">
                                        <p>Visible</p>
                                        <input type="checkbox" class="">
                                   </div>
                              </label>

                              <label class="flex items-center">
                                   Your Comments
                                   <div class="flex gap-3 items-center ml-auto">
                                        <p>Visible</p>
                                        <input type="checkbox" class="">
                                   </div>
                              </label>
                         </div>
                    </div>

                    

                    <div class="my-2 flex flex-col gap-1">
                         <h2 class="text">Actions</h2>
                         <p class="text-[12px] text-gray-600">Take action related to your account.</p>
                         <div class="my-2 flex gap-1 text-[12px]">
                              <button class="text-center py-2 px-4 flex-1 rounded bg-red-700">Delete Account</button>
                              <button class="text-center py-2 px-4 flex-1 rounded bg-indigo-900">Disable Account</button>
                         </div>
                    </div>
                    


               </div>
          </div>
     </div>
</main>

<style>
     * {
          scrollbar-width: none;
     }
</style>
