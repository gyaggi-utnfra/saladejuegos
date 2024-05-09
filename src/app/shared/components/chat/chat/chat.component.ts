import { Component, ElementRef, ViewChild } from '@angular/core';

import { AuthService } from '../../../../core/services/auth.service';
import { UtilsService } from '../../../../core/services/utils.service';
import { ChatService } from './services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  showChat = false;
  messages: any[] = [];
  @ViewChild('messagesBox') messagesBox!: ElementRef;
  isChatVisible: boolean = false;
  newMessage: string = '';
  constructor(public chatService: ChatService, public userSrv: AuthService) {}

  ngOnInit(): void {
    this.chatService.getMessages();
    setTimeout(() => {
      this.scrollChat();
    }, 4000);
  }
  hideChat() {
    this.isChatVisible = !this.isChatVisible;
    this.scrollChat();
  }

  scrollChat() {
    setTimeout(() => {
      if (!this.messagesBox) return;
      const div = this.messagesBox.nativeElement;
      div.scrollTop = div.scrollHeight;
      div;
    }, 10);
  }

  onSubmit() {
    if (this.newMessage != '') {
      let date = new Date();
      let hora = date.toLocaleTimeString();
      let dayAndMonth = date
        .toLocaleDateString()
        .split('/')
        .slice(0, 2)
        .join('/');
      let fullDate = `${date
        .toLocaleDateString()
        .split('/')
        .reverse()
        .join('-')} ${hora}`;

      let user = {
        name: this.userSrv.user.displayName,
        email: this.userSrv.user.email,
        uid: this.userSrv.user.uid,
      };
      let message = {
        message: this.newMessage,
        user: user,
        fullDate: fullDate,
        date: dayAndMonth,
        hora: hora,
      };

      console.log(message);
      this.chatService.addMessage(message).then();
      this.newMessage = '';
      this.scrollChat();
    }
  }
  ngOnDestroy() {
    if (this.chatService.unsub) {
      this.chatService.unsub();
    }
  }
}
