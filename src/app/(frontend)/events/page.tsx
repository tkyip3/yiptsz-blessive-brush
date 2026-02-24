import EventItem from '@/components/event/EventItem'
import type { Event } from '@/payload-types'
import EventtPagination from '@/components/event/EventPagination'

const PER_PAGE = 12

interface EventsResponse {
  docs: Event[]
  totalPages: number // Payload 會返回 totalPages
}

async function getEvent(page: number): Promise<EventsResponse> {
  let url = `${process.env.NEXT_PUBLIC_PAYLOAD_API}/api/event?where[published][equals]=true&locale=zh-TW&limit=${PER_PAGE}&page=${page}`

  const res = await fetch(url, {
    next: { revalidate: 30 },
    // 可選：在開發時臨時加 cache: 'no-store' 測試
  })
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export default async function EventList({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const page = Math.max(1, parseInt(searchParams?.page as string) || 1)
  const [eventsResponse] = await Promise.all([getEvent(page)])

  const { docs: events, totalPages } = eventsResponse

  return (
    <div className="products-bg">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center mb-8">活動列表</h1>
        {/* 篩選欄 */}

        {events.length === 0 ? (
          <p className="text-center">未有相關活動</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((e: Event) => (
              <EventItem key={e.id} event={e} />
            ))}
          </div>
        )}

        {/* 分頁 */}
        <EventtPagination totalPages={totalPages} />
      </div>
    </div>
  )
}
