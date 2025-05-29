
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
  cashbackRate: number;
  cashbackType: string;
  allowedCountries: string[];
  brands: Brand[];
}