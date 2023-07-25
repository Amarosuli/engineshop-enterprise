<script>
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { _row, modal } from '$lib/utils/store';
	import { Modal, Search, Menu, Select, Link, Btn, Table, Text, Date, Switch, TextArea } from '$lib/components';

	export let data;

	/**
	 * Superform: applyAction set to false so we can handle onResult.
	 * onResult void success, reload page using window.location. goto method not work
	 */

	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				window.location = '/manage/engine-in-out';
			}
		}
	});

	/**
	 * destructure of data from page.server.js
	 * make using of specific data more simpler for Table Components props and other needs
	 */
	const { engineList, engineAvailability } = data;

	/**
	 * destructure of modal costum store
	 * make using method more simpler
	 */
	const { isConfirm, isDelete, isUpdate, isCreate, isDetail } = modal;

	let formDisplay = 'incoming';

	let isEngineExist = false;
	let inputCheck = '';
	let selectedData = {};
	let curentEngine = {};

	$: curentEngine;
	function handleCheck() {
		let result = engineList.find(({ esn }) => inputCheck === esn);

		// 1a. check if esn exist in engine_list,  pass to next conditional
		if (result) {
			engineAvailability.forEach((val) => {
				if (val.engine_id === result.id) {
					if (val.isInShop) {
						// 2b. if last record in engine_availability.isInShop is TRUE (engine still inshop)
						// show confirm "engine already in engineshop, only available for outgoing process"
						console.log('engine already inshop, available only for outgoing');
						isEngineExist = false;

						// 2b1. if curent formDisplay is "outgoing"
						if (formDisplay === 'outgoing') {
							isEngineExist = true;
							selectedData = val;
						} else {
							// show notification
							console.log('engine already outshop, available for incoming only');
							selectedData = {};
						}
					} else {
						// 2a. if last record in engine_availability.isInShop is FALSE (engine not inshop)
						// show form incoming
						console.log('create incoming form');
						isEngineExist = true;
						selectedData = val;
					}
				}
				return;
			});
		} else {
			// 1b. if esn not exist in engine_list, show confirm "engine not found, go to manage/engine-list to create"
			isEngineExist = false;
			selectedData = {};
			modal.show('confirm');
		}
	}
</script>

<svelte:head>
	<title>Manage - Engine List</title>
</svelte:head>

{#if $isConfirm}
	<Modal id="confirm" position="mid">
		<div class="modal-container">
			<div class="modal-header">
				<h1 class="modal-title">ESN {inputCheck} Not Found</h1>
			</div>
			<div class="mt-6 flex flex-col space-y-3 justify-start">
				<p class="font-bold text-lg">! ESN {inputCheck} Not Found</p>
				<p>Go to <strong>engine-list</strong> to create new Engine</p>
				<Link href="/manage/engine-list" title="Go To Engine List" color="warning" />
			</div>

			<div class="modal-content" />
		</div>
	</Modal>
{/if}

<div class="absolute inset-0 flex">
	<div class="basis-1/4 hidden md:block">
		<div class="bg-slate-200 m-4 px-4 pt-2 pb-6 h-fit shadow-lg">
			<h1 class="text-xl text-slate-700 font-extrabold">Recent Data</h1>
			<div>
				{#each engineAvailability as history}
					<p class="text-slate-600">ESN {history.esn} | {history.isInShop ? 'Incoming' : 'Outgoing'} | {history.isInShop ? history.date_in : history.date_out}</p>
				{/each}
			</div>
		</div>
	</div>
	<div class="basis-full flex flex-col flex-nowrap overflow-auto">
		<div class="h-max pt-4 pb-12 px-6 gap-4 bg-slate-200 flex-nowrap flex justify-between overflow-x-auto">
			<div class="w-max min-w-lg">
				<span class="text-xl font-extrabold tracking-wide text-slate-600">Engine Incoming & Outgoing</span>
				<p>Registering for engine incoming to shop and outgoing from shop</p>
			</div>
			<div class="flex flex-wrap gap-4 justify-between items-center">
				<div class="lg:flex gap-3">
					<Btn title="Engine Incoming" on:click={() => (formDisplay = 'incoming')} />
					<Btn title="Engine Outgoing" on:click={() => (formDisplay = 'outgoing')} />
				</div>
			</div>
		</div>
		<div class="relative overflow-y-auto">
			{#if formDisplay === 'incoming'}
				<div class="w-full h-max bg-slate-200 mt-8 px-6 pt-4 pb-6">
					<span class="text-xl font-extrabold tracking-wide text-slate-600">Engine Incoming Form</span>
					<div class="flex justify-center items-end gap-3 w-fit mt-4">
						<Text id="check" name="check" label="Check ESN" bind:value={inputCheck} />
						<Btn title="Check" on:click={handleCheck} left />
					</div>
					{#if isEngineExist}
						<div class="mt-6">
							<form action="?/incoming" method="POST" class="space-y-3">
								<Text id="id" name="id" hidden bind:value={selectedData.id} disabled />
								<Text id="esn" name="esn" label="ESN" bind:value={inputCheck} disabled />
								<Date id="date_in" name="date_in" label="Incoming Date" bind:value={$form.date_in} />
								<Date id="date_out" name="date_out" label="Outgoing Date" bind:value={$form.date_out} />
								<Switch id="isInShop" name="isInShop" label="Is Engine In Shop" bind:value={$form.isInShop} />
								<Btn type="submit" title="Register Engine" on:click={handleCheck} left />
							</form>
						</div>
					{/if}
				</div>
			{:else if formDisplay === 'outgoing'}
				<div class="w-full h-max bg-slate-200 mt-8 px-6 pt-4 pb-6">
					<span class="text-xl font-extrabold tracking-wide text-slate-600">Engine Outgoing Form</span>
					<div class="flex justify-center items-end gap-3 w-fit mt-4">
						<Text id="check" name="check" label="Check ESN" bind:value={inputCheck} />
						<Btn type="submit" title="Check" on:click={handleCheck} left />
					</div>
					{#if isEngineExist}
						<div class="mt-6">
							<form action="?/outgoing" method="POST" class="space-y-3">
								<Text id="id" name="id" hidden bind:value={selectedData.id} disabled />
								<Text id="esn" name="esn" label="ESN" bind:value={inputCheck} disabled />
								<Date id="date_in" name="date_in" label="Incoming Date" bind:value={selectedData.date_in} />
								<Date id="date_out" name="date_out" label="Outgoing Date" bind:value={selectedData.date_out} />
								<Switch id="isInShop" name="isInShop" label="Is Engine In Shop" bind:value={selectedData.isInShop} />
								<Btn type="submit" title="Release Engine" on:click={handleCheck} left />
							</form>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
