<script>
	import { Text, Password, Button, Form } from '$lib/components';
	import { superForm } from 'sveltekit-superforms/client';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;

	const urlFrom = $page.url.searchParams.get('urlFrom');
	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				goto(urlFrom, { invalidateAll: true });
			}
		}
	});
</script>

<div class="login_root">
	<h1 class="login_title">Login Form</h1>
	<div class="login_body">
		<Form.Root id="loginForm" method="POST" {enhance}>
			<Form.Item>
				<Text id="username" name="username" label="Employee ID" required={true} placeholder="your employee id" bind:value={$form.username} error={$errors.username} />
				<Password id="password" label="Password" placeholder="your password" bind:value={$form.password} error={$errors.password} />
				<Button.Submit title="Login" />
				<Form.Error error={$errors.pocketbaseErrors} />
			</Form.Item>
		</Form.Root>
	</div>
</div>

<style lang="postcss">
	.login_root {
		@apply absolute inset-0 mx-auto flex w-full flex-col items-center justify-center xl:w-1/2;
	}
	.login_title {
		@apply border-b-2 border-dashed border-sky-700 pb-3 text-2xl font-extrabold text-sky-700;
	}
	.login_body {
		@apply flex w-full flex-col gap-3 px-6 py-12 md:w-1/2;
	}
</style>
