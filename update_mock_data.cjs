const fs = require('fs');
const content = fs.readFileSync('src/lib/mockData.js', 'utf-8');

const newTollPlazas = `export const INITIAL_TOLL_PLAZAS = [
  // M/s Preetee Builders
  { id: "toll-1", consortium: "M/s Preetee Builders", toll_name: "Haivargaon Pawasa Toll Plaza", state: "Maharastra", project_stretch: "NH60 Km 42+000 to KM179+946", authority: "National Highway Authority Of India", operational_period: "2022 To 2027", contract_value: 370.00, status: "Ongoing" },
  { id: "toll-2", consortium: "M/s Preetee Builders", toll_name: "Bamanbor Toll Plaza", state: "Gujarat", project_stretch: "", authority: "Road and Building Department Gujarat", operational_period: "2024-2025", contract_value: 0, status: "Completed" },
  { id: "toll-3", consortium: "M/s Preetee Builders", toll_name: "Bagodra Toll Plaza", state: "Gujarat", project_stretch: "", authority: "Road and Building Department Gujarat", operational_period: "2024-2025", contract_value: 0, status: "Completed" },
  { id: "toll-4", consortium: "M/s Preetee Builders", toll_name: "Kobadi Toll Plaza", state: "Gujarat", project_stretch: "NH 8E Bhavnagar-Talaja NHDP-IV", authority: "National Highway Authority Of India", operational_period: "2024-2025", contract_value: 41.00, status: "Completed" },

  // M/s MAP Infra
  { id: "toll-5", consortium: "M/s MAP Infra", toll_name: "Limha Toll Plaza", state: "Chhattisgarh", project_stretch: "Km. 0.000 to Km 53.300 of NH-111", authority: "National Highway Authority Of India", operational_period: "2024-2025", contract_value: 90.00, status: "Completed" },
  { id: "toll-6", consortium: "M/s MAP Infra", toll_name: "Bhadbhid Toll Plaza", state: "Gujarat", project_stretch: "Km. 136.000 to km. 165.300 of NH-751", authority: "National Highway Authority Of India", operational_period: "2025-2026", contract_value: 65.30, status: "Completed" },
  { id: "toll-7", consortium: "M/s MAP Infra", toll_name: "Dumbarwadi Toll Plaza", state: "Maharastra", project_stretch: "km 101.000 to km 161.212 of NH 222", authority: "National Highway Authority Of India", operational_period: "2025-2026", contract_value: 7.00, status: "Completed" },
  { id: "toll-8", consortium: "M/s MAP Infra", toll_name: "Valsang Toll Plaza", state: "Maharastra", project_stretch: "NH 150E Akkalkot To Solapur", authority: "National Highway Authority Of India", operational_period: "2025-2026", contract_value: 41.00, status: "Completed" },
  { id: "toll-9", consortium: "M/s MAP Infra", toll_name: "Turup Toll Plaza", state: "Jharkhand", project_stretch: "NH-33 from Km 113.730 to Km 140.000", authority: "National Highway Authority Of India", operational_period: "2025-2026", contract_value: 43.00, status: "Completed" },
  { id: "toll-10", consortium: "M/s MAP Infra", toll_name: "Pandane Toll Plaza", state: "Maharastra", project_stretch: "Km 121.500 to Km 161.281 of NH- 953", authority: "National Highway Authority Of India", operational_period: "2025-2025", contract_value: 5.50, status: "Completed" },
  { id: "toll-11", consortium: "M/s MAP Infra", toll_name: "Borgaon Toll Plaza", state: "Maharastra", project_stretch: "NH-166 from Km 182.556 to Km 224.000", authority: "National Highway Authority Of India", operational_period: "2025-2026", contract_value: 54.60, status: "Completed" },

  // M/s JRR Infra
  { id: "toll-12", consortium: "M/s JRR Infra", toll_name: "Kumhari Toll Plaza", state: "Chhattisgarh", project_stretch: "km 281.000 to 307.600 of National Highway 6 (New NH-53)", authority: "National Highway Authority Of India", operational_period: "2026-2027", contract_value: 63.00, status: "Ongoing" },
  { id: "toll-13", consortium: "M/s JRR Infra", toll_name: "Pimparwadi Toll Plaza", state: "Maharastra", project_stretch: "Sinnar Shirdi section /NH-160", authority: "National Highway Authority Of India", operational_period: "2026-2027", contract_value: 16.00, status: "Ongoing" },
  { id: "toll-14", consortium: "M/s JRR Infra", toll_name: "Manan Toll Plaza", state: "Punjab", project_stretch: "KM 22.673 to KM 71.496 of NH 354", authority: "National Highway Authority Of India", operational_period: "2026-2027", contract_value: 2.00, status: "Ongoing" },

  // M/s MSP Infra
  { id: "toll-15", consortium: "M/s MSP Infra", toll_name: "Chiddan Toll Plaza", state: "Punjab", project_stretch: "km 456.100 to km 492.030 of NH-1", authority: "National Highway Authority Of India", operational_period: "2025-2026", contract_value: 2.80, status: "Ongoing" },
  { id: "toll-16", consortium: "M/s MSP Infra", toll_name: "Umari Toll Plaza", state: "Maharastra", project_stretch: "NH-548D KM 55+615 To KM 137+300", authority: "National Highway Authority Of India", operational_period: "2025-2026", contract_value: 23.00, status: "Ongoing" },
  { id: "toll-17", consortium: "M/s MSP Infra", toll_name: "Usma Toll Plaza", state: "Punjab", project_stretch: "NH-15 from Km112+575 To Km 166+925", authority: "National Highway Authority Of India", operational_period: "2026-2027", contract_value: 66.00, status: "Ongoing" },
  { id: "toll-18", consortium: "M/s MSP Infra", toll_name: "Doli Toll Plaza", state: "Rajasthan", project_stretch: "km 140.000 to km 225.615", authority: "National Highway Authority Of India", operational_period: "2026-2027", contract_value: 26.00, status: "Ongoing" }
];
`;

const startIndex = content.indexOf('export const INITIAL_TOLL_PLAZAS = [');
if (startIndex !== -1) {
  let newContent = content.substring(0, startIndex) + newTollPlazas;
  
  // Also clear INITIAL_PROJECTS since the user requested to remove extra things.
  // Wait, I will just replace INITIAL_PROJECTS with an empty array if it exists.
  const projStartIndex = newContent.indexOf('export const INITIAL_PROJECTS = [');
  const projEndIndex = newContent.indexOf('export const WORK_PROCESS = [');
  if (projStartIndex !== -1 && projEndIndex !== -1) {
    newContent = newContent.substring(0, projStartIndex) + 'export const INITIAL_PROJECTS = [];\n\n' + newContent.substring(projEndIndex);
  }
  
  fs.writeFileSync('src/lib/mockData.js', newContent, 'utf-8');
  console.log('Successfully updated mockData.js');
}
