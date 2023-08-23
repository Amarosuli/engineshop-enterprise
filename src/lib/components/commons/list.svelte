<script>
	export let title;
</script>

<div class="list-container">
	<div class="list-header">
		<h1 class="list-title">{title}</h1>
		<slot name="list-action" />
		<!-- <Btn title="Update" color="warning" hidden={data.user !== null ? false : true} on:click={() => modal$.show('update', $isDetail?.data)} /> -->
	</div>
	<div class="list-content">
		<slot name="list-content" />
		<!-- <div class="list-row">
         <span class="list-row-title">Customer Name: </span>
         <span class="list-row-content">{$isDetail?.data?.name}</span>
      </div>
      <div class="list-row">
         <span class="list-row-title">Description: </span>
         <span class="list-row-content">{$isDetail?.data?.description}</span>
      </div>
      <div class="list-row">
         <span class="list-row-title">Logo: </span>
         <span class="list-row-content">
            <Img
               className="object-scale-down h-10"
               src={$isDetail?.data?.logo ? CommonHelpers.getFileUrl($isDetail?.data?.collectionId, $isDetail?.data?.id, $isDetail?.data?.logo) : '/'}
               alt={$isDetail?.data?.logo}
               crossorigin="anonymous" />
         </span>
      </div>
      <div class="list-row">
         <span class="list-row-title">IATA Code: </span>
         <span class="list-row-content">{$isDetail?.data?.code_IATA}</span>
      </div>
      <div class="list-row">
         <span class="list-row-title">ICAO Code: </span>
         <span class="list-row-content">{$isDetail?.data?.code_ICAO}</span>
      </div> -->
	</div>
</div>
