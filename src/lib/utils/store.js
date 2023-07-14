import { writable } from "svelte/store";

// MODAL STORE
export const _modal = writable([])
export const _modalShow = (id) => {
   _modal.update(v => v = [...v, { id }])
}
export const _modalHide = (id) => {
   _modal.update(v => v = v.filter(x => x === id))
}


// TABLE STORE
export const _row = writable({})
export const _rowSet = (obj) => { _row.set(obj) }
export const _rowRem = () => { _row.set({}) }