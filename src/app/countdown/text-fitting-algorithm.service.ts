import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextFittingAlgorithmService {
  constructor() {}

  adjustFontSizeToFit(container: ElementRef) {
    const containerWidth = container.nativeElement.clientWidth;
    const element = container.nativeElement;
    const defaultFontSize = 8;
    const minimumFontSize = 0.2;
    const maximumFontSize = 10;

    element.style.fontSize = `${defaultFontSize}rem`;

    // Ensure the text width is measured after the default size is applied
    let textWidth = this.getTextWidth(element.innerText, `${defaultFontSize}rem`);

    // Calculate the ratio with a slightly reduced ratio to ensure it fits
    let ratio = (containerWidth / textWidth);

    let newFontSize = defaultFontSize * ratio;
    newFontSize = Math.min(Math.max(minimumFontSize, newFontSize), maximumFontSize);

    element.style.fontSize = `${newFontSize}rem`;

    console.log('Final font size set to:', newFontSize, 'rem');
  }

  private getTextWidth(text: string, fontSize: string): number {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    context.font = `${fontSize} Open Sauce One`;
    return context.measureText(text).width;
  }

  public adjustFontSizeOnTextChange(container: ElementRef) {
    this.adjustFontSizeToFit(container);
  }
}
