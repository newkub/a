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
    
    // Badges
    'badge': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    'badge-primary': 'badge bg-button-default/10 text-button-default',
    'badge-neutral': 'badge bg-neutral-100 text-neutral-700',
    'badge-success': 'badge bg-state-success-default/10 text-state-success-default',
    'badge-error': 'badge bg-state-error-default/10 text-state-error-default',
    
    // Forms
    'input': 'w-full rounded-lg px-4 py-2 text-sm base-text base-border focus:ring-2 focus:ring-offset-2',
    'input-primary': 'input base-bg focus:border-button-default dark:focus:border-button-dark',
    'input-error': 'input base-bg focus:border-state-error-default dark:focus:border-state-error-dark',
    
    // Textarea
    'textarea-base': 'w-full p-3 bg-neutral-50 rounded-lg text-sm placeholder-neutral-400 focus:(outline-none ring-2 ring-button-default)',
    'textarea-error': 'ring-2 ring-state-error-default',
    'textarea-success': 'ring-2 ring-state-success-default',
    
    // Images
    'img': 'object-cover w-full h-full',
    'img-round': 'img rounded-lg border border-neutral-200',
    'img-circle': 'img rounded-full border border-neutral-200',
    'img-round-sm': 'img rounded-md border border-neutral-200',
    'img-round-lg': 'img rounded-xl border border-neutral-200',
    'img-hover': 'transition-transform duration-200 hover:(scale-105 shadow-lg)',
    
    
    // Cards
    'card': 'rounded-xl shadow-md overflow-hidden base-bg base-border',
    'card-hover': 'card hover:shadow-lg transition-shadow duration-200',
    
    // Navigation
    'nav-item': 'transition-colors hover:bg-nav-default active:bg-nav-dark dark:hover:bg-nav-dark dark:active:bg-nav-dark',
    'nav-active': 'bg-nav-dark dark:bg-nav-dark',
    
    // States
    'state-info': 'bg-state-info-default text-background-default dark:bg-state-info-dark dark:text-background-dark',
    'state-warning': 'bg-state-warning-default text-background-default dark:bg-state-warning-dark dark:text-background-dark',
    'state-error': 'bg-state-error-default text-background-default dark:bg-state-error-dark dark:text-background-dark'
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
        dark: '#1D4ED8'  // Changed to a darker blue for better contrast
      },
      state: {
        info: {
          default: '#0891B2',
          dark: '#0E7490'  // Darker cyan
        },
        warning: {
          default: '#D97706',
          dark: '#B45309'  // Darker orange
        },
        error: {
          default: '#DC2626',
          dark: '#B91C1C'  // Darker red
        },
        success: {
          default: '#22C55E',
          dark: '#15803D'  // Darker green
        }
      }
    },
    spacing: {
      small: '0.5rem',    // 8px
      medium: '1rem',     // 16px
      big: '1.5rem',      // 24px
    }
  }
})