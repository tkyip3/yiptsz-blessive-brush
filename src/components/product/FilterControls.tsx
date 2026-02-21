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
      params.delete(key)
    } else {
      params.set(key, value)
    }
    params.set('page', '1') // 切換篩選時重置頁碼
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Category */}
      <div className="flex-1">
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          分類
        </label>
        <select
          id="category"
          className="select appearance-none pl-3 pr-7 w-full"
          value={currentCategory}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange('category', e.target.value)
          }
        >
          <option value="">全部分類</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <Select
          value={currentCategory}
          onValueChange={(value) => handleFilterChange('category', value)}
        >
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="選擇分類" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={'all'} value={'all'}>
                全部分類
              </SelectItem>
              {categories.map((cat) => (
                <SelectItem key={`cat-${cat.id}`} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Tag */}
      <div className="flex-1">
        <label htmlFor="tag" className="block text-sm font-medium mb-1">
          標籤
        </label>
        <select
          id="tag"
          className="select appearance-none pl-3 pr-7 w-full"
          value={currentTag}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleFilterChange('tag', e.target.value)
          }
        >
          <option value="">全部標籤</option>
          {tags.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <Select value={currentTag} onValueChange={(value) => handleFilterChange('tag', value)}>
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="選擇標籤" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={'all'} value={'all'}>
                全部標籤
              </SelectItem>
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
