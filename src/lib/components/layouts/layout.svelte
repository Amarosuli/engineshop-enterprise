<script>
	import { Container, Content, Header, Base, Notification, Window } from '$lib/components';

	export let user;
</script>

<Window />
<Base>
	<Container>
		<Header {user} />
		<Content>
			<slot />
		</Content>
		<!-- <Notification /> -->
	</Container>
</Base>
