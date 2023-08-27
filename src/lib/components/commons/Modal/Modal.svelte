<script>
	import { onDestroy } from 'svelte';
	import classes from 'svelte-transition-classes';

	import { modal$ } from '$lib/utils/Stores';
	import { CommonSets } from '$lib/utils/CommonSets';

	export let id = '';
	export let position = 'mid';
	export let hideOnClick = true;

	let IN = (node) => {
		switch (position) {
			case 'mid':
				return classes(node, CommonSets.TransitionSet.popIn);
				break;
			case 'left':
				return classes(node, CommonSets.TransitionSet.slideLeftIn);
				break;
			case 'right':
				return classes(node, CommonSets.TransitionSet.slideRightIn);
				break;
			default:
				break;
		}
	};

	let OUT = (node) => {
		switch (position) {
			case 'mid':
				return classes(node, CommonSets.TransitionSet.popOut);
				break;
			case 'left':
				return classes(node, CommonSets.TransitionSet.slideLeftOut);
				break;
			case 'right':
				return classes(node, CommonSets.TransitionSet.slideRightOut);
				break;
			default:
				break;
		}
	};

	let open = true;

	const ModalPosition = {
		mid: 'justify-center items-center',
		right: 'justify-end',
		left: 'justify-start',
		mobile: 'justify-center items-center'
	};

	const ContentSize = {
		mid: 'h-1/2 w-full xl:w-[500px] xl:h-[300px]',
		left: 'h-full w-1/3',
		right: 'h-full w-full md:w-1/2 xl:w-1/3',
		mobile: 'h-full w-full'
	};

	const backDropOnClik = (e) => {
		if (e.target.getAttribute('data_backDrop')) {
			hideOnClick ? modal$.hide(id) : '';
		}
	};

	onDestroy(() => {
		modal$.hide(id);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	{id}
	data-backDrop={true}
	class="modal_backdrop {ModalPosition[position]}"
	{open}
	in:classes={CommonSets.TransitionSet.blurIn}
	out:classes={CommonSets.TransitionSet.blurOut}
	on:click|stopPropagation={backDropOnClik}>
	<div class="modal_container {ContentSize[position]}" in:IN|local out:OUT|local>
		<slot {id} />
	</div>
</dialog>
