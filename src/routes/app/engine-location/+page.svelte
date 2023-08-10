<script>
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { CommonSets } from '$lib/utils/CommonSets';

	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { Draggable } from '@neodrag/vanilla';
	// import { draggable } from '@neodrag/svelte';
	import Panzoom from '@panzoom/panzoom';

	export let data;

	let { engineList, engineLocation } = data;
	let engineTile = writable([]);
	$engineTile = engineList.map((value) => ({ ...value, loc: engineLocation.find(({ engine_id }) => engine_id === value.id) || null }));

	// $: console.log($engineTile);
	let pz,
		elArea,
		engineInstance,
		engineEl = [];
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
		if (val === 'on') {
			if (e.shiftKey) {
				isNeoActive = false;
			}
		}
		if (val === 'off') isNeoActive = true;
	}

	function onDragStart(e) {
		neoSwitcher(e, 'on');
		console.log('::DRAGSTART:: \n', e.detail);
	}

	function onDrag({ currentNode, offsetX, offsetY }) {
		console.log("::Trusted:: i'm moving");
		// let pos = { x: e.detail.offsetX, y: e.detail.offsetY };
		// console.log('::DRAGGING:: \n', pos);
	}

	/**
	 *
	 * @param {JSON} data
	 */
	async function updateData(data) {
		const formData = new FormData();
		formData.append('id', data.id);
		formData.append('x', data.position.x);
		formData.append('y', data.position.y);

		const res = await fetch('/app/engine-location?/update', {
			method: 'POST',
			body: formData
		});
		const json = await res.json();

		neoSwitcher('', 'off');
		// console.log('RESULT\n', JSON.stringify(json));
	}

	function onDragEnd(e) {
		console.log(e);
		let lastPosition = { x: e.offsetX, y: e.offsetY };
		let currentEl = e.currentNode;

		// Check Collision
		let inArea;
		elArea.forEach((area) => {
			if (isCollide(area, currentEl)) {
				inArea = area;
			}
		});

		// Update the position data
		let engineLocationData = {
			id: currentEl.id,
			position: lastPosition
			// location: inArea.id
		};

		updateData(engineLocationData);
	}

	function updatePosition(elementId, newPosition) {
		let target = document.getElementById(elementId);

		let targeto = engineEl.find(({ id }) => id === elementId);
		targeto.instance.updateOptions({ position: newPosition });
		return;
	}

	onMount(async () => {
		elArea = document.querySelectorAll('.map-area');
		engineInstance = document.querySelectorAll('.engine');

		engineInstance.forEach((eng) => {
			let engPosition = { x: eng.dataset.x, y: eng.dataset.y };
			engineEl.push({ id: eng.id, instance: new Draggable(eng, { position: engPosition, onDragEnd: onDragEnd }) });
		});

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

		/**
		 * new how to check if current client is who made the request
		 */
		CommonHelpers.pb.collection('engine_location').subscribe('*', function (e) {
			let { id, position } = e.record;
			updatePosition(id, position);
			// console.log('::REALTIME::\n', e);
		});
	});

	let togglePillar = false;
</script>

<svelte:document on:keydown|capture={(e) => neoSwitcher(e, 'on')} on:keyup={(e) => neoSwitcher(e, 'off')} />

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
	<div id="base" class="base" style="height: {CommonSets.tileSize * 16}px; width: {CommonSets.tileSize * 10}px;">
		<!-- BASE -->
		{#each CommonSets.Base as row, indexR}
			{#each row as col, indexC}
				<svelte:element this="div" class="map-base" class:!hidden={col == '0'} style="margin-left: {CommonSets.tileSize * indexC}px; margin-top: {CommonSets.tileSize * indexR}px; height: {CommonSets.tileSize}px; width: {CommonSets.tileSize}px;" />
				<!-- <div class="base-tile" class:!hidden={col == '0'} style="margin-left: {CommonSets.tileSize * indexC}px; margin-top: {CommonSets.tileSize * indexR}px; height: {CommonSets.tileSize}px; width: {CommonSets.tileSize}px;"> -->
				<!-- <span class="tile-text">{col}</span> -->
				<!-- </div> -->
			{/each}
		{/each}

		<!-- AREA -->
		{#each CommonSets.Area as row, indexR}
			<div id={row.id} class="map-area" style="margin-left: {row.pos.x}px; margin-top: {row.pos.y}px; height: {row.size.h}px; width: {row.size.w}px;">
				<span class="tile-text text-xxs">{row.text}</span>
			</div>
		{/each}

		<!-- PILLAR -->
		{#each CommonSets.Pillar as row, indexR}
			{#each row as col, indexC}
				{#if col !== '0'}
					<span class:hidden={togglePillar} class="map-pillar" style="margin-left: {CommonSets.tileSize * indexC}px; margin-top: {CommonSets.tileSize * indexR}px; ">{col}{indexR + 1}</span>
				{/if}
			{/each}
		{/each}

		<!-- ENGINE -->
		<!-- engineTile should have data loc, with default value or actual value -->
		<!-- so the defaultPosition is always set by loc.position value without checking -->
		{#each $engineTile as { id, loc, esn }, index}
			<div id={loc.id} data-x={loc.position?.x} data-y={loc.position?.y} class="engine {loc.id}">
				<span class="text-center text-[4px] break-words text-white">ESN {esn}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.base {
		@apply absolute bg-slate-300;
	}
	.map-base {
		@apply absolute flex items-center justify-center border-[0.5px] border-dashed bg-slate-100;
	}
	.map-area {
		@apply absolute flex items-center justify-center border-[0.5px] border-orange-300 bg-green-400/40;
	}
	.map-pillar {
		@apply absolute -left-1.5 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-slate-500 text-center text-[4px] text-white;
	}
	.tile-text {
		@apply select-none text-center font-mono text-[8px];
	}

	.engine {
		@apply absolute flex h-2 w-8 items-center justify-center rounded bg-slate-600 p-3 shadow-lg;
	}
</style>
