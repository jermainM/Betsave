
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
  subTitle: string;
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

export interface TransactionType {
  betsaveId: string;
  userName: string;
  userEmail: string;
  totalRequestedAmount: number;
  tier: string;
  cashbackRate: number;
  status: "not-paid" | "pending" | "rejected" | "paid";
  requestedDate: string;
  paymentMethod: string;
  paymentAddress: string;
  history: any;
  createdAt: string;
  updatedAt: string;
  claimDate: string;
}