import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

export const VT_SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true,
};

@Component({
    selector: 'vt-select',
    templateUrl: './select.component.html',
    host: {
        class: 'vt-select',
    },
    providers: [VT_SELECT_CONTROL_VALUE_ACCESSOR],
})
export class SelectComponent implements OnInit, ControlValueAccessor, AfterViewInit {
    @Input() items: any[] = [];
    @Input() isAppendToBody: boolean = false;
    @Input() bindValue: string = '';
    @Input() bindLabel: string = '';
    @Input() bindGroup: string = '';
    @Input() placeholder = '';
    @Input() searchable = false;
    @Input() clearable = false;
    @Input() emptyDataMsg = 'Không có kết quả phù hợp';
    @Input() set selectedValue(value: any) {
        this.value = value;
        this.setDisplayItem();
    }
    @Input() disabled: boolean = false;

    @Output() change = new EventEmitter();

    @Input() virtualScroll = false;
    @Input() loading = false;
    @Output() scroll = new EventEmitter();
    @Output() scrollToEnd = new EventEmitter<{ end: number }>();

    _onTouched = () => { };
    _onChange = (_: any) => { };
    value: any;
    selectedName!: string;
    hasResultFilter: boolean = false;
    _selectedValue: any;
    constructor() { setTimeout(()=>{},0) }
    ngAfterViewInit(): void {
        this.setDisplayItem();
    }

    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngOnInit(): void { }

    setDisplayItem() {
        const objSeleted = this.items && this.items.find(x => x[this.bindValue] === this.value);
        this.selectedName = objSeleted ? objSeleted[this.bindLabel] : '';
    }

    valueChange(data: any) {
        this._selectedValue = null;
        this._onTouched();
        try {
            this._onChange(data[this.bindValue]);
            this.change.emit(data[this.bindValue]);
        } catch (error) {
            this._onChange(null);
            this.change.emit(null);
        }
    }

    onBlur() {
        this._onTouched();
    }

    customSearch = (term: string, item: any) => {
        // this.hasResultFilter = customNgSelectSearch(term, item, this.bindLabel );
        // return this.hasResultFilter;
    }

    @Input('typeahead') typeahead$ = new Subject<string>();
    @Input() minTermLength = 3;
}
