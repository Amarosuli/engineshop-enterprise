<script>
	export let id = Math.random().toString();
	export let name = 'text';
	export let error = '';
	export let label = 'label.file';
	export let required = false;
	export let accept = '*';
	export let value = null;

	let input;
	let image = undefined;
	let showImage = false;
	let isNotEmpty = false;

	const onChange = (e) => {
		if (!e || !e.target) {
			return;
		}

		if (e.target.value) {
			isNotEmpty = true;
		} else {
			isNotEmpty = false;
		}

		const file = input.files[0];
		if (file) {
			showImage = true;

			const reader = new FileReader();
			reader.addEventListener('load', function () {
				image.setAttribute('src', reader.result);
			});
			reader.readAsDataURL(file);
			return;
		}

		showImage = false;
	};
</script>

<div>
	<label for={id}>
		<span>{label}</span>
	</label>
	<input type="file" class:!border-sky-500={isNotEmpty} {id} {name} {accept} on:change={onChange} {required} {value} bind:this={input} />
	<div class="image_preview">
		{#if showImage}
			<img bind:this={image} src="" alt="Preview" />
		{:else}
			<span>Image Preview</span>
		{/if}
	</div>

	<p class="mt-1 text-xs text-gray-500" id="file_input_help">type allowed {accept}</p>
	{#if error}
		<span>{error}</span>
	{/if}

	<!-- <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"> -->
</div>

<style>
	div {
		@apply flex w-full flex-col space-y-1;
	}
	div > span {
		@apply self-end text-sm text-red-600;
	}
	div .image_preview {
		@apply mt-4 flex h-max w-full items-center justify-center;
	}
	div .image_preview span {
		@apply flex h-[100px] w-full items-center justify-center bg-slate-300 font-bold text-slate-600;
	}
	label {
		@apply inline-block text-sm font-semibold text-slate-600;
	}
	label > span {
		@apply self-start tracking-widest;
	}
	input {
		@apply block h-10 w-full cursor-pointer border-b border-slate-200 bg-white py-[4.5px] pl-[4.5px] text-sm text-slate-700 transition-colors ease-out hover:border-sky-200 hover:bg-slate-200 focus:border-sky-500 focus:bg-slate-50 focus:outline-none;
	}
</style>
