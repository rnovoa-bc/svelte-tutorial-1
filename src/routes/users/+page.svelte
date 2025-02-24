<script lang="ts">
  import type { PageProps } from './$types';
  const { data }: PageProps = $props();

</script>

<div class="title">
  <div><h1>User list</h1></div>
  <div><a href="/users/add">+ Add user</a></div>
</div>

{#await data.users}
  <p>Loading users...</p>
{:then}
  <ul>
    {#each data.users as user}
      <li><a href="/users/{user._id}">{user.name}</a></li>
    {/each}
  </ul>
{/await}

<style>
  .title {
    display: flex;
    flex-direction: row;
    
    justify-content: space-between;
    align-items: center;
  }
</style>