import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Vibration} from '@ionic-native/vibration/ngx';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {evaluate} from 'mathjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

    input = '';
    output = '';
    outputNumber: number;
    outputFontSize = 1;
    inputFontSize = 1;

    backspaceLongPressRef;

    @ViewChild('inputEl') inputElement: ElementRef<HTMLTextAreaElement>;
    @ViewChild('inputStaticFontSizeEl') inputStaticFontSizeEl: ElementRef<HTMLSpanElement>;
    @ViewChild('outputEl') outputElement: ElementRef<HTMLParagraphElement>;
    @ViewChild('backspaceEL') backspaceElement: ElementRef<HTMLSpanElement>;

    constructor(
        private vibration: Vibration,
        private keyboard: Keyboard,
        private platform: Platform
    ) {
    }

    ngAfterViewInit(): void {
        this.focusInput();
        this.bindBackspaceEvents();
    }

    onInput(input: string) {
        this.input = input;
        this.resizeInputFont();
        this.calculate();
    }

    changeOutput(result) {
        this.outputNumber = result;
        this.output = result.toLocaleString();
        this.resizeOutputFont();
    }

    @HostListener('window:resize')
    resizeOutputFont() {
        requestAnimationFrame(() => {
            const hostWidth = this.outputElement.nativeElement.getBoundingClientRect().width;
            const textWidth = this.outputElement.nativeElement.children[0].getBoundingClientRect().width;
            const ratio = hostWidth / (textWidth + 20); // 20 is arbitrary margin
            this.outputFontSize = Math.min(1.6, ratio);
        });
    }

    @HostListener('window:resize')
    resizeInputFont() {
        requestAnimationFrame(() => {
            const hostWidth = this.inputElement.nativeElement.getBoundingClientRect().width;
            const textWidth = this.inputStaticFontSizeEl.nativeElement.getBoundingClientRect().width;
            const ratio = hostWidth / (textWidth + 20); // 20 is arbitrary margin
            this.inputFontSize = Math.max(Math.min(1.2, ratio), 1);
        });
    }

    calculate() {
        try {
            this.changeOutput(evaluate(this.input));
        } catch (e) {
            this.changeOutput('');
        }
    }

    clear() {
        this.onInput('');
        this.changeOutput('');
        this.focusInput();
        this.vibration.vibrate(50);
    }

    backspace() {
        this.editInput();
    }

    bindBackspaceEvents() {
        const touchStart = () => this.backPressTouchStart(true);
        const touchEnd = () => this.backPressTouchStart(false);

        this.backspaceElement.nativeElement.addEventListener('touchstart', touchStart);
        this.backspaceElement.nativeElement.addEventListener('mousedown', touchStart);
        this.backspaceElement.nativeElement.addEventListener('touchend', touchEnd);
        this.backspaceElement.nativeElement.addEventListener('touchmove', touchEnd);
        this.backspaceElement.nativeElement.addEventListener('mouseup', touchEnd);
        this.backspaceElement.nativeElement.addEventListener('mouseleave', touchEnd);
    }

    backPressTouchStart(touchStart: boolean) {
        if (touchStart) {
            this.backspaceLongPressRef = setTimeout(() => {
                this.clear();
            }, 1000);
        } else {
            clearTimeout(this.backspaceLongPressRef);
        }
    }

    editInput(input: string = '') {
        // https://stackoverflow.com/a/41348905

        const inputElement: HTMLTextAreaElement = this.inputElement.nativeElement;
        const selectionStart: number = inputElement.selectionStart;
        const selectionEnd: number = inputElement.selectionEnd;
        const length: number = inputElement.value.length;
        inputElement.focus();

        const textBefore: string = inputElement.value.substring(0, selectionStart); // text in front of selected text
        const textAfter: string = inputElement.value.substring(selectionEnd, length); // text following selected text

        if (selectionStart === selectionEnd && input === '') // if no text is selected and no input, then it's treated as backspace
        {
            inputElement.value = inputElement.value.substring(0, selectionStart - 1) + inputElement.value.substring(selectionEnd, length);
            inputElement.focus();
            inputElement.selectionStart = selectionStart - 1;
            inputElement.selectionEnd = selectionStart - 1;
        } else // if some text is selected
        {
            inputElement.value = textBefore + input + textAfter;
            inputElement.focus();
            inputElement.selectionStart = selectionStart + input.length;
            inputElement.selectionEnd = inputElement.selectionStart;
        }
        this.focusInput();
        this.onInput(inputElement.value);
    }

    finalize() {
        this.focusInput();
        this.onInput(String(this.outputNumber));
        this.changeOutput('');
    }

    @HostListener('window:focus')
    focusInput() {
        this.inputElement.nativeElement.focus();

        if (this.platform.is('cordova')) {
            setTimeout(() => {
                this.keyboard.hide();
            });
        }
    }
}
