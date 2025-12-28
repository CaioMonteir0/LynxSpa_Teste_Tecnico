import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { customerInfo } from '../model/customer.model';

@Injectable({ providedIn: 'root' })
export class ClientService {

    private readonly API_URL = 'http://localhost:8080/customers';

    constructor(private http: HttpClient) { }

        findByEmail(email: string): Observable<customerInfo> {
            return this.http.get<customerInfo>(`${this.API_URL}/find-by-email?email=${email}`);
        }

    

}
