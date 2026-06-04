const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const listings = [
  {
    title: "John Deere 6130M Tractor — 130HP",
    description: "John Deere 6130M tractor with 130 horsepower engine available for seasonal rental. Equipped with CommandQuad transmission, air-conditioned cabin, and front loader attachment. Maximum working width of 3.5 meters. Recently serviced with full maintenance records available. Fuel consumption approximately 12L/hour. Suitable for plowing, seeding, and transport work. Operator available upon request at additional cost. Available April to October.",
    price: 150,
    currency: "EUR",
    pricePeriod: "day",
    category: "Equipment",
    location: "Paris, France",
    tags: ["tractor", "john-deere", "130hp", "plowing", "seasonal"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/sixth/John_Deere_6130R.jpg/1280px-John_Deere_6130R.jpg"
  },
  {
    title: "CLAAS Lexion 770 Combine Harvester",
    description: "CLAAS Lexion 770 combine harvester with 770 horsepower engine and 12-meter cutting platform available for seasonal rental. Features LASER PILOT automatic steering, grain loss monitoring system, and 12,000-liter grain tank. Maximum throughput of 100 tons per hour. Equipped with GPS yield mapping technology. Recently inspected and serviced. Suitable for wheat, barley, rapeseed, and corn. Experienced operator included in price.",
    price: 900,
    currency: "EUR",
    pricePeriod: "day",
    category: "Equipment",
    location: "Berlin, Germany",
    tags: ["combine-harvester", "claas", "lexion", "wheat", "gps"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/CLAAS_Lexion_760.jpg/1280px-CLAAS_Lexion_760.jpg"
  },
  {
    title: "Amazone UX 11200 Field Sprayer — 36m Boom",
    description: "Amazone UX 11200 self-propelled field sprayer with 11,200-liter tank and 36-meter boom available for rent. Features GPS section control, automatic boom height control, and integrated weather station. Application rate precision plus or minus 1 percent. Covers up to 80 hectares per hour. Suitable for fungicides, herbicides, and liquid fertilizers. Recently calibrated and cleaned. Comes with licensed operator. Minimum rental one day.",
    price: 180,
    currency: "EUR",
    pricePeriod: "day",
    category: "Equipment",
    location: "Prague, Czech Republic",
    tags: ["amazone", "sprayer", "36m-boom", "gps", "self-propelled"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Amazone_UX_11200.jpg/1280px-Amazone_UX_11200.jpg"
  },
  {
    title: "5 Hectares Fertile Farmland — Krakow Region",
    description: "Premium fertile farmland of 5 hectares located 15km from Krakow city center. Black soil with pH 6.5, ideal for wheat, corn, rapeseed, and vegetables. Flat terrain with no stones. Includes access to irrigation canal and 3-phase electricity. Road access from two sides. Annual soil analysis report available. Previous crops: winter wheat and corn. Fenced on 3 sides. Available for seasonal or annual rental.",
    price: 800,
    currency: "PLN",
    pricePeriod: "month",
    category: "Land",
    location: "Krakow, Poland",
    tags: ["farmland", "fertile", "wheat", "black-soil", "irrigated"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotate.jpg/1280px-Camponotate.jpg"
  },
  {
    title: "Certified Agronomist — Crop Planning Specialist",
    description: "Certified agronomist with 15 years of field experience specializing in cereal and oilseed crop production. Services include complete crop rotation planning, variety selection, fertilization programs, integrated pest management, and yield optimization strategies. Member of the European Society of Agronomy. Available for on-site farm visits and remote consultations via video call. Minimum engagement half day. Full written report provided after each consultation.",
    price: 300,
    currency: "EUR",
    pricePeriod: "day",
    category: "Advisory",
    location: "Madrid, Spain",
    tags: ["agronomist", "crop-planning", "certified", "fertilization", "pest-management"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Agronomist_in_field.jpg/1280px-Agronomist_in_field.jpg"
  }
]

async function main() {
  console.log('Starting seed...')

  for (const listing of listings) {
    await prisma.listing.create({
      data: {
        ...listing,
        ownerId: 1
      }
    })
    console.log('Created listing:', listing.title)
  }

  console.log('Seed completed! 5 listings created successfully.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())