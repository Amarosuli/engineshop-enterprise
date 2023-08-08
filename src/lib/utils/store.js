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
      show: (id) => { update(v => v = [...v, { id }]) },
      hide: (id) => { update(v => v = v.filter(x => x.id !== id)) },
      reset: () => set([])
   }
}

export const modal$ = ModalStore()


// TABLE STORE - ROW
export const _row = writable({})
export const _rowSet = (obj) => { _row.set(obj) }
export const _rowRem = () => { _row.set({}) }
// TABLE STORE - SELECT
export const _selectedRows = writable({})
export const _setSelectedRows = (obj) => { _selectedRows.set(obj) }
export const _resSelectedRows = _row.set({})

// function TableStore() {
//    const rowStore = writable({})
//    const selectStore = writable({})

//    return {
//       subscribe,
//       set: (obj) => { set(obj) },
//       rem: set({}),
//       select: (obj) =>
//    }
// }

// export const table = TableStore()


export const realtimeEngineLocation = writable({})