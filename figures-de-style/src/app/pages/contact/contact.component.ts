import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  name = '';
  email = '';
  subject = '';
  message = '';
  submitted = false;

  onSubmit(): void {
    if (!this.name || !this.email || !this.message) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simulation d'envoi (en production, envoyer vers un backend)
    console.log('Message de contact:', {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
      date: new Date(),
    });

    // Sauvegarder dans localStorage pour tracking admin
    this.saveContactMessage();

    this.submitted = true;

    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      this.name = '';
      this.email = '';
      this.subject = '';
      this.message = '';
      this.submitted = false;
    }, 3000);
  }

  private saveContactMessage(): void {
    const messages = JSON.parse(
      localStorage.getItem('contact_messages') || '[]'
    );
    messages.push({
      id: Date.now().toString(),
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
      date: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem('contact_messages', JSON.stringify(messages));
  }
}
