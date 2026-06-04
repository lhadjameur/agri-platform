const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  console.log('Starting users and bookings seed...')

  // Create farmer 1
  const hashedPassword1 = await bcrypt.hash('farmer123', 10)
  const farmer1 = await prisma.user.create({
    data: {
      name: 'Jean Dupont',
      email: 'jean.dupont@gmail.com',
      password: hashedPassword1,
      role: 'farmer',
      isVerified: true
    }
  })
  console.log('Created farmer:', farmer1.name)

  // Create farmer 2
  const hashedPassword2 = await bcrypt.hash('farmer123', 10)
  const farmer2 = await prisma.user.create({
    data: {
      name: 'Hans Mueller',
      email: 'hans.mueller@gmail.com',
      password: hashedPassword2,
      role: 'farmer',
      isVerified: true
    }
  })
  console.log('Created farmer:', farmer2.name)

  // Get existing farmer user
  const existingFarmer = await prisma.user.findFirst({
    where: {
      role: 'farmer',
      id: { notIn: [farmer1.id, farmer2.id] }
    }
  })

  if (!existingFarmer) {
    console.log('No existing farmer found!')
    return
  }

  console.log('Found existing farmer:', existingFarmer.name)

  // Bookings for farmer 1 — listings 1 and 2
  await prisma.booking.create({
    data: {
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-06-05'),
      status: 'confirmed',
      userId: farmer1.id,
      listingId: 1
    }
  })
  console.log('Created booking 1 for', farmer1.name)

  await prisma.booking.create({
    data: {
      startDate: new Date('2026-07-10'),
      endDate: new Date('2026-07-15'),
      status: 'pending',
      userId: farmer1.id,
      listingId: 2
    }
  })
  console.log('Created booking 2 for', farmer1.name)

  // Bookings for farmer 2 — listings 3 and 4
  await prisma.booking.create({
    data: {
      startDate: new Date('2026-06-15'),
      endDate: new Date('2026-06-20'),
      status: 'confirmed',
      userId: farmer2.id,
      listingId: 3
    }
  })
  console.log('Created booking 1 for', farmer2.name)

  await prisma.booking.create({
    data: {
      startDate: new Date('2026-08-01'),
      endDate: new Date('2026-08-07'),
      status: 'cancelled',
      userId: farmer2.id,
      listingId: 4
    }
  })
  console.log('Created booking 2 for', farmer2.name)

  // Bookings for existing farmer — listings 5 and 6
  await prisma.booking.create({
    data: {
      startDate: new Date('2026-07-01'),
      endDate: new Date('2026-07-03'),
      status: 'confirmed',
      userId: existingFarmer.id,
      listingId: 5
    }
  })
  console.log('Created booking 1 for', existingFarmer.name)

  await prisma.booking.create({
    data: {
      startDate: new Date('2026-09-01'),
      endDate: new Date('2026-09-10'),
      status: 'pending',
      userId: existingFarmer.id,
      listingId: 6
    }
  })
  console.log('Created booking 2 for', existingFarmer.name)

  console.log('Seed completed! 2 farmers and 6 bookings created successfully.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())