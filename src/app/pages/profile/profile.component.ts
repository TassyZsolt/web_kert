import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {

 


displayedColumns: string[] = ['date','employeeName'];

  
  firsname: string | undefined;
  lastname: string | undefined;
  user: User | any;
  ngOnInit(): void {

      this.userService.userById(this.authService.userId).subscribe((user: User | undefined) => {
        this.user = user;
        this.firsname = this.user?.name.firstname;
        this.lastname = this.user?.name.lastname;
      });
    
   
  }
  updateForm: FormGroup | any;

  

update() {

  const newLastname =this.updateForm.get('lastnameC')?.value; 
  const newFirstname =this.updateForm.get('firstnameC')?.value; 

  this.user.name.firstname = newFirstname;
  this.user.name.lastname = newLastname;

  this.userService.updateUser(this.user.id, this.user);

}


constructor(public authService: AuthService, public userService: UserService){

  this.updateForm = new FormGroup({
    'firstnameC': new FormControl('', Validators.required),
    'lastnameC': new FormControl('', Validators.required),
  });
}

}
