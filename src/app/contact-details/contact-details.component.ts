import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpService } from '../services/http-service.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  providers: [MessageService]
})
export class ContactDetailsComponent implements OnInit {
  contactList: any = [];
  selectAllCheckbox: boolean = false;
  contactDetail: any = {};
  selectedContacts: any = [];
  contactFeatureDialog: boolean = false;
  contactFeatureDialogHeader: string = '';
  contactAddEditDialog: boolean = false;
  contactAddEditDialogHeader: string = '';
  contactStatus: boolean = true;

  constructor(private toastMessage: MessageService, private httpService: HttpService) { }

  ngOnInit() {
    this.loadAllContacts();
  }

  loadAllContacts() {
    this.contactList = [
      {
        contactId: '1',
        firstName: 'Kamalesh',
        lastName: 'Pattanaik',
        emailId: 'user1@testmail.com',
        phoneNumber: '7709200253',
        status: 'Active',
      },
      {
        contactId: '2',
        firstName: 'Susmi',
        lastName: 'Satapathy',
        emailId: 'user2@testmail.com',
        phoneNumber: '7709200999',
        status: 'Inactive',
      },
      {
        contactId: '3',
        firstName: 'Aaron',
        lastName: 'Dev',
        emailId: 'user3@testmail.com',
        phoneNumber: '7705500999',
        status: 'Active',
      }
    ];
    // Above code will be removed once API integrated
    // // Below code will be uncommented if back end server is hosted & integrated
    // let apiParam = {
    //   url: 'getContacts'
    // };
    // this.httpService.getData(apiParam).subscribe(response => {
    //   if (response.status == 200) {
    //     this.contactList = response.list;
    //   }
    //   else {
    //     this.toastMessage.add({ key: 'warningAlert', severity: 'warn', life: 3000, summary: 'Get Contacts', detail: 'Error while featching data' });
    //   }
    // });
  }

  onRowSelect(selectionType, contactData) {
    if (selectionType === 'all') {
      this.selectedContacts = [];
      if (this.selectAllCheckbox) {
        this.selectedContacts = JSON.parse(JSON.stringify(this.contactList));
        this.contactList.forEach(contact => {
          contact.selected = true;
        });
      }
      else {
        this.contactList.forEach(contact => {
          contact.selected = false;
        });
      }
    }
    else if (selectionType === 'single') {
      if (contactData.selected) {
        this.selectedContacts.push(contactData);
      }
      else {
        this.selectedContacts.forEach((contact, index) => {
          if (contact.contactId === contactData.contactId) {
            this.selectedContacts.splice(index, 1);
          }
        });
      }
    }
  }

  manageContact(type) {
    let isValidated = this.validateSelection(type);
    if (isValidated) {
      if (type === 'Add') {
        this.contactAddEditDialog = true;
        this.contactAddEditDialogHeader = type;
        this.contactDetail = {};
      }
      else if (type === 'Edit') {
        this.contactAddEditDialog = true;
        this.contactAddEditDialogHeader = type;
        this.contactDetail = JSON.parse(JSON.stringify(this.selectedContacts[0]));
        this.contactStatus = this.contactDetail.status === 'Active' ? true : false;
      }
      else if (type === 'Delete' || type === 'Activate' || type === 'Deactivate') {
        this.contactFeatureDialog = true;
        this.contactFeatureDialogHeader = type;
      }
    }
  }

  validateSelection(type) {
    if (this.selectedContacts.length == 0 && type !== 'Add') {
      this.toastMessage.add({ key: 'warningAlert', severity: 'warn', life: 3000, summary: type + ' Contact', detail: 'Please select atleast one contact' });
      return false;
    }
    else if (this.selectedContacts.length > 1 && type === 'Edit') {
      this.toastMessage.add({ key: 'warningAlert', severity: 'warn', life: 3000, summary: type + ' Contact', detail: 'Please select only one contact' });
      return false;
    }
    else {
      return true;
    }
  }

  saveFeatureInfo(type) {
    if (type === 'Delete') {
      this.deleteContact();
    }
    else if (type === 'Activate') {
      this.activateContact();
    }
    else if (type === 'Deactivate') {
      this.deactivateContact();
    }
  }

