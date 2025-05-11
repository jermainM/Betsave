export interface Row {
  id: number;
  _id: string;
  image: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: number;
  affiliateLink: string;
  allowedCountries: string[];
}