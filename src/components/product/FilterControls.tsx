// src/components/FilterControls.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FilterControlsProps {
  categories: Array<{ id: string; name: string }>
  tags: Array<{ id: string; name: string }>
}

export default function FilterControls({ categories, tags }: FilterControlsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category') || ''
  const currentTag = searchParams.get('tag') || ''

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!value || value === 'all') {
      params.delete(key) // URL 中刪除參數 = 全部
    } else {
      params.set(key, value)
    }
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  // 🔑 關鍵：將空字串映射為 'all' 給 Select 元件使用
  const categoryValue = currentCategory === '' ? 'all' : currentCategory
  const tagValue = currentTag === '' ? 'all' : currentTag

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Category */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">分類</label>

        {/* ✅ 刪除原生 select，只保留 shadcn Select */}
        <Select
          value={categoryValue}
          onValueChange={(value) => handleFilterChange('category', value)}
        >
          <SelectTrigger className="w-full backdrop-blur-sm bg-white/30">
            <SelectValue placeholder="選擇分類" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={'all'}>全部分類</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Tag */}
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">標籤</label>

        <Select value={tagValue} onValueChange={(value) => handleFilterChange('tag', value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="選擇標籤" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={'all'}>全部標籤</SelectItem>
              {tags.map((tag) => (
                <SelectItem key={`tag-${tag.id}`} value={tag.id}>
                  {tag.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
