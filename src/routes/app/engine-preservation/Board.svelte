<script>
	import * as List from '$lib/components/commons/List';
	import Collapsible from '$lib/components/commons/Collapsible/Collapsible.svelte';

	import { Search, Select, Table, Text, Menu, Switch, Stat, Button, TextArea, Btn } from '$lib/components';

	export let data;
</script>

<Stat.Root>
	<Stat.Title title="Total Engine" />
	<Stat.Value value="{data.length} EA" />
	<Stat.Desc desc="Total engine available in Engineshop" />
	<svelte:fragment slot="icon">
		<i class="hidden lg:block ri-home-6-fill ri-3x text-indigo-600" />
	</svelte:fragment>
</Stat.Root>
<Stat.Root>
	<Stat.Title title="Engine Monitored" />
	<Stat.Value value="{data.filter(({ isPreservable }) => isPreservable === true).length} EA" />
	<Stat.Desc desc="Engine whose validity preservation will be monitored" />
	<svelte:fragment slot="icon">
		<i class="hidden lg:block ri-eye-2-fill ri-3x text-indigo-600" />
	</svelte:fragment>
</Stat.Root>
<Stat.Root>
	<Stat.Title title="Engine Overdue" />
	<Stat.Value value="{data.length} EA" />
	<Stat.Desc desc="List of engine which preservation status already expired" />
	<svelte:fragment slot="icon">
		<i class="hidden lg:block ri-pass-expired-fill ri-3x text-indigo-600" />
	</svelte:fragment>
	<div class="flex justify-center pb-2" slot="extend">
		<Stat.Title title="No Engine Overdue. Everything is good" />
	</div>
</Stat.Root>
<Stat.Root>
	<Stat.Title title="Engine Nextdue" />
	<Stat.Value value="{data.length} EA" />
	<Stat.Desc desc="List of engine should be prepared to perform preservation" />
	<svelte:fragment slot="icon">
		<i class="hidden lg:block ri-pass-pending-fill ri-3x text-indigo-600" />
	</svelte:fragment>
	<div slot="extend">
		<Collapsible>
			<span slot="trigger">Detail</span>
			<List.Item>
				<span class="text-xs">ESN 888888</span>
				<span class="text-xs text-right">Expired in 2 Days</span>
			</List.Item>
			<List.Item>
				<span class="text-xs">ESN 888888</span>
				<span class="text-xs text-right">Expired in 2 Days</span>
			</List.Item>
			<List.Item>
				<span class="text-xs">ESN 888888</span>
				<span class="text-xs text-right">Expired in 2 Days</span>
			</List.Item>
			<List.Item>
				<span class="text-xs">ESN 888888</span>
				<span class="text-xs text-right">Expired in 2 Days</span>
			</List.Item>
			<List.Item>
				<span class="text-xs">ESN 888888</span>
				<span class="text-xs text-right">Expired in 2 Days</span>
			</List.Item>
		</Collapsible>
	</div>
</Stat.Root>
