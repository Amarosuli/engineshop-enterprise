<script>
	/**
	 * @IMPORTANT NEED BULK CHANGES, TABLE DESIGN WILL USE THE SCHEMA HISTORICAL { id, engine_id, type: in | out, date }
	 **/
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { page } from '$app/stores';

	import { _row, modal$ } from '$lib/utils/Stores';
	import { Search, Menu, Select, Modal, List, Form, Link, Btn, Table, Text, Date, Switch, TextArea } from '$lib/components';

	import OutgoingForm from './OutgoingForm.svelte';
	import IncomingForm from './IncomingForm.svelte';

	export let data;

	/**
	 * Superform: applyAction set to false so we can handle onResult.
	 * onResult void success, reload page using window.location. goto method not work
	 */

	const { form, errors, enhance } = superForm(data.form, {
		applyAction: false,
		taintedMessage: null,
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
	const { engineHistory, engineList, engineAvailability } = data;

	/**
	 * destructure of modal costum store
	 * make using method more simpler
	 */
	const { isConfirm, isDelete, isUpdate, isCreate, isDetail } = modal$;

	let formDisplay = 'incoming';

	let isEngineExist = false;
	let inputCheck = $page.url.searchParams.get('esn') || '';
	let inputCheckError = '';
	let selectedData = {};
	let curentEngine = {};

	function resetVars() {
		inputCheckError = '';
		inputCheck = '';
		selectedData = {};
		curentEngine = {};
		isEngineExist = false;
	}

	function handleCheck(e) {
		// check if input is empty
		if (e.detail.value.length === 0) {
			inputCheckError = 'Input cannot be empty';
			resetVars();
			return;
		}
		// then if value is not empty
		inputCheck = e.detail.value;
		inputCheckError = '';
		let result = engineList.find(({ esn }) => e.detail.value === esn);

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
							val.date_in = val?.date_in.split(' ')[0];
							console.log(val);
							selectedData = val;
						} else {
							// show notification
							modal$.show('confirmOutgoingOnly');
							console.log('engine already outshop, available for incoming only');
							selectedData = {};
						}
					} else {
						// 2a. if last record in engine_availability.isInShop is FALSE (engine not inshop)
						// show form incoming
						if (formDisplay === 'outgoing') {
							isEngineExist = false;
							selectedData = val;
							console.log('create incoming form');
							modal$.show('confirmIncomingOnly');
						} else {
							isEngineExist = true;
							selectedData = val;
						}
					}
				}
				return;
			});
		} else {
			// 1b. if esn not exist in engine_list, show confirm "engine not found, go to manage/engine-list to create"
			isEngineExist = false;
			selectedData = {};
			modal$.show('confirmNotFound');
		}
	}
</script>

<svelte:head>
	<title>Manage - Engine List</title>
</svelte:head>

