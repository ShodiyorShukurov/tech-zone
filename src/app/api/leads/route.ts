import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { amoCRM } from '@/lib/amo-crm'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, name, phone, productName, pageUrl, utm } = body

    // 1. Basic Validation
    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    // 2. Log Lead in Database
    const lead = await prisma.lead.create({
      data: {
        type: type || 'PRODUCT_REQUEST',
        name,
        phone,
        productName,
        pageUrl,
        utmSource: utm?.source,
        utmMedium: utm?.medium,
        utmCampaign: utm?.campaign,
        utmContent: utm?.content,
        utmTerm: utm?.term,
      }
    })

    // 3. Sync with amoCRM
    try {
      const amoResult = await amoCRM.createLead({
        type: lead.type,
        name: lead.name || undefined,
        phone: lead.phone,
        productName: lead.productName || undefined,
        pageUrl: lead.pageUrl || undefined,
        utm,
      })

      if (amoResult.success) {
        await prisma.lead.update({
          where: { id: lead.id },
          data: { status: 'SYNCED', amoDealId: amoResult.dealId }
        })
      }
    } catch (amoError) {
      console.error('amoCRM Sync Error:', amoError)
      await prisma.lead.update({
        where: { id: lead.id },
        data: { status: 'ERROR', errorMessage: String(amoError) }
      })
    }

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error) {
    console.error('Lead Submission Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