  saveContactDetails(type) {
    if (type === 'Add') {
      this.contactDetail.contactId = this.contactList.length + 1;
      this.contactDetail.status = this.contactStatus ? 'Active' : 'Inactive';
      this.contactList.push(this.contactDetail);
      this.toastMessage.add({ key: 'successAlert', severity: 'success', life: 3000, summary: type + ' Contact', detail: 'Contact added successfully' });
      this.contactAddEditDialog = false;
      // Above code will be removed once API integrated
      // // Below code will be uncommented if back end server is hosted & integrated
      // this.contactDetail.status = this.contactStatus ? 'Active' : 'Inactive';
      // let apiParam = {
      //   url: 'addContact',
      //   param: this.contactDetail
      // };
      // this.httpService.postData(apiParam).subscribe(response => {
      //   if (response.status == 200) {
      //     this.toastMessage.add({ key: 'successAlert', severity: 'success', life: 3000, summary: type + ' Contact', detail: 'Contact created successfully' });
      //     this.contactAddEditDialog = false;
      //     this.loadAllContacts();
      //   }
      //   else {
      //     this.toastMessage.add({ key: 'warningAlert', severity: 'warn', life: 3000, summary: type + ' Contact', detail: 'Error while saving data' });
      //   }
      // });
    }
    else if (type === 'Edit') {
      this.contactList.forEach((contact, index) => {
        if (contact.contactId === this.contactDetail.contactId) {
          this.contactList[index] = this.contactDetail;
          this.toastMessage.add({ key: 'successAlert', severity: 'success', life: 3000, summary: type + ' Contact', detail: 'Contact edited successfully' });
        }
      });
      this.contactAddEditDialog = false;
      // Above code will be removed once API integrated
      // // Below code will be uncommented if back end server is hosted & integrated
      // let apiParam = {
      //   url: 'editContact',
      //   param: this.contactDetail
      // };
      // this.httpService.postData(apiParam).subscribe(response => {
      //   if (response.status == 200) {
      //     this.toastMessage.add({ key: 'successAlert', severity: 'success', life: 3000, summary: type + ' Contact', detail: 'Contact edited successfully' });
      //     this.contactAddEditDialog = false;
      //     this.loadAllContacts();
      //   }
      //   else {
      //     this.toastMessage.add({ key: 'warningAlert', severity: 'warn', life: 3000, summary: type + ' Contact', detail: 'Error while saving data' });
      //   }
      // });
    }

  }

  deleteContact() {
    this.selectedContacts.forEach((scontact) => {
      this.contactList.forEach((contact, index) => {
        if (contact.contactId === scontact.contactId) {
          this.contactList.splice(index, 1);
        }
      });
    });
    this.toastMessage.add({ key: 'successAlert', severity: 'success', life: 3000, summary: 'Delete Contact(s)', detail: 'Contact(s) deleted successfully' });
    this.selectedContacts = [];
    this.contactFeatureDialog = false;
    // Above code will be removed once API integrated
    // // Below code will be uncommented if back end server is hosted & integrated
    // let apiParam = {
    //   url: 'deleteContact',
    //   param: this.selectedContacts
    // };
    // this.httpService.postData(apiParam).subscribe(response => {
    //   if (response.status == 200) {
    //     this.toastMessage.add({ key: 'successAlert', severity: 'success', life: 3000, summary: type + ' Contact', detail: 'Contact deleted successfully' });
    //     this.contactAddEditDialog = false;
    //     this.selectedContacts = [];
    //   }
    //   else {
    //     this.toastMessage.add({ key: 'warningAlert', severity: 'warn', life: 3000, summary: type + ' Contact', detail: 'Error while deleting data' });
    //   }
    // });
  }

  activateContact() {
    this.selectedContacts.forEach((scontact) => {
      this.contactList.forEach((contact, index) => {
        if (contact.contactId === scontact.contactId) {
          this.contactList[index].status = 'Active';
        }
      });
    });
    this.toastMessage.add({ key: 'successAlert', severity: 'success', life: 3000, summary: 'Activate Contact(s)', detail: 'Contact(s) activated successfully' });
    this.contactFeatureDialog = false;
    // Above code will be removed once API integrated
    // // Below code will be uncommented if back end server is hosted & integrated
    // this.selectedContacts.forEach((scontact) => {
    //   scontact.status = 'Active';
    // });
    // let apiParam = {
    //   url: 'activateContact',
    //   param: this.selectedContacts
    // };
    // this.httpService.postData(apiParam).subscribe(response => {
    //   if (response.status == 200) {
    //     this.toastMessage.add({ key: 'successAlert', severity: 'success', life: 3000, summary: 'Activate Contact', detail: 'Contact acivated successfully' });
    //     this.contactAddEditDialog = false;
    //   }
    //   else {
    //     this.toastMessage.add({ key: 'warningAlert', severity: 'warn', life: 3000, summary: 'Activate Contact', detail: 'Error while saving data' });
    //   }
    // });
  }

  deactivateContact() {
    this.selectedContacts.forEach((scontact) => {
      this.contactList.forEach((contact, index) => {
        if (contact.contactId === scontact.contactId) {
          this.contactList[index].status = 'Inactive';
        }
      });
    });
    this.toastMessage.add({ key: 'successAlert', severity: 'success', life: 3000, summary: 'Deactivate Contact(s)', detail: 'Contact(s) deactivated successfully' });
    this.contactFeatureDialog = false;
    // Above code will be removed once API integrated
    // // Below code will be uncommented if back end server is hosted & integrated
    // this.selectedContacts.forEach((scontact) => {
    //   scontact.status = 'Inactive';
    // });
    // let apiParam = {
    //   url: 'deactivateContact',
    //   param: this.selectedContacts
    // };
    // this.httpService.postData(apiParam).subscribe(response => {
    //   if (response.status == 200) {
    //     this.toastMessage.add({ key: 'successAlert', severity: 'success', life: 3000, summary: 'Deactivate Contact', detail: 'Contact deactivated successfully' });
    //     this.contactAddEditDialog = false;
    //   }
    //   else {
    //     this.toastMessage.add({ key: 'warningAlert', severity: 'warn', life: 3000, summary: type + 'Deactivate Contact', detail: 'Error while saving data' });
    //   }
    // });
  }
}