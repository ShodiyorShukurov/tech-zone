import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean up
  await prisma.lead.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Categories
  const iphone = await prisma.category.create({
    data: {
      name: 'iPhone',
      slug: 'iphone',
    },
  })

  const macbook = await prisma.category.create({
    data: {
      name: 'MacBook',
      slug: 'macbook',
    },
  })

  // Products
  await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro Max',
      slug: 'iphone-15-pro-max',
      description: 'The ultimate iPhone with titanium design and A17 Pro chip.',
      price: 1199,
      installmentPrice: 99,
      categoryId: iphone.id,
      popular: true,
      specs: JSON.stringify({
        display: '6.7-inch Super Retina XDR',
        chip: 'A17 Pro',
        camera: '48MP Main | 12MP Ultra Wide | 12MP Telephoto',
      }),
      images: JSON.stringify(['/placeholders/iphone-15-pro-max.png']),
    },
  })

  await prisma.product.create({
    data: {
      name: 'MacBook Pro 14" M3',
      slug: 'macbook-pro-14-m3',
      description: 'Supercharged by M3, M3 Pro, or M3 Max.',
      price: 1599,
      installmentPrice: 149,
      categoryId: macbook.id,
      popular: true,
      specs: JSON.stringify({
        display: '14.2-inch Liquid Retina XDR',
        chip: 'Apple M3 chip',
        memory: '8GB or 16GB unified memory',
      }),
      images: JSON.stringify(['/placeholders/macbook-pro.png']),
    },
  })

  console.log('Seed data created!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
