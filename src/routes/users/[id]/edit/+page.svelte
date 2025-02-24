<script lang="ts">
	import UserForm from "$lib/forms/UserForm.svelte";
	import type { PageProps } from "../$types";

  const { data: user }: PageProps = $props();
  let errors = $state({}); // here for errors when saving data

  
</script>

<h1>Edit user</h1>
<UserForm user={user} errors={errors} action="/users/{user._id}/edit" />
