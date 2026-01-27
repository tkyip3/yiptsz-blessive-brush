import type { Access, CollectionConfig } from 'payload'

const readAccess: Access = ({ req }) => {
  // return req.user.role === 'admin'
  return true
} // ✅ 允許未登入者讀取

export const Tag: CollectionConfig = {
  slug: 'tags',
  access: {
    read: readAccess, // ✅ 允許未登入者讀取
  },
  admin: { useAsTitle: 'name' },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: {
        'zh-TW': '標籤名稱',
        en: 'Tag Name',
      },
    },
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
      name: 'order',
      type: 'number',
      min: 0,
      defaultValue: 0,
      label: {
        'zh-TW': '索引編號',
        en: 'Order Number',
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
