<script>
	import { fade, fly, slide } from 'svelte/transition';
	import { quintIn } from 'svelte/easing';
	import { _rowRem, modal } from '$lib/utils/store';

	export let id = '';
	export let position = 'mid';
	export let hideOnClick = true;

	let Trans = slide;
	let TransitionProperties = { axis: 'x', easing: quintIn, duration: 300 };

	switch (position) {
		case 'mid':
			Trans = fade;
			break;

		default:
			Trans = slide;
			break;
	}
	const ModalPosition = {
		mid: 'justify-center items-center mx-6 xl:mx-0',
		right: 'justify-end',
		left: 'justify-start',
		mobile: 'justify-center items-center'
	};

	const ContentSize = {
		mid: 'h-[15rem] w-full xl:w-[500px] xl:h-[300px]',
		left: 'h-full w-1/3',
		right: 'h-full w-full xl:w-1/3',
		mobile: 'h-full w-full'
	};

	const backDropOnClik = (e) => {
		// console.log(e.target.id);
		if (e.target.getAttribute('data-backDrop')) {
			hideOnClick ? modal.hide(id) : '';
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div {id} data-backDrop={true} class="backDrop absolute flex {ModalPosition[position]} z-20 w-full h-full bg-slate-700/70" transition:fade={{ duration: 300, easing: quintIn }} on:click|stopPropagation={backDropOnClik}>
	<div class="relative flex flex-col justify-between z-30 lg:mx-0 {ContentSize[position]} bg-slate-100" transition:Trans={TransitionProperties}>
		<div class="w-full h-max overflow-y-auto">
			<slot />
		</div>
		<div class="flex gap-3 mx-6 justify-end items-center py-3 border-t">
			<button class="px-3 py-2 bg-orange-300" on:click={() => modal.hide(id)}>Cancel </button>
			{#if id === 'create'}
				<button class="px-3 py-2 bg-orange-300" type="submit" form={`${id}Form`}>Create</button>
			{/if}
			{#if id === 'update'}
				<button class="px-3 py-2 bg-orange-300" type="submit" form={`${id}Form`}>Update</button>
			{/if}
		</div>
	</div>
</div>