{#if $modal$.find((v) => v.id === 'confirmNotFound')}
	<Modal.Root let:id id="confirmNotFound" position="mid">
		<Modal.Header>
			<Modal.Title title="Not Found" />
			<Modal.Action>
				<Modal.Close
					on:Close={() => {
						modal$.hide(id);
						resetVars();
					}} />
			</Modal.Action>
		</Modal.Header>
		<Modal.Body>
			<div class="flex flex-col justify-center items-center gap-2 w-full h-full px-2">
				<p class="font-bold text-lg">ESN {inputCheck} doesn't exist in database</p>
				<p>Go to <strong>engine-list</strong> to create new engine data</p>
				<Link href="/manage/engine-list" title="Go To Engine List" color="warning" />
			</div>
		</Modal.Body>
	</Modal.Root>
	<!-- <Modal id="confirmNotFound" position="mid">
		<div class="list-container">
			<div class="list-header">
				<h1 class="list-title">ESN {inputCheck} Not Exist</h1>
			</div>
			<div class="mt-6 flex flex-col space-y-3">
				<p class="font-bold text-lg">ESN {inputCheck} not recognized</p>
				<p>Go to <strong>engine-list</strong> to create new Engine</p>
				<Link href="/manage/engine-list" title="Go To Engine List" color="warning" />
			</div>

			<div class="list-content" />
		</div>
	</Modal> -->
{/if}

{#if $modal$.find((v) => v.id === 'confirmOutgoingOnly')}
	<p>a</p>
	<!-- <Modal id="confirmOutgoingOnly" position="mid">
		<div class="list-container">
			<div class="list-header">
				<h1 class="list-title">ESN {inputCheck} Exist</h1>
			</div>
			<div class="mt-6 flex flex-col space-y-3 justify-start">
				<p class="font-bold text-lg">But ESN {inputCheck} already inshop</p>
				<p>Switch to <strong>outgoing </strong> to release engine</p>
				<!-- <Link href="/manage/engine-list" title="Go To Engine List" color="warning" /> -->
	<!-- </div>

			<div class="list-content" />
		</div>
	</Modal> --> -->
{/if}

{#if $modal$.find((v) => v.id === 'confirmIncomingOnly')}
	<p>a</p>
	<!-- <Modal id="confirmIncomingOnly" position="mid">
		<div class="list-container">
			<div class="list-header">
				<h1 class="list-title">ESN {inputCheck} Exist</h1>
			</div>
			<div class="mt-6 flex flex-col space-y-3 justify-start">
				<p class="font-bold text-lg">But ESN {inputCheck} already released</p>
				<p>Switch to <strong>incoming </strong> to register engine</p>
				<!-- <Link href="/manage/engine-list" title="Go To Engine List" color="warning" /> -->
	<!-- </div>

			<div class="list-content" />
		</div>
	</Modal> --> -->
{/if}

<div class="absolute inset-0 flex">
	<div class="basis-1/4 hidden md:block">
		<div class="bg-slate-200 m-4 px-4 pt-2 pb-6 h-fit shadow-lg">
			<h1 class="text-lg text-center text-slate-700 font-extrabold mt-2 mb-4">Recent Data</h1>
			{#each engineHistory as history}
				<div class="flex rounded text-xs justify-between items-center w-full gap-8 py-2 px-4 bg-white mb-2">
					<span class="text-slate-600 flex-1">ESN {history.esn}</span>
					<span class="text-slate-600 font-semibold">{history.status}</span>
					<span class="text-slate-600">{history.date_performed.split(' ')[0]}</span>
				</div>
			{/each}
		</div>
	</div>
	<div class="basis-full flex flex-col flex-nowrap overflow-auto">
		<div class="h-max pt-4 pb-4 px-6 gap-4 bg-slate-200 flex-nowrap flex justify-between items-start overflow-x-auto">
			<div class="w-max min-w-lg">
				<span class="text-xl font-extrabold tracking-wide text-slate-600">Engine In & Out</span>
				<p>Register engine while incoming to shop and release engine while outgoing from shop</p>
			</div>
			<div class="flex flex-wrap gap-4 justify-between items-center">
				<div class="flex flex-col lg:flex-row gap-3">
					<Btn title="Register" color={formDisplay === 'incoming' ? 'info' : 'base'} on:click={() => (formDisplay = 'incoming')} on:click={resetVars} />
					<Btn title="Release" color={formDisplay === 'outgoing' ? 'danger' : 'base'} on:click={() => (formDisplay = 'outgoing')} on:click={resetVars} />
				</div>
			</div>
		</div>
		<div class="relative overflow-y-auto">
			<div class="w-full h-max px-6 pt-4 pb-6 transition-colors ease-out" class:bg-sky-200={formDisplay === 'incoming'} class:bg-orange-200={formDisplay === 'outgoing'}>
				<span class="text-xl font-extrabold tracking-wide text-slate-600"
					><span class="text-xl uppercase"
						>{formDisplay}
						<form action="" class="flex justify-center text-sm normal-case font-normal items-center gap-3 w-fit">
							<Search id="check" name="check" error={inputCheckError} bind:value={inputCheck} required on:Enter={handleCheck} />
							<span class=" font-semibold">Check ESN</span>
						</form>
					</span></span>
			</div>
		</div>
		{#if isEngineExist}
			<div class="bg-slate-50 p-4">
				{#if formDisplay === 'incoming'}
					<IncomingForm {selectedData} {inputCheck} {form} />
				{:else if formDisplay === 'outgoing'}
					<OutgoingForm {selectedData} {inputCheck} />
				{/if}
			</div>
		{/if}
	</div>
</div>
