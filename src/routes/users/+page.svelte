<script lang="ts">
  import type { PageProps } from './$types';
  const { data }: PageProps = $props();

  async function deleteUser(_id: string) {
    const res = await fetch(`/api/users/${_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res);
  }

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
      <li>
        <div class="item">
          <div>
            <a href="/users/{user._id}">{user.name}</a>
          </div>
          <div>
            <a href="/users/{user._id}/edit" >🖉</a>
            <button type="button" onclick={() => deleteUser(user._id)}>🗑</button>
          </div>
        </div>
        
      </li>
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
  .item {
    display: flex;
    justify-content: space-between;
  }
</style>