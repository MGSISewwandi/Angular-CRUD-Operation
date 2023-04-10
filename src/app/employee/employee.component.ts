import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup} from '@angular/forms';
import { EmployeeModel } from './employee.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  formValue !: FormGroup;
  EmployeeModelObj  : EmployeeModel = new EmployeeModel();
  employeeData !:any;
  showAdd! : boolean;
  showUpdate ! : boolean;

  constructor(private formbuilder:FormBuilder,private api:ApiService) { }
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name:[''],
      designation:[''],
      salary:['']
    })
    this.getEmployeeDetails();
  }

  /*
  clickAddEmployee(){
  this.formValue.reset();
  this.showAdd=true;
  this.showUpdate = false;
  }
*/

  postEmployeeDetails(){
    this.EmployeeModelObj.name = this.formValue.value.name;
    this.EmployeeModelObj.designation = this.formValue.value.designation;
    this.EmployeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.EmployeeModelObj)
    .subscribe((res: any)=>{
      console.log(res);
      alert("Form Submitted Successfully")
      let ref = document.getElementById('reset')
      ref?.click();
      this.formValue.reset();   
      this.getEmployeeDetails();  
    },
      (error: any)=>{
      alert("Something went Wrong")
    }
    )
  }

  getEmployeeDetails(){
    this.api.getEmployee()
    .subscribe((res: () => void)=>{
      this.employeeData=res;
      console.warn(this.employeeData);

    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getEmployeeDetails();
    })
  }

  onEdit(row: any){
    this.showUpdate=true;
    //this.showAdd=false;
    this.EmployeeModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['designation'].setValue(row.designation);
    this.formValue.controls['salary'].setValue(row.salary);
    
  }

  updateEmployeeDetails(){
    this.EmployeeModelObj.name = this.formValue.value.name;
    this.EmployeeModelObj.designation = this.formValue.value.designation;
    this.EmployeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.EmployeeModelObj,this.EmployeeModelObj.id)
    .subscribe(res=>{
      alert("Update Sucessfully")
    })
    this.getEmployeeDetails();
    this.showUpdate=false;
  }
  }


 