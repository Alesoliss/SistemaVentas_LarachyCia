
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emptyInputValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isEmpty = (control.value || '').trim().length === 0;
    return isEmpty ? { emptyInput: true } : null;
  };
}
