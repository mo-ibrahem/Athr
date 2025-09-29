import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { SubmitButton } from '@/components/admin/submit-button'
import { BackButton } from '@/components/admin/back-button'
import type React from 'react'

// --- Updated Server Action for Specific Image Structure ---
async function createProduct(formData: FormData) {
  'use server'

  const supabase = await createClient()

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const insp = formData.get('insp') as string
  const price = parseFloat(formData.get('price') as string)
  const category = formData.get('category') as string
  const brand = 'ATHR'
  const in_stock = formData.get('in_stock') === 'on'
  const featured = formData.get('featured') === 'on'

  const uploadFile = async (file: File) => {
    if (!file || file.size === 0) return null
    const fileName = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('product-images').upload(fileName, file)
    if (error) throw new Error(`Image upload failed: ${error.message}`)
    const { data } = supabase.storage.from('product-images').getPublicUrl(fileName)
    return data.publicUrl
  }

  const thumbnailFile = formData.get('thumbnail_url') as File
  const galleryFile1 = formData.get('gallery_image_1') as File
  const galleryFile2 = formData.get('gallery_image_2') as File
  
  const [thumbnailUrl, galleryUrl1, galleryUrl2] = await Promise.all([
    uploadFile(thumbnailFile),
    uploadFile(galleryFile1),
    uploadFile(galleryFile2)
  ])

  if (!thumbnailUrl || !galleryUrl1 || !galleryUrl2) {
    throw new Error('All three images are required.')
  }
  
  const notesTop = (formData.get('notes_top') as string).split(',').map(s => s.trim())
  const notesMiddle = (formData.get('notes_middle') as string).split(',').map(s => s.trim())
  const notesBase = (formData.get('notes_base') as string).split(',').map(s => s.trim())
  const notes = { top: notesTop, middle: notesMiddle, base: notesBase }

  const ingredients = (formData.get('ingredients') as string).split(',').map(s => s.trim())
  const sizes = [{ size: '50ml', price: price }]

  const { error } = await supabase.from('products_detailed').insert({
    name, slug, description, insp, price, category, brand, in_stock, featured,
    image_url: thumbnailUrl,
    thumbnail_url: thumbnailUrl,
    gallery_images: [galleryUrl1, galleryUrl2],
    notes,
    ingredients,
    sizes,
  })

  if (error) throw new Error(`Database insert failed: ${error.message}`)

  revalidatePath('/admin')
  redirect('/admin')
}

// --- The Form Page Component with Tailwind Styling ---
export default function CreateProductPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-gray-800">
      <header className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create New Product</h1>
      </header>

      <form action={createProduct} className="mt-10 flex flex-col">
        
        {/* --- Basic Information Section --- */}
        <div className="space-y-8 py-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            <p className="mt-1 text-sm text-gray-500">Enter the main details for the new product.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Name</span>
              <input name="name" required className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Slug</span>
              <input name="slug" required className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Price (EGP)</span>
              <input name="price" type="number" step="0.01" required className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Category</span>
              <input name="category" required className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Description</span>
            <textarea name="description" className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition h-24 resize-none" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Inspiration</span>
            <input name="insp" className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition" />
          </label>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* --- Images Section --- */}
        <div className="space-y-8 py-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Images</h2>
            <p className="mt-1 text-sm text-gray-500">Thumbnail and both gallery images are required.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Thumbnail Image</span>
              <input name="thumbnail_url" type="file" accept="image/*" required className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Gallery Image 1</span>
              <input name="gallery_image_1" type="file" accept="image/*" required className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Gallery Image 2</span>
              <input name="gallery_image_2" type="file" accept="image/*" required className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
            </label>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* --- Details Section --- */}
        <div className="space-y-8 py-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Details</h2>
            <p className="mt-1 text-sm text-gray-500">Enter comma-separated values for ingredients and notes.</p>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Ingredients</span>
            <input name="ingredients" placeholder="Ingredient 1, Ingredient 2, ..." className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition" />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Top Notes</span>
              <input name="notes_top" placeholder="Note 1, Note 2, ..." className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Middle Notes</span>
              <input name="notes_middle" placeholder="Note 1, Note 2, ..." className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Base Notes</span>
              <input name="notes_base" placeholder="Note 1, Note 2, ..." className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition" />
            </label>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />
        
        {/* --- Status Section --- */}
        <div className="space-y-4 py-8">
          <h2 className="text-xl font-semibold text-gray-900">Status</h2>
          <div className="flex gap-10">
            <label className="flex items-center gap-3 cursor-pointer">
              <input name="in_stock" type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm font-medium text-gray-700">In Stock?</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input name="featured" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm font-medium text-gray-700">Featured?</span>
            </label>
          </div>
        </div>
        
        <div className="mt-4 self-start">
          <SubmitButton>Create Product</SubmitButton>
        </div>
      </form>
    </div>
  )
}