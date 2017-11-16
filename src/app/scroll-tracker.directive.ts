import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollTracker]'
})
export class ScrollTrackerDirective {
  @HostListener('click', ['$event'])

  onScroll(event) {
    // do tracking
    console.log('windowPos', window.pageYOffset);
    console.log('scrolled', event.target.scrollTop);
    // Listen to click events in the component
    const tracker = event.target;
    console.log(tracker);

    const limit = tracker.scrollHeight - tracker.clientHeight;
    console.log(event.target.scrollTop, limit);
    if (event.target.scrollTop === limit) {
      alert('end reached');
    }
  }

  constructor() { }

}
