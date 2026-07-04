<script>
     // Icons
     import Link from '$lib/assets/icons/link.svg'

     const links = [
          { label: 'About Us', href: '/about-us' },
          { label: 'Source Code', href: 'https://github.com/dhruvmane/mangase' },
     ];
</script>

<div class="border-4 my-2 border-black bg-black rounded-2xl p-2 flex flex-col gap-1 md:max-w-md lg:max-w-lg xl:max-w-xl justify-self-center w-full">
     <div class="">
          <h1 class="flex items-center gap-2">Mangase —  <span class="text-[20px]">Links</span></h1>
     </div>
     <menu class="px-5">
          {#each links as link}
               <li class="relative pl-5 py-1.5
                          before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2
                          before:w-4 before:h-0.5 before:bg-neutral-600
                          after:content-[''] after:absolute after:left-0 after:top-0 after:bottom-0
                          after:w-0.5 after:bg-neutral-600
                          last:after:bottom-1/2">
                    <a href={link.href} target="_blank" rel="noopener noreferrer"
                        class="text-neutral-200 hover:text-white font-medium flex items-center gap-1">
                       {link.label} <img alt="link" src={Link} class="invert size-5">
                    </a>
               </li>
          {/each}     
     </menu>
</div>