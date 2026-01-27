import type { Access, CollectionConfig } from 'payload'

const readAccess: Access = ({ req }) => {
  // return req.user.role === 'admin'
  return true
} // ✅ 允許未登入者讀取

export const Event: CollectionConfig = {
  slug: 'event',
  access: {
    read: readAccess, // ✅ 允許未登入者讀取
  },
  admin: { useAsTitle: 'name' },
  hooks: {
    afterChange: [],
    beforeValidate: [
      ({ data, operation }) => {
        // 仅在创建（create）时自动生成 UUID，避免更新时覆盖
        if (operation === 'create' && (!data || !data.slug)) {
          return { ...data, slug: crypto.randomUUID() }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        'zh-TW': '活動名稱',
        en: 'Event Name',
      },
    },
    // {
    //   name: 'virtual-button',
    //   type: 'ui',
    //   label: 'Link',
    //   admin: { components: { Field: () => '🔗 /products/{slug}' } },
    // },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true, // 可选：前台设为只读，避免误改
      },
      label: {
        'zh-TW': '網址代碼',
        en: 'Slug',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: {
        'zh-TW': '貨品描述',
        en: 'Description',
      },
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
      label: {
        'zh-TW': '圖片',
        en: 'Images',
      },
    },
    {
      name: 'homepageIndex',
      type: 'number',
      min: 0,
      defaultValue: 0,
      label: {
        'zh-TW': '首頁顥示次序',
        en: 'Homepage Index',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      label: {
        'zh-TW': '公開',
        en: 'Published',
      },
    },
  ],
}
