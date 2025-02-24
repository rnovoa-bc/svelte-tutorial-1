<script lang=ts>

  let { user, action, errors } = $props();
  let validationErrors = $state<{name?: string; email?:string; uid?: string; password?: string;}>({});
  console.log(user)
  /**
   * Form data validation before submit
   */
  function validateForm() {
    validationErrors = {}; // reset all errors
    // trim all text fields
    for (let [key, value] of Object.entries(user as Record<string, string>)) {
      user[key] = value.trim();
    }
    // validate blank values
    if (user.name === '') {
      validationErrors['name'] = 'required';
    }
    if (user.email === '') {
      validationErrors['email'] = 'required';
    }
    if (user.uid === '') {
      validationErrors['uid'] = 'required';
    }
    if (user.password === '') {
      validationErrors['password'] = 'required';
    }
    // validate email
    if (user.email.length && /[a-z]@[a-z]\.[a-z]/.test(user.email)) {
      validationErrors['email'] = 'invalid_email';
    }
    // validate password complexity
    if (user.password.length && user.password.length < 8) {
      validationErrors['password'] = 'not_valid password';
    }
    if (JSON.stringify(validationErrors) === JSON.stringify({})) {
      const result = document.forms.namedItem('userForm')?.submit();
      console.log(result);
    }
      
  }

</script>
<div class="form">

  {#if errors}
    Show submit errors here
  {/if}

  <form method="POST" action={action} name="userForm">
    <input type="hidden" name="_id" bind:value={user._id}>
    <div>
      <label for="name">Name</label>
      <input type="text" name="name" bind:value={user.name} required>
      {#if validationErrors['name']}
        <div class="error">{validationErrors['name']}</div>
      {/if}
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" bind:value={user.email} required>
      {#if validationErrors['email']}
        <div class="error">{validationErrors['email']}</div>
      {/if}
    </div>
    <div>
      <label for="uid">Username</label>
      <input type="text" name="uid" bind:value={user.uid} required>
      {#if validationErrors['uid']}
        <div class="error">{validationErrors['uid']}</div>
      {/if}
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" name="password" bind:value={user.password} required>
      {#if validationErrors['password']}
        <div class="error">{validationErrors['password']}</div>
      {/if}
    </div>
    <div>
      <button type="button" onclick={validateForm} >Save</button>
    </div>  
  </form>
</div>

<style>
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 3rem auto;
  }
  .error {
    color: red;
  }
</style>