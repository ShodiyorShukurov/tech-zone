import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Товары</h2>
          <p className="text-muted-foreground">Управление каталогом продукции</p>
        </div>
        <Button className="rounded-full">
          <Plus className="mr-2 h-4 w-4" />
          Добавить товар
        </Button>
      </div>

      <div className="bg-background border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase text-[10px] font-bold">
              <tr>
                <th className="px-6 py-3">Товар</th>
                <th className="px-6 py-3">Категория</th>
                <th className="px-6 py-3">Цена</th>
                <th className="px-6 py-3">Популярный</th>
                <th className="px-6 py-3 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{product.name}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">{product.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">
                      {product.category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold">{formatPrice(product.price)}</div>
                    {product.installmentPrice && (
                      <div className="text-[10px] text-muted-foreground uppercase tracking-tight">
                        {formatPrice(product.installmentPrice)} / мес
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product.popular ? (
                      <span className="text-green-600 font-medium">Да</span>
                    ) : (
                      <span className="text-muted-foreground">Нет</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/catalog/${product.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
