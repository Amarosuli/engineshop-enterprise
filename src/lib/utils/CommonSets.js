import { CommonHelpers } from '$lib/utils/CommonHelpers';

export class CommonSets {
   /**
    * Naming covension slightly refer to bootstrap
    * This is for ease the use of styling on all components
    */
   static ColorName = ['base', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'ghost'];

   /**
    * This color set use for styling base on 3 categories
    * Background color, text color, and hover color
    */
   static ColorSet = {
      base: {
         textColor: 'text-slate-50',
         bgColor: 'shadow bg-slate-600',
         hoverColor: 'hover:bg-slate-500'
      },
      success: {
         textColor: 'text-green-50',
         bgColor: 'shadow bg-green-600',
         hoverColor: 'hover:bg-green-500'
      },
      danger: {
         textColor: 'text-red-50',
         bgColor: 'shadow bg-red-600',
         hoverColor: 'hover:bg-red-500'
      },
      warning: {
         textColor: 'text-orange-50',
         bgColor: 'shadow bg-orange-600',
         hoverColor: 'hover:bg-orange-500'
      },
      info: {
         textColor: 'text-sky-50',
         bgColor: 'shadow bg-sky-600',
         hoverColor: 'hover:bg-sky-500'
      },
      light: {
         textColor: 'text-slate-800',
         bgColor: 'shadow bg-slate-200',
         hoverColor: 'hover:bg-slate-300'
      },
      dark: {
         textColor: 'text-white',
         bgColor: 'shadow bg-gray-600',
         hoverColor: 'hover:bg-gray-500'
      },
      ghost: {
         textColor: 'text-slate-800',
         bgColor: 'bg-none',
         hoverColor: 'hover:bg-slate-200'
      }
   };

   static version = {
      status: {
         DEVELOPMENT: 'DEVELOPMENT',
         PRODUCTION: 'PRODUCTION'
      },
      number: ''
   }

   /**
    * This is contain all menu that appear at homepage
    * Divide as 2 category Apps and Manage.
    * 1. Apps for the specific application
    * 2. Manage for handling data management
    */
   static MainMenu = {
      apps: [
         {
            title: 'Preservation Control',
            href: '/app/engine-preservation',
            icon: 'ri-timer-line',
            versionStatus: this.version.status.PRODUCTION
         },
         {
            title: 'Engine Location',
            href: '/app/engine-location',
            icon: 'ri-map-2-line',
            versionStatus: this.version.status.PRODUCTION
         },
         {
            title: 'Engine In Engine Out',
            href: '/app/engine-in-out',
            icon: 'ri-arrow-up-down-fill',
            versionStatus: this.version.status.PRODUCTION
         },
         {
            title: 'Surat Pengiriman',
            href: '/app/delivery-note',
            icon: 'ri-mail-send-fill',
            versionStatus: this.version.status.DEVELOPMENT
         }
      ],
      manages: [
         {
            title: 'Engine List',
            href: '/manage/engine-list',
            icon: 'https://ui-avatars.com/api/?name=Engine+list&background=random&size=30&bold=true&uppercase=false',
            versionStatus: this.version.status.PRODUCTION
         },
         {
            title: 'Engine Model',
            href: '/manage/engine-model',
            icon: 'https://ui-avatars.com/api/?name=Engine+model&background=random&size=30&bold=true&uppercase=false',
            versionStatus: this.version.status.PRODUCTION
         },
         {
            title: 'Engine Family',
            href: '/manage/engine-family',
            icon: 'https://ui-avatars.com/api/?name=Engine+family&background=random&size=30&bold=true&uppercase=false',
            versionStatus: this.version.status.PRODUCTION
         },
         {
            title: 'Customer',
            href: '/manage/customer',
            icon: 'https://ui-avatars.com/api/?name=Customer&background=random&size=30&bold=true&uppercase=false',
            versionStatus: this.version.status.PRODUCTION
         },
         {
            title: 'PDF Template',
            href: '/manage/pdf-template',
            icon: 'https://ui-avatars.com/api/?name=PDF&background=random&size=30&bold=true&uppercase=false',
            versionStatus: this.version.status.DEVELOPMENT
         },
         {
            title: 'Test',
            href: '/test',
            icon: 'https://ui-avatars.com/api/?name=Test&background=random&size=30&bold=true&uppercase=false',
            versionStatus: this.version.status.DEVELOPMENT
         }
      ]
   };

