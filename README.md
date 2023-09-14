# Engineshop Enterprise

Everything you might wonder about this project, go to [`Coding Journey | Engineshop Enterprise`](https://youtube.com/playlist?list=PLTACq48s0qNoHXsfwrp3VMvhfItaiPh6B&si=rwKu44dMEXhcEyJr).

## Tech

Here some technologies that i used in this project.

1. Framework [`SvelteKit`](https://kit.svelte.dev/) v4.0.0
2. Database ([`Pocketbase`](https://pocketbase.io/))
3. Styling ([`TailwindCSS`](https://tailwindcss.com/))
4. Transition ([`Svelte Transition Classes`](https://github.com/rmarscher/svelte-transition-classes))
5. Form and Data Validation ([`Zod`](https://zod.dev/) & [`Superform`](https://superforms.rocks/))
6. Table ([`Svelte Headless Table`](https://svelte-headless-table.bryanmylee.com/))
7. Map Interactivity ([`NeoDrag vanilla`](https://www.neodrag.dev/docs/vanilla) & [`Panzoom`](https://github.com/timmywil/panzoom))
8. Date ([`DayJS`](https://day.js.org/))
9. Icon ([`Remixicon`](https://remixicon.com/), [`Iconify`](https://iconify.design/), & [`UI Avatar`](https://ui-avatars.com))

Node Version v18.15.0

## Ask Me

## Notes

Here my costum query for checking if last engine status from engine_availability collection is INCOMING or OUTGOING.

```SQL
-- FULL
WITH EH AS (
SELECT engine_availability.id, engine_availability.engine_id, engine_availability.date_performed, engine_availability.status, (ROW_NUMBER() OVER(partition BY engine_availability.engine_id ORDER BY engine_availability.created DESC)) AS HistoryNumber FROM engine_availability )
SELECT EH.engine_id, EH.status, (ROW_NUMBER() OVER()) AS id FROM EH WHERE HistoryNumber=1
```

```SQL
-- QUERY PROCESS USE PB API HELPERS WITH FILTER HistoryNumber=1
SELECT engine_availability.id, engine_availability.engine_id, engine_availability.date_performed, engine_availability.status, (ROW_NUMBER() OVER(partition BY engine_availability.engine_id ORDER BY engine_availability.created DESC)) AS HistoryNumber FROM engine_availability
```

```SQL
-- SAMPLE WITH JOIN to engine_list collection (but it already covered by API HELPERS OPTION expand)
SELECT engine_availability.id, engine_availability.engine_id, engine_availability.status, engine_availability.date_performed, engine_list.esn, (ROW_NUMBER() OVER(partition BY engine_availability.engine_id ORDER BY engine_availability.created DESC)) AS HistoryNumber FROM engine_availability LEFT JOIN engine_list ON engine_list.id = engine_availability.engine_id
```
