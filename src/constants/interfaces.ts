
export interface Brand {
  _id: string;
  logo: string;
  name: string;
  description: string;
  brandURL: string;
  affiliateLink: string;
  startDate: string;
  endDate: string;
  userCount: number;
}

export interface OfferProps {
  id: string;
  _id: string;
  image: string;
  title: string;
  description: string;
  cashbackType: string;
  cashbackRate: number;
  allowedCountries: string[];
  termsAndConditions: string;
  rewards: Array<{
    amount: string;
    title: string;
  }>;
  offerRate: number;
  bonusesRating: number;
  gameVarietyRating: number;
  trustScoreRating: number;
  depositBonus: string;
  apiEndpoint: string;
  apiKey: string;
  affiliateLink: string;
}