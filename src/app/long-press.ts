import {
    Directive,
    Output,
    EventEmitter,
    HostBinding,
    HostListener
} from '@angular/core';

@Directive({
    selector: '[long-press]'
})
export class LongPress {
    pressing: boolean;
    longPressing: boolean;
    timeout: any;
    interval: NodeJS.Timeout;

    @Output()
    onLongPress = new EventEmitter();

    @Output()
    onLongPressing = new EventEmitter();

    @HostBinding('class.press')
    get press(): boolean {
        return this.pressing;
    }

    @HostBinding('class.longpress')
    get longPress(): boolean {
        return this.longPressing;
    }

    @HostListener('touchstart', ['$event'])
    @HostListener('mousedown', ['$event'])
    public onMouseDown(event: MouseEvent): void {
        this.pressing = true;
        this.longPressing = false;
        this.timeout = setTimeout(() => {
            this.longPressing = true;
            this.onLongPress.emit(event);
            this.interval = setInterval(() => {
                this.onLongPressing.emit(event);
            }, 50);
        }, 300);
    }

    @HostListener('touchend')
    @HostListener('mouseup')
    @HostListener('mouseleave')
    public endPress(): void {
        clearTimeout(this.timeout);
        clearInterval(this.interval);
        this.longPressing = false;
        this.pressing = false;
    }

}
