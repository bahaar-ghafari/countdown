import { Injectable, ElementRef } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TextFittingAlgorithmService {
  constructor() {}

  adjustFontSizeToFit(element: ElementRef, container?: ElementRef) {
    const containerWidth = container
      ? container.nativeElement.clientWidth
      : window.innerWidth
    const textElement = element.nativeElement

    const defaultFontSize = 5

    textElement.style.fontSize = `${defaultFontSize}rem`

    let textWidth = this.getTextWidth(textElement, `${defaultFontSize}rem`)
    let ratio = containerWidth / textWidth 

    let newFontSize = defaultFontSize * ratio * 0.95

    textElement.style.fontSize = `${newFontSize}rem`
  }

  private getTextWidth(element: HTMLElement, fontSize: string): number {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')!

    const computedStyles = window.getComputedStyle(element)

    context.font = `${computedStyles.fontWeight} ${fontSize} ${computedStyles.fontFamily}`

    return context.measureText(element.innerText).width
  }

  public adjustFontSizeOnTextChange(
    element: ElementRef,
    container?: ElementRef,
  ) {
    this.adjustFontSizeToFit(element, container)
  }
}
