<script>
	let uhu = 'uhu';
	import { File } from '$lib/components';
</script>

<!-- 
   		if (file && file.type === 'application/pdf') {
			// convert to base64
			// FileReader function for read the file.
			let fileReader = new FileReader();
			let base64;
			// Onload of file read the file content
			fileReader.onload = function (fileLoadedEvent) {
				base64 = fileLoadedEvent.target.result;
				// Print data in console
				console.log(base64);
			};
			// Convert data to base64
			fileReader.readAsDataURL(file);
			return;
		}

 -->
<svelte:head>
	<title>PDF ME!!!</title>
</svelte:head>

<File accept=".pdf" />
