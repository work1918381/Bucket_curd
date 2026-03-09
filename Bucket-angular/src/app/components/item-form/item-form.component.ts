import { Component, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { IItem } from 'src/app/interfaces/item';
import { DatePipe } from '@angular/common';

import swal from 'sweetalert2';
@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
  providers: [DatePipe]
})
export class ItemFormComponent {

  @ViewChild('infoForm') infoForm!: NgForm; 

  userId: any | null = null
  isCreateDateDisabled:boolean=false;

  itemname: any;
  create: any;
  update: any;
  quantity: any; 

  constructor(private router: ActivatedRoute,private route: Router,private datePipe: DatePipe) {}

  httpService = inject(HttpService);
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const id = params.get('id'); 
      this.userId = id;
      if (id) {
        this.isCreateDateDisabled=true;
        this.GetItemById(id);
        console.log('User ID:', id);
      } else {
        const currentDate = new Date();
       this.create = this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;
       console.log("currentDate",currentDate);
       this.update = this.datePipe.transform(currentDate, 'yyyy-MM-dd')!;
       console.log("currentDate",currentDate);
        console.error('User ID not found in route parameters');
      }
    });
  }

  submitButton(formData: any) {
    console.log('Form submitted:', formData);
    if (!formData.itemname || !formData.create || !formData.update || !formData.quantity) {
      //console.error('All Field are Required , Please fill all Fields');
      swal.fire({
        title: 'Validation',
        text: 'Please fill all fields.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      
    }
    else{
    if (this.userId) {
      this.updateData(formData);
    } else {
      this.createData(formData);
    }
  }
}


  createData(formData: any) {
    this.httpService.AddItem(formData).subscribe(
      (response: any) => {
        console.log("response1",response);
        if (response == true) {
          swal.fire({
            title: "Submitted!",
            text: "Item has been submitted successfully!",
            icon: "success"
          }).then(() => {
            this.route.navigate(['/']);
          });
        } else {
          swal.fire({
            title: "Error!",
            text: "There was an error submitting your Item. Please try again.",
            icon: "error"
          });
        }
      }
    );
  }

  // Update an existing user
  updateData(formData: any) {
    formData.id = this.userId;
    this.httpService.UpdateItem(formData.id,formData).subscribe(
      (response: any) => {
        console.log("response2",response);
        if (response==true) {
          swal.fire({
            title: "Updated!",
            text: "Your Item has been updated successfully!",
            icon: "success"
          }).then(() => {
            this.route.navigate(['/']);
          });
        } else {
          swal.fire({
            title: "Error!",
            text: "There was an error updating your Item. Please try again.",
            icon: "error"
          });
        }
      }
    );
  }

  GetItemById(userId: any) {
    this.httpService.GetItemById(userId).subscribe(
      (response: any) => {
        console.log("response3",response);
        const userData = response.GetDataByIdDT;

        this.itemname = response.itemname;
        this.create = this.datePipe.transform(response.create, 'yyyy-MM-dd')!;
        this.update = this.datePipe.transform(response.update, 'yyyy-MM-dd')!;
        this.quantity = response.quantity;
        console.log("responseALL of edit user", response);
      }
    );
  }

  onClear() {
    if (this.infoForm) {
      this.infoForm.reset();
    }
  }


}
