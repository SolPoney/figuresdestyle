export type PlanType = "free" | "premium" | "school";

export interface User {
	id: string;
	email: string;
	name?: string;
	plan: PlanType;
	createdAt: Date;
	premiumUntil?: Date;
}

export interface Subscription {
	userId: string;
	plan: PlanType;
	unlockedModules: string[];
	startDate: Date;
	endDate?: Date;
	stripeSubscriptionId?: string;
}
