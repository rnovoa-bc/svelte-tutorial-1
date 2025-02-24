<script lang="ts">

  import type { PageProps } from './$types';
  const { data: user }: PageProps = $props();
</script>


<h1>User detail</h1>
{#await user}
  <p>Loading user...</p>
{:then}
  Name: {user.name}<br>
  Email: {user.email}<br>
  UID: {user.uid}<br>
  PWD: {user.password}<br>
  <br>
  <a href="/users">&lt;- Back</a>
  |
  <a href="/users/{user._id}/edit">Edit</a>
{/await}

