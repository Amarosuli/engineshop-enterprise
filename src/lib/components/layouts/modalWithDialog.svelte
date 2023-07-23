<script>
	import { modal } from '$lib/utils/store';
	import { quintInOut, quintIn, backInOut } from 'svelte/easing';
	import { fade, fly, slide, scale } from 'svelte/transition';

	// if still use the store to manage the modal id, maybe we need to call _modalHide within the onDestroy function
	export let id = '';
	export let position = 'mid';
	export let hideOnClick = true;

	const transitionProperties = (node) => {
		switch (position) {
			case 'mid':
				return scale(node, { duration: 300, easing: backInOut });
				break;
			case 'left':
				return scale(node, { duration: 300, easing: backInOut });
				break;
			case 'right':
				return slide(node, { axis: 'x', easing: quintIn, duration: 300 });
				break;

			default:
				break;
		}
	};
	// const { mid } = transitionProperties;

	let open = true;
	function onClc(e) {
		if (!e) {
			return;
		}

		if (e.target.nodeName === 'DIALOG') {
			open = false;
		}
	}

	const ModalPosition = {
		mid: 'justify-center items-center ',
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
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog {id} data-backDrop={true} class="absolute flex {ModalPosition[position]} backdrop-blur-sm z-20 w-full h-full bg-slate-700/70" {open} transition:fade={{ duration: 300, easing: quintInOut }} on:click={backDropOnClik}>
	<div class="relative flex flex-col justify-between z-30 lg:mx-0 {ContentSize[position]} bg-slate-100" transition:transitionProperties>
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
</dialog>
