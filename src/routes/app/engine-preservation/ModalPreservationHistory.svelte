<script>
	import { Modal, List, Collapsible, Button, Img } from '$lib/components';
	import { CommonHelpers } from '$lib/utils/CommonHelpers';
	import { onMount } from 'svelte';

	import BiggerPicture from 'bigger-picture/svelte';
	import 'bigger-picture/css';

	function getImageInfo(src) {
		return new Promise((resolve, reject) => {
			let image = new Image();
			image.src = src;
			image
				.decode()
				.then(() => {
					resolve({ img: src, height: image.height, width: image.width });
				})
				.catch(() => {
					reject(new Error('image load error'));
				});
		});
	}

	function preview(e, src) {
		let bp = BiggerPicture({
			target: document.body
		});

		e.target.classList.add('cursor-wait');
		getImageInfo(src)
			.then((imageData) => {
				bp.open({
					items: [imageData],
					scale: 0.5
				});
			})
			.finally(() => {
				e.target.classList.remove('cursor-wait');
			});
	}

	import { modal$ } from '$lib/utils/Stores';

	export let engineId;
	export let user = null;

	let state = 'DEFAULT';

	async function getPreservationHistory(engineId) {
		let res = await fetch(`/api/preservation-history?engine_id=${engineId}`);
		let json = await res.json();

		return json;
	}

	let data = getPreservationHistory(engineId);

	onMount(async () => {
		state = 'LOADING';
		data = await getPreservationHistory(engineId);
		state = 'SUCCESS';
	});
</script>

<Modal.Root let:id id="preservation_history" position="right">
	<Modal.Header>
		<Modal.Title title="Preservation History" />
		<Modal.Action>
			<Modal.Close on:Close={() => modal$.hide(id)} />
		</Modal.Action>
	</Modal.Header>
	<Modal.Body>
		{#await data}
			<div class="inset-0 flex h-full w-full items-center justify-center gap-4 text-2xl font-bold">
				<svg role="status" class="-mt-px inline w-10 animate-spin fill-blue-600 text-blue-200 dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor" />
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill" />
				</svg>
				<span class="text-sm font-semibold text-slate-600">Loading . . .</span>
			</div>
		{:then result}
			<p class="m-4 rounded bg-blue-200 p-4 text-justify font-poppins text-xs shadow xl:p-8">
				Preservation History are the historycal engine preservation events. The detail of preservation data available to access from <strong> Dashbord > Engine List</strong> menu. <br /> <br /> The Engine
				List page also handle the creating new data and monitoring the schedule for which engine near the outdated preservation.
			</p>
			{#if result.preservationHistory.length === 0}
				<p class="mx-8 mb-2 p-2 text-center text-base font-bold">No Preservation Data</p>
			{/if}
			{#each result.preservationHistory as d}
				{@const imgThumb = CommonHelpers.getFileUrl(d.collectionId, d.id, d.tag, '100x0')}
				{@const imgFull = CommonHelpers.getFileUrl(d.collectionId, d.id, d.tag)}
				<Collapsible>
					<span slot="trigger">
						<div class="flex items-center justify-center gap-4">
							#{result.preservationHistory.length - d.history_number + 1}
							<Button.Event
								classes="btn btn_ghost rounded-lg bg-slate-50"
								title=""
								hidden={user !== null ? false : true}
								on:Event={() => modal$.show('update', { ...d, tagURL: CommonHelpers.getFileUrl(d.collectionId, d.id, d.tag), date_performed: d.date_performed.split(' ')[0] })}
								><i class="ri-pencil-line ri-1x" /></Button.Event>
							<Button.Event classes="btn btn_ghost rounded-lg bg-slate-50" title="" hidden={user !== null ? false : true} on:Event={() => modal$.show('confirm', d.id)}
								><i class="ri-delete-bin-line ri-1x text-red-400" /></Button.Event>
						</div>
					</span>
					<List.Item>
						<span>Tag:</span>
						<span class="flex justify-end">
							<a on:click|preventDefault={(e) => preview(e, imgFull)} href="/">
								<Img src={imgThumb} />
							</a>
						</span>
					</List.Item>
					<List.Item>
						<span>Duration:</span>
						<span class="text-right font-bold">{d.duration} Days</span>
					</List.Item>
					<List.Item>
						<span>Material:</span>
						<span class="text-right font-bold">{d.material}</span>
					</List.Item>
					<List.Item>
						<span>Performed At:</span>
						<span class="text-right font-bold">{d.date_performed.split(' ')[0]}</span>
					</List.Item>
				</Collapsible>
				<!-- <List.Item>
					<span>{d.date_performed.split(' ')[0]}</span>
					<span class="font-bold text-right">{d.duration} Days</span>
				</List.Item> -->
			{/each}
			<p class="w-full text-center">-- End of row --</p>
		{/await}
	</Modal.Body>
	<Modal.Footer>
		<Modal.Back on:Back={() => modal$.hide(id)} />
	</Modal.Footer>
</Modal.Root>
