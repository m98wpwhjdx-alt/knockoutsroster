const categories = [
  { id: "all", label: "All medications", icon: "M12 4v16M4 12h16" },
  { id: "antiplatelets", label: "Antiplatelets", icon: "M7 3h10v18H7zM9 8h6M9 12h6M9 16h6" },
  { id: "anticoagulants", label: "Anticoagulants", icon: "M12 3c4 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2-6 6-10Z" },
  { id: "nsaids", label: "NSAIDs & COX-2", icon: "M6 15 15 6M9 6h6v6" },
  { id: "diabetes", label: "Diabetes", icon: "M12 3v18M8 7h8M8 17h8" },
  { id: "cardiac", label: "Cardiovascular", icon: "M20 8c0 6-8 11-8 11S4 14 4 8a4 4 0 0 1 7-2 4 4 0 0 1 9 2Z" },
  { id: "pde5", label: "PDE-5 inhibitors", icon: "M8 12h8M12 8v8" },
  { id: "psych", label: "Psychiatric", icon: "M12 4a8 8 0 0 0-8 8v3a3 3 0 0 0 3 3h1v-6H5a7 7 0 1 1 14 0h-3v6h1a3 3 0 0 0 3-3v-3a8 8 0 0 0-8-8Z" },
  { id: "supplements", label: "Herbals & vitamins", icon: "M5 19c9 0 14-5 14-14-9 0-14 5-14 14Z" },
  { id: "steroids", label: "Steroids", icon: "M8 21h8M12 17V3M7 8h10" },
  { id: "continue", label: "Continue day-of", icon: "M20 6 9 17l-5-5" },
  { id: "special", label: "Special considerations", icon: "M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z" }
];

