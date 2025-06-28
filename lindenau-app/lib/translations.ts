export type Language = 'en' | 'de';

export interface Translations {
  // Navigation
  home: string;
  gallery: string;
  about: string;
  
  // Home page
  toGallery: string;
  
  // Gallery page
  galleryTitle: string;
  noArtworksAvailable: string;
  
  // Single Artwork page
  backToGallery: string;
  measurements: string;
  techniques: string;
  availability: string;
  available: string;
  sold: string;
  inquireAboutPiece: string;
  
  // Gallery Admin page
  galleryManagement: string;
  welcome: string;
  logout: string;
  addNewArtwork: string;
  addYourFirstArtwork: string;
  noArtworksYet: string;
  startByAdding: string;
  savingChanges: string;
  allArtworks: string;
  image: string;
  title: string;
  position: string;
  actions: string;
  edit: string;
  delete: string;
  areYouSureDelete: string;
  artworkDeletedSuccessfully: string;
  failedToDeleteArtwork: string;
  artworkPositionsUpdated: string;
  failedToUpdatePositions: string;
  successfullyLoggedOut: string;
  
  // About page
  aboutTitle: string;
  contact: string;
  aboutQuote: string;
  aboutQuoteAuthor: string;
  
  // Contact form
  name: string;
  email: string;
  subject: string;
  message: string;
  sendMessage: string;
  yourName: string;
  yourEmail: string;
  subjectOfMessage: string;
  yourMessage: string;
  
  // Footer
  privacyPolicy: string;
  impressum: string;
  
  // Common
  loading: string;
  error: string;
  success: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    gallery: 'Gallery',
    about: 'About & Contact',
    
    // Home page
    toGallery: 'To Gallery',
    
    // Gallery page
    galleryTitle: 'Gallery',
    noArtworksAvailable: 'No artworks available yet.',
    
    // Single Artwork page
    backToGallery: '← Back to Gallery',
    measurements: 'Measurements',
    techniques: 'Techniques',
    availability: 'Availability',
    available: 'Available',
    sold: 'Sold',
    inquireAboutPiece: 'Inquire About This Piece',
    
    // Gallery Admin page
    galleryManagement: 'Gallery Management',
    welcome: 'Welcome',
    logout: 'Logout',
    addNewArtwork: 'Add New Artwork',
    addYourFirstArtwork: 'Add Your First Artwork',
    noArtworksYet: 'No artworks yet',
    startByAdding: 'Start by adding your first artwork to the gallery.',
    savingChanges: 'Saving changes...',
    allArtworks: 'All Artworks',
    image: 'Image',
    title: 'Title',
    position: 'Position',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    areYouSureDelete: 'Are you sure you want to delete this artwork?',
    artworkDeletedSuccessfully: 'Artwork deleted successfully',
    failedToDeleteArtwork: 'Failed to delete artwork',
    artworkPositionsUpdated: 'Artwork positions updated',
    failedToUpdatePositions: 'Failed to update positions',
    successfullyLoggedOut: 'Successfully logged out',
    
    // About page
    aboutTitle: 'About',
    contact: 'Contact',
    aboutQuote: 'Colors are like magic to me - when I paint, I forget the world around me and find myself in another, enchanting reality. Every brushstroke carries a part of me that I bring to the canvas. It touches me deeply to share this special world with others, as if I were giving them a piece of my heart.',
    aboutQuoteAuthor: '~Lindenau',
    
    // Contact form
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    yourName: 'Your name',
    yourEmail: 'your.email@example.com',
    subjectOfMessage: 'Subject of your message',
    yourMessage: 'Your message...',
    
    // Footer
    privacyPolicy: 'Privacy Policy',
    impressum: 'Impressum',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
  de: {
    // Navigation
    home: 'Startseite',
    gallery: 'Galerie',
    about: 'Über & Kontakt',
    
    // Home page
    toGallery: 'Zur Galerie',
    
    // Gallery page
    galleryTitle: 'Galerie',
    noArtworksAvailable: 'Noch keine Kunstwerke verfügbar.',
    
    // Single Artwork page
    backToGallery: '← Zurück zur Galerie',
    measurements: 'Maße',
    techniques: 'Techniken',
    availability: 'Verfügbarkeit',
    available: 'Verfügbar',
    sold: 'Verkauft',
    inquireAboutPiece: 'Nach diesem Werk fragen',
    
    // Gallery Admin page
    galleryManagement: 'Galerie-Verwaltung',
    welcome: 'Willkommen',
    logout: 'Abmelden',
    addNewArtwork: 'Neues Kunstwerk hinzufügen',
    addYourFirstArtwork: 'Fügen Sie Ihr erstes Kunstwerk hinzu',
    noArtworksYet: 'Noch keine Kunstwerke',
    startByAdding: 'Beginnen Sie, indem Sie Ihr erstes Kunstwerk zur Galerie hinzufügen.',
    savingChanges: 'Änderungen werden gespeichert...',
    allArtworks: 'Alle Kunstwerke',
    image: 'Bild',
    title: 'Titel',
    position: 'Position',
    actions: 'Aktionen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    areYouSureDelete: 'Sind Sie sicher, dass Sie dieses Kunstwerk löschen möchten?',
    artworkDeletedSuccessfully: 'Kunstwerk erfolgreich gelöscht',
    failedToDeleteArtwork: 'Fehler beim Löschen des Kunstwerks',
    artworkPositionsUpdated: 'Kunstwerk-Positionen aktualisiert',
    failedToUpdatePositions: 'Fehler beim Aktualisieren der Positionen',
    successfullyLoggedOut: 'Erfolgreich abgemeldet',
    
    // About page
    aboutTitle: 'Über',
    contact: 'Kontakt',
    aboutQuote: 'Farben sind für mich wie Magie - wenn ich male, vergesse ich die Welt um mich herum und finde mich in einer anderen, verzaubernden Realität wieder. Jeder Pinselstrich trägt einen Teil von mir, den ich auf die Leinwand bringe. Es berührt mich tief, diese besondere Welt mit anderen zu teilen, als würde ich ihnen ein Stück meines Herzens schenken.',
    aboutQuoteAuthor: '~Lindenau',
    
    // Contact form
    name: 'Name',
    email: 'E-Mail',
    subject: 'Betreff',
    message: 'Nachricht',
    sendMessage: 'Nachricht senden',
    yourName: 'Ihr Name',
    yourEmail: 'ihre.email@beispiel.com',
    subjectOfMessage: 'Betreff Ihrer Nachricht',
    yourMessage: 'Ihre Nachricht...',
    
    // Footer
    privacyPolicy: 'Datenschutz',
    impressum: 'Impressum',
    
    // Common
    loading: 'Lädt...',
    error: 'Fehler',
    success: 'Erfolg',
  },
};

export const getTranslation = (language: Language): Translations => {
  return translations[language];
};

export const getTranslationKey = (language: Language, key: keyof Translations): string => {
  return translations[language][key];
}; 