<script>
	import { CommonHelpers } from '$lib/utils/CommonHelpers';

	import { onMount } from 'svelte';
	import { draggable } from '@neodrag/svelte';
	import Panzoom from '@panzoom/panzoom';
	export let data;

	let { engineList, engineLocation } = data;

	let engineTile;

	$: engineTile = engineList.map((value) => ({ ...value, loc: engineLocation.find(({ engine_id }) => engine_id === value.id) || null }));

	const initialPosition = {
		x: 45,
		y: 23
	};
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

	const area = [
		{
			id: 'GAEM3K',
			pos: { x: 120, y: 0 },
			size: { w: 180, h: 120 },
			text: 'GAEM 3000'
		},
		{
			id: 'GAEM1K',
			pos: { x: 300, y: 0 },
			size: { w: 180, h: 120 },
			text: 'GAEM 1000'
		},
		{
			id: 'KITTING',
			pos: { x: 480, y: 0 },
			size: { w: 480, h: 120 },
			text: 'KITTING'
		},
		{
			id: 'SURPLUS',
			pos: { x: 960, y: 0 },
			size: { w: 120, h: 120 },
			text: 'SURPLUS'
		},
		{
			id: 'OLDCLEANING',
			pos: { x: 1080, y: 0 },
			size: { w: 120, h: 120 },
			text: 'OLD CLEANING'
		},
		{
			id: 'ROAD1',
			pos: { x: 120, y: 120 },
			size: { w: 1080, h: 120 },
			text: 'ROAD'
		},
		{
			id: 'ROAD2',
			pos: { x: 120, y: 600 },
			size: { w: 1080, h: 60 },
			text: 'ROAD'
		},
		{
			id: 'TOILET1',
			pos: { x: 120, y: 660 },
			size: { w: 120, h: 60 },
			text: 'TOILET'
		},
		{
			id: 'CUSTOMER',
			pos: { x: 240, y: 660 },
			size: { w: 40, h: 60 },
			text: 'CUSTOMER'
		},
		{
			id: 'EO',
			pos: { x: 280, y: 660 },
			size: { w: 80, h: 60 },
			text: 'EO'
		},
		{
			id: 'GEMENGAD',
			pos: { x: 420, y: 660 },
			size: { w: 60, h: 120 },
			text: 'GEMENGAD'
		},
		{
			id: 'EPC',
			pos: { x: 480, y: 660 },
			size: { w: 160, h: 60 },
			text: 'EPC'
		},
		{
			id: 'ROAD3',
			pos: { x: 360, y: 660 },
			size: { w: 60, h: 1260 },
			text: 'ROAD'
		},
		{
			id: 'GANTRY1',
			pos: { x: 360, y: 540 },
			size: { w: 120, h: 60 },
			text: 'GANTRY 1'
		},
		{
			id: 'GANTRY2',
			pos: { x: 360, y: 480 },
			size: { w: 120, h: 60 },
			text: 'GANTRY 2'
		},
		{
			id: 'GANTRY3',
			pos: { x: 360, y: 420 },
			size: { w: 120, h: 60 },
			text: 'GANTRY 3'
		},
		{
			id: 'GANTRY4',
			pos: { x: 360, y: 360 },
			size: { w: 120, h: 60 },
			text: 'GANTRY 4'
		},
		{
			id: 'GANTRY5',
			pos: { x: 360, y: 300 },
			size: { w: 120, h: 60 },
			text: 'GANTRY 5'
		},
		{
			id: 'GANTRY6',
			pos: { x: 360, y: 240 },
			size: { w: 120, h: 60 },
			text: 'GANTRY 6'
		},
		{
			id: 'BAYROAD',
			pos: { x: 320, y: 240 },
			size: { w: 40, h: 360 },
			text: 'BAY ROAD'
		},
		{
			id: 'ROAD3',
			pos: { x: 480, y: 240 },
			size: { w: 40, h: 360 },
			text: 'ROAD 3'
		},
		{
			id: 'ROAD4',
			pos: { x: 1040, y: 240 },
			size: { w: 40, h: 360 },
			text: 'ROAD'
		},
		{
			id: 'BAY6',
			pos: { x: 240, y: 240 },
			size: { w: 80, h: 60 },
			text: 'BAY 6'
		},
		{
			id: 'BAY5',
			pos: { x: 240, y: 300 },
			size: { w: 80, h: 60 },
			text: 'BAY 5'
		},
		{
			id: 'BAY4',
			pos: { x: 240, y: 360 },
			size: { w: 80, h: 60 },
			text: 'BAY 4'
		},
		{
			id: 'BAY3',
			pos: { x: 240, y: 420 },
			size: { w: 80, h: 60 },
			text: 'BAY 3'
		},
		{
			id: 'BAY2',
			pos: { x: 240, y: 480 },
			size: { w: 80, h: 60 },
			text: 'BAY 2'
		},
		{
			id: 'BAY1',
			pos: { x: 240, y: 540 },
			size: { w: 80, h: 60 },
			text: 'BAY 1'
		}
	];

	const pillar = [
		['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', 'H', 'I', 'J'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
		['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0']
	];

	const tileSize = 120;
	let pz, elArea;
	let isNeoActive = true;

	/**
	 * this page should implement loader
	 * map structure : base - area (include road) - pillars - engine
	 * base map should have default position to center of screen
	 * default event panzoom is active | CLOSED
	 * use toggler to move engine (deactivated panzoom) or use Shift Key | CLOSED
	 *
	 * When Engine Create, there's 3 step to do: Create Data in engine_list, Create Data in engine_availability, and Create Data in engine_location (with default value {x: 45, y:23}) it will increase work in initial data, but for this map will be simpler
	 */

	function isCollide(a, b) {
		let aRect = a.getBoundingClientRect();
		let bRect = b.getBoundingClientRect();

		/** @TODO
		 * Calculation implement of how much precentage of area is collide
		 */

		return !(aRect.y + aRect.height < bRect.y || aRect.y > bRect.y + bRect.height || aRect.x + aRect.width < bRect.x || aRect.x > bRect.x + bRect.width);
	}
	function neoSwitcher(e, val) {
		if (val === 'on') if (e.shiftKey) isNeoActive = false;
		if (val === 'off') isNeoActive = true;
	}

	function onDragStart(e) {
		console.log('::DRAGSTART:: \n');
	}

	function onDrag(e) {
		let pos = { x: e.detail.offsetX, y: e.detail.offsetY };
		// console.log('::DRAGGING:: \n', pos);
	}

	function onDragEnd(e) {
		let lastPosition = { x: e.detail.offsetX, y: e.detail.offsetY };
		let currentEl = e.detail.currentNode;
		let inArea;
		elArea.forEach((area) => {
			if (isCollide(area, currentEl)) {
				inArea = area;
			}
		});

		console.log('::DRAGEND:: \n', lastPosition);
		console.log(inArea.id || null);
	}
	let baseDOM;
	// $: console.log(isNeoActive);
	// $: console.log(baseDOM);

	onMount(async () => {
		elArea = document.querySelectorAll('.area');
		const parent = document.getElementById('base');
		pz = Panzoom(parent, {
			noBind: true,
			maxscale: 5
		});

		parent.addEventListener('pointerdown', (e) => {
			if (e.shiftKey) return;
			if (!isNeoActive) return;
			pz.handleDown(e);
		});

		document.addEventListener('pointermove', pz.handleMove);
		document.addEventListener('pointerup', pz.handleUp);

		parent.parentElement.addEventListener('wheel', (e) => {
			if (e.shiftKey) return;
			if (!isNeoActive) return;
			pz.zoomWithWheel(e);
		});

		parent.parentElement.addEventListener('click', (e) => {
			if (!e.altKey) return;
			pz.zoomToPoint(3, e, { animate: true });
		});

		await CommonHelpers.pb.collection('engine_location').subscribe('*', function (e) {
			console.log('::REALTIME::\n', e);
		});
	});

	let togglePillar = false;
</script>

<svelte:window on:keydown={(e) => neoSwitcher(e, 'on')} on:keyup={(e) => neoSwitcher(e, 'off')} />

<div class="absolute flex flex-col justify-center items-end z-40 bottom-4 right-4 bg-slate-600/50 shadow-lg">
	<div class="flex flex-col px-3 py-4 space-y-4">
		<button on:click={() => (togglePillar = !togglePillar)} class=" px-4 py-2 rounded-md shadow-md hover:bg-orange-400 bg-orange-300">{togglePillar ? 'Show' : 'Hide'} Label</button>
		<button on:click={() => (togglePillar = !togglePillar)} class=" px-4 py-2 rounded-md shadow-md hover:bg-orange-400 bg-orange-300">{togglePillar ? 'Show' : 'Hide'} Pillar</button>
		<button on:click={() => (isNeoActive = !isNeoActive)} class=" px-4 py-2 rounded-md shadow-md hover:bg-red-400 bg-red-300">Move {isNeoActive ? 'Off' : 'On'} </button>
		<button on:click={pz.reset()} class="px-4 py-2 rounded-md shadow-md hover:bg-sky-400 bg-sky-300">Reset</button>
	</div>
	<div class="w-full flex justify-center items-center py-4 bg-slate-100">
		<button class="font-bold">X</button>
	</div>
</div>
<div class="manage-container overflow-auto bg-teal-300">
	<div id="base" class="base" bind:this={baseDOM} style="height: {tileSize * 16}px; width: {tileSize * 10}px;">
		<!-- BASE -->
		{#each base as row, indexR}
			{#each row as col, indexC}
				<div class="base-tile" class:!hidden={col == '0'} style="margin-left: {tileSize * indexC}px; margin-top: {tileSize * indexR}px; height: {tileSize}px; width: {tileSize}px;">
					<!-- <span class="tile-text">{col}</span> -->
				</div>
			{/each}
		{/each}

		<!-- AREA -->
		{#each area as row, indexR}
			<div id={row.id} class="area absolute flex justify-center items-center bg-green-400/40 border-[0.5px] border-orange-300" style="margin-left: {row.pos.x}px; margin-top: {row.pos.y}px; height: {row.size.h}px; width: {row.size.w}px;">
				<span class="tile-text text-xxs">{row.text}</span>
			</div>
		{/each}

		<!-- PILLAR -->
		{#each pillar as row, indexR}
			{#each row as col, indexC}
				{#if col !== '0'}
					<span class:hidden={togglePillar} class="absolute flex justify-center -top-1.5 -left-1.5 bg-slate-500 text-white w-3 h-3 rounded-full text-center items-center text-[4px]" style="margin-left: {tileSize * indexC}px; margin-top: {tileSize * indexR}px; ">{col}{indexR + 1}</span>
				{/if}
			{/each}
		{/each}

		<!-- ENGINE -->
		<!-- engineTile should have data loc, with default value or actual value -->
		<!-- so the defaultPosition is always set by loc.position value without checking -->
		{#each engineTile as { id, loc, esn }, index}
			<div on:neodrag:start={onDragStart} on:neodrag={onDrag} on:neodrag:end={onDragEnd} use:draggable={{ bounds: 'parent', disabled: isNeoActive, defaultPosition: { x: initialPosition.x, y: initialPosition.y * (index + 1) } }} class="engine">
				<span class="text-center text-[4px] break-words text-white">ESN {esn}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.base {
		@apply absolute bg-slate-300;
	}
	.base-tile {
		@apply absolute flex items-center justify-center border-[0.5px] border-dashed bg-slate-100;
	}
	.tile-text {
		@apply select-none text-center font-mono text-[8px];
	}

	.engine {
		@apply absolute flex h-2 w-8 items-center justify-center rounded bg-slate-600 p-3 shadow-lg;
	}
</style>
