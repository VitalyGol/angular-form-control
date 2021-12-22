import { ValidatorFn, AbstractControl } from '@angular/forms';

export function IsraeliIdValidValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const controlValue = control.value;
        if (controlValue && controlValue !== '') {
            const isValid = isIsraeliIdValid(controlValue.toString());
            return isValid === false ? { israelid: false } : null;
        }
        return null;
    };
}

function isIsraeliIdValid(id: string): boolean {
    let strId = id.trim();
    if (strId.length > 9) {
        return false;
    }
    if (strId.length < 9) {
        while (strId.length < 9) { strId = '0' + strId; }
    }
    let counter = 0;
    for (let i = 0; i < strId.length; i++) {
        const rawVal = Number(strId[i]) * ((i % 2) + 1);
        const actualVal = rawVal > 9 ? (rawVal - 9) : rawVal;
        counter += actualVal;
    }
    return (counter % 10 === 0);
}
