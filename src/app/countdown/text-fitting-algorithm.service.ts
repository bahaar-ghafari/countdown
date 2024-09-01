import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextFittingAlgorithmService {
  constructor() {}

  adjustFontSizeToFit(container: ElementRef) {
    const containerWidth = container.nativeElement.clientWidth;
    const element = container.nativeElement;

    element.style.fontSize = '5rem';

    let textWidth = this.getTextWidth(element.innerText, '5rem');

    let ratio = (containerWidth / textWidth) * 0.85; 

    let newFontSize = 5 * ratio; 
    newFontSize = Math.min(Math.max(0.2, newFontSize), 10); 

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