<script>
	import { Collapsible, List } from '$lib/components';
	import { Preservation } from '$lib/utils/Classes';

	import { Stat } from '$lib/components';

	export let showOverDue = true;
	export let showNextDue = true;
	export let preservationHistory = [];
	export let engineList = [];

	let overDue = [];
	let nextDue = [];
	let lastRecord = preservationHistory.filter(({ history_number }) => history_number === 1);

	lastRecord.forEach((v) => {
		if (!v.isPreservable) return;
		let each = new Preservation(v.date_performed, v.duration);

		each.isExpired && overDue.push({ esn: v.esn, tag: `Expired since ${each.preservationTime}` });
		each.isReady && nextDue.push({ esn: v.esn, tag: `Ready to preserve ${each.preservationTime}` });
	});
</script>

{#if showOverDue && showNextDue}
	<Stat.Root>
		<Stat.Title title="Total Engine" />
		<Stat.Value value="{engineList.length} EA" />
		<Stat.Desc desc="Total engine available in Engineshop. Available means the actual engine still in Shop" />
		<svelte:fragment slot="icon">
			<i class="ri-home-6-fill ri-3x hidden text-indigo-600 lg:block" />
		</svelte:fragment>
	</Stat.Root>
	<Stat.Root>
		<Stat.Title title="Engine Monitored" />
		<Stat.Value value="{engineList.filter(({ isPreservable }) => isPreservable === true).length} EA" />
		<Stat.Desc desc="All Engine monitored only. Some old and unserviceable engine doesn't include to monitored." />
		<svelte:fragment slot="icon">
			<i class="ri-eye-2-fill ri-3x hidden text-indigo-600 lg:block" />
		</svelte:fragment>
	</Stat.Root>
{/if}
{#if showOverDue}
	<Stat.Root>
		<Stat.Title title="Engine Overdue" />
		<Stat.Value value="{overDue.length} EA" />
		<Stat.Desc desc="List of engine which preservation status already expired" />
		<svelte:fragment slot="icon">
			<i class="ri-pass-expired-fill ri-3x hidden text-indigo-600 lg:block" />
		</svelte:fragment>
		<div class:text-center={!overDue.length} class:pb-2={!overDue.length} slot="extend">
			{#if overDue.length === 0}
				<Stat.Title title="No Engine Overdue. Everything is good" />
			{:else}
				<Collapsible>
					<span slot="trigger">Detail</span>
					{#each overDue as over}
						<List.Item>
							<span class="text-xs">ESN {over.esn}</span>
							<span class="text-right text-xs">{over.tag}</span>
						</List.Item>
					{/each}
				</Collapsible>
			{/if}
		</div>
	</Stat.Root>
{/if}
{#if showNextDue}
	<Stat.Root>
		<Stat.Title title="Engine Nextdue" />
		<Stat.Value value="{nextDue.length} EA" />
		<Stat.Desc desc="List of engine should be prepared to perform preservation" />
		<svelte:fragment slot="icon">
			<i class="ri-pass-pending-fill ri-3x hidden text-indigo-600 lg:block" />
		</svelte:fragment>
		<div class:text-center={!nextDue.length} class:pb-2={!nextDue.length} slot="extend">
			{#if nextDue.length === 0}
				<Stat.Title title="No Engine Need to preserve." />
			{:else}
				<Collapsible>
					<span slot="trigger">Detail</span>
					{#each nextDue as next}
						<List.Item>
							<span class="text-xs">ESN {next.esn}</span>
							<span class="text-right text-xs">{next.tag}</span>
						</List.Item>
					{/each}
				</Collapsible>
			{/if}
		</div>
	</Stat.Root>
{/if}
