export const executiveModel = {
  worst: {
    revenueAt100: 814961,
    occupancy: {
      50: { revenue: 407481, netRevenue: 325984, annualPerUnit: 27165, monthlyPerUnit: 2264 },
      60: { revenue: 488977, netRevenue: 391181, annualPerUnit: 32598, monthlyPerUnit: 2717 },
      70: { revenue: 570473, netRevenue: 456378, annualPerUnit: 38032, monthlyPerUnit: 3169 },
      80: { revenue: 651969, netRevenue: 521575, annualPerUnit: 43465, monthlyPerUnit: 3622 },
      90: { revenue: 733465, netRevenue: 586772, annualPerUnit: 48898, monthlyPerUnit: 4075 },
    },
  },

  base: {
    revenueAt100: 968218,
    occupancy: {
      50: { revenue: 484109, netRevenue: 387287, annualPerUnit: 32274, monthlyPerUnit: 2689 },
      60: { revenue: 580931, netRevenue: 464745, annualPerUnit: 38729, monthlyPerUnit: 3227 },
      70: { revenue: 677752, netRevenue: 542202, annualPerUnit: 45183, monthlyPerUnit: 3765 },
      80: { revenue: 774574, netRevenue: 619659, annualPerUnit: 51638, monthlyPerUnit: 4303 },
      90: { revenue: 871396, netRevenue: 697117, annualPerUnit: 58093, monthlyPerUnit: 4841 },
    },
  },

  best: {
    revenueAt100: 1087339,
    occupancy: {
      50: { revenue: 543670, netRevenue: 434936, annualPerUnit: 36245, monthlyPerUnit: 3020 },
      60: { revenue: 652404, netRevenue: 521923, annualPerUnit: 43494, monthlyPerUnit: 3624 },
      70: { revenue: 761138, netRevenue: 608910, annualPerUnit: 50743, monthlyPerUnit: 4229 },
      80: { revenue: 869871, netRevenue: 695897, annualPerUnit: 57991, monthlyPerUnit: 4833 },
      90: { revenue: 978605, netRevenue: 782884, annualPerUnit: 65240, monthlyPerUnit: 5437 },
    },
  },
};

export const executiveUnitPricing = {
  studio: {
    label: "Studio",
    units: 6,
    worst: 4021,
    base: 4321,
    best: 4621,
  },
  twoBedroom: {
    label: "2BR",
    units: 6,
    worst: 7298,
    base: 9127,
    best: 10481,
  },
};
