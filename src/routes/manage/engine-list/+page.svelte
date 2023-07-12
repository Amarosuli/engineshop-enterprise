<script>
	import { Modal, ModalWithDialog } from '$lib/components';
	import { _modal, _modalShow } from '$lib/utils/store';
</script>

<svelte:head>
	<title>Manage - Engine List</title>
</svelte:head>

{#if $_modal.find(({ id }) => id === 'modal1')}
	<Modal id="modal1" position="right">Content</Modal>
{/if}

<!-- <ModalWithDialog /> -->

<div class="relative p-6 h-full w-full bg-slate-200 mx-auto flex justify-start items-start space-x-6">
	<!-- <div class="w-[300px] h-32 bg-sky-300">left</div> -->
	<button on:click={() => _modalShow('modal1')}>modal 1</button>

	<div class="w-full flex flex-col bg-sky-300">
		<div>title</div>
		<div class="flex justify-around">
			<span>search</span>
			<span>button</span>
		</div>
		<div class="h-full">table</div>
	</div>
</div>
