export interface Region {
  id:    string;
  label: string;
  emoji: string;
}

export const regions: Region[] = [
  { id: 'asia',        label: 'Asia',        emoji: '🌏' },
  { id: 'europe',      label: 'Europe',      emoji: '🌍' },
  { id: 'americas',    label: 'Americas',    emoji: '🌎' },
  { id: 'africa',      label: 'Africa',      emoji: '🌍' },
  { id: 'oceania',     label: 'Oceania',     emoji: '🌏' },
  { id: 'middle-east', label: 'Middle East', emoji: '🕌' },
  { id: 'others',      label: 'Others',      emoji: '🗺️' },
];