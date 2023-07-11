<script>
	import { Container, Content, Header, Base } from '$lib/components';
</script>

<Base>
	<Container>
		<Header />
		<Content>
			<slot />
		</Content>
	</Container>
</Base>
