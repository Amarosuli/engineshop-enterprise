
/**
 * tableConfig is definition of table column and it accessor
 */
export const tableConfig = [
   {
      header: 'Name',
      accessor: 'name'
   },
   {
      header: 'Description',
      accessor: 'description'
   },
   {
      header: 'Logo',
      accessor: 'logo',
      isImage: true
   },
   {
      header: 'IATA',
      accessor: 'code_IATA'
   },
   {
      header: 'ICAO',
      accessor: 'code_ICAO'
   }
]