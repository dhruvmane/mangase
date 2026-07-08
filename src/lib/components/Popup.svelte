<!-- PopupMenu.svelte -->
<script lang="ts">
  
  interface MenuItem {
    label: string;
    action?: () => void;
  }

  interface Menu {
    title: string;
    items: MenuItem[];
  }

  let menu: Menu = $props();
  let open: boolean = false;

  function clickOutside(node: HTMLElement) {
    function handleClick(event: MouseEvent) {
      if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
        open = false;
      }
    }
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  function handleItemClick(item: MenuItem) {
    item.action?.();
    open = false;
  }
</script>

<div class="relative inline-block">
  {#if open}
    <div
      use:clickOutside
      class="absolute top-full left-0 mt-1 min-w-[180px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
      <h3 class="m-0 px-3 py-2.5 border-b border-gray-100 text-sm font-medium">
        {menu.title}
      </h3>
      <ul class="m-0 p-1 list-none">
        {#each menu.items as item}
          <li>
            <button
              onclick={() => handleItemClick(item)}
              class="w-full text-left px-3 py-2 bg-transparent border-none rounded cursor-pointer hover:bg-gray-100"
            >
              {item.label}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>