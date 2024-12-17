
<script>
    let val = "to be replaced";
</script>



<input 
  class="relative bg-red-800 w-full px-[0.5em] focus:outline-none focus:border-none border-none outline-none 
         custom-caret"
  type="text" 
  bind:value={val}
  style="
    caret-color: var(--caret-color, white);
    --caret-width: 3px;
  "
>

<style>
  .custom-caret {
    caret-width: var(--caret-width, 1px);
  }
</style>