const meds = [
  {
    id: "aspirin-secondary",
    category: "antiplatelets",
    name: "Aspirin: secondary prevention or stents",
    aliases: "Acetylsalicylic acid, prior PCI, stents, cardiovascular disease",
    actionType: "continue",
    action: "Continue if prior PCI, stents, or significant cardiovascular disease.",
    restart: "As soon as haemostasis is confirmed if interrupted.",
    why: "For secondary cardiovascular prevention, thrombotic risk of stopping may outweigh bleeding risk.",
    cautions: ["Stopping in stent patients is associated with markedly increased myocardial infarction risk."],
    tags: ["stent", "PCI", "secondary prevention"],
    hold: { type: "none" }
  },
  {
    id: "aspirin-primary",
    category: "antiplatelets",
    name: "Aspirin: primary prevention",
    aliases: "Acetylsalicylic acid",
    actionType: "stop",
    action: "Stop 5-7 days before surgery.",
    restart: "Typically 24 hours post-op after haemostasis, or per surgical bleeding assessment.",
    why: "Irreversible COX-1 inhibition impairs platelet aggregation for the platelet lifespan.",
    cautions: ["Clarify whether aspirin is truly primary prevention before stopping."],
    tags: ["platelets", "bleeding"],
    hold: { type: "days", low: 5, high: 7, text: "5-7 days before surgery" }
  },
  {
    id: "clopidogrel",
    category: "antiplatelets",
    name: "Clopidogrel",
    aliases: "P2Y12 receptor antagonist",
    actionType: "stop",
    action: "Stop 5 days before surgery.",
    restart: "Within 24-48 hours after haemostasis; high-risk patients may need a loading dose.",
    why: "Irreversible P2Y12 inhibition; 5-day washout allows partial platelet function recovery.",
    cautions: ["Discuss with cardiology before stopping if drug-eluting stent <12 months or bare-metal stent <6 weeks.", "Cataract surgery exception: thienopyridines often do not need to be stopped."],
    tags: ["P2Y12", "stent", "cataract"],
    hold: { type: "days", low: 5, high: 5, neuraxial: 5, text: "5 days before surgery" }
  },
  {
    id: "ticagrelor",
    category: "antiplatelets",
    name: "Ticagrelor",
    aliases: "Reversible P2Y12 antagonist",
    actionType: "stop",
    action: "Stop 5 days before surgery.",
    restart: "24 hours post-surgery if haemostasis is confirmed.",
    why: "Reversible P2Y12 inhibitor, but adequate platelet function recovery still requires washout.",
    cautions: ["Cataract surgery exception: thienopyridines often do not need to be stopped."],
    tags: ["P2Y12", "ASRA"],
    hold: { type: "days", low: 5, high: 5, neuraxial: 5, text: "5 days before surgery" }
  },
  {
    id: "prasugrel",
    category: "antiplatelets",
    name: "Prasugrel",
    aliases: "P2Y12 inhibitor",
    actionType: "stop",
    action: "Stop 7 days before surgery.",
    restart: "24-72 hours post-op depending on bleeding risk.",
    why: "Potent P2Y12 inhibition requires a longer washout.",
    cautions: ["Discuss stent timing with cardiology before stopping."],
    tags: ["P2Y12"],
    hold: { type: "days", low: 7, high: 7, neuraxial: 7, text: "7 days before surgery" }
  },
  {
    id: "ticlopidine",
    category: "antiplatelets",
    name: "Ticlopidine",
    aliases: "Older thienopyridine",
    actionType: "stop",
    action: "Stop 10 days before surgery.",
    restart: "24-48 hours after haemostasis.",
    why: "Prolonged platelet inhibition.",
    cautions: ["Largely replaced by clopidogrel, but may still appear in medication histories."],
    tags: ["P2Y12", "thienopyridine"],
    hold: { type: "days", low: 10, high: 10, text: "10 days before surgery" }
  },
  {
    id: "warfarin",
    category: "anticoagulants",
    name: "Warfarin",
    aliases: "Vitamin K antagonist",
    actionType: "stop",
    action: "Stop 5 days before surgery and confirm INR <=1.5 on day of surgery.",
    restart: "12-24 hours after surgery once haemostasis is achieved.",
    why: "Inhibits clotting factors II, VII, IX, X; INR usually normalises in about 5 days.",
    cautions: ["LMWH bridging is reserved for high thromboembolic risk patients only.", "Avoid routine bridging in low/moderate risk patients."],
    tags: ["INR", "bridging", "valve", "VTE"],
    hold: { type: "days", low: 5, high: 5, text: "5 days before surgery" }
  },
  {
    id: "apixaban-rivaroxaban",
    category: "anticoagulants",
    name: "Apixaban / Rivaroxaban",
    aliases: "Factor Xa inhibitors, DOACs",
    actionType: "stop",
    action: "Stop 24 hours for low bleeding risk or 48 hours for high bleeding risk.",
    restart: "24 hours after low-bleeding-risk surgery; 48-72 hours after high-bleeding-risk surgery.",
    why: "Predictable Factor Xa inhibition allows standardised hold times; neuraxial timing is longer.",
    cautions: ["For neuraxial block, stop 72 hours before procedure.", "Check renal function and concurrent bleeding-risk drugs."],
    tags: ["DOAC", "Factor Xa", "neuraxial", "ASRA"],
    hold: { type: "hours", low: 24, high: 48, neuraxial: 72, text: "24h low risk, 48h high risk, 72h neuraxial" }
  },
  {
    id: "dabigatran",
    category: "anticoagulants",
    name: "Dabigatran",
    aliases: "Direct thrombin inhibitor",
    actionType: "stop",
    action: "Stop 24 hours for low bleeding risk or 48 hours for high bleeding risk.",
    restart: "24-72 hours post-op depending on bleeding risk.",
    why: "Renally cleared; half-life prolongs significantly with impaired creatinine clearance.",
    cautions: ["Neuraxial: 72h if CrCl >=80, 96h if CrCl 50-79, 120h if CrCl 30-49.", "Idarucizumab is the specific emergency reversal agent."],
    tags: ["DOAC", "thrombin", "CrCl", "neuraxial", "Praxbind"],
    hold: { type: "hours", low: 24, high: 48, neuraxial: 96, text: "24-48h; neuraxial 72-120h by CrCl" }
  },
  {
    id: "edoxaban",
    category: "anticoagulants",
    name: "Edoxaban",
    aliases: "Factor Xa inhibitor",
    actionType: "stop",
    action: "Stop 24 hours for low bleeding risk or 48 hours for high bleeding risk.",
    restart: "24-72 hours post-op depending on bleeding risk.",
    why: "Direct Factor Xa inhibition.",
    cautions: ["For neuraxial block, stop 72 hours before procedure."],
    tags: ["DOAC", "Factor Xa", "neuraxial"],
    hold: { type: "hours", low: 24, high: 48, neuraxial: 72, text: "24h low risk, 48h high risk, 72h neuraxial" }
  },
  {
    id: "lmwh",
    category: "anticoagulants",
    name: "LMWH",
    aliases: "Enoxaparin, dalteparin",
    actionType: "hold",
    action: "Stop 12 hours before neuraxial for prophylactic dose; 24 hours for therapeutic dose.",
    restart: "Follow procedure, bleeding-risk, and neuraxial catheter timing.",
    why: "Anti-Xa activity persists 12-24 hours depending on dose.",
    cautions: ["ASRA: interval after needle placement before next dose must be respected."],
    tags: ["enoxaparin", "dalteparin", "neuraxial"],
    hold: { type: "hours", low: 12, high: 24, neuraxial: 24, text: "12h prophylactic, 24h therapeutic" }
  },
  {
    id: "nsaids",
    category: "nsaids",
    name: "NSAIDs",
    aliases: "Ibuprofen, diclofenac, naproxen, ketorolac, indomethacin",
    actionType: "stop",
    action: "Stop 48 hours before surgery for short-acting NSAIDs; stop 3 days for naproxen.",
    restart: "24-48 hours post-op once haemostasis is confirmed.",
    why: "Reversible COX-1 inhibition reduces thromboxane and platelet aggregation while drug is present.",
    cautions: ["NSAIDs alone pose no added neuraxial haematoma risk per ASRA, but combination with anticoagulants increases risk.", "Chronic NSAID plus DOAC use is a perioperative bleeding trap."],
    tags: ["ibuprofen", "naproxen", "ketorolac", "DOAC"],
    hold: { type: "hours", low: 48, high: 72, text: "48h; naproxen 3 days" }
  },
  {
    id: "cox2",
    category: "nsaids",
    name: "COX-2 selective inhibitors",
    aliases: "Celecoxib, etoricoxib, parecoxib",
    actionType: "continue",
    action: "Continue on day of surgery unless surgeon has bone-healing concerns.",
    restart: "No routine interruption.",
    why: "Selective COX-2 inhibition spares platelet function.",
    cautions: ["Some orthopaedic surgeons prefer holding due to theoretical bone-healing concerns.", "Prolonged use can increase thrombotic risk in cardiovascular disease."],
    tags: ["celecoxib", "bone healing"],
    hold: { type: "none" }
  },
  {
    id: "sglt2",
    category: "diabetes",
    name: "SGLT-2 inhibitors",
    aliases: "Empagliflozin, dapagliflozin, canagliflozin",
    actionType: "stop",
    action: "Stop 3 days before elective surgery.",
    restart: "When eating, drinking, mobilising, and not at AKI risk; typically 48-72 hours post-op.",
    why: "Risk of euglycaemic diabetic ketoacidosis during fasting and surgical stress.",
    cautions: ["Glucose may be normal while severe ketoacidosis develops; check ketones if unexplained acidosis."],
    tags: ["eDKA", "ketones", "AKI"],
    hold: { type: "days", low: 3, high: 3, text: "3 days before surgery" }
  },
  {
    id: "ertugliflozin",
    category: "diabetes",
    name: "Ertugliflozin",
    aliases: "Longer half-life SGLT-2 inhibitor",
    actionType: "stop",
    action: "Stop 4 days before surgery.",
    restart: "When eating, drinking, mobilising, and not at AKI risk; typically 48-72 hours post-op.",
    why: "Longer half-life than other SGLT-2 inhibitors.",
    cautions: ["Same euglycaemic DKA concern as the class."],
    tags: ["eDKA", "SGLT-2"],
    hold: { type: "days", low: 4, high: 4, text: "4 days before surgery" }
  },
  {
    id: "glp1-daily",
    category: "diabetes",
    name: "GLP-1 agonists: daily",
    aliases: "Liraglutide, oral semaglutide, exenatide",
    actionType: "caution",
    action: "Continue if asymptomatic on stable maintenance dose; hold day of surgery if symptomatic or dose-escalating.",
    restart: "Once tolerating oral intake and no ileus; typically 48-72 hours post-op.",
    why: "Delayed gastric emptying can create a pharmacologic full stomach and aspiration risk.",
    cautions: ["If continuing, consider 24-hour clear liquid diet, gastric ultrasound, and rapid sequence induction based on context."],
    tags: ["aspiration", "gastric ultrasound", "full stomach"],
    hold: { type: "days", low: 0, high: 0, text: "day-of if symptomatic or dose-escalating" }
  },
  {
    id: "glp1-weekly",
    category: "diabetes",
    name: "GLP-1 agonists: weekly",
    aliases: "Semaglutide, tirzepatide, dulaglutide",
    actionType: "caution",
    action: "Continue if asymptomatic on stable maintenance dose; hold 1 week if symptomatic or dose-escalating.",
    restart: "Once tolerating oral intake and no ileus; typically 48-72 hours post-op.",
    why: "Longer pharmacologic effect with delayed gastric emptying and aspiration risk.",
    cautions: ["If holding longer, bridging therapy may be required to prevent severe hyperglycaemia."],
    tags: ["semaglutide", "tirzepatide", "aspiration"],
    hold: { type: "days", low: 7, high: 7, text: "1 week if symptomatic or escalating" }
  },
  {
    id: "rapid-insulin",
    category: "diabetes",
    name: "Short-acting / rapid insulin",
    aliases: "Regular, aspart, lispro, glulisine",
    actionType: "hold",
    action: "Hold on day of surgery unless on continuous infusion.",
    restart: "With first meal post-op; use correctional dosing as needed while NPO.",
    why: "NPO status means no carbohydrate intake to balance short-acting insulin.",
    cautions: ["Monitor blood glucose perioperatively."],
    tags: ["hypoglycaemia", "NPO"],
    hold: { type: "days", low: 0, high: 0, text: "hold on day of surgery" }
  },
  {
    id: "basal-insulin",
    category: "diabetes",
    name: "Long-acting / basal insulin",
    aliases: "Glargine, detemir, degludec, NPH",
    actionType: "hold",
    action: "Give 75-80% usual basal dose for type 1 diabetes; 50-75% for type 2 diabetes.",
    restart: "Return to normal regimen once eating and clinically appropriate.",
    why: "Type 1 diabetes needs basal insulin to avoid DKA; type 2 diabetes can tolerate larger reductions.",
    cautions: ["Target range commonly 140-180 mg/dL; monitor hourly intraoperatively for diabetic patients."],
    tags: ["type 1", "type 2", "DKA"],
    hold: { type: "custom", text: "dose reduction on day of surgery" }
  },
  {
    id: "metformin",
    category: "diabetes",
    name: "Metformin",
    aliases: "Biguanide",
    actionType: "hold",
    action: "Hold on day of surgery; longer hold if contrast or AKI risk.",
    restart: "48 hours post-op once renal function is stable and patient is eating.",
    why: "Theoretical lactic acidosis risk if AKI develops perioperatively.",
    cautions: ["Check renal function before restart when risk exists."],
    tags: ["AKI", "contrast", "renal"],
    hold: { type: "days", low: 0, high: 0, text: "hold on day of surgery" }
  },
  {
    id: "sulfonylureas-dpp4",
    category: "diabetes",
    name: "Sulfonylureas / DPP-4 inhibitors",
    aliases: "Glipizide, glimepiride, gliclazide; sitagliptin, saxagliptin, linagliptin",
    actionType: "hold",
    action: "Hold sulfonylureas on day of surgery; DPP-4 inhibitors can generally continue.",
    restart: "Sulfonylureas with first meal; DPP-4 inhibitors per usual regimen.",
    why: "Sulfonylureas can cause significant hypoglycaemia while fasting; DPP-4 inhibitors have minimal hypoglycaemia risk alone.",
    cautions: ["Separate combination tablets into their component drug decisions."],
    tags: ["hypoglycaemia", "DPP-4"],
    hold: { type: "custom", text: "sulfonylurea hold day-of; DPP-4 continue" }
  },
  {
    id: "ace-arb",
    category: "cardiac",
    name: "ACE inhibitors / ARBs",
    aliases: "Lisinopril, enalapril, ramipril; losartan, telmisartan, valsartan",
    actionType: "hold",
    action: "Hold on day of surgery for most non-cardiac surgery.",
    restart: "When haemodynamically stable and oral intake resumed; typically 24-48 hours post-op.",
    why: "Risk of vasoplegic syndrome and refractory hypotension after induction.",
    cautions: ["Exception: stable heart failure with reduced ejection fraction may continue after cardiology discussion.", "Vasopressin or methylene blue may be needed for catecholamine-resistant vasoplegia."],
    tags: ["vasoplegia", "hypotension", "HFrEF"],
    hold: { type: "days", low: 0, high: 0, text: "hold on day of surgery" }
  },
  {
    id: "beta-statin-ccb",
    category: "cardiac",
    name: "Beta blockers / Statins / CCBs",
    aliases: "Metoprolol, atenolol; atorvastatin, rosuvastatin; amlodipine, diltiazem",
    actionType: "continue",
    action: "Continue on day of surgery.",
    restart: "No routine interruption.",
    why: "Avoids withdrawal and maintains stable cardiovascular control; statin withdrawal is associated with worse outcomes.",
    cautions: ["Do not initiate beta blockers immediately perioperatively in beta-blocker-naive patients."],
    tags: ["cardioprotection", "withdrawal"],
    hold: { type: "none" }
  },
  {
    id: "digoxin",
    category: "cardiac",
    name: "Digoxin",
    aliases: "Cardiac glycoside",
    actionType: "continue",
    action: "Continue on day of surgery.",
    restart: "No routine interruption.",
    why: "Maintains cardiac rate/rhythm control when already indicated.",
    cautions: ["Check level if recent dose changes; hypokalaemia and hypomagnesaemia potentiate toxicity."],
    tags: ["toxicity", "electrolytes"],
    hold: { type: "none" }
  },
  {
    id: "sildenafil-vardenafil",
    category: "pde5",
    name: "Sildenafil / Vardenafil",
    aliases: "Viagra, Levitra",
    actionType: "stop",
    action: "Stop 24 hours before surgery.",
    restart: "Per patient and nitrate/hypotension risk.",
    why: "PDE-5 inhibition plus nitrates can cause severe refractory hypotension.",
    cautions: ["Risk applies to all nitrates including GTN sprays, isosorbides, and nitroglycerin infusion."],
    tags: ["nitrates", "hypotension"],
    hold: { type: "hours", low: 24, high: 24, text: "24 hours before surgery" }
  },
  {
    id: "tadalafil",
    category: "pde5",
    name: "Tadalafil",
    aliases: "Cialis",
    actionType: "stop",
    action: "Stop 48 hours before surgery.",
    restart: "Per patient and nitrate/hypotension risk.",
    why: "Longer half-life than sildenafil; nitrates must wait longer after last dose.",
    cautions: ["Check for nitrate use and pulmonary hypertension indication."],
    tags: ["nitrates", "long acting"],
    hold: { type: "hours", low: 48, high: 48, text: "48 hours before surgery" }
  },
  {
    id: "ssri-snri-tca",
    category: "psych",
    name: "SSRIs / SNRIs / TCAs",
    aliases: "Sertraline, fluoxetine, citalopram, venlafaxine, duloxetine, amitriptyline",
    actionType: "continue",
    action: "Continue through day of surgery.",
    restart: "No routine interruption.",
    why: "Abrupt cessation can cause discontinuation syndrome and psychiatric relapse.",
    cautions: ["Avoid or use caution with tramadol, pethidine, methylene blue due to serotonin syndrome risk.", "TCAs can prolong QT and increase sensitivity to indirect sympathomimetics."],
    tags: ["serotonin syndrome", "QT", "tramadol"],
    hold: { type: "none" }
  },
  {
    id: "maoi",
    category: "psych",
    name: "MAOIs",
    aliases: "Phenelzine, tranylcypromine, moclobemide",
    actionType: "caution",
    action: "Continue with anaesthetic modifications; selected cases may hold 2 weeks under specialist direction.",
    restart: "Per psychiatric and anaesthetic plan.",
    why: "Older routine discontinuation practice is balanced against relapse and withdrawal risk.",
    cautions: ["Avoid pethidine, ephedrine, and metaraminol.", "Use direct sympathomimetics such as phenylephrine for hypotension."],
    tags: ["pethidine", "ephedrine", "hypertensive crisis"],
    hold: { type: "custom", text: "continue with modifications; selected holds 2 weeks" }
  },
  {
    id: "lithium",
    category: "psych",
    name: "Lithium",
    aliases: "Mood stabiliser",
    actionType: "caution",
    action: "Continue for minor surgery with monitoring; stop 24-72 hours before major surgery.",
    restart: "1 day post-op once haemodynamically stable, oral intake resumed, and renal function stable.",
    why: "Narrow therapeutic index; toxicity develops with dehydration, fluid shifts, or AKI.",
    cautions: ["Check lithium level, urea, creatinine, electrolytes, and ECG.", "Prolongs non-depolarising neuromuscular blockers."],
    tags: ["renal", "AKI", "NMB", "ECG"],
    hold: { type: "hours", low: 24, high: 72, text: "24-72h before major surgery" }
  },
  {
    id: "antipsych-benzo",
    category: "psych",
    name: "Antipsychotics / Benzodiazepines",
    aliases: "Anxiolytics and chronic benzodiazepines",
    actionType: "continue",
    action: "Continue on day of surgery.",
    restart: "No routine interruption.",
    why: "Maintains psychiatric stability; benzodiazepine withdrawal can cause seizures.",
    cautions: ["Watch QT prolongation with antipsychotics, especially with concurrent ondansetron."],
    tags: ["withdrawal", "seizure", "QT"],
    hold: { type: "none" }
  },
  {
    id: "herbals",
    category: "supplements",
    name: "Herbal supplements",
    aliases: "Garlic, ginkgo, ginseng, ginger, St John's wort, fish oil, turmeric, vitamin E",
    actionType: "stop",
    action: "Stop supplement-dose products 2 weeks before surgery.",
    restart: "Per patient and surgical team after bleeding and interaction risks settle.",
    why: "Bleeding, platelet, glycaemic, CYP3A4, serotonergic, or anticoagulant effects vary by supplement.",
    cautions: ["Ask directly because many patients do not volunteer supplements.", "Culinary ginger/turmeric and standard multivitamin doses are generally different from supplement-dose use."],
    tags: ["supplements", "bleeding", "CYP3A4"],
    hold: { type: "days", low: 14, high: 14, text: "2 weeks before surgery" }
  },
  {
    id: "corticosteroids",
    category: "steroids",
    name: "Oral & inhaled corticosteroids",
    aliases: "Prednisolone, hydrocortisone, budesonide, fluticasone, beclomethasone",
    actionType: "continue",
    action: "Continue on day of surgery; never abruptly stop chronic steroids.",
    restart: "Continue usual regimen; supplement stress dose when HPA axis is suppressed.",
    why: "Abrupt withdrawal in HPA-axis suppression can cause adrenal crisis.",
    cautions: ["Likely HPA suppressed: >20 mg prednisolone/day for >3 weeks, chronic high-dose steroid course, or Cushingoid features.", "Adrenal crisis: refractory hypotension, hypoglycaemia, hyperkalaemia, hyponatraemia."],
    tags: ["stress dose", "HPA", "adrenal crisis"],
    hold: { type: "none" }
  },
  {
    id: "stress-dose",
    category: "steroids",
    name: "Stress-dose steroid regimens",
    aliases: "Hydrocortisone supplementation",
    actionType: "caution",
    action: "Minor: usual oral dose. Moderate: hydrocortisone 50 mg IV at induction plus 25 mg IV q8h for 24h. Major: 100 mg IV at induction plus 50 mg IV q8h for 24-72h.",
    restart: "Resume oral regimen after supplementation/taper as clinically appropriate.",
    why: "Supplementation covers perioperative stress in HPA-axis suppressed patients.",
    cautions: ["Critically ill/septic: hydrocortisone 200-300 mg/day in divided doses or infusion.", "Give hydrocortisone 100 mg IV immediately if adrenal crisis is suspected."],
    tags: ["hydrocortisone", "moderate surgery", "major surgery"],
    hold: { type: "custom", text: "dose by surgical stress level" }
  },
  {
    id: "thyroid",
    category: "continue",
    name: "Thyroid medications",
    aliases: "Levothyroxine, liothyronine, carbimazole, methimazole, propylthiouracil",
    actionType: "continue",
    action: "Continue on day of surgery.",
    restart: "No routine interruption.",
    why: "Antithyroid medications prevent thyroid storm; one missed levothyroxine dose is usually clinically minor but continuation is standard.",
    cautions: ["Ensure antithyroid drugs are not omitted in thyrotoxic patients."],
    tags: ["thyroid storm"],
    hold: { type: "none" }
  },
  {
    id: "anticonvulsants",
    category: "continue",
    name: "Anticonvulsants",
    aliases: "Phenytoin, carbamazepine, valproate, levetiracetam, lamotrigine, topiramate",
    actionType: "continue",
    action: "Continue on day of surgery without fail.",
    restart: "Use IV equivalents if NPO post-op where available.",
    why: "Missed doses can precipitate breakthrough seizures, especially on emergence.",
    cautions: ["Plan NPO substitutions early for phenytoin, levetiracetam, or valproate when needed."],
    tags: ["seizure", "NPO"],
    hold: { type: "none" }
  },
  {
    id: "asthma-copd",
    category: "continue",
    name: "Asthma / COPD medications",
    aliases: "Salbutamol, salmeterol, ipratropium, tiotropium, inhaled steroids, montelukast",
    actionType: "continue",
    action: "Continue all inhalers and bronchodilators.",
    restart: "No routine interruption.",
    why: "Prevents perioperative bronchospasm.",
    cautions: ["Patient should bring inhalers to hospital and use before induction if needed."],
    tags: ["bronchospasm", "inhaler"],
    hold: { type: "none" }
  },
  {
    id: "ocp-hrt",
    category: "continue",
    name: "OCP / HRT",
    aliases: "Oral contraceptive pills, hormone replacement therapy",
    actionType: "caution",
    action: "Continue day of surgery in the source reference; discuss major surgery with prolonged immobility.",
    restart: "If stopped, restart per VTE risk and treating team plan.",
    why: "Continuation balances hormonal continuity with VTE risk.",
    cautions: ["Ensure thromboprophylaxis when VTE risk is increased.", "Sugammadex decreases hormonal contraceptive efficacy; backup contraception required for 7 days."],
    tags: ["VTE", "sugammadex", "contraception"],
    hold: { type: "custom", text: "continue; selected major cases may stop 4-6 weeks" }
  },
  {
    id: "ppi-eye-opioids",
    category: "continue",
    name: "PPIs, eye drops, chronic opioids",
    aliases: "Omeprazole, pantoprazole, glaucoma drops, lubricants, baseline opioids",
    actionType: "continue",
    action: "Continue on day of surgery.",
    restart: "No routine interruption; continue baseline opioid to avoid withdrawal.",
    why: "PPIs reduce gastric acidity, eye drops maintain ophthalmic control, chronic opioid continuation prevents withdrawal.",
    cautions: ["Timolol eye drops can have systemic beta-blocker absorption.", "Echothiophate can prolong succinylcholine."],
    tags: ["aspiration prophylaxis", "withdrawal", "eye drops"],
    hold: { type: "none" }
  },
  {
    id: "methotrexate-hcq",
    category: "special",
    name: "Methotrexate / Hydroxychloroquine",
    aliases: "DMARDs for rheumatoid arthritis or lupus",
    actionType: "continue",
    action: "Continue through surgery.",
    restart: "No routine interruption.",
    why: "Stopping methotrexate increases flare risk; hydroxychloroquine has a long half-life and holding has little practical effect.",
    cautions: ["Consider holding methotrexate in renal failure or major fluid shifts."],
    tags: ["DMARD", "RA", "lupus"],
    hold: { type: "none" }
  },
  {
    id: "biologics-jak",
    category: "special",
    name: "Biologics / JAK inhibitors",
    aliases: "Etanercept, infliximab, adalimumab, tofacitinib, baricitinib, upadacitinib",
    actionType: "hold",
    action: "Hold biologics for major surgery by scheduling at end of dosing cycle; hold JAK inhibitors 3-7 days before surgery.",
    restart: "Biologics commonly restart 14 days post-op once wound has healed and no infection signs.",
    why: "Balances infection and VTE risk against disease flare.",
    cautions: ["Drug-specific dosing interval matters.", "Coordinate with rheumatology for high-risk patients."],
    tags: ["infection", "VTE", "rheumatology"],
    hold: { type: "days", low: 3, high: 7, text: "JAK 3-7 days; biologics by dosing cycle" }
  },
  {
    id: "tamoxifen-ai",
    category: "special",
    name: "Tamoxifen / aromatase inhibitors",
    aliases: "Breast cancer endocrine therapy",
    actionType: "caution",
    action: "Discuss with oncology; weigh VTE risk against cancer treatment continuity.",
    restart: "Per oncology and surgical VTE plan.",
    why: "Tamoxifen significantly increases VTE risk, especially with major surgery and immobility.",
    cautions: ["Some recommendations stop tamoxifen 2 weeks pre-op for major surgery with prolonged immobility."],
    tags: ["oncology", "VTE", "tamoxifen"],
    hold: { type: "custom", text: "discuss; selected major cases stop 2 weeks" }
  },
  {
    id: "transplant-hiv",
    category: "special",
    name: "Transplant immunosuppressants / antiretrovirals",
    aliases: "Tacrolimus, cyclosporin, mycophenolate, azathioprine, sirolimus; HIV medications",
    actionType: "continue",
    action: "Continue without interruption.",
    restart: "No routine interruption; coordinate substitutions if NPO.",
    why: "Missing transplant immunosuppressants can precipitate graft rejection; HIV therapy interruption is avoided.",
    cautions: ["Check CYP interactions, especially with protease inhibitors.", "Coordinate with transplant or infectious disease teams."],
    tags: ["transplant", "HIV", "CYP"],
    hold: { type: "none" }
  }
];

