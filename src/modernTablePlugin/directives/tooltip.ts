import type { Directive } from 'vue'

const TOOLTIP_GAP = 10

interface CustomHTMLElement extends HTMLElement {
  tooltipEl: HTMLDivElement
  __UpdateTooltipHandler__: () => void
}

function createTooltipDiv(value: string) {
  const el = document.createElement('div')
  el.classList.add('modern-table-tooltip')
  el.innerText = value
  return el
}

function updateTooltipPos(el: CustomHTMLElement) {
  const elPos = el.getBoundingClientRect()
  const tooltipElPos = el.tooltipEl.getBoundingClientRect()

  let left = Math.max(elPos.left - tooltipElPos.width / 2 + elPos.width / 2, 0)
  let top = elPos.top - TOOLTIP_GAP - tooltipElPos.height

  if (left + tooltipElPos.width > window.innerWidth) {
    left = window.innerWidth - tooltipElPos.width
  }
  if (top < 0 && elPos.bottom + TOOLTIP_GAP + tooltipElPos.height < window.innerHeight) {
    top = elPos.bottom + TOOLTIP_GAP
  }

  el.tooltipEl.style.left = left.toString() + 'px'
  el.tooltipEl.style.top = top.toString() + 'px'
}

const tooltipDirective: Directive = {
  mounted: (el: CustomHTMLElement, binding) => {
    const vueScope = Object.keys(el.dataset).find((k) => k.startsWith('v-'))
    el.__UpdateTooltipHandler__ = () => updateTooltipPos(el)
    // Timeout to wait for icons fonts loading (FontAwesome, Google Icons, etc)
    setTimeout(() => {
      el.tooltipEl = createTooltipDiv(binding.value)
      if (vueScope) el.tooltipEl.dataset[vueScope] = ''
      el.after(el.tooltipEl)
      el.__UpdateTooltipHandler__()
      el.addEventListener('pointerenter', el.__UpdateTooltipHandler__)
    }, 100)
  },
  unmounted: (el: CustomHTMLElement) => {
    if (el.tooltipEl) el.tooltipEl.remove()
    el.removeEventListener('pointerenter', el.__UpdateTooltipHandler__)
  }
}

export default tooltipDirective
