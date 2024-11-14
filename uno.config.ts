import { defineConfig, presetUno, presetIcons, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: 'IBM Plex Sans Thai',
        handwriting: 'Caveat'
      }
    })
  ],
  shortcuts: {
    'layout-container': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    
    // Base elements
    'base-text': 'text-text-default dark:text-text-dark',
    'base-bg': 'bg-background-default dark:bg-background-dark',
    'base-border': 'border-border-default dark:border-border-dark',
    
    // Buttons
    'btn': 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:(outline-none ring-2 ring-offset-2) disabled:opacity-50',
    'btn-primary': 'btn bg-button-default text-white hover:(bg-button-dark shadow-lg) focus:ring-button-default active:scale-[0.98]',
    'btn-secondary': 'btn bg-white border border-neutral-200 text-neutral-700 hover:(bg-neutral-50 border-neutral-300 shadow-md) focus:ring-neutral-500 active:scale-[0.98]',
    'btn-outline': 'btn border-2 border-button-default text-button-default hover:(bg-button-default/10 border-button-dark text-button-dark shadow-md) focus:ring-button-default active:scale-[0.98]',
    'btn-ghost': 'btn text-neutral-600 hover:(bg-neutral-100 text-neutral-900) focus:ring-neutral-500 active:scale-[0.98]',
    'btn-danger': 'btn bg-state-error-default text-white hover:(bg-state-error-dark shadow-lg) focus:ring-state-error-default active:scale-[0.98]',
    'btn-success': 'btn bg-state-success-default text-white hover:(bg-state-success-dark shadow-lg) focus:ring-state-success-default active:scale-[0.98]',
    'btn-icon': 'mr-2',
    
    // Navigation
    'nav-item': 'transition-colors hover:bg-nav-default active:bg-nav-dark dark:hover:bg-nav-dark dark:active:bg-nav-dark',
    'nav-active': 'bg-nav-dark dark:bg-nav-dark',
  },
  theme: {
    colors: {
      active: {
        default: '#7C3AED',
        dark: '#9F67FF'
      },
      background: {
        default: '#FFFFFF',
        dark: '#111827'
      },
      text: {
        default: '#111827',
        dark: '#F9FAFB'
      },
      border: {
        default: '#E5E7EB',
        dark: '#374151'
      },
      nav: {
        default: '#F3F4F6',
        dark: '#F3F4F6'
      },
      button: {
        default: '#2563EB',
        dark: '#1D4ED8'
      }
    }
  }
})