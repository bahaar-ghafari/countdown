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
    const minimumFontSize = 0.2
    const maximumFontSize = 15

    // Apply default font size initially
    textElement.style.fontSize = `${defaultFontSize}rem`

    // Ensure correct calculation by using the updated getTextWidth function
    let textWidth = this.getTextWidth(textElement, `${defaultFontSize}rem`)
    let ratio = containerWidth / textWidth 

    let newFontSize = defaultFontSize * ratio * 0.95
    console.log(
      '%csrc/app/countdown/text-fitting-algorithm.service.ts:27 textWidth',
      'color: #007acc;',
      textWidth,
    )
    console.log(
      '%csrc/app/countdown/text-fitting-algorithm.service.ts:25 containerWidth',
      'color: #007acc;',
      containerWidth,
    )
    console.log('%csrc/app/countdown/text-fitting-algorithm.service.ts:37 newFontSize', 'color: #007acc;', newFontSize);
    // Gradually reduce font size if the text is still too wide
    while (textWidth > containerWidth && newFontSize > minimumFontSize) {
      newFontSize -= 0.1 // Decrease the font size step-by-step
      textElement.style.fontSize = `${newFontSize}rem`
      textWidth = this.getTextWidth(textElement, `${newFontSize}rem`)
    }
console.log('%csrc/app/countdown/text-fitting-algorithm.service.ts:44 newFontSize', 'color: #007acc;', newFontSize);
    // // Ensure the font size does not exceed the maximum allowed
    // newFontSize = Math.min(
    //   Math.max(newFontSize, minimumFontSize),
    //   maximumFontSize,
    // )

    textElement.style.fontSize = `${newFontSize}rem`

    console.log('Final font size set to:', newFontSize, 'rem')
  }

  private getTextWidth(element: HTMLElement, fontSize: string): number {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')!

    // Get the computed styles of the element
    const computedStyles = window.getComputedStyle(element)

    // Set the context's font to match the element's font
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
