<script>
	import { File, Table, Text, Btn, Button, Link, Img, Modal, List, Form, Password } from '$lib/components';
	import { invalidateAll } from '$app/navigation';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { createRender } from 'svelte-headless-table';
	import { superForm } from 'sveltekit-superforms/client';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { modal$ } from '$lib/utils/Stores';

	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import Preview from './Preview.svelte';

	export let data;

	let search = '';
	let dataTable;
	let loadingRefresh = true;
	let containerAvailable = false;
	let viewer, domContainer, template;

	/**
	 * destructure of modal costum store
	 * make using method more simpler
	 */
	const { isConfirm, isDelete, isUpdate, isCreate, isDetail } = modal$;

	const tableConfig = [
		{
			header: 'Name',
			accessor: 'name'
		},
		{
			header: 'Alias',
			accessor: 'alias'
		},
		{
			header: 'Description',
			accessor: 'description'
		},
		{
			header: 'Base64',
			accessor: 'base64',
			cell: ({ row }) => {
				if (row.original.base64 && row.original.base64.length > 0)
					return createRender(Button.Event, { title: 'Show', classes: 'rounded-lg font-bold !text-xxs bg-green-400 hover:bg-green-300' }).on('Event', () =>
						modal$.show('confirm', row.original.base64)
					);
				return 'Not Available';
			}
		},
		{
			header: 'PDF',
			accessor: 'pdf',
			cell: ({ row }) => {
				if (row.original.pdf)
					return createRender(Button.Event, { title: 'Preview', classes: 'rounded-lg font-bold !text-xxs bg-blue-300 hover:bg-blue-200' }).on('Event', () => {
						template = { schemas: row.original.schema, basePdf: row.original.base64 };
						modal$.show('preview', template);
					});
				return 'Not Available';
			}
		},
		{
			header: 'Schema',
			accessor: 'schema',
			cell: ({ row }) => {
				return createRender(Link, { title: 'Designer', href: `/manage/pdf-template/designer?id=${row.original.id}`, color: 'warning' });
			}
		}
	];

	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		taintedMessage: null,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				invalidateAll();
				modal$.reset();
				loadingRefresh = true;
			}
		}
	});

	function handleRowClick(e) {
		let rowData = e.detail.rowData.original;
		modal$.show('detail', rowData);
	}

	function handleChange(e) {
		let file = e.target.files[0];
		if (file && file.type === 'application/pdf') {
			let base64;
			let fileReader = new FileReader();

			fileReader.onload = function (file) {
				base64 = file.target.result;
				$form.base64 = base64;
			};

			fileReader.readAsDataURL(file);
		}
	}

	$: dataTable = data.pdfTemplates;
	// $: console.log($modal$);
</script>

<svelte:head>
	<title>Manage : PDF Template</title>
</svelte:head>

{#if $isDetail}
	<Modal.Root let:id id="detail" position="right">
		<Modal.Header>
			<Modal.Title title="Detail Form" />
			<Modal.Action>
				<Btn title="Update" color="warning" hidden={data?.user !== null ? false : true} on:click={() => modal$.show('update', $isDetail?.data)}>
					<i class="ri-pencil-line ri-1x text-white" /></Btn>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<List.Item>
				<span>Template Name</span>
				<span class="text-right font-bold">{$isDetail.data?.name}</span>
			</List.Item>
			<List.Item>
				<span>Template Alias</span>
				<span class="text-right font-bold">{$isDetail.data?.alias}</span>
			</List.Item>
			<List.Item>
				<span>Description</span>
				<span class="text-right font-bold">{$isDetail.data?.description}</span>
			</List.Item>
			<List.Item>
				<span>Base64</span>
				<!-- <span class="font-bold text-right">{$isDetail.data?.code_IATA}</span> -->
			</List.Item>
			<List.Item>
				<span>PDF</span>
				<!-- <span class="font-bold text-right">{$isDetail.data?.code_ICAO}</span> -->
			</List.Item>
			<List.Item>
				<span>Schema</span>
				<!-- <span class="font-bold text-right">{$isDetail.data?.code_ICAO}</span> -->
			</List.Item>
		</Modal.Body>
		<Modal.Footer>
			<Modal.Cancel on:Cancel={() => modal$.hide(id)} />
		</Modal.Footer>
	</Modal.Root>
{/if}

{#if $isCreate}
	<div class="absolute z-[200]">
		<SuperDebug data={$form} />
	</div>
	<Modal.Root let:id id="create" position="right">
		<Modal.Header>
			<Modal.Title title="Create Form" />
			<Modal.Action>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<Form.Root {id} action="?/create" method="POST" enctype="multipart/form-data" {enhance}>
				<Form.Item>
					<Text id="name" name="name" label="Template Name" bind:value={$form.name} error={$errors?.name} />
					<Text id="alias" name="alias" label="Template Alias" bind:value={$form.alias} error={$errors?.alias} />
					<Text id="description" name="description" label="Description" bind:value={$form.description} error={$errors?.description} />
					<Text id="base64" name="base64" label="Base64" bind:value={$form.base64} error={$errors?.base64} hidden />
					<File id="pdf" name="pdf" label="PDF" on:change={handleChange} accept=".pdf" />
					<Text id="schema" name="schema" label="Schema" bind:value={$form.schema} error={$errors?.schema} />
				</Form.Item>
				<Form.Error error={$errors?.pocketbaseErrors} />
			</Form.Root>
		</Modal.Body>
		<Modal.Footer>
			<Button.Submit formId={id} />
			<Modal.Cancel title="Back" on:Cancel={() => modal$.hide(id)} />
		</Modal.Footer>
	</Modal.Root>
{/if}

{#if $isConfirm}
	<Modal.Root let:id id="confirm" position="mid">
		<Modal.Header>
			<Modal.Title title="Base64 PDF" />
			<Modal.Action>
				<Modal.Close on:Close={() => modal$.hide(id)} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<div class="m-2 bg-slate-700">
				<p class="text-xxs text-green-300">{$isConfirm?.data}</p>
			</div>
		</Modal.Body>
		<Modal.Footer>
			<Modal.Cancel title="Close" on:Cancel={() => modal$.hide(id)} />
		</Modal.Footer>
	</Modal.Root>
{/if}

{#if $modal$.find((v) => v.id === 'preview')}
	<Preview />
{/if}

<div class="manage-container">
	<div class="manage-r relative">
		<svelte:component
			this={Table}
			{dataTable}
			dataCol={tableConfig}
			{search}
			on:rowClick={handleRowClick}
			showCreateButton={data.user !== null ? true : false}
			showRowSelector={data.user !== null ? true : false}>
			<span slot="title" class="title">PDF Templates</span>
			<span slot="description" class="text-xs">Template for manage the pdf report</span>
		</svelte:component>
	</div>
</div>
