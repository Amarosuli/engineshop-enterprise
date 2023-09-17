<div class="relative bg-white mx-4 mt-4 h-fit flex flex-col font-poppins justify-center items-start">
	<div class="flex flex-row px-6 pt-6 pb-4 justify-between w-full h-fit">
		<div class="flex flex-col flex-1">
			<slot />
		</div>
		<slot name="icon">
			<i class="hidden lg:block ri-service-fill ri-3x text-indigo-600" />
		</slot>
	</div>
	<div class="w-full">
		<slot name="extend" />
	</div>
</div>