function readBookmarks() {
  try {
    return JSON.parse(localStorage.getItem("preopBookmarks") || "[]");
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks) {
  try {
    localStorage.setItem("preopBookmarks", JSON.stringify([...bookmarks]));
  } catch {
    // File URLs and strict embedded browsers can disable localStorage.
  }
}

const state = {
  category: "all",
  filter: "all",
  query: "",
  selectedId: meds[0].id,
  bookmarks: new Set(readBookmarks())
};

const els = {
  nav: document.querySelector("#categoryNav"),
  cards: document.querySelector("#cards"),
  detail: document.querySelector("#detailPanel"),
  search: document.querySelector("#searchInput"),
  chips: document.querySelectorAll(".chip"),
  activeTitle: document.querySelector("#activeCategoryTitle"),
  drugCount: document.querySelector("#drugCount"),
  surgeryDate: document.querySelector("#surgeryDate"),
  riskSelect: document.querySelector("#riskSelect"),
  neuraxial: document.querySelector("#neuraxialToggle"),
  plannerDrug: document.querySelector("#plannerDrug"),
  plannerResult: document.querySelector("#plannerResult"),
  clearPlanner: document.querySelector("#clearPlanner"),
  printSummary: document.querySelector("#printSummary")
};

function icon(path) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
}

