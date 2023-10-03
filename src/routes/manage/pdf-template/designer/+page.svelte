<script>
	import { superForm, defaultValues } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Designer, BLANK_PDF } from '@pdfme/ui';

	import { Button, Form, File, Text } from '$lib/components';

	let stateOnSave = 'Save';
	export let data;

	$: data.pdfTemplates, (stateOnSave = 'Save');

	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		taintedMessage: null,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				stateOnSave = 'Saved !';
				invalidateAll();
			}
		}
	});

	let designer, domContainer;
	let template = {
		schemas: data?.pdfTemplates?.schema || [],
		basePdf: data?.pdfTemplates?.base64 || BLANK_PDF
	};

	onMount(async () => {
		$form.id = data.pdfTemplates.id;
		$form.schema = JSON.stringify(data.pdfTemplates.schema);

		domContainer = document.getElementById('container');
		designer = new Designer({ domContainer, template });
		designer.onSaveTemplate((e) => {
			// update data to db
		});
		designer.onChangeTemplate((e) => {
			// new notification there's something new
			$form.schema = JSON.stringify(e.schemas);
		});
	});

	function onChange(e) {
		let file = e.target.files[0];
		if (file && file.type === 'application/pdf') {
			let base64;
			let fileReader = new FileReader();

			fileReader.onload = function (file) {
				base64 = file.target.result;
				template.basePdf = base64;
				designer.updateTemplate(template);
			};

			fileReader.readAsDataURL(file);
		}
	}

	function handleSave() {
		stateOnSave = 'Process..';
	}
</script>

<svelte:head>
	<title>PDF Template</title>
</svelte:head>

<div class="absolute w-1/6 bg-slate-100 z-[300] flex flex-col gap-2 left-2 top-2 p-5">
	<h1 class="text-lg text-slate-700 font-bold text-center uppercase">{data.pdfTemplates.name} Template</h1>
	<span class="text-xs text-slate-600 py-2 px-4 bg-green-200"> Insert new PDF file if you want to change current pdf template file. </span>
	<File accept=".pdf" on:change={onChange} label="" />
	<span class="text-xs text-slate-600 py-2 px-4 bg-green-200"> Click Save if you already done layouting the schema. </span>

	<Form.Root let:id id="createTemplate" action="?/createTemplate" method="POST" {enhance}>
		<!-- <SuperDebug data={$form} /> -->
		<Form.Item>
			<Text id="id" name="id" bind:value={$form.id} hidden />
			<Text id="schema" name="schema" label="Schema" bind:value={$form.schema} error={$errors.schema} hidden />
		</Form.Item>
		<Button.Submit title={stateOnSave} classes="btn bg-sky-400 hover:bg-sky-500 text-white self-center font-semibold w-full !text-sm" on:click={handleSave} formId={id} />
	</Form.Root>
</div>
<div id="container" class="absolute inset-0" />
