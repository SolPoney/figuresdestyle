import { Injectable, signal } from "@angular/core";

export interface DialogConfig {
	title: string;
	message: string;
	confirmLabel?: string;
	cancelLabel?: string;
	variant?: "danger" | "primary";
}

interface DialogState extends DialogConfig {
	resolve: (result: boolean) => void;
}

@Injectable({ providedIn: "root" })
export class ConfirmDialogService {
	readonly state = signal<DialogState | null>(null);

	open(config: DialogConfig): Promise<boolean> {
		return new Promise((resolve) => {
			this.state.set({ ...config, resolve });
		});
	}

	confirm(): void {
		this.state()?.resolve(true);
		this.state.set(null);
	}

	cancel(): void {
		this.state()?.resolve(false);
		this.state.set(null);
	}
}
