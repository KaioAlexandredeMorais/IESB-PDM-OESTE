export const themes = {
  light: {
    background: '#FFFFFF',
    card: '#EBECF9',
    text: '#1E1E24',
    mutedText: '#6B6B76',
    primary: '#4757B8',
    onPrimary: '#FFFFFF',
    border: '#C9CBD6',
    inputBackground: '#FFFFFF',
    error: '#E31E24',
  },
  dark: {
    background: '#1E1E24',
    card: '#2F2F37',
    text: '#F5F5F7',
    mutedText: '#A0A0AB',
    primary: '#A6ACE4',
    onPrimary: '#1E1E24',
    border: '#4A4A55',
    inputBackground: '#2F2F37',
    error: '#FF6B70',
  },
};

export function getColors(scheme) {
  return themes[scheme === 'dark' ? 'dark' : 'light'];
}
