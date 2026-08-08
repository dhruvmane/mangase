
<script lang="ts">
     import Navbar from "$lib/components/Navbar.svelte";

     // Icons
     import Edit from '$lib/assets/icons/edit.svg'
     import Placeholder from '$lib/assets/icons/profile.svg'

     import { page } from '$app/state'
     import { createUploadThing } from "$lib/modules/utils/uploadthing";
     import { enhance } from "$app/forms";

     let selectedFile = null
     let profilePicURL: string | undefined = $state(page.data.user?.profilePicURL ?? "")
     let profilePicKey: string | undefined = $state(page.data.user?.profilePicKey ?? "")
     let profilePicInputForm: any;

     const {startUpload} = createUploadThing("imageUploader", {
          onClientUploadComplete: (res) => {
               profilePicURL = res[0].ufsUrl
               profilePicKey = res[0].key
               profilePicInputForm.requestSubmit()
          },
          onUploadError(e) {
              console.log(e)
          },
     })

     async function handleFileChange(event: Event): Promise<void> {
          const target = event.target as HTMLInputElement
          if (target && target.files) {
               profilePicInputForm = target.form

               const file = target.files[0]
               selectedFile = file
               profilePicURL = await startUpload([file]).then(data => {
                    if(data) {
                         profilePicKey = data[0].key
                         return data[0].ufsUrl
                    }
               })

          }
     }    

</script>

<svelte:head>
     <title>Settings — Mangase</title>
</svelte:head>

