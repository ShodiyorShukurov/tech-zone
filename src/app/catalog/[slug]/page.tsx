export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductDetail } from '@/components/product/product-detail'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="container py-10">
      <Button variant="ghost" className="mb-6 -ml-4" asChild>
        <Link href="/catalog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад в каталог
        </Link>
      </Button>

      <ProductDetail product={product} />
    </div>
  )
}
