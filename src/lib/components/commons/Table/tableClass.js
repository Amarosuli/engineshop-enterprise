import { createTable, createRender } from 'svelte-headless-table';
import { addSortBy, addTableFilter, addSelectedRows, addHiddenColumns, addDataExport } from 'svelte-headless-table/plugins';

import SelectCell from './selectCell.svelte';
import ImageCell from './imageCell.svelte';

export class SuperTable {
   cols = [];
   rowNumber = 0;

   constructor(data, colArray, options) {
      this.options = options
      this.table = createTable(data, {
         sort: addSortBy({ disableMultiSort: false }),
         tableFilter: addTableFilter(),
         select: addSelectedRows(),
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
      /**
       * define select column and it's plugin
       */
      const ColSelect = {
         id: 'selected',
         header: ({ row }, { pluginStates }) => {
            const { allRowsSelected } = pluginStates.select;
            return createRender(SelectCell, { isSelected: allRowsSelected });
         },
         cell: ({ row }, { pluginStates }) => {
            const { isSelected } = pluginStates.select.getRowState(row);
            return createRender(SelectCell, { isSelected });
         },
         plugins: {
            export: { exclude: true }
         }
      };

      /**
       * define order column, i'm sure there's feature to do this
       * but i cant find it so i only knew this way (the sort plugin works).
       */

      const ColOrder = {
         id: 'order',
         header: 'No',
         cell: ({ row }) => {
            return parseInt(row.id) + 1;
         },
         accessor: () => {
            return (this.rowNumber += 1);
         },
         plugins: {
            sort: { invert: true }
         }
      };

      /**
       * check if there's image to display
       * so we add costum createRender with ImageCell components
       */
      colArray = colArray.map((v, index) => {
         if (v.isImage === true) {
            v.cell = ({ row }) => {
               let column = v.accessor;
               return createRender(ImageCell, { row, column });
            };
            return v;
         }
         return v;
      });

      /**
       * recreate the array to include the plugin
       * then creating table.column()
       * only data that work with table.column
       */
      colArray.forEach((v, index) => {
         v = { ...v, plugins: plugin };
         this.cols[index] = this.table.column(v);
      });

      /**
       * add the select column and order column with unshift
       * so the array will insert to the first index
       */
      this.cols.unshift(this.table.column(ColOrder));
      if (this.options.rowSelector) {
         this.cols.unshift(this.table.display(ColSelect));
      }
      this.rowNumber = 0;
   };
}