<main class="m-2 p-2 md:max-w-md lg:max-w-lg xl:max-w-xl xl:m-auto h-screen">
     <div>
          <Navbar />
     </div>
     <div class="flex flex-col gap-2">
     <div class="flex flex-col gap-2 p-2 bg-black rounded-mangase-rounded">
          <!-- App Settings -->
          <div class="p-2">
               <h2 class="text-2xl">App Settings</h2>
               <div class="flex flex-col my-2 gap-5 p-2">
                    
                    <div class="flex flex-col gap-2 my-2">
                         <h2>Dark Mode</h2>
                         <p class="text-[12px] text-gray-600">Change modes for easier viewing.</p>
                         <select class="appearance-none focus:ring-0 bg-neutral-950 h-[40px]">
                              <option>Enabled</option>
                              <option>Disabled</option>
                         </select>
                    </div>

                    <div class="flex flex-col gap-2 ">
                         <h2>Themes</h2>
                         <p class="text-[12px] text-gray-600">Change the theme of the website to your liking.</p>
                         <select class="appearance-none focus:ring-0 bg-neutral-950 h-[40px]">
                              <option>Mangase</option>
                         </select>
                    </div>
               </div>


          </div>
          
     </div>

     <div class="flex flex-col gap-5 p-2 bg-black rounded-mangase-rounded">
          <!-- Content Settings -->
          <div class="p-2">
               <h2 class="text-2xl">Content Settings</h2>
               <div class="flex flex-col my-2 gap-5 p-2">
                    <div class="flex flex-col gap-2">
                         <h2>Explicit/NSFW</h2>
                         <p class="text-[12px] text-gray-600">Change how content and artwork related to it is displayed while using the service.</p>
                         <select class="appearance-none focus:ring-0 bg-neutral-950">
                              <option>Partially Covered</option>
                              <option>Completely Hidden</option>
                              <option>Fully Revealed</option>
                         </select>
                    </div>
                    <div class="flex flex-col gap-2">
                         <h2>Scrolling Behavior</h2>
                         <p class="text-[12px] text-gray-600">Change how you navigate chapters.</p>
                         <select class="appearance-none focus:ring-0 bg-neutral-950">
                              <option>Topdown</option>
                              <option>Side Scrolling</option>
                         </select>
                    </div>
                    <div class="flex flex-col gap-2">
                         <h2>Quality / Data Usage</h2>
                         <p class="text-[12px] text-gray-600">Change how much data you can spare.</p>
                         <select class="appearance-none focus:ring-0 bg-neutral-950">
                              <option>Data Saver</option>
                              <option>Highest Quality</option>
                         </select>
                    </div>

               </div>
          </div>
          
          
     </div>
     
     <div class="flex flex-col gap-5 p-2 bg-black rounded-mangase-rounded">
          <!-- Account Settings -->
          <div class="p-2">
               <h2 class="text-2xl" id="account-settings">Account Settings</h2>
               {#if page.data.user}
                    <div class="flex flex-col my-2 gap-5 p-2">
                    
                         <div class="flex flex-col gap-2">
                              <h2 class="text">Account Information</h2>
                              <!-- User Avatar -->
                              <div class="relative m-auto">
                                   <div class="p-2 flex flex-col items-end">
                                        <div class=" bg-neutral-700 size-30 rounded-[999px] flex items-center">
                                             {#if profilePicURL}
                                                  <img class="object-fill rounded-[999px] w-full h-full size-12" src={profilePicURL} alt="profile-pic">
                                             {:else}
                                                  <img class="w-full invert size-12" src={Placeholder} alt="profile-pic">
                                             {/if}
                                        </div>
                                        <label class="p-3 absolute bottom-0 rounded-mangase-rounded translate-x-1 -translate-y-1 bg-neutral-950 hover:bg-neutral-800">
                                                  <form
                                                       action="?/uploadProfilePic"
                                                       method="POST"
                                                       use:enhance={({ formData }) => {
                                                            formData.append('profilePicURL', profilePicURL ?? '');
                                                            formData.append('profilePicKey', profilePicKey ?? '');
                                                            
                                                            return async ({ result, update }) => {
                                                                 await update();
                                                            };
                                                       }}
                                                  >
                                                  <input type="file" class="hidden" onchange={(e) => {handleFileChange(e)}}>
                                                  <img alt="edit" src={Edit} class="invert size-5">
                                             </form>
                                        </label>
                                   </div>
                              </div>
                              <label class="text-[13px] text-neutral-600">
                                   your username
                                   <div class="flex items-center gap-1">
                                        <input type="text" placeholder={page.data.user.name} class="flex-1 bg-none w-full bg-neutral-950 focus:ring-0 border-0">
                                        <button class="bg-neutral-950 p-2.5 rounded text-[13px] my-2">Change</button>
                                   </div>
                              </label>

                              <label class="text-[13px] text-neutral-600">
                                   your email
                                   <div class="flex items-center gap-1">
                                        <input type="email" placeholder={page.data.user.email} class="flex-1 bg-none w-full bg-neutral-950 focus:ring-0 border-0">
                                        <button class="bg-neutral-950 p-2.5 rounded text-[13px] my-2">Change</button>
                                   </div>

                              </label>

                              <label class="text-[13px] text-neutral-600">
                                   your description
                                   <div class="flex flex-col items-center gap-1">
                                        <textarea placeholder={page.data.user.description} class="flex-1 bg-none w-full bg-neutral-950 focus:ring-0 border-0"></textarea>
                                        <button class="bg-neutral-950 p-2.5 rounded text-[13px] w-full my-2">Change</button>
                                   </div>

                              </label>

                              <button class="bg-neutral-950 p-2 rounded text-[13px] my-2">Change Password</button>
                         </div>
                    

                         <div class="flex flex-col gap-2">
                              <h2 class="text">Account Status</h2>
                              <p class="text-[12px] text-gray-600">Change whether other users can see your activity, your followed list and reviews.</p>
                              <select class="appearance-none focus:ring-0 bg-neutral-950">
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
                              <form method="POST">
                                   <div class="my-2 flex gap-1 text-[12px]">
                                        <button formaction="?/logout" class="text-center py-2 px-4 flex-1 rounded bg-neutral-800">Log Out</button>
                                        <button class="text-center py-2 px-4 flex-1 rounded bg-red-700">Delete Account</button>
                                        <button class="text-center py-2 px-4 flex-1 rounded bg-indigo-900">Disable Account</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               {:else}
                    <div class="p-2">
                         <p class="text-neutral-600">To view Account Settings, <a href="/login" class="underline">Login</a> or <a href="/register" class="underline">Create an Account</a>.</p>
                    </div>
               {/if}
          </div>
     </div>
     </div>
</main>

<style>
     * {
          scrollbar-width: none;
     }
</style>
