import { registerEnumType } from '@nestjs/graphql';

enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  CAD = 'CAD',
  ZAF = 'ZAF',
  GBP = 'GBP',
  SEK = 'SEK',
}

registerEnumType(Currency, {
  name: 'Currency',
});

export default Currency;
