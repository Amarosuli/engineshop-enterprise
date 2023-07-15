export const escHandler = (e) => {
   if (!e) {
      return;
   }

   if (e.keyCode === 27) {
      // _modalHide(id);
   }
};

export const CPOJOs = (obj) => {
   return structuredClone(obj)
}