export class SuperTable {
   cols = [];

   constructor(data, colArray) {
      this.table = createTable(data, {
         sort: addSortBy({ disableMultiSort: false }),
         tableFilter: addTableFilter(),
         selected: addSelectedRows(),
         hidden: addHiddenColumns(),
         export: addDataExport()
      });
      this.plugins = {
         sort: { invert: true },
         tableFilter: { exclude: false }
      };
      this.createColsArray(colArray, this.plugins);
      this.init = this.table.createViewModel(this.table.createColumns(this.cols));
      this.plugin = this.init.pluginStates;
   }

   createColsArray = (colArray, plugin) => {
      const ColSelect = {
         id: 'selected',
         header: '',
         cell: ({ row }, { pluginStates }) => {
            const { isSelected } = pluginStates.selected.getRowState(row);
            return createRender(SelectCell, {
               isSelected
            });
         }
      };
      const ColOrder = {
         id: 'order',
         header: 'No',
         cell: ({ row }) => {
            let rowNumber = parseInt(row.id) + 1;
            return rowNumber;
         },
         plugins: plugin
      };

      colArray.forEach((v, index) => {
         v = { ...v, plugin };
         this.cols[index] = this.table.column(v);
      });
      this.cols.unshift(this.table.column(ColOrder));
      this.cols.unshift(this.table.display(ColSelect));
   };
}