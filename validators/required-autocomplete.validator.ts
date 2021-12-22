import { ValidatorFn, AbstractControl } from '@angular/forms';

export function RequiredAutoCompleteValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const controlValue = control.value;
        if (controlValue?.key ||  control.disabled) {
            return null;
        }
        return { required: true };
    };
}
