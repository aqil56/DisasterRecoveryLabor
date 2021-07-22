import { FormGroup } from '@angular/forms';

export function ConfirmedValidator(p: string, cp: string) {
  return (formgroup: FormGroup) => {
    const control = formgroup.controls[p];
    const c_control = formgroup.controls[cp];
    if (c_control.errors && !c_control.errors.confirmedValidator) {
      return;
    }
    if (control.value !== c_control.value) {
      c_control.setErrors({ confirmedValidator: true });
    } else {
      c_control.setErrors(null);
    }
  };
}
export function UserExists(user: string, users: any[]) {
  return (formgroup: FormGroup) => {
    console.log(users);
    const control = formgroup.controls[user];
    if (control.errors && !control.errors.userExists) {
      return;
    }
    for (let u of users) {
      if (u['username'] === control.value) {
        control.setErrors({ userExists: true });
      } else {
        control.setErrors(null);
      }
    }
  };
}
