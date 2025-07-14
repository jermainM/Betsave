
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

export interface Row {
  id: number;
  _id: string;
  image: string;
  title: string;
  description: string;
  termsAndConditions: string;
  cashbackRate: number;
  cashbackType: string;
  allowedCountries: string[];
  type: "available" | "promotional"
  brands: Brand[];
}