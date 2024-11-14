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
  theme: {
    colors: {
      primary: {
        light: '#818CF8',
        base: '#4F46E5',
        dark: '#3730A3'
      },
      secondary: {
        light: '#94A3B8',
        base: '#64748B',
        dark: '#475569'
      },
      neutral: {
        light: '#D1D5DB',
        base: '#6B7280',
        dark: '#374151'
      },
      success: {
        light: '#34D399',
        base: '#10B981',
        dark: '#059669'
      },
      warning: {
        light: '#FBBF24',
        base: '#F59E0B',
        dark: '#D97706'
      },
      error: {
        light: '#F87171',
        base: '#EF4444',
        dark: '#DC2626'
      },
      info: {
        light: '#60A5FA',
        base: '#3B82F6',
        dark: '#2563EB'
      },
      background: '#F9FAFB',
      surface: '#FFFFFF',
      border: '#E5E7EB'
    },
    shortcuts: {
      // Layout
      'layout-container': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      
      // Buttons
      'btn': 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      'btn-primary': 'btn bg-primary-base text-white hover:bg-primary-dark focus:ring-primary-base',
      'btn-secondary': 'btn bg-secondary-base text-white hover:bg-secondary-dark focus:ring-secondary-base',
      'btn-outline': 'btn border-2 border-primary-base text-primary-base hover:bg-primary-light hover:text-white focus:ring-primary-base',
      'btn-ghost': 'btn text-neutral-base hover:bg-neutral-light focus:ring-neutral-base',
      'btn-danger': 'btn bg-error-base text-white hover:bg-error-dark focus:ring-error-base',
      
      // Cards
      'card': 'bg-surface rounded-xl shadow-md overflow-hidden',
      'card-hover': 'card hover:shadow-lg transition-shadow duration-200',
      
      // Forms
      'input': 'w-full rounded-lg border border-neutral-light px-4 py-2 text-sm focus:border-primary-base focus:ring-2 focus:ring-primary-base focus:ring-offset-2',
      'input-error': 'input border-error-base focus:border-error-base focus:ring-error-base',
      'label': 'block text-sm font-medium text-neutral-base mb-1',
      'select': 'input appearance-none bg-no-repeat bg-right pr-10',
      'checkbox': 'rounded border-neutral-light text-primary-base focus:ring-primary-base',
      'radio': 'border-neutral-light text-primary-base focus:ring-primary-base',
      
      // Status
      'badge': 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      'badge-success': 'badge bg-success-light text-success-dark',
      'badge-error': 'badge bg-error-light text-error-dark',
      'badge-warning': 'badge bg-warning-light text-warning-dark',
      'badge-info': 'badge bg-info-light text-info-dark'
    }
  }
})