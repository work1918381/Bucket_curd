import { Component, inject } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { IItem } from 'src/app/interfaces/item';
import swal from 'sweetalert2';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  itemList: IItem[] = [];
  httpService = inject(HttpService);

  selectedItem: any = null;
  isContainerVisible:boolean=false;

  ngOnInit() {
   this.loadAllItemData();
  }

  loadAllItemData()
  {
    this.httpService.getAllItem().subscribe(result => {
      console.log(result);
      this.itemList = result;
      console.log(this.itemList);
    });
  }

  setItemForQuantity(item: any): void {
    this.isContainerVisible=true;
    this.selectedItem = { ...item }; 
    this.scrollToQuantityForm(); 
  }


  scrollToQuantityForm(): void {
    const element = document.getElementById('quantityForm');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  submitQuantityForm(): void {
    if (this.selectedItem && this.selectedItem.quantity >= 0) {
      this.httpService.UpdateItem(this.selectedItem.id, this.selectedItem).subscribe(response => {
        swal.fire({
          title: 'Validation',
          text: 'Quantity updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.loadAllItemData();
          }
        });
      }, error => {
        alert('Failed to update quantity. Please try again.');
      });
    }
  }
  

  deleteUser(userId: number): void {
    swal.fire({
      title: 'Delete Confirmation',
      text: 'Are you sure you want to delete this Item?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpService.DeleteItemById(userId).subscribe(
          (response: any) => {
            if (response == true) {
              swal.fire({
                title: "Deleted!",
                text: "Item has been deleted successfully!",
                icon: "success"
              });
              this.loadAllItemData();
            } else {
              swal.fire({
                title: "Error!",
                text: "There was an error deleting the Item. Please try again.",
                icon: "error"
              });
            }
          },
          (error) => {
            swal.fire({
              title: "Error!",
              text: "An unexpected error occurred. Please try again.",
              icon: "error"
            });
          }
        );
      } else if (result.isDismissed) {
        console.log('Delete action was cancelled');
      }
    });
  }
}
