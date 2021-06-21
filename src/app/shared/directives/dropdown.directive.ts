import { Directive,
         ElementRef,
         HostBinding,
         HostListener,
         Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') displayed: boolean = false;
  className: string = 'open';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click')
  toggleDisplayed() {
    this.displayed = !this.displayed;
  }
}
