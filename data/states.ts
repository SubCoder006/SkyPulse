export interface StateGroup {
  label: string;
  items: string[];
}

export const statesByCountry: Record<string, StateGroup[]> = {
  India: [
    {
      label: 'States',
      items: [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
        'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
        'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
        'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
        'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
      ],
    },
    {
      label: 'Union Territories',
      items: [
        'Andaman and Nicobar Islands', 'Chandigarh',
        'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi (NCT)', 'Jammu and Kashmir', 'Ladakh',
        'Lakshadweep', 'Puducherry',
      ],
    },
  ],
  'United States': [
    {
      label: 'States',
      items: [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
        'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
        'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
        'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
      ],
    },
    {
      label: 'Territories',
      items: ['Washington D.C.', 'Puerto Rico', 'Guam', 'U.S. Virgin Islands'],
    },
  ],
  China: [
    {
      label: 'Provinces & Municipalities',
      items: [
        'Beijing', 'Tianjin', 'Shanghai', 'Chongqing',
        'Hebei', 'Shanxi', 'Liaoning', 'Jilin', 'Heilongjiang',
        'Jiangsu', 'Zhejiang', 'Anhui', 'Fujian', 'Jiangxi',
        'Shandong', 'Henan', 'Hubei', 'Hunan', 'Guangdong',
        'Hainan', 'Sichuan', 'Guizhou', 'Yunnan', 'Shaanxi',
        'Gansu', 'Qinghai', 'Xinjiang', 'Tibet', 'Inner Mongolia',
        'Guangxi', 'Ningxia', 'Hong Kong SAR', 'Macau SAR',
      ],
    },
  ],
  'United Kingdom': [
    {
      label: 'Countries & Regions',
      items: [
        'England', 'Scotland', 'Wales', 'Northern Ireland',
        'Greater London', 'South East', 'South West', 'East of England',
        'East Midlands', 'West Midlands', 'Yorkshire and the Humber',
        'North West', 'North East',
      ],
    },
  ],
  Australia: [
    {
      label: 'States & Territories',
      items: [
        'New South Wales', 'Victoria', 'Queensland',
        'Western Australia', 'South Australia', 'Tasmania',
        'Australian Capital Territory', 'Northern Territory',
      ],
    },
  ],
  Canada: [
    {
      label: 'Provinces & Territories',
      items: [
        'Ontario', 'Quebec', 'British Columbia', 'Alberta',
        'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick',
        'Newfoundland and Labrador', 'Prince Edward Island',
        'Northwest Territories', 'Yukon', 'Nunavut',
      ],
    },
  ],
  Brazil: [
    {
      label: 'States',
      items: [
        'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará',
        'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso',
        'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba',
        'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
        'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia',
        'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe',
        'Tocantins', 'Brasília (DF)',
      ],
    },
  ],
  Germany: [
    {
      label: 'Federal States',
      items: [
        'Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg',
        'Bremen', 'Hamburg', 'Hesse', 'Lower Saxony',
        'Mecklenburg-Vorpommern', 'North Rhine-Westphalia',
        'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt',
        'Schleswig-Holstein', 'Thuringia',
      ],
    },
  ],
  France: [
    {
      label: 'Regions',
      items: [
        'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Brittany',
        'Centre-Val de Loire', 'Corsica', 'Grand Est', 'Hauts-de-France',
        'Île-de-France', 'Normandy', 'Nouvelle-Aquitaine', 'Occitanie',
        'Pays de la Loire', "Provence-Alpes-Côte d'Azur",
      ],
    },
  ],
  Japan: [
    {
      label: 'Prefectures',
      items: [
        'Aichi', 'Akita', 'Aomori', 'Chiba', 'Ehime', 'Fukui',
        'Fukuoka', 'Fukushima', 'Gifu', 'Gunma', 'Hiroshima',
        'Hokkaido', 'Hyogo', 'Ibaraki', 'Ishikawa', 'Iwate',
        'Kagawa', 'Kagoshima', 'Kanagawa', 'Kochi', 'Kumamoto',
        'Kyoto', 'Mie', 'Miyagi', 'Miyazaki', 'Nagano',
        'Nagasaki', 'Nara', 'Niigata', 'Oita', 'Okayama',
        'Okinawa', 'Osaka', 'Saga', 'Saitama', 'Shiga',
        'Shimane', 'Shizuoka', 'Tochigi', 'Tokushima', 'Tokyo',
        'Tottori', 'Toyama', 'Wakayama', 'Yamagata', 'Yamaguchi',
        'Yamanashi',
      ],
    },
  ],
  Pakistan: [
    {
      label: 'Provinces & Territories',
      items: [
        'Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan',
        'Gilgit-Baltistan', 'Azad Kashmir', 'Islamabad Capital Territory',
      ],
    },
  ],
  Indonesia: [
    {
      label: 'Provinces',
      items: [
        'Aceh', 'Bali', 'Bangka Belitung', 'Banten', 'Bengkulu',
        'Central Java', 'Central Kalimantan', 'Central Papua',
        'Central Sulawesi', 'East Java', 'East Kalimantan',
        'East Nusa Tenggara', 'Gorontalo', 'Jakarta', 'Jambi',
        'Lampung', 'Maluku', 'North Kalimantan', 'North Maluku',
        'North Sulawesi', 'North Sumatra', 'Papua', 'Riau',
        'Riau Islands', 'South Kalimantan', 'South Sulawesi',
        'South Sumatra', 'Southeast Sulawesi', 'West Java',
        'West Kalimantan', 'West Nusa Tenggara', 'West Papua',
        'West Sulawesi', 'West Sumatra', 'Yogyakarta',
      ],
    },
  ],
  Russia: [
    {
      label: 'Federal Subjects (Major)',
      items: [
        'Moscow', 'Saint Petersburg', 'Novosibirsk Oblast',
        'Sverdlovsk Oblast', 'Krasnoyarsk Krai', 'Krasnodar Krai',
        'Tatarstan', 'Bashkortostan', 'Chelyabinsk Oblast',
        'Rostov Oblast', 'Omsk Oblast', 'Samara Oblast',
        'Volgograd Oblast', 'Perm Krai', 'Voronezh Oblast',
        'Saratov Oblast', 'Tyumen Oblast', 'Primorsky Krai',
        'Stavropol Krai', 'Nizhny Novgorod Oblast',
      ],
    },
  ],
  'South Korea': [
    {
      label: 'Provinces & Metropolitan Cities',
      items: [
        'Seoul', 'Busan', 'Incheon', 'Daegu', 'Gwangju', 'Daejeon',
        'Ulsan', 'Sejong', 'Gyeonggi', 'Gangwon', 'North Chungcheong',
        'South Chungcheong', 'North Jeolla', 'South Jeolla',
        'North Gyeongsang', 'South Gyeongsang', 'Jeju',
      ],
    },
  ],
};

export function getAllStates(country: string): string[] {
  const groups = statesByCountry[country];
  if (!groups) return [];
  return groups.flatMap((g) => g.items);
}