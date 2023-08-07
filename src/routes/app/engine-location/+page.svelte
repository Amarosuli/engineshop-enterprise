<script>
	import { onMount } from 'svelte';
	import { draggable } from '@neodrag/svelte';
	import Panzoom from '@panzoom/panzoom';
	const base = [
		['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
		['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
		['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
		['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
		['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
		['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
		['1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
		['1', '1', '1', '1', '1', '1', '0', '0', '1', '1'],
		['1', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
		['1', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
		['1', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
		['1', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
		['0', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
		['0', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
		['0', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
		['0', '1', '1', '1', '1', '1', '0', '0', '0', '0']
	];

	let pz;
	onMount(() => {
		const parent = document.getElementById('base');
		pz = Panzoom(parent, {
			noBind: true,
			maxscale: 5
		});

		parent.addEventListener('pointerdown', (e) => {
			if (!e.shiftKey) return;
			pz.handleDown(e);
		});

		document.addEventListener('pointermove', pz.handleMove);
		document.addEventListener('pointerup', pz.handleUp);

		parent.parentElement.addEventListener('wheel', (e) => {
			if (!e.shiftKey) return;
			pz.zoomWithWheel(e);
		});

		parent.parentElement.addEventListener('click', (e) => {
			if (!e.altKey) return;
			pz.zoomToPoint(3, e, { animate: true });
		});
	});

	let isNeoActive = true;

	function neoSwitcher(e, val) {
		if (val === 'on') if (e.ctrlKey) isNeoActive = false;
		if (val === 'off') isNeoActive = true;
	}
	/**
	 * this page should implement loader
	 * map structure : base - area (include road) - pillars - engine
	 * base map should have default position to center of screen
	 * default event panzoom is active
	 * use toggler to move engine (deactivated panzoom) or use Shift Key
	 */

	function onDragStart(e) {
		console.log('::DRAGSTART:: \n', e);
	}

	function onDrag(e) {
		let pos = { x: e.detail.offsetX, y: e.detail.offsetY };
		console.log('::DRAGGING:: \n', pos);
	}

	function onDragEnd(e) {
		console.log('::DRAGEND:: \n', e);
	}
	$: console.log(isNeoActive);
	let baseDOM;
	$: console.log(baseDOM);
</script>

<svelte:window on:keydown={(e) => neoSwitcher(e, 'on')} on:keyup={(e) => neoSwitcher(e, 'off')} />

<button on:click={pz.reset()} class="absolute z-40 right-4 top-4 px-4 py-2 rounded-md shadow-md hover:bg-sky-400 bg-sky-300">Reset</button>
<div class="manage-container overflow-auto bg-teal-300">
	<div id="base" class="base" bind:this={baseDOM}>
		<!-- BASE -->
		{#each base as row, indexR}
			{#each row as col, indexC}
				<div class="base-tile" class:!hidden={col == '0'} style="margin-left: {120 * indexC}px; margin-top: {120 * indexR}px;">
					<span class="tile-text">{col}</span>
				</div>
			{/each}
		{/each}
		<!-- AREA -->

		<!-- PILLAR -->

		<!-- ENGINE -->
		<div on:neodrag:start={onDragStart} on:neodrag={onDrag} on:neodrag:end={onDragEnd} use:draggable={{ bounds: 'parent', disabled: isNeoActive }} class="engine">
			<span class="text-center text-xxs break-words text-white">ESN 858418</span>
		</div>
	</div>
</div>

<style>
	.base {
		@apply absolute h-[1920px] w-[1200px] bg-slate-300;
	}
	.base-tile {
		@apply absolute flex h-[120px] w-[120px] items-center justify-center border bg-slate-100;
	}
	.tile-text {
		@apply select-none text-center;
	}

	.engine {
		@apply absolute flex h-12 w-16 items-center justify-center rounded bg-slate-600 p-3 shadow-lg;
	}
</style>
