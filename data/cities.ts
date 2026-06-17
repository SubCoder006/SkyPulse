const cityData: Record<string, string[]> = {
  'West Bengal': [
    'Kolkata', 'Howrah', 'Asansol', 'Siliguri', 'Durgapur',
    'Burdwan', 'Malda', 'Barasat', 'Jalpaiguri', 'Cooch Behar',
    'Kharagpur', 'Haldia', 'Ranaghat', 'Krishnanagar', 'Nabadwip',
    'Bankura', 'Bishnupur', 'Purulia', 'Darjeeling', 'Kalimpong',
    'Bardhaman', 'Suri', 'Bolpur', 'Shantiniketan', 'Midnapore',
    'Contai', 'Tamluk', 'Diamond Harbour', 'Barrackpore', 'Serampore',
  ],
  'Delhi (NCT)': [
    'New Delhi', 'Old Delhi', 'Dwarka', 'Rohini', 'Pitampura',
    'Janakpuri', 'Lajpat Nagar', 'Karol Bagh', 'Connaught Place',
    'Chandni Chowk', 'Shahdara', 'Preet Vihar', 'Mayur Vihar',
  ],
  'Maharashtra': [
    'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad',
    'Solapur', 'Kolhapur', 'Thane', 'Navi Mumbai', 'Amravati',
    'Akola', 'Latur', 'Jalgaon', 'Dhule', 'Nanded',
    'Sangli', 'Satara', 'Ratnagiri', 'Mahabaleshwar', 'Shirdi', 'Lonavala',
  ],
  'Tamil Nadu': [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
    'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi',
    'Dindigul', 'Thanjavur', 'Ooty', 'Kodaikanal', 'Mahabalipuram',
  ],
  'Karnataka': [
    'Bengaluru', 'Mysuru', 'Hubballi', 'Mangaluru', 'Belagavi',
    'Kalaburagi', 'Ballari', 'Vijayapura', 'Shivamogga', 'Tumkur',
    'Davanagere', 'Hassan', 'Udupi', 'Chikmagalur', 'Madikeri', 'Hampi',
  ],
  'Uttar Pradesh': [
    'Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Prayagraj',
    'Meerut', 'Noida', 'Ghaziabad', 'Mathura', 'Aligarh',
    'Bareilly', 'Moradabad', 'Gorakhpur', 'Jhansi', 'Ayodhya', 'Vrindavan',
  ],
  'Rajasthan': [
    'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner',
    'Ajmer', 'Alwar', 'Bharatpur', 'Sikar', 'Sri Ganganagar',
    'Jaisalmer', 'Pushkar', 'Chittorgarh', 'Ranthambore',
  ],
  'Gujarat': [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar',
    'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Navsari',
    'Morbi', 'Bhuj', 'Dwarka', 'Somnath',
  ],
  'Kerala': [
    'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam',
    'Palakkad', 'Alappuzha', 'Malappuram', 'Kannur', 'Kottayam',
    'Munnar', 'Thekkady', 'Varkala', 'Kovalam',
  ],
  'Andhra Pradesh': [
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool',
    'Tirupati', 'Rajahmundry', 'Kakinada', 'Kadapa', 'Amaravati',
  ],
  'Telangana': [
    'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam',
    'Secunderabad', 'Medchal', 'Siddipet',
  ],
  'Punjab': [
    'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda',
    'Mohali', 'Firozpur', 'Hoshiarpur', 'Gurdaspur',
  ],
  'Haryana': [
    'Gurugram', 'Faridabad', 'Hisar', 'Rohtak', 'Panipat',
    'Ambala', 'Yamunanagar', 'Sonipat', 'Karnal', 'Kurukshetra',
  ],
  'Bihar': [
    'Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga',
    'Purnia', 'Arrah', 'Begusarai', 'Bodh Gaya',
  ],
  'Madhya Pradesh': [
    'Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain',
    'Sagar', 'Rewa', 'Satna', 'Pachmarhi', 'Orchha', 'Sanchi',
  ],
  'Himachal Pradesh': [
    'Shimla', 'Manali', 'Dharamshala', 'Kullu', 'Mandi',
    'Solan', 'Palampur', 'Chamba', 'Kasauli', 'Dalhousie',
  ],
  'Uttarakhand': [
    'Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Mussoorie',
    'Roorkee', 'Haldwani', 'Almora', 'Kedarnath', 'Badrinath', 'Auli',
  ],
  'Jharkhand': [
    'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh',
  ],
  'Odisha': [
    'Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur',
    'Puri', 'Balasore', 'Konark',
  ],
  'Assam': [
    'Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon',
    'Tinsukia', 'Tezpur', 'Kaziranga',
  ],
  'Chhattisgarh': [
    'Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Jagdalpur',
  ],
  'Goa': [
    'Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Calangute',
    'Baga', 'Anjuna', 'Colva', 'Old Goa',
  ],
  'Jammu and Kashmir': [
    'Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Sopore',
    'Gulmarg', 'Pahalgam',
  ],
  'Ladakh': ['Leh', 'Kargil', 'Nubra', 'Pangong', 'Zanskar'],
  'Chandigarh': ['Chandigarh', 'Mohali', 'Panchkula'],

  // USA
  'California': [
    'Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento',
    'Oakland', 'Fresno', 'Long Beach', 'Bakersfield', 'Santa Barbara',
  ],
  'New York': [
    'New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany',
  ],
  'Texas': [
    'Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth',
    'El Paso', 'Arlington', 'Corpus Christi', 'Plano',
  ],
  'Florida': [
    'Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg',
    'Fort Lauderdale', 'Tallahassee', 'Cape Coral',
  ],

  // UK
  'England': [
    'London', 'Birmingham', 'Manchester', 'Leeds', 'Sheffield',
    'Bristol', 'Liverpool', 'Nottingham', 'Leicester', 'Newcastle',
    'Oxford', 'Cambridge', 'Brighton',
  ],
  'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness'],
  'Wales':    ['Cardiff', 'Swansea', 'Newport', 'Wrexham'],

  // Australia
  'New South Wales': ['Sydney', 'Newcastle', 'Wollongong', 'Albury'],
  'Victoria':        ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'],
  'Queensland':      ['Brisbane', 'Gold Coast', 'Townsville', 'Cairns'],
  'Western Australia': ['Perth', 'Fremantle', 'Mandurah', 'Bunbury'],

  // Canada
  'Ontario':          ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton', 'London'],
  'Quebec':           ['Montreal', 'Quebec City', 'Laval', 'Gatineau'],
  'British Columbia': ['Vancouver', 'Surrey', 'Burnaby', 'Victoria', 'Kelowna'],

  // China
  'Beijing':   ['Beijing', 'Haidian', 'Chaoyang', 'Dongcheng'],
  'Shanghai':  ['Shanghai', 'Pudong', 'Huangpu', "Jing'an"],
  'Guangdong': ['Guangzhou', 'Shenzhen', 'Dongguan', 'Foshan', 'Zhuhai'],

  // Japan
  'Tokyo':    ['Tokyo', 'Shibuya', 'Shinjuku', 'Ginza', 'Akihabara', 'Asakusa'],
  'Osaka':    ['Osaka', 'Namba', 'Umeda'],
  'Hokkaido': ['Sapporo', 'Hakodate', 'Asahikawa'],

  // Germany
  'Bavaria':                ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg'],
  'North Rhine-Westphalia': ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen', 'Bonn'],
  'Berlin':                 ['Berlin', 'Mitte', 'Prenzlauer Berg'],

  // France
  'Île-de-France':                 ['Paris', 'Versailles', 'Saint-Denis'],
  "Provence-Alpes-Côte d'Azur":   ['Marseille', 'Nice', 'Toulon', 'Cannes'],
  'Auvergne-Rhône-Alpes':         ['Lyon', 'Grenoble', 'Saint-Étienne'],
};

export function getCitySuggestions(query: string, state: string): string[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  const pool = cityData[state] ?? [
    'Tokyo', 'Beijing', 'Mumbai', 'Delhi', 'Kolkata', 'London', 'Paris',
    'Berlin', 'New York', 'Los Angeles', 'Toronto', 'Sydney', 'Melbourne',
    'Dubai', 'Singapore', 'Bangkok', 'Seoul', 'Jakarta', 'Cairo',
    'Lagos', 'Nairobi', 'São Paulo', 'Buenos Aires', 'Mexico City',
    'Moscow', 'Istanbul', 'Tehran', 'Riyadh', 'Karachi', 'Dhaka',
  ];
  return pool.filter((c) => c.toLowerCase().startsWith(q)).slice(0, 8);
}