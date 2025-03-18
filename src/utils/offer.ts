  export const calculateOfferStatus = (startDate: string, endDate: string): number => {
    const currentDate = new Date();
    const offerStartDate = new Date(startDate);
    const offerEndDate = new Date(endDate);

    if (offerEndDate < currentDate) {
      return 0; // expired
    } else if (offerStartDate <= currentDate && currentDate <= offerEndDate) {
      return 1; // active
    } else {
      return 2; // upcoming
    }
  };