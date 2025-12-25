import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.services';
import { MessageService } from '../../ui/message.service';
@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [FormsModule]
})
export class LoginComponent {

    clientEmail = '';
    clientPassword = '';

    operatorUser = '';
    operatorPassword = '';

    constructor(
        private authService: AuthService,
        private messageService: MessageService
    ) { }

    loginClient() {
        if (this.clientEmail && this.clientPassword) {
            this.authService.loginClient(this.clientEmail, this.clientPassword);
        }
       
    }

    loginOperator() {
        if (this.operatorUser && this.operatorPassword) {
         this.authService.loginOperator(this.operatorUser, this.operatorPassword);
        } 
    }
}
