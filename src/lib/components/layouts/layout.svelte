<script>
	import { Container, Content, Header, Base, Notification, Window } from '$lib/components';

	export let user;
</script>

<Window />
<!-- Base: relative -->
<Base>
	<!-- Container: absolute flex -->
	<Container>
		<Header {user} />
		<Content>
			<slot />
		</Content>
		<!-- <Notification /> -->
	</Container>
</Base>
