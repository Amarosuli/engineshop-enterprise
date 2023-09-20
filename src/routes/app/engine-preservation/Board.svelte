<script>
	import * as List from '$lib/components/commons/List';
	import Collapsible from '$lib/components/commons/Collapsible/Collapsible.svelte';
	import { Preservation } from '$lib/utils/Classes';

	import { Stat } from '$lib/components';

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

<Stat.Root>
	<Stat.Title title="Total Engine" />
	<Stat.Value value="{engineList.length} EA" />
	<Stat.Desc desc="Total engine available in Engineshop" />
	<svelte:fragment slot="icon">
		<i class="hidden lg:block ri-home-6-fill ri-3x text-indigo-600" />
	</svelte:fragment>
</Stat.Root>
<Stat.Root>
	<Stat.Title title="Engine Monitored" />
	<Stat.Value value="{engineList.filter(({ isPreservable }) => isPreservable === true).length} EA" />
	<Stat.Desc desc="Engine whose validity preservation will be monitored" />
	<svelte:fragment slot="icon">
		<i class="hidden lg:block ri-eye-2-fill ri-3x text-indigo-600" />
	</svelte:fragment>
</Stat.Root>
<Stat.Root>
	<Stat.Title title="Engine Overdue" />
	<Stat.Value value="{overDue.length} EA" />
	<Stat.Desc desc="List of engine which preservation status already expired" />
	<svelte:fragment slot="icon">
		<i class="hidden lg:block ri-pass-expired-fill ri-3x text-indigo-600" />
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
						<span class="text-xs text-right">{over.tag}</span>
					</List.Item>
				{/each}
			</Collapsible>
		{/if}
	</div>
</Stat.Root>
<Stat.Root>
	<Stat.Title title="Engine Nextdue" />
	<Stat.Value value="{nextDue.length} EA" />
	<Stat.Desc desc="List of engine should be prepared to perform preservation" />
	<svelte:fragment slot="icon">
		<i class="hidden lg:block ri-pass-pending-fill ri-3x text-indigo-600" />
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
						<span class="text-xs text-right">{next.tag}</span>
					</List.Item>
				{/each}
			</Collapsible>
		{/if}
	</div>
</Stat.Root>
