export const bloodWorkCategories = {
  cbc: {
    name: "Complete Blood Count",
    markers: ["HGB", "WBC", "PLT", "RBC", "HCT"]
  },
  metabolic: {
    name: "Metabolic Panel",
    markers: ["GLU", "Ca", "Na", "K", "HCO3", "Cl"]
  },
  liver: {
    name: "Liver Function",
    markers: ["ALT", "AST", "ALP", "BIL"]
  },
  kidney: {
    name: "Kidney Function",
    markers: ["CREA", "BUN", "eGFR"]
  },
  lipids: {
    name: "Lipid Panel",
    markers: ["TC", "HDL", "LDL", "TG"]
  },
  hormones: {
    name: "Hormones",
    markers: ["TSH", "FT4", "FT3"]
  },
  cancer: {
    name: "Cancer Markers",
    markers: ["PSA", "CEA", "CA125"]
  },
  inflammation: {
    name: "Inflammation Markers",
    markers: ["CRP", "ESR"]
  },
  vitamins: {
    name: "Vitamins and Minerals",
    markers: ["VIT-D", "B12", "FER", "FOL"]
  }
};

export const getMarkerCategory = (markerCode: string) => {
  for (const [category, data] of Object.entries(bloodWorkCategories)) {
    if (data.markers.includes(markerCode)) {
      return data.name;
    }
  }
  return "Other";
};