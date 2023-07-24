<script>
	import { Text, Password, Btn } from '$lib/components';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				window.location = '/'; // this working instead goto
			}
		}
	});
</script>

<div class="absolute inset-0 flex flex-col justify-center items-center w-full lg:w-1/2 mx-auto">
	<h1 class="text-2xl font-extrabold pb-3 border-b-2 border-dashed border-sky-700 text-sky-700">Login Form</h1>
	<form method="POST" class="flex w-full flex-col gap-3 px-6 py-12 md:w-1/2" use:enhance>
		<Text id="username" name="username" label="Employee ID" required={true} placeholder="your employee id" bind:value={$form.username} error={$errors.username} />
		<Password id="password" label="Password" placeholder="your password" bind:value={$form.password} error={$errors.password} />

		<div class="mt-3 inline-flex">
			<Btn type="submit" title="Login" color="base" center />
		</div>
		{#if $errors.pocketbaseErrors}
			<span class="italic text-xs py-2 text-center bg-yellow-200">{$errors.pocketbaseErrors}</span>
		{/if}
	</form>
</div>
