import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: 'validation.component.html',
})
export class ValidationComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      ean: ['', [Validators.required, this.validateEAN]],
      fein: ['', [Validators.required, this.validateFEIN]]
    });
  }

  validateEAN(control:any) {
    if (!/^\d{2}-\d{6}-\d{2}$/.test(control.value)) {
      return { invalidEAN: true };
    }
    return null;
  }

  validateFEIN(control:any) {
    if (!/^\d{2}-\d{7}$/.test(control.value)) {
      return { invalidFEIN: true };
    }
    return null;
  }

  formatEAN(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-digit characters

    // Apply the desired format
    if (value.length >= 2) {
      value = value.slice(0, 2) + '-' + value.slice(2);
    }

    if (value.length > 8) {
      value = value.slice(0,9) + '-' + value.slice(9);
    }

    if (value.length >= 11) {
      value = value.slice(0, 12);
    }

    // Update the form control's value
    this.form.get('ean')?.setValue(value);
}


formatFEIN(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, ''); // Remove non-digit characters

    // Apply the desired format
    if (value.length >= 2) {
      value = value.slice(0, 2) + '-' + value.slice(2);
    }

    if (value.length >= 7) {
      value = value.slice(0, 10);
    }

    // Update the form control's value
    this.form?.get('fein')?.setValue(value);
}


}
