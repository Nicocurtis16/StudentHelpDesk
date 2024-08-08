// faq.component.ts
import { Component, OnInit } from '@angular/core';
import { FAQService } from '../../faq.service';
import { FAQ } from '../../faq.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FAQComponent implements OnInit {
  faqs: FAQ[] = [];
  newFAQ: FAQ = { id: 0, question: '', answer: '' };

  constructor(private faqService: FAQService) {}

  ngOnInit(): void {
    this.loadFAQs();
  }

  loadFAQs(): void {
    this.faqService.getFAQs().subscribe((data) => {
      this.faqs = data;
    });
  }

  addFAQ(): void {
    this.faqService.addFAQ(this.newFAQ).subscribe((faq) => {
      this.faqs.push(faq);
      this.newFAQ = { id: 0, question: '', answer: '' };
    });
  }

  updateFAQ(faq: FAQ): void {
    this.faqService.updateFAQ(faq).subscribe();
  }

  deleteFAQ(id: number): void {
    this.faqService.deleteFAQ(id).subscribe(() => {
      this.faqs = this.faqs.filter((faq) => faq.id !== id);
    });
  }
}