function categoryLabel(id) {
  return categories.find((category) => category.id === id)?.label || "Other";
}

function actionLabel(type) {
  return type === "stop" ? "Stop" : type === "hold" ? "Hold" : type === "continue" ? "Continue" : "Caution";
}

function filteredMeds() {
  const query = state.query.trim().toLowerCase();
  return meds.filter((med) => {
    const inCategory = state.category === "all" || med.category === state.category;
    const inFilter = state.filter === "all" || med.actionType === state.filter;
    const haystack = [med.name, med.aliases, med.action, med.restart, med.why, med.tags.join(" "), med.cautions.join(" ")].join(" ").toLowerCase();
    return inCategory && inFilter && (!query || haystack.includes(query));
  });
}

function renderNav() {
  els.nav.innerHTML = categories.map((category) => {
    const count = category.id === "all" ? meds.length : meds.filter((med) => med.category === category.id).length;
    return `
      <button class="nav-button ${state.category === category.id ? "active" : ""}" data-category="${category.id}">
        ${icon(category.icon)}
        <span>${category.label}</span>
        <span class="count-pill">${count}</span>
      </button>
    `;
  }).join("");
}

function renderCards() {
  const list = filteredMeds();
  els.activeTitle.textContent = state.query ? `${list.length} matches` : categoryLabel(state.category);

  if (!list.some((med) => med.id === state.selectedId) && list[0]) {
    state.selectedId = list[0].id;
  }

  els.cards.innerHTML = list.length ? list.map((med) => `
    <button class="card ${med.id === state.selectedId ? "active" : ""}" data-med-id="${med.id}">
      <div class="card-top">
        <div>
          <h4>${med.name}</h4>
          <p class="aliases">${med.aliases}</p>
        </div>
        <span class="badge ${med.actionType}">${actionLabel(med.actionType)}</span>
      </div>
      <p class="summary">${med.action}</p>
      <div class="card-meta">
        <span class="meta-pill">${categoryLabel(med.category)}</span>
        <span class="meta-pill">${med.restart}</span>
      </div>
    </button>
  `).join("") : `<div class="empty-state">No matching medication records. Try a broader search or a different action filter.</div>`;

  renderDetail();
  renderPlannerOptions();
}

