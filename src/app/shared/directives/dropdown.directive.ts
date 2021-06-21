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

  @HostListener('document:click', ['$event'])
  toggleDisplayed(event: Event) {
    this.displayed = this.elRef.nativeElement.contains(event.target) ? !this.displayed : false;
  }
}
