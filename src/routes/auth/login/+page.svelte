<script>
	import { Text, Password } from '$lib/components';
</script>

<div class="flex flex-col justify-center items-center w-full lg:w-1/2 mx-auto">
	<h1 class="text-2xl font-extrabold pb-3 border-b-2 border-dashed border-sky-700 text-sky-700">Login Form</h1>
	<form action="?/login">
		<Text id="employeeId" name="employeeId" label="Employee ID" required={true} placeholder="your employee id" />
		<Password id="password" label="Password" placeholder="your password" />
		<button type="submit">Login</button>
	</form>
</div>

<style lang="scss">
	form {
		@apply flex w-full flex-col gap-2 px-6 py-12 md:w-1/2;

		button {
			@apply mt-4 self-center bg-sky-300 px-6 py-2 font-bold;
		}
	}
</style>