function renderDetail() {
  const med = meds.find((item) => item.id === state.selectedId);
  if (!med) {
    els.detail.innerHTML = `<div class="detail-empty">Select a medication card to inspect the source-derived action, rationale, restart timing, and cautions.</div>`;
    return;
  }

  const saved = state.bookmarks.has(med.id);
  els.detail.innerHTML = `
    <div class="detail-header">
      <span class="badge ${med.actionType}">${actionLabel(med.actionType)}</span>
      <h3>${med.name}</h3>
      <p>${med.aliases}</p>
    </div>
    <div class="detail-content">
      <section class="detail-block">
        <h5>Action</h5>
        <p>${med.action}</p>
      </section>
      <section class="detail-block">
        <h5>Rationale</h5>
        <p>${med.why}</p>
      </section>
      <section class="detail-block">
        <h5>Restart</h5>
        <p>${med.restart}</p>
      </section>
      <section class="detail-block">
        <h5>Cautions</h5>
        <ul>${med.cautions.map((caution) => `<li>${caution}</li>`).join("")}</ul>
      </section>
      <section class="detail-block">
        <h5>Timeline</h5>
        <div class="timeline">
          <div class="timeline-${med.actionType}"><span>Pre-op</span><strong>${med.hold.text || med.action}</strong></div>
          <div><span>Post-op</span><strong>${med.restart}</strong></div>
        </div>
      </section>
      <button class="text-button bookmark" data-bookmark="${med.id}">
        ${icon(saved ? "M20 6 9 17l-5-5" : "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z")}
        ${saved ? "Bookmarked" : "Bookmark"}
      </button>
    </div>
  `;
}

