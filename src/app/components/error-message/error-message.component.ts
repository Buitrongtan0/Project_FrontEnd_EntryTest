import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'vt-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit  {
    // https://stackoverflow.com/questions/46422007/error-error-no-value-accessor-for-form-control-with-unspecified-name-attribute

    @Input() control!: FormControl;
    @Input() controlName!: string;
    @Input() isNeedCheckDirty: boolean = false

    constructor() {
    }

    ngOnInit() {
    }

    getErrorMessage(): string {
        let text;
        if (this.control.invalid && (this.isNeedCheckDirty || this.control.dirty || this.control.touched)) {
            const errors: any = this.control.errors;
            const errorTypeNames = Object.keys(errors);
            if (errorTypeNames && errorTypeNames.length) {
                let errorType = errorTypeNames.includes('matDatepickerParse') ? 'matDatepickerParse' : errorTypeNames[0];
                switch (errorType) {
                    case 'matDatepickerParse':
                        text = 'Định dạng ngày không hợp lệ';
                        break;
                    case 'uploadFileFailed':
                        text = 'Tải tệp lên không thành công';
                        break;
                    case 'required':
                        text = `${this.controlName} không được để trống`;
                        break;
                    case 'pattern':
                        text = `${this.controlName} sai định dạng`;
                        break;
                    case 'email':
                        text = `${this.controlName} sai định dạng email`;
                        break;
                    case 'min':
                        text = `${this.controlName} sai giá trị ( Nhỏ nhất: ${errors.min.min} )`;
                        break;
                    case 'max':
                        text = `${this.controlName} sai giá trị( Lớn nhất: ${errors.max.max} )`;
                        break;
                    case 'minlength':
                        text = `${this.controlName} sai độ dài ( Độ dài nhỏ nhất: ${errors.minlength.requiredLength} )`;
                        break;
                    case 'maxlength':
                        text = `${this.controlName} sai độ dài ( Độ dài lớn nhất: ${errors.maxlength.requiredLength} )`;
                        break;
                    case 'notSame':
                        text = `${this.controlName} phải giống nhau`;
                        break;
                    case 'sourceIp':
                        text = `${this.controlName} không hợp lệ`;
                        break;
                    case 'hasSpecialCharacters':
                        text = `Trường không được chứa các ký tự đặc biệt sau ${errors.specialCharacters.join(' ')} `;
                        break;
                    case 'errorHTML':
                        text = `${this.controlName} sai định dạng html`;
                        break;
                    case 'minLengthArray':
                        text = `${this.controlName} không được để trống`;
                        break;
                    case 'overLimit':
                        text = `${this.controlName} vượt quá số kí tự cho phép`;
                        break;
                    default:
                        text = `${this.controlName}: ${errors[errorType]} : ${errors['error_value']} `;
                }
            }
        }
        return text || '';
    }
}
