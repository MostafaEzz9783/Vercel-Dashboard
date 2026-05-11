export const executiveModel = {
  worst: {
    revenueAt100: 1672596,
    occupancy: {
      50: { revenue: 836298, netRevenue: 669038, annualPerUnit: 33452, monthlyPerUnit: 2788 },
      60: { revenue: 1003558, netRevenue: 802846, annualPerUnit: 40142, monthlyPerUnit: 3345 },
      70: { revenue: 1170817, netRevenue: 936654, annualPerUnit: 46833, monthlyPerUnit: 3903 },
      80: { revenue: 1338077, netRevenue: 1070461, annualPerUnit: 53523, monthlyPerUnit: 4460 },
      90: { revenue: 1505336, netRevenue: 1204269, annualPerUnit: 60213, monthlyPerUnit: 5018 },
    },
  },
  base: {
    revenueAt100: 2030432,
    occupancy: {
      50: { revenue: 1015216, netRevenue: 812173, annualPerUnit: 40609, monthlyPerUnit: 3384 },
      60: { revenue: 1218259, netRevenue: 974607, annualPerUnit: 48730, monthlyPerUnit: 4061 },
      70: { revenue: 1421302, netRevenue: 1137042, annualPerUnit: 56852, monthlyPerUnit: 4738 },
      80: { revenue: 1624345, netRevenue: 1299476, annualPerUnit: 64974, monthlyPerUnit: 5414 },
      90: { revenue: 1827389, netRevenue: 1461911, annualPerUnit: 73096, monthlyPerUnit: 6091 },
    },
  },
  best: {
    revenueAt100: 2422511,
    occupancy: {
      50: { revenue: 1211255, netRevenue: 969004, annualPerUnit: 48450, monthlyPerUnit: 4038 },
      60: { revenue: 1453506, netRevenue: 1162805, annualPerUnit: 58140, monthlyPerUnit: 4845 },
      70: { revenue: 1695758, netRevenue: 1356606, annualPerUnit: 67830, monthlyPerUnit: 5653 },
      80: { revenue: 1938009, netRevenue: 1550407, annualPerUnit: 77520, monthlyPerUnit: 6460 },
      90: { revenue: 2180260, netRevenue: 1744208, annualPerUnit: 87210, monthlyPerUnit: 7268 },
    },
  },
};

export const executiveUnitPricing = {
  oneBedroom: {
    label: "1BR",
    units: 12,
    unitIds: ["A1", "A2", "A3", "A4", "A5", "A7", "A8", "A10", "A13", "A14", "A16", "A19"],
    worst: 6420,
    base: 7793,
    best: 9167,
    projectionAt100: {
      worst: 924447,
      base: 1122223,
      best: 1320000,
    },
  },
  twoBedroom: {
    label: "2BR",
    units: 8,
    unitIds: ["A6", "A9", "A11", "A12", "A15", "A17", "A18", "A20"],
    worst: 7793,
    base: 9461,
    best: 11484,
    projectionAt100: {
      worst: 748149,
      base: 908208,
      best: 1102511,
    },
  },
};
