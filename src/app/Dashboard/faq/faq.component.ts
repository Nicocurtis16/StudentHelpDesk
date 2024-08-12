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
  selectedTopic: string = 'Department';
  isConfirmModalOpen = false; // State for confirmation modal
  confirmedFaqId: number | null = null; // Store the ID of the FAQ to be deleted

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs(): void {
    this.faqService.getFaqs().subscribe(
      (response) => {
        console.log('Fetched FAQs:', response);
        this.faqs = response.questions;
        this.faqs.forEach((faq) => (faq.isExpanded = false));
      },
      (error) => {
        console.error('Error fetching FAQs:', error);
      }
    );
  }

  addFaq(): void {
    this.isEdit = false;
    this.faqForm = {
      Question: '',
      Answer: '',
      Topic: this.selectedTopic,
    };
    this.isModalOpen = true;
  }

  editFaq(faq: any): void {
    this.isEdit = true;
    this.faqForm = {
      Question: faq.Question,
      Answer: faq.Answer,
      Topic: faq.Topic,
      QuestionID: faq.QuestionID,
    };
    this.isModalOpen = true;
  }

  confirmDelete(faqId: number): void {
    this.confirmedFaqId = faqId;
    this.isConfirmModalOpen = true;
  }

  cancelDelete(): void {
    this.isConfirmModalOpen = false;
    this.confirmedFaqId = null;
  }

  deleteFaq(faqId: number): void {
    if (faqId !== null) {
      this.faqService.deleteFaq(faqId).subscribe(
        () => {
          this.loadFaqs();
          this.isConfirmModalOpen = false;
          this.confirmedFaqId = null;
        },
        (error) => console.error('Error deleting FAQ:', error)
      );
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    console.log('Submitting FAQ data:', this.faqForm);

    if (!this.faqForm.Question || !this.faqForm.Answer) {
      alert('Please fill out all required fields.');
      return;
    }

    const payload = {
      Question: this.faqForm.Question,
      Answer: this.faqForm.Answer,
    };

    if (this.isEdit) {
      this.faqService.editFaq(this.faqForm).subscribe(
        (response) => {
          console.log('FAQ updated successfully:', response.message);
          this.loadFaqs();
          this.closeModal();
        },
        (error) => {
          console.error('Error updating FAQ:', error);
        }
      );
    } else {
      this.faqService.addFaq(payload, this.selectedTopic).subscribe(
        (response) => {
          console.log('FAQ added successfully:', response.message);
          this.loadFaqs();
          this.closeModal();
        },
        (error) => {
          console.error('Error adding FAQ:', error);
        }
      );
    }
  }

  toggleExpand(selectedFaq: any): void {
    this.faqs.forEach((faq) => (faq.isExpanded = false));
    selectedFaq.isExpanded = !selectedFaq.isExpanded;
  }
}
