export const totalUnits = 22;
export const operatorFee = 0.2;
export const occupancyOptions = [50, 60, 70, 80, 90];

export const scenarios = {
  conservative: {
    label: "محافظ",
    sublabel: "Worst Case",
    revenueAt100: 5022138,
  },
  realistic: {
    label: "واقعي",
    sublabel: "Base Case",
    revenueAt100: 5454138,
  },
  optimistic: {
    label: "متفائل",
    sublabel: "Best Case",
    revenueAt100: 5886138,
  },
};

export const monthlyRates = {
  conservative: 19000,
  realistic: 20650,
  optimistic: 22300,
};
