
export const fadeIn = {
   duration: 300,
   base: 'transition-opacity ease-out duration-300',
   from: 'opacity-0',
   to: 'opacity-100'
}

export const fadeOut = {
   duration: 300,
   base: 'transition-opacity ease-in duration-300',
   from: 'opacity-100',
   to: 'opacity-0'
}
export const blurIn = {
   duration: 200,
   base: 'transition-all ease-out duration-200',
   from: 'backdrop-blur-none bg-slate-700/0',
   to: 'backdrop-blur-sm bg-slate-700/70'
}
export const blurOut = {
   duration: 200,
   base: 'transition-all ease-in duration-200',
   from: 'backdrop-blur-sm bg-slate-700/70',
   to: 'backdrop-blur-none bg-slate-700/0'
}

export const slideRightIn = {
   duration: 200,
   base: 'transition-all ease-out duration-200',
   from: '-right-full opacity-50',
   to: 'right-0 opacity-100'
}
export const slideRightOut = {
   duration: 200,
   base: 'transition-all ease-in duration-200',
   from: 'right-0 opacity-100',
   to: '-right-full opacity-0'
}
export const slideLeftIn = {
   duration: 200,
   base: 'transition-all ease-out duration-200',
   from: '-left-full opacity-50',
   to: 'left-0 opacity-100'
}
export const slideLeftOut = {
   duration: 200,
   base: 'transition-all ease-in duration-200',
   from: 'left-0 opacity-100',
   to: '-left-full opacity-0'
}

/**
 * @TODO make it like popin effect, curently just scale in and scale out
 */
export const popIn = {
   duration: 200,
   base: 'transition-all ease-out duration-200',
   from: 'scale-0',
   to: 'scale-1'
}
export const popOut = {
   duration: 200,
   base: 'transition-all ease-in duration-200',
   from: 'scale-1 opacity-100',
   to: 'scale-0 opacity-0'
}
