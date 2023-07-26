export const escHandler = (e) => {
   if (!e) {
      return;
   }

   if (e.keyCode === 27) {
      // _modalHide(id);
   }
};

export const CPOJOs = async (obj) => {
   return await structuredClone(obj)
}

export const randomHexColor = () => {
   let n = (Math.random() * 0xfffff * 1000000).toString(16);
   return '#' + n.slice(0, 6);
};