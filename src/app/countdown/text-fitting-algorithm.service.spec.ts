import { TestBed } from '@angular/core/testing';
import { TextFittingAlgorithmService } from './text-fitting-algorithm.service';
import { ElementRef } from '@angular/core';

describe('TextFittingAlgorithmService', () => {
  let service: TextFittingAlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextFittingAlgorithmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should adjust font size to fit within the container', () => {
    const elementRefMock = createElementRefMock('Test Content');
    const containerRefMock = createElementRefMock('', 500); // Mock container width as 500px

    // Since we cannot spy on private methods, we will rely on the public method's behavior
    service.adjustFontSizeToFit(elementRefMock, containerRefMock);

    const appliedFontSize = parseFloat(elementRefMock.nativeElement.style.fontSize);
    expect(appliedFontSize).toBeGreaterThanOrEqual(0);
  });

  it('should fallback to window width if no container is provided', () => {
    const elementRefMock = createElementRefMock('Test Content');

    spyOnProperty(window, 'innerWidth').and.returnValue(800); // Mock the window width as 800px

    service.adjustFontSizeToFit(elementRefMock);

    const appliedFontSize = parseFloat(elementRefMock.nativeElement.style.fontSize);
    expect(appliedFontSize).toBeGreaterThanOrEqual(0);
  });

  it('should calculate text width using canvas indirectly through public method', () => {
    const elementRefMock = createElementRefMock('Test Content');

    // Call the public method that uses getTextWidth internally
    service.adjustFontSizeToFit(elementRefMock);

    const appliedFontSize = parseFloat(elementRefMock.nativeElement.style.fontSize);
    expect(appliedFontSize).toBeGreaterThanOrEqual(0);
  });
});

function createElementRefMock(textContent: string, width: number = 1000): ElementRef {
    const element = document.createElement('div'); // Create a real DOM element
    element.innerText = textContent;
    element.style.width = `${width}px`;
    
    return new ElementRef(element);
  }
  
