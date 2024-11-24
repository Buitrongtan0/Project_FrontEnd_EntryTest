import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  socialMedias = [
    {
      id:1,
      name: 'Facebook',
    },
    {
      id:2,
      name: 'Website',
    },
    {
      id:3,
      name: 'Cửa Hàng',
    }
  ]
  services = [
    {
      id:7,
      name: 'Trị liệu dưỡng sinh',
    },
    {
      id:6,
      name: 'Xoa bóp cổ vai gáy',
    },
 
  ]
  statuses = [
    {
      id:1,
      name: 'Yêu cầu trải nghiệm',
    },
    {
      id:2,
      name: 'Gọi lại lần sau',
    },
 
  ]
  timeRanges = [
    { display: '08:00 - 09:00', start: '08:00', end: '09:00' },
    { display: '09:00 - 10:00', start: '09:00', end: '10:00' },
    { display: '10:00 - 11:00', start: '10:00', end: '11:00' },
    { display: '11:00 - 12:00', start: '11:00', end: '12:00' },
    { display: '13:00 - 14:00', start: '13:00', end: '14:00' },
    { display: '14:00 - 15:00', start: '14:00', end: '15:00' },
    { display: '15:00 - 16:00', start: '15:00', end: '16:00' },
  ];
  cities = [
    { id: 'hanoi', name: 'Hà Nội' },
    { id: 'hcmc', name: 'TP Hồ Chí Minh' }
  ];


  districtshanoi = [
  { id: 'dongda', name: 'Đống Đa' },
  { id: 'hoankiem', name: 'Hoàn Kiếm' },
  { id: 'tayho', name: 'Tây Hồ' }
  ];
  
  streets: { id: string, name: string }[] = [
    { id: 'minhkhai', name: 'Minh Khai' },
    { id: 'lethanhnghi', name: 'Lê Thanh Nghị' },
    { id: 'bachmai', name: 'Bạch Mai' }
  ];
  pagination = {
    currentPage: 1,
    pageSize:10
  }
  page$!: BehaviorSubject<any>;
  
  isModalOpen = false;
  customerForm: any;
  data: any;
  create:boolean = false;

  constructor( private userService: UserService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      status: [0, Validators.required], 
      source: [0, Validators.required], 
      social_media: [0, Validators.required], 
      service: this.fb.array([0]), 
      full_name: ['', Validators.required],
      gender: ['Nam', Validators.required], 
      date_of_birth: [''], 
      phone_number: ['', [Validators.required, Validators.pattern(/^(\+84|0)\d{9,10}$/)]],
      follow_up_date: ['', Validators.required],
      follow_down_date: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required], 
      district: ['', Validators.required], 
      ward: ['', Validators.required],
      detailed_info: [''], 
      notes: [''], 
      comments: this.fb.array([]), 
    });
    // this.setUpStreams();
    this.userService.getCustomerss().subscribe(res => {
      this.data = res.results;
    })

  }

  setUpStreams(): void {
    this.page$ = new BehaviorSubject(this.pagination);
    this.page$.pipe(
      distinctUntilChanged(
        (a, b) =>
          a.currentPage === b.currentPage &&
          a.pageSize === b.pageSize
      )
    ).subscribe(() => {
      this.userService.getCustomers(this.pagination.pageSize, this.pagination.currentPage).subscribe(res => {
        this.data = res.results;
      });
    });
  }

  addComment(): void {
    const comments = this.customerForm.get('comments') as FormArray;
    const commentGroup = this.fb.group({
      title: ['', Validators.required], 
      time: ['', Validators.required], 
      status_id: [0, Validators.required],
    });
    comments.push(commentGroup);
  }
  get status(): FormControl {
    return this.customerForm.get('status') as FormControl;
  }
  
  get source(): FormControl {
    return this.customerForm.get('source') as FormControl;
  }
  
  get socialMedia(): FormControl {
    return this.customerForm.get('social_media') as FormControl;
  }
  
  get service(): FormArray {
    return this.customerForm.get('service') as FormArray;
  }
  
  get fullName(): FormControl {
    return this.customerForm.get('full_name') as FormControl;
  }
  
  get gender(): FormControl {
    return this.customerForm.get('gender') as FormControl;
  }
  
  get dateOfBirth(): FormControl {
    return this.customerForm.get('date_of_birth') as FormControl;
  }
  
  get phoneNumber(): FormControl {
    return this.customerForm.get('phone_number') as FormControl;
  }
  
  get followUpDate(): FormControl {
    return this.customerForm.get('follow_up_date') as FormControl;
  }
  
  get followDownDate(): FormControl {
    return this.customerForm.get('follow_down_date') as FormControl;
  }
  
  get address(): FormControl {
    return this.customerForm.get('address') as FormControl;
  }
  
  get city(): FormControl {
    return this.customerForm.get('city') as FormControl;
  }
  
  get district(): FormControl {
    return this.customerForm.get('district') as FormControl;
  }
  
  get ward(): FormControl {
    return this.customerForm.get('ward') as FormControl;
  }
  
  get detailedInfo(): FormControl {
    return this.customerForm.get('detailed_info') as FormControl;
  }
  
  get notes(): FormControl {
    return this.customerForm.get('notes') as FormControl;
  }
  
  get comments(): FormArray {
    return this.customerForm.get('comments') as FormArray;
  }
  


  openModal(create: boolean, index?: number) {
    if (create) {
      this.create = true;
    }
    else {
      this.create = false;
      this.customerForm.reset();
      this.userService.getcustomer(index).subscribe(res => {
        console.log(res);
        this.customerForm.patchValue(res);
        // this.fullName.patchValue(res.full_name);
        // this.gender.patchValue(res.gender);
        // this.dateOfBirth.patchValue(res.date_of_birth);
        // this.phoneNumber.patchValue(res.phone_number);
        // this.address.patchValue(res.address);
        // this.city.patchValue(res.city);
        // this.district.patchValue(res.district);
        // this.ward.patchValue(res.ward);
        // this.detailedInfo.patchValue(res.detailed_info);
        // this.notes.patchValue(res.notes);
      })

    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.customerForm.reset();
    this.isModalOpen = false;
  }

  confirm() {
    if (this.customerForm.invalid) {
      return;
    }
    this.userService.createcustomers(this.customerForm.value).subscribe((res)=> {
      console.log(res);
    });
    this.closeModal();
  }
  onTimeRangeChange(selected: any): void {
    const selectedTimeRange = this.timeRanges.find((range) => range.start === selected);
    if (selectedTimeRange) {
      const today = new Date().toISOString().split('T')[0];
      const startDate = `${today}T${selectedTimeRange.start}:00`;
      const endDate = `${today}T${selectedTimeRange.end}:00`;

      this.followUpDate.patchValue(startDate);
      this.followDownDate.patchValue(endDate);
    }
  }

  onCityChange(selected: any): void {
    this.district?.reset();
  }
  onDistrictChange(selected: any): void {
    this.ward?.reset();
  }

  onServiceChange(selected: any): void { 
    const serviceArray = this.customerForm.get('service') as FormArray;
    serviceArray.clear();
    selected.forEach((item: any) => {
      serviceArray.push(new FormControl((Number(item.id))));
    });
  }
  
}
