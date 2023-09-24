<script>
	import { Stat } from '$lib/components';

	export let totalCustomers = 0;
</script>

<Stat.Root>
	<Stat.Title title="Total Customers" />
	<Stat.Value value="{totalCustomers} EA" />
	<Stat.Desc desc="Engine Models are categorize by it's varian." />
</Stat.Root>
