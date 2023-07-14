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
         bgColor: 'bg-slate-700',
         hoverColor: 'hover:bg-slate-600'
      },
      success: {
         textColor: 'text-green-50',
         bgColor: 'bg-green-700',
         hoverColor: 'hover:bg-green-600'
      },
      danger: {
         textColor: 'text-red-50',
         bgColor: 'bg-red-700',
         hoverColor: 'hover:bg-red-600'
      },
      warning: {
         textColor: 'text-orange-50',
         bgColor: 'bg-orange-700',
         hoverColor: 'hover:bg-orange-600'
      },
      info: {
         textColor: 'text-sky-50',
         bgColor: 'bg-sky-700',
         hoverColor: 'hover:bg-sky-600'
      },
      light: {
         textColor: 'text-white-50',
         bgColor: 'bg-white-700',
         hoverColor: 'hover:bg-white-600'
      },
      dark: {
         textColor: 'text-dark-50',
         bgColor: 'bg-dark-700',
         hoverColor: 'hover:bg-dark-600'
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
            icon: 'ri:article-line'
         }
      ],
      manages: [
         {
            title: 'Engine List',
            href: '/manage/engine-list',
            icon: 'ri:article-line'
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
}

