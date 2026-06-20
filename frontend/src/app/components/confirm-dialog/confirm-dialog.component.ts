import { CommonModule } from "@angular/common";
import { Component, HostListener, inject } from "@angular/core";
import { ConfirmDialogService } from "./confirm-dialog.service";

@Component({
	selector: "app-confirm-dialog",
	standalone: true,
	imports: [CommonModule],
	template: `
    @if (dialog.state()) {
      <div
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in"
        (click)="dialog.cancel()"
        role="dialog"
        aria-modal="true"
        [attr.aria-labelledby]="'dialog-title'"
      >
        <div
          class="card surface-shine w-full max-w-md p-6 animate-scale-in"
          (click)="$event.stopPropagation()"
        >
          <h2 id="dialog-title" class="text-lg font-bold text-dark-text mb-2">
            {{ dialog.state()!.title }}
          </h2>
          <p class="text-dark-textSecondary text-sm mb-6">
            {{ dialog.state()!.message }}
          </p>
          <div class="flex gap-3 justify-end">
            @if (dialog.state()!.cancelLabel !== '') {
              <button (click)="dialog.cancel()" class="btn btn-secondary">
                {{ dialog.state()!.cancelLabel ?? 'Annuler' }}
              </button>
            }
            <button
              (click)="dialog.confirm()"
              [class]="dialog.state()!.variant === 'danger' ? 'btn btn-danger' : 'btn btn-primary'"
            >
              {{ dialog.state()!.confirmLabel ?? 'Confirmer' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmDialogComponent {
	dialog = inject(ConfirmDialogService);

	@HostListener("document:keydown.escape")
	onEscape(): void {
		if (this.dialog.state()) this.dialog.cancel();
	}
}
