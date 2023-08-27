import { writable, get, derived } from "svelte/store";

// MODAL STORE
function ModalStore() {
   const store = writable([])
   const { set, subscribe, update } = store

   const modalArray = []
   return {
      subscribe,
      isConfirm: derived(store, $store => $store.find(v => v.id === 'confirm')),
      isDelete: derived(store, $store => $store.find(v => v.id === 'delete')),
      isUpdate: derived(store, $store => $store.find(v => v.id === 'update')),
      isCreate: derived(store, $store => $store.find(v => v.id === 'create')),
      isDetail: derived(store, $store => $store.find(v => v.id === 'detail')),
      show: (id, data) => {
         update(v => v = [...v, { id, data: data || null }])
      },
      hide: (id) => { update(v => v = v.filter(x => x.id !== id)) },
      reset: () => set([])
   }
}

export const modal$ = ModalStore()


// TABLE STORE - ROW
export const _row = writable({})
export const _rowSet = (obj) => { _row.set(obj) }
export const _rowRem = () => { _row.set({}) }

function RowTableStore() {
   const { set, subscribe, update } = writable({})

   return {
      subscribe,
      onClick: (obj) => { set(obj) },
      reset: () => { set({}) }
   }
}

export const row$ = RowTableStore()