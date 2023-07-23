<script>
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { _row, modal } from '$lib/utils/store';
	import { Modal, ModalWithDialog, Search, Menu, Select, Link, Btn, Table, Text, Date, Switch, TextArea } from '$lib/components';

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
	let selectedEngine = {};
	let curentEngine = {};

	$: curentEngine;
	function handleCheck() {
		let result = engineList.find(({ esn }) => inputCheck === esn);
		console.log(result);
		if (result) {
			isEngineExist = true;
			selectedEngine = result;

			/**
			 * find the engine_availability data with id equal to result.id
			 * get the last one with date_out is not empty and isInShop false
			 * if isInShop true and date_out is empty, display info "Engine already in Shop, only for outgoing"
			 * if isInShop false, display the incoming form which is mean "create new data to engine_availability"
			 */
			curentEngine = engineAvailability.find(({ engine_id }) => engine_id === result.id);
			console.log(curentEngine);
		} else {
			isEngineExist = false;
			selectedEngine = {};
		}
	}
</script>

<svelte:head>
	<title>Manage - Engine List</title>
</svelte:head>

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

				<pre>incoming:
               check esn from engine_list
               if no create new one and set availability to true
               if yes create new record on engine_availability
            </pre>
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
							<form action="POST" class="space-y-3">
								<Text id="id" name="id" hidden bind:value={selectedEngine.id} disabled />
								<Text id="esn" name="esn" label="ESN" bind:value={inputCheck} disabled />
								<Date id="date_in" name="date_in" label="Incoming Date" bind:value={curentEngine.date_in} />
								<Date id="date_out" name="date_out" label="Outgoing Date" bind:value={curentEngine.date_out} />
								<Switch id="isInShop" name="isInShop" label="Is Engine In Shop" bind:value={curentEngine.isInShop} />
								<Btn type="submit" title="Check" on:click={handleCheck} left />
							</form>
						</div>
					{:else}
						<div class="mt-6 flex flex-col space-y-3">
							<p class="font-bold text-lg">! ESN {inputCheck} Not Found</p>
							<p>Go to <strong>engine-list</strong> to create new Engine</p>
							<Link href="/manage/engine-list" title="Go To Engine List" color="warning" />
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
				</div>
			{/if}
		</div>
	</div>
</div>