function renderPlannerOptions() {
  const current = els.plannerDrug.value || state.selectedId;
  els.plannerDrug.innerHTML = meds.map((med) => `<option value="${med.id}">${med.name}</option>`).join("");
  els.plannerDrug.value = meds.some((med) => med.id === current) ? current : state.selectedId;
  renderPlanner();
}

function subtractFromDate(dateValue, amount, unit) {
  const date = new Date(`${dateValue}T09:00:00`);
  if (unit === "hours") date.setHours(date.getHours() - amount);
  if (unit === "days") date.setDate(date.getDate() - amount);
  return date.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: unit === "hours" ? "numeric" : undefined,
    minute: unit === "hours" ? "2-digit" : undefined
  });
}

function renderPlanner() {
  const med = meds.find((item) => item.id === els.plannerDrug.value) || meds.find((item) => item.id === state.selectedId);
  if (!med) return;

  const surgeryDate = els.surgeryDate.value;
  const risk = els.riskSelect.value;
  const useNeuraxial = els.neuraxial.checked;
  const hold = med.hold;
  let timing = med.action;

  if (surgeryDate && (hold.type === "days" || hold.type === "hours")) {
    const amount = useNeuraxial && hold.neuraxial ? hold.neuraxial : hold[risk] ?? hold.low;
    const unit = hold.type;
    timing = `Last dose target: ${subtractFromDate(surgeryDate, amount, unit)} (${hold.text}).`;
  } else if (hold.type === "none") {
    timing = "No routine pre-op interruption is listed in the PDF source.";
  } else if (hold.text) {
    timing = `Use source timing: ${hold.text}.`;
  }

  els.plannerResult.innerHTML = `
    <strong>${med.name}</strong><br />
    ${timing}<br />
    Restart: ${med.restart}
  `;
}

