import { randomHexColor } from '$lib/utils/func'

export class CommonSets {
   /** 
    * Naming covension slightly refer to bootstrap
    * This is for ease the use of styling on all components
   */
   static ColorName = ['base', 'success', 'danger', 'warning', 'info', 'light', 'dark']

   /** 
    * This color set use for styling base on 3 categories
    * Background color, text color, and hover color
   */
   static ColorSet = {
      base: {
         textColor: 'text-slate-50',
         bgColor: 'bg-slate-600',
         hoverColor: 'hover:bg-slate-500'
      },
      success: {
         textColor: 'text-green-50',
         bgColor: 'bg-green-600',
         hoverColor: 'hover:bg-green-500'
      },
      danger: {
         textColor: 'text-red-50',
         bgColor: 'bg-red-600',
         hoverColor: 'hover:bg-red-500'
      },
      warning: {
         textColor: 'text-orange-50',
         bgColor: 'bg-orange-600',
         hoverColor: 'hover:bg-orange-500'
      },
      info: {
         textColor: 'text-sky-50',
         bgColor: 'bg-sky-600',
         hoverColor: 'hover:bg-sky-500'
      },
      light: {
         textColor: 'text-white-50',
         bgColor: 'bg-white-600',
         hoverColor: 'hover:bg-white-500'
      },
      dark: {
         textColor: 'text-gray-50',
         bgColor: 'bg-gray-600',
         hoverColor: 'hover:bg-gray-500'
      }
   };

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
            href: '/',
            icon: 'ri-timer-line',
         },
         {
            title: 'Engine In Engine Out',
            href: '/app/engine-in-out',
            icon: 'ri-arrow-up-down-fill',
         },
      ],
      manages: [
         {
            title: 'Engine List',
            href: '/manage/engine-list',
            icon: 'https://ui-avatars.com/api/?name=Engine+list&background=random&size=30&bold=true&uppercase=false'
            // icon: 'ri:article-line'
         },
         {
            title: 'Engine Model',
            href: '/manage/engine-model',
            icon: 'https://ui-avatars.com/api/?name=Engine+model&background=random&size=30&bold=true&uppercase=false'
            // icon: 'ri:article-line'
         },
         {
            title: 'Engine Family',
            href: '/manage/engine-family',
            icon: 'https://ui-avatars.com/api/?name=Engine+family&background=random&size=30&bold=true&uppercase=false'
            // icon: 'ri:article-line'
         },
         {
            title: 'Customer',
            href: '/manage/customer',
            icon: 'https://ui-avatars.com/api/?name=Customer&background=random&size=30&bold=true&uppercase=false'
            // icon: 'ri:article-line'
         },
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
      {
         title: 'Logout',
         href: '/auth/logout',
         color: 'danger'
      },
      {
         title: 'Register',
         href: '/auth/register',
         color: 'info'
      }
   ];

   /**
    * This contain of transition sets
    */
   static TransitionSet = {
      fadeIn : {
         duration: 300,
         base: 'transition-opacity ease-out duration-300',
         from: 'opacity-0',
         to: 'opacity-100'
      },

      fadeOut : {
         duration: 300,
         base: 'transition-opacity ease-in duration-300',
         from: 'opacity-100',
         to: 'opacity-0'
      },
      blurIn : {
         duration: 200,
         base: 'transition-all ease-out duration-200',
         from: 'backdrop-blur-none bg-slate-700/0',
         to: 'backdrop-blur-sm bg-slate-700/70'
      },
      blurOut : {
         duration: 200,
         base: 'transition-all ease-in duration-200',
         from: 'backdrop-blur-sm bg-slate-700/70',
         to: 'backdrop-blur-none bg-slate-700/0'
      },

      slideRightIn : {
         duration: 200,
         base: 'transition-all ease-out duration-200',
         from: '-right-full opacity-50',
         to: 'right-0 opacity-100'
      },
      slideRightOut : {
         duration: 200,
         base: 'transition-all ease-in duration-200',
         from: 'right-0 opacity-100',
         to: '-right-full opacity-0'
      },
      slideLeftIn : {
         duration: 200,
         base: 'transition-all ease-out duration-200',
         from: '-left-full opacity-50',
         to: 'left-0 opacity-100'
      },
      slideLeftOut : {
         duration: 200,
         base: 'transition-all ease-in duration-200',
         from: 'left-0 opacity-100',
         to: '-left-full opacity-0'
      },

      /**
       * @TODO make it like popin effect, curently just scale in and scale out
       */
      popIn : {
         duration: 200,
         base: 'transition-all ease-out duration-200',
         from: 'scale-0',
         to: 'scale-1'
      },
      popOut : {
         duration: 200,
         base: 'transition-all ease-in duration-200',
         from: 'scale-1 opacity-100',
         to: 'scale-0 opacity-0'
      },
   }


}

