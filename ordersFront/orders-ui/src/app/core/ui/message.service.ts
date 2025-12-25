import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type MessageType = 'success' | 'error';

export interface Message {
  type: MessageType;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {

  private messageSubject = new BehaviorSubject<Message | null>(null);
  message$ = this.messageSubject.asObservable();

  success(text: string) {
    this.messageSubject.next({ type: 'success', text });
    this.autoClear();
  }

  error(text: string) {
    this.messageSubject.next({ type: 'error', text });
    this.autoClear();
  }

  clear() {
    this.messageSubject.next(null);
  }

  private autoClear() {
    setTimeout(() => this.clear(), 4000);
  }
}