function persistBookmarks() {
  saveBookmarks(state.bookmarks);
}

function bindEvents() {
  els.nav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    renderNav();
    renderCards();
  });

  els.cards.addEventListener("click", (event) => {
    const card = event.target.closest("[data-med-id]");
    if (!card) return;
    state.selectedId = card.dataset.medId;
    els.plannerDrug.value = state.selectedId;
    renderCards();
  });

  els.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderCards();
  });

  els.chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      state.filter = chip.dataset.filter;
      els.chips.forEach((item) => item.classList.toggle("active", item === chip));
      renderCards();
    });
  });

  els.detail.addEventListener("click", (event) => {
    const button = event.target.closest("[data-bookmark]");
    if (!button) return;
    const id = button.dataset.bookmark;
    if (state.bookmarks.has(id)) state.bookmarks.delete(id);
    else state.bookmarks.add(id);
    persistBookmarks();
    renderDetail();
  });

  [els.surgeryDate, els.riskSelect, els.neuraxial, els.plannerDrug].forEach((control) => {
    control.addEventListener("change", renderPlanner);
  });

  els.clearPlanner.addEventListener("click", () => {
    els.surgeryDate.value = "";
    els.riskSelect.value = "low";
    els.neuraxial.checked = false;
    renderPlanner();
  });

  els.printSummary.addEventListener("click", () => window.print());
}

function init() {
  const today = new Date();
  today.setDate(today.getDate() + 7);
  els.surgeryDate.valueAsDate = today;
  els.drugCount.textContent = meds.length;
  renderNav();
  renderCards();
  bindEvents();
}

init();
