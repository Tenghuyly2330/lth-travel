const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
      console.log('Seeding database with tours, photos, and admin user...');

      // Clean existing data
      await prisma.tour.deleteMany({});
      await prisma.photo.deleteMany({});
      await prisma.user.deleteMany({});

      // Seed Admin User
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = await prisma.user.create({
            data: {
                  name: 'Travel Admin',
                  email: 'admin@travel.com',
                  password: hashedPassword,
                  role: 'ADMIN',
            },
      });
      console.log('Admin user seeded:', adminUser.email);

      const tours = [
            {
                  title: 'Angkor Wat Ancient Temple Adventure',
                  slug: 'angkor-wat-adventure',
                  location: 'Siem Reap',
                  country: 'Cambodia',
                  duration: '3 Days / 2 Nights',
                  date: '2026-09-10',
                  coverImage: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
                  description: 'Explore the spectacular ancient temples of Angkor, witness sunrise over Angkor Wat towers, visit Ta Prohm jungle temple, and experience traditional Khmer cuisine.',
            },
            {
                  title: 'Phnom Penh Cultural & Heritage Journey',
                  slug: 'phnom-penh-cultural-journey',
                  location: 'Phnom Penh',
                  country: 'Cambodia',
                  duration: '2 Days / 1 Night',
                  date: '2026-09-18',
                  coverImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
                  description: 'Discover the rich history of Cambodia with visits to the Royal Palace, Silver Pagoda, National Museum, and vibrant night markets along the Mekong riverfront.',
            },
            {
                  title: 'Koh Rong Secret Paradise Beaches',
                  slug: 'koh-rong-secret-paradise',
                  location: 'Sihanoukville',
                  country: 'Cambodia',
                  duration: '4 Days / 3 Nights',
                  date: '2026-10-05',
                  coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                  description: 'Relax on pristine white sand beaches, swim with bioluminescent plankton at night, island hop on traditional wooden boats, and enjoy fresh coastal seafood.',
            },
            {
                  title: 'Kullu Manali Alpine Explorer',
                  slug: 'kullu-manali-alpine-explorer',
                  location: 'Manali, Himachal Pradesh',
                  country: 'India',
                  duration: '10 Days / 9 Nights',
                  date: '2026-10-15',
                  coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
                  description: 'Trek through pine forests, snow-capped Himalayan peaks, Solang Valley sports, and serene monasteries in northern India.',
            },
            {
                  title: 'Hawa Mahal & Golden Jaipur Heritage',
                  slug: 'hawa-mahal-jaipur-heritage',
                  location: 'Jaipur, Rajasthan',
                  country: 'India',
                  duration: '5 Days / 4 Nights',
                  date: '2026-11-01',
                  coverImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
                  description: 'Immerse yourself in Rajasthan royal palaces, historic Amber Fort, pink city bazaars, and opulent Rajasthani dining.',
            },
            {
                  title: 'Rann Utsav Desert Odyssey',
                  slug: 'rann-utsav-desert-odyssey',
                  location: 'Kutch, Gujarat',
                  country: 'India',
                  duration: '4 Days / 3 Nights',
                  date: '2026-11-12',
                  coverImage: 'https://images.unsplash.com/photo-1609828913642-a5586831c57c?auto=format&fit=crop&w=1200&q=80',
                  description: 'Experience the magic of the infinite white salt desert under the full moon, local artisan crafts, cultural dance, and luxury desert tent camping.',
            },
      ];

      for (const tour of tours) {
            await prisma.tour.create({ data: tour });
      }

      const photos = [
            {
                  imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=80',
                  title: 'Sunrise over Angkor Wat',
                  location: 'Siem Reap, Cambodia',
                  date: '2026-08-15',
                  description: 'The iconic golden morning light reflecting in the lily pond of Angkor Wat.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
                  title: 'Royal Palace Architecture',
                  location: 'Phnom Penh, Cambodia',
                  date: '2026-08-16',
                  description: 'Traditional Khmer golden spire roofs glittering under the afternoon sun.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                  title: 'Crystal Clear Waters of Koh Rong',
                  location: 'Koh Rong Sanloem, Cambodia',
                  date: '2026-08-18',
                  description: 'Tranquil emerald sea and tropical wooden pier on Long Set Beach.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
                  title: 'Himalayan Ridge Views',
                  location: 'Manali, India',
                  date: '2026-08-20',
                  description: 'Majestic pine trees framed by distant snow peaks in Himachal Pradesh.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
                  title: 'Palace of Winds Exterior',
                  location: 'Jaipur, Rajasthan',
                  date: '2026-08-22',
                  description: 'Detailed pink sandstone windows and lattice work of Hawa Mahal.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
                  title: 'Mekong River Sunset Sail',
                  location: 'Phnom Penh, Cambodia',
                  date: '2026-08-23',
                  description: 'Silhouetted fishing boats sailing at dusk where the Tonle Sap meets the Mekong.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80',
                  title: 'Ancient Roots of Ta Prohm',
                  location: 'Siem Reap, Cambodia',
                  date: '2026-08-24',
                  description: 'Giant Banyan tree roots embracing 12th-century stone temple walls.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
                  title: 'Alpine Valley Mist',
                  location: 'Solang Valley, India',
                  date: '2026-08-25',
                  description: 'Early morning fog drifting over lush mountain meadows.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
                  title: 'Golden Hour at Amber Fort',
                  location: 'Jaipur, India',
                  date: '2026-08-25',
                  description: 'Warm sunset casting shadows on high fortress stone ramparts.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
                  title: 'Tropical Palm Canopy',
                  location: 'Kampot, Cambodia',
                  date: '2026-08-26',
                  description: 'Serene riverbank palm trees along the Praek Tuek Chhu river.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
                  title: 'Solo Backpacking Trail',
                  location: 'Cardamom Mountains, Cambodia',
                  date: '2026-08-26',
                  description: 'Trekking through protected rainforest wilderness trails.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
                  title: 'Local Artisan Colors',
                  location: 'Siem Reap Night Market, Cambodia',
                  date: '2026-08-27',
                  description: 'Handcrafted silk lanterns glowing in vibrant shades of amber and magenta.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
                  title: 'Infinity Sky & Ocean',
                  location: 'Kep Coastline, Cambodia',
                  date: '2026-08-27',
                  description: 'Calm evening horizon viewed from the famous Kep crab market boardwalk.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80',
                  title: 'Wanderlust Highway',
                  location: 'Himalayan Pass, India',
                  date: '2026-08-27',
                  description: 'Winding mountain pass roads cutting through dramatic canyon peaks.',
            },
            {
                  imageUrl: 'https://images.unsplash.com/photo-1476514525535-ce74f45814d2?auto=format&fit=crop&w=1200&q=80',
                  title: 'Traditional Wooden Longtail Boat',
                  location: 'Koh Rong, Cambodia',
                  date: '2026-08-27',
                  description: 'Colorfully decorated wooden boat floating on turquoise waters.',
            },
      ];

      for (const photo of photos) {
            await prisma.photo.create({ data: photo });
      }

      console.log('Database seeded successfully with 6 tours and 15 travel photos!');
}

main()
      .catch((e) => {
            console.error(e);
            process.exit(1);
      })
      .finally(async () => {
            await prisma.$disconnect();
      });
