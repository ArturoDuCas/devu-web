import {inject, Injectable} from '@angular/core';
import {MessageService} from "primeng/api";


@Injectable({
  providedIn: 'root'
})

export class ToastService {
  private messageService = inject(MessageService);

  constructor() {}

  showSuccess(summary: string, detail: string) {
    this.messageService.add({severity:'success', summary: summary, detail: detail});
  }

  showInfo(summary: string, detail: string) {
    this.messageService.add({severity:'info', summary: summary, detail: detail});
  }

  showWarn(summary: string, detail: string) {
    this.messageService.add({severity:'warn', summary: summary, detail: detail});
  }

  showError(summary: string, detail: string) {
    this.messageService.add({severity:'error', summary: summary, detail: detail});
  }

  clear() {
    this.messageService.clear();
  }


}
