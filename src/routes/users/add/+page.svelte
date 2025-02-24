<script lang="ts">
  import UserForm from "$lib/forms/UserForm.svelte";
	import { UserHelper } from "$lib/interfaces";

  const user = UserHelper.blankUser();
  let errors = $state({}); // here for errors when saving data

</script>
<h1>New user</h1>
<UserForm user={user} action="/users/add" errors={errors}/>