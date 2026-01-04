
export const ALLOWED_AGENTS = ['01', '02', '03', '04', '05', '06', '07'];
export const MASTER_KEY = '0009';

export const DIRECTORY_PATH = '/var/www/secure/archives/';

// Configuration for the "Server" connection visualization
export const DB_CONFIG = {
    url: 'shortline.proxy.rlwy.net',
    port: '49392',
    user: 'postgres',
    dbName: 'railway',
    connectionString: 'postgresql://postgres:fZvfvjLlsgDtzFjHyKtuhadzFYZoQMmK@shortline.proxy.rlwy.net:49392/railway'
};

export const MOCK_IMAGES = [
  'https://picsum.photos/400/600',
  'https://picsum.photos/600/400',
  'https://picsum.photos/500/700',
  'https://picsum.photos/400/400',
  'https://picsum.photos/450/650',
];

// Using images.weserv.nl to proxy the requests and bypass 403 Hotlink Protection from pngmart
// &n=-1 ensures we don't get a cached error
// &output=png ensures we keep transparency
export const CHARACTERS = {
  anya_peace: 'https://images.weserv.nl/?url=https://www.pngmart.com/files/22/Spy-x-Family-Anya-Forger-PNG-Transparent.png&output=png&n=-1',
  anya_bond: 'https://images.weserv.nl/?url=https://www.pngmart.com/files/22/Spy-x-Family-Bond-Forger-PNG-HD-Isolated.png&output=png&n=-1',
  loid_standing: 'https://images.weserv.nl/?url=https://www.pngmart.com/files/22/Spy-x-Family-Loid-Forger-PNG-Isolated-HD.png&output=png&n=-1',
  loid_action: 'https://images.weserv.nl/?url=https://www.pngmart.com/files/22/Spy-x-Family-Loid-Forger-PNG-Transparent-Image.png&output=png&n=-1',
  yor_portrait: 'https://images.weserv.nl/?url=https://www.pngmart.com/files/22/Spy-x-Family-Yor-Forger-PNG-Clipart.png&output=png&n=-1',
  loid_gun: 'https://images.weserv.nl/?url=https://www.pngmart.com/files/22/Spy-x-Family-Loid-Forger-PNG-HD.png&output=png&n=-1'
};

// Data for simulation mode
export const HIDDEN_ARCHIVES = [
    {
        url: 'https://images.weserv.nl/?url=https://i.pinimg.com/736x/8f/c9/28/8fc92862ba2255734e5d6d9006b52709.jpg&n=-1',
        name: 'OPERATION: CASTLE',
        fileName: 'op_castle_v2.jpg',
        desc: 'Target spotted near Eden Academy.',
        level: 'RESTRICTED'
    },
    {
        url: 'https://images.weserv.nl/?url=https://wallpaperaccess.com/full/8287754.jpg&n=-1',
        name: 'SUBJECT: THORN PRINCESS',
        fileName: 'target_yor_099.png',
        desc: 'Cleaning up the mess. No witnesses.',
        level: 'TOP SECRET'
    },
    {
        url: 'https://images.weserv.nl/?url=https://images6.alphacoders.com/123/1231666.png&n=-1',
        name: 'DOG PARK RECON',
        fileName: 'bond_evidence_1.jpg',
        desc: 'Bond sniffed out suspicious peanuts.',
        level: 'CLASSIFIED'
    },
    {
        url: 'https://images.weserv.nl/?url=https://c4.wallpaperflare.com/wallpaper/453/566/386/anime-spy-x-family-anya-forger-hd-wallpaper-preview.jpg&n=-1',
        name: 'TV TIME',
        fileName: 'spy_wars_ep43.mp4_thumb.jpg',
        desc: 'Spy Wars episode 43 starts in 5 minutes.',
        level: 'RESTRICTED'
    },
    {
        url: 'https://images.weserv.nl/?url=https://images.hdqwalls.com/wallpapers/spy-x-family-anya-forger-4k-3g.jpg&n=-1',
        name: 'SCHOOL SUPPLIES',
        fileName: 'eden_uniform_receipt.pdf',
        desc: 'Purchased new uniform. Cost: Excessive.',
        level: 'CLASSIFIED'
    }
];
