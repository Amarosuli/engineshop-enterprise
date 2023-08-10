<script>
	import classes from 'svelte-transition-classes';
	import { blurIn, blurOut, popIn, popOut, slideRightIn, slideRightOut, slideLeftIn, slideLeftOut } from '$lib/utils/TransitionSets';
	import { Btn } from '$lib/components';
	import { _rowRem, modal$ } from '$lib/utils/store';
	import { onDestroy } from 'svelte';

	// if still use the store to manage the modal id, maybe we need to call _modalHide within the onDestroy function
	export let id = '';
	export let position = 'mid';
	export let hideOnClick = true;

	let IN = (node) => {
		switch (position) {
			case 'mid':
				return classes(node, popIn);
				break;
			case 'left':
				return classes(node, slideLeftIn);
				break;
			case 'right':
				return classes(node, slideRightIn);
				break;
			default:
				break;
		}
	};

	let OUT = (node) => {
		switch (position) {
			case 'mid':
				return classes(node, popOut);
				break;
			case 'left':
				return classes(node, slideLeftOut);
				break;
			case 'right':
				return classes(node, slideRightOut);
				break;
			default:
				break;
		}
	};

	let open = true;

	const ModalPosition = {
		mid: 'justify-center items-center ',
		right: 'justify-end',
		left: 'justify-start',
		mobile: 'justify-center items-center'
	};

	const ContentSize = {
		mid: 'h-[15rem] w-full xl:w-[500px] xl:h-[300px]',
		left: 'h-full w-1/3',
		right: 'h-full w-full md:w-1/2 xl:w-1/3',
		mobile: 'h-full w-full'
	};

	const backDropOnClik = (e) => {
		// console.log(e.target.id);
		if (e.target.getAttribute('data-backDrop')) {
			hideOnClick ? modal$.hide(id) : '';
		}
	};

	onDestroy(() => {
		modal$.hide(id);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog {id} data-backDrop={true} class="modal-backdrop {ModalPosition[position]}" {open} in:classes={blurIn} out:classes={blurOut} on:click|stopPropagation={backDropOnClik}>
	<div class="modal-container {ContentSize[position]}" in:IN|local out:OUT|local>
		<div class="modal-content">
			<slot />
		</div>
		<div class="flex gap-3 mx-6 justify-end items-center py-3 border-t">
			<Btn type="button" title="Cancel" color="info" on:click={() => modal$.hide(id)} />
			{#if id === 'create'}
				<Btn type="submit" title="Create" color="base" form={`${id}Form`} />
			{/if}
			{#if id === 'update'}
				<Btn type="submit" title="Update" color="warning" form={`${id}Form`} />
			{/if}
		</div>
	</div>
</dialog>
