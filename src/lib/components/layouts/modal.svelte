<script>
	import { fade, fly, slide } from 'svelte/transition';
	import { quintIn } from 'svelte/easing';
	import { _modalHide, _rowRem, _modal } from '$lib/utils/store';

	export let id = '';
	export let position = 'mid';
	export let hideOnClick = true;

	const ModalPosition = {
		mid: 'justify-center items-center mx-6',
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
		console.log(e.target.id);
		if (e.target.getAttribute('data-backDrop')) {
			hideOnClick ? _modalHide(id) : '';
		}
		console.log($_modal);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div {id} data-backDrop={true} class="backDrop absolute flex {ModalPosition[position]} z-20 w-full h-full bg-slate-700/70" transition:fade={{ duration: 300, easing: quintIn }} on:click|stopPropagation|preventDefault={backDropOnClik}>
	<div class="relative z-30 lg:mx-0 {ContentSize[position]} bg-slate-100" transition:slide={{ axis: 'x', easing: quintIn, duration: 300 }}>
		<slot />
	</div>
</div>
