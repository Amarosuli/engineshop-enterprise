<script>
	export let isSelected;
</script>

<input type="checkbox" data-isChecked={$isSelected} bind:checked={$isSelected} />