   /**
    * This contain all menu for header
    * Consist of Login, Logout, and Register (register maybe not use)
    */
   static HeaderLinks = [
      {
         title: 'Login',
         href: '/auth/login',
         color: 'base'
      },
      // {
      //    title: 'Logout',
      //    href: '/auth/logout',
      //    color: 'danger'
      // }
      // {
      //    title: 'Register',
      //    href: '/auth/register',
      //    color: 'info'
      // }
   ];

   /**
    * This contain of transition sets
    */
   static TransitionSet = {
      fadeIn: {
         duration: 300,
         base: 'transition-opacity ease-out duration-300',
         from: 'opacity-0',
         to: 'opacity-100'
      },

      fadeOut: {
         duration: 300,
         base: 'transition-opacity ease-in duration-300',
         from: 'opacity-100',
         to: 'opacity-0'
      },
      blurIn: {
         duration: 200,
         base: 'transition-all ease-out duration-200',
         from: 'bg-slate-700/0',
         // from: 'backdrop-blur-none bg-slate-700/0',
         to: 'bg-slate-700/70'
         // to: 'backdrop-blur-sm bg-slate-700/70'
      },
      blurOut: {
         duration: 200,
         base: 'transition-all ease-in duration-200',
         from: 'bg-slate-700/70',
         // from: 'backdrop-blur-sm bg-slate-700/70',
         to: 'bg-slate-700/0'
         // to: 'backdrop-blur-none bg-slate-700/0'
      },

      slideRightIn: {
         duration: 200,
         base: 'transition-all ease-out duration-200',
         from: '-right-full opacity-50',
         to: 'right-0 opacity-100'
      },
      slideRightOut: {
         duration: 200,
         base: 'transition-all ease-in duration-200',
         from: 'right-0 opacity-100',
         to: '-right-full opacity-0'
      },
      slideLeftIn: {
         duration: 200,
         base: 'transition-all ease-out duration-200',
         from: '-left-full opacity-50',
         to: 'left-0 opacity-100'
      },
      slideLeftOut: {
         duration: 200,
         base: 'transition-all ease-in duration-200',
         from: 'left-0 opacity-100',
         to: '-left-full opacity-0'
      },

      /**
       * @TODO make it like popin effect, curently just scale in and scale out
       */
      popIn: {
         duration: 200,
         base: 'transition-all ease-out duration-200',
         from: 'scale-0',
         to: 'scale-1'
      },
      popOut: {
         duration: 200,
         base: 'transition-all ease-in duration-200',
         from: 'scale-1 opacity-100',
         to: 'scale-0 opacity-0'
      }
   };

