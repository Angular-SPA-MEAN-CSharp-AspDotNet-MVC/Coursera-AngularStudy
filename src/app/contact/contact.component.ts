import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animation';

import { RestangularConfigFactory } from '../shared/restConfig';

import { Restangular } from 'ngx-restangular';

import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  showSpin = false;

  formErrors = {
    'firstname': '',
    'lastname' : '',
    'telnum'   : '',
    'email'    : ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long',
      'maxlength': 'First Name cannot be more than 25 characters'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long',
      'maxlength': 'Last Name cannot be more than 25 characters'
    },
    'telnum' : {
      'required': 'Tel. Number is required.',
      'pattern': 'Tel. Number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in a valid form'
    }
  };


  constructor(private fb: FormBuilder
              ,private feedbackService: FeedbackService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: [0, [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email]  ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe( data => this.onValueChanged(data) );

    this.onValueChanged(); // to reset form validation messages
  }

  onValueChanged(data?: any) {
    if(!this.feedbackForm){
      return;
    }
    const form = this.feedbackForm;

    for (const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field]  += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.showSpin = true;
    this.feedback = this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedback);
       //.subscribe( feedback => this.feedback = feedback );
    let result = this.feedbackService.getSubmittedFeedback()
      .map( feedback => feedback[0]);

    setTimeout(this.showSpin = false, 5000);
    // this.feedbackService.getSubmittedFeedback()
    //  .subscribe( feedback => this.feedback = feedback );


    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

}
