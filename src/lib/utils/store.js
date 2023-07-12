import { writable } from "svelte/store";

// MODAL STORE
export const _modal = writable([])
export const _modalShow = (id) => {
   _modal.update(v => v = [...v, { id }])
}
export const _modalHide = (id) => {
   _modal.update(v => v = v.filter(x => x === id))
}