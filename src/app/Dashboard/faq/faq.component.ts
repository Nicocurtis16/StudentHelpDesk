import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  faqs: any[] = [];
  isModalOpen = false;
  isEdit = false;
  faqForm: any = {};

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs(): void {
    this.faqService.getFaqs().subscribe(
      (response) => {
        this.faqs = response.questions;
        // Initialize the 'isExpanded' property for each FAQ
        this.faqs.forEach((faq) => (faq.isExpanded = false));
      },
      (error) => {
        console.error('Error fetching FAQs:', error);
      }
    );
  }

  addFaq(): void {
    this.isEdit = false;
    this.faqForm = {};
    this.isModalOpen = true;
  }

  editFaq(faq: any): void {
    this.isEdit = true;
    this.faqForm = { ...faq };
    this.isModalOpen = true;
  }

  deleteFaq(faqId: number): void {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      this.faqService.deleteFaq(faqId).subscribe(
        () => this.loadFaqs(),
        (error) => console.error('Error deleting FAQ:', error)
      );
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.faqService.editFaq(this.faqForm).subscribe(
        () => {
          this.loadFaqs();
          this.closeModal();
        },
        (error) => console.error('Error updating FAQ:', error)
      );
    } else {
      this.faqService.addFaq(this.faqForm).subscribe(
        () => {
          this.loadFaqs();
          this.closeModal();
        },
        (error) => console.error('Error adding FAQ:', error)
      );
    }
  }

  toggleExpand(selectedFaq: any): void {
    // Set all FAQs to not expanded
    this.faqs.forEach((faq) => (faq.isExpanded = false));

    // Toggle the selected FAQ
    selectedFaq.isExpanded = !selectedFaq.isExpanded;
  }
}
