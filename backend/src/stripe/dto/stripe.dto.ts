import { IsString, IsEnum } from 'class-validator';

export class CreateCheckoutDto {
  @IsString()
  priceId: string;

  @IsEnum(['premium', 'school'])
  plan: 'premium' | 'school';
}

export class StripeWebhookDto {
  type: string;
  data: {
    object: any;
  };
}