   /**
    * @MAP - ENGINE LOCATION
    */
   static Base = [
      ['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['0', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '0', '0', '1', '1'],
      ['1', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
      ['1', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
      ['1', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
      ['1', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
      ['0', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
      ['0', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
      ['0', '1', '1', '1', '1', '1', '0', '0', '0', '0'],
      ['0', '1', '1', '1', '1', '1', '0', '0', '0', '0']
   ];

   static Area = [
      {
         id: 'GAEM3K',
         pos: { x: 120, y: 0 },
         size: { w: 180, h: 120 },
         text: 'GAEM 3000'
      },
      {
         id: 'GAEM1K',
         pos: { x: 300, y: 0 },
         size: { w: 180, h: 120 },
         text: 'GAEM 1000'
      },
      {
         id: 'KITTING',
         pos: { x: 480, y: 0 },
         size: { w: 480, h: 120 },
         text: 'KITTING'
      },
      {
         id: 'SURPLUS',
         pos: { x: 960, y: 0 },
         size: { w: 120, h: 120 },
         text: 'SURPLUS'
      },
      {
         id: 'OLDCLEANING',
         pos: { x: 1080, y: 0 },
         size: { w: 120, h: 120 },
         text: 'OLD CLEANING'
      },
      {
         id: 'ROAD1',
         pos: { x: 120, y: 120 },
         size: { w: 1080, h: 120 },
         text: 'ROAD'
      },
      {
         id: 'ROAD2',
         pos: { x: 120, y: 600 },
         size: { w: 1080, h: 60 },
         text: 'ROAD'
      },
      {
         id: 'TOILET1',
         pos: { x: 120, y: 660 },
         size: { w: 120, h: 60 },
         text: 'TOILET'
      },
      {
         id: 'CUSTOMER',
         pos: { x: 240, y: 660 },
         size: { w: 40, h: 60 },
         text: 'CUSTOMER'
      },
      {
         id: 'EO',
         pos: { x: 280, y: 660 },
         size: { w: 80, h: 60 },
         text: 'EO'
      },
      {
         id: 'GEMENGAD',
         pos: { x: 420, y: 660 },
         size: { w: 60, h: 120 },
         text: 'GEMENGAD'
      },
      {
         id: 'EPC',
         pos: { x: 480, y: 660 },
         size: { w: 160, h: 60 },
         text: 'EPC'
      },
      {
         id: 'ROAD3',
         pos: { x: 360, y: 660 },
         size: { w: 60, h: 1260 },
         text: 'ROAD'
      },
      {
         id: 'GANTRY1',
         pos: { x: 360, y: 540 },
         size: { w: 120, h: 60 },
         text: 'GANTRY 1'
      },
      {
         id: 'GANTRY2',
         pos: { x: 360, y: 480 },
         size: { w: 120, h: 60 },
         text: 'GANTRY 2'
      },
      {
         id: 'GANTRY3',
         pos: { x: 360, y: 420 },
         size: { w: 120, h: 60 },
         text: 'GANTRY 3'
      },
      {
         id: 'GANTRY4',
         pos: { x: 360, y: 360 },
         size: { w: 120, h: 60 },
         text: 'GANTRY 4'
      },
      {
         id: 'GANTRY5',
         pos: { x: 360, y: 300 },
         size: { w: 120, h: 60 },
         text: 'GANTRY 5'
      },
      {
         id: 'GANTRY6',
         pos: { x: 360, y: 240 },
         size: { w: 120, h: 60 },
         text: 'GANTRY 6'
      },
      {
         id: 'BAYROAD',
         pos: { x: 320, y: 240 },
         size: { w: 40, h: 360 },
         text: 'BAY ROAD'
      },
      {
         id: 'ROAD3',
         pos: { x: 480, y: 240 },
         size: { w: 40, h: 360 },
         text: 'ROAD 3'
      },
      {
         id: 'ROAD4',
         pos: { x: 1040, y: 240 },
         size: { w: 40, h: 360 },
         text: 'ROAD'
      },
      {
         id: 'BAY6',
         pos: { x: 240, y: 240 },
         size: { w: 80, h: 60 },
         text: 'BAY 6'
      },
      {
         id: 'BAY5',
         pos: { x: 240, y: 300 },
         size: { w: 80, h: 60 },
         text: 'BAY 5'
      },
      {
         id: 'BAY4',
         pos: { x: 240, y: 360 },
         size: { w: 80, h: 60 },
         text: 'BAY 4'
      },
      {
         id: 'BAY3',
         pos: { x: 240, y: 420 },
         size: { w: 80, h: 60 },
         text: 'BAY 3'
      },
      {
         id: 'BAY2',
         pos: { x: 240, y: 480 },
         size: { w: 80, h: 60 },
         text: 'BAY 2'
      },
      {
         id: 'BAY1',
         pos: { x: 240, y: 540 },
         size: { w: 80, h: 60 },
         text: 'BAY 1'
      }
   ];

   static Pillar = [
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', 'H', 'I', 'J'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0'],
      ['0', 'A', 'B', 'C', 'D', 'E', 'F', '0', '0', '0', '0']
   ];

   static LocationTag = [
      ['0', 'A1A2B1B2', 'B1B2C1C2', 'C1C2D1D2', 'D1D2E1E2', 'E1E2F1F2', 'F1F2G1G2', 'G1G2H1H2', 'H1H2I1I2', 'I1I2J1J2'],
      ['0', 'A2A3B2B3', 'B2B3C2C3', 'C2C3D2D3', 'D2D3E2E3', 'E2E3F2F3', 'F2F3G2G3', 'G2G3H2H3', 'H2H3I2I3', 'I2I3J2J3'],
      ['0', 'A3A4B3B4', 'B3B4C3C4', 'C3C4D3D4', 'D3D4E3E4', 'E3E4F3F4', 'F3F4G3G4', 'G3G4H3H4', 'H3H4I3I4', 'I3I4J3J4'],
      ['0', 'A4A5B4B5', 'B4B5C4C5', 'C4C5D4D5', 'D4D5E4E5', 'E4E5F4F5', 'F4F5G4G5', 'G4G5H4H5', 'H4H5I4I5', 'I4I5J4J5'],
      ['0', 'A5A6B5B6', 'B5B6C5C6', 'C5C6D5D6', 'D5D6E5E6', 'E5E6F5F6', 'F5F6G5G6', 'G5G6H5H6', 'H5H6I5I6', 'I5I6J5J6'],
      ['0', 'A6A7B6B7', 'B6B7C6C7', 'C6C7D6D7', 'D6D7E6E7', 'E6E7F6F7', 'F6F7G6G7', 'G6G7H6H7', 'H6H7I6I7', 'I6I7J6J7'],
      ['_7_8_7_8', 'A7A8B7B8', 'B7B8C7C8', 'C7C8D7D8', 'D7D8E7E8', 'E7E8F7F8', 'F7F8G7G8', 'G7G8H7H8', 'H7H8I7I8', 'I7I8J7J8'],
      ['_8_9_8_9', 'A8A9B8B9', 'B8B9C8C9', 'C8C9D8D9', 'D8D9E8E9', 'E8E9F8F9', '0', '0', 'H8H9I8I9', 'I8I9J8J9'],
      ['_9_10_9_10', 'A9A10B9B10', 'B9B10C9C10', 'C9C10D9D10', 'D9D10E9E10', 'E9E10F9F10', '0', '0', '0', '0'],
      ['_10_11_10_11', 'A10A11B10B11', 'B10B11C10C11', 'C10C11D10D11', 'D10D11E10E11', 'E10E11F10F11', '0', '0', '0', '0'],
      ['_11_12_11_12', 'A11A12B11B12', 'B11B12C11C12', 'C11C12D11D12', 'D11D12E11E12', 'E11E12F11F12', '0', '0', '0', '0'],
      ['_12_13_12_13', 'A12A13B12B13', 'B12B13C12C13', 'C12C13D12D13', 'D12D13E12E13', 'E12E13F12F13', '0', '0', '0', '0'],
      ['0', 'A13A14B13B14', 'B13B14C13C14', 'C13C14D13D14', 'D13D14E13E14', 'E13E14F13F14', '0', '0', '0', '0'],
      ['0', 'A14A15B14B15', 'B14B15C14C15', 'C14C15D14D15', 'D14D15E14E15', 'E14E15F14F15', '0', '0', '0', '0'],
      ['0', 'A15A16B15B16', 'B15B16C15C16', 'C15C16D15D16', 'D15D16E15E16', 'E15E16F15F16', '0', '0', '0', '0'],
      ['0', 'A16A17B16B17', 'B16B17C16C17', 'C16C17D16D17', 'D16D17E16E17', 'E16E17F16F17', '0', '0', '0', '0']
   ];

   static initialPosition = {
      x: 45,
      y: 23
   };

   static tileSize = 120;
}
