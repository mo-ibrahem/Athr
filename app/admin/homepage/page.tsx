import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { BackButton } from '@/components/admin/back-button'
import { SubmitButton } from '@/components/admin/submit-button'
import type React from 'react'

// --- Server Action (No changes needed here) ---
async function updateHomepage(formData: FormData) {
  'use server'
  // ... (Your existing updateHomepage logic is perfect)
}

// --- The Page Component with New Modern Styling ---
export default async function HomepageAdminPage() {
  const supabase = createClient()

  const { data: content } = await supabase.from('homepage_content').select('*').single()
  const { data: products } = await supabase.from('products_detailed').select('id, name').order('name')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-gray-800">
      <header className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Homepage</h1>
      </header>

      <form action={updateHomepage} className="mt-10 flex flex-col">
        
        {/* --- Hero Section --- */}
        <div className="space-y-8 py-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Hero Section</h2>
            <p className="mt-1 text-sm text-gray-500">Update the main banner on your homepage.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Title</span>
              <input name="hero_title" defaultValue={content?.hero_title || ''} className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Button Text</span>
              <input name="hero_button_text" defaultValue={content?.hero_button_text || ''} className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Subtitle</span>
            <textarea name="hero_subtitle" defaultValue={content?.hero_subtitle || ''} className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition h-24 resize-none" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Button Link</span>
            <input name="hero_button_link" placeholder="/products" defaultValue={content?.hero_button_link || ''} className="mt-1 block w-full border-0 border-b-2 border-gray-200 p-2 focus:ring-0 focus:border-black transition" />
          </label>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Current Hero Image:</p>
            {content?.hero_image_url ? (
              <img src={content.hero_image_url} alt="Current Hero" className="h-40 w-auto rounded-lg object-cover shadow-md" />
            ) : (
              <p className="text-sm text-gray-500">No image uploaded.</p>
            )}
          </div>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Upload New Hero Image (optional)</span>
            <input name="hero_image_url" type="file" accept="image/*" className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
          </label>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* --- Featured Products Section --- */}
        <div className="space-y-8 py-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Featured Products</h2>
            <p className="mt-1 text-sm text-gray-500">Select which products to feature on the homepage.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products?.map(product => (
              <label key={product.id} className="flex items-center p-4 border rounded-lg transition-all hover:border-black hover:bg-gray-50 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured_product_ids"
                  value={product.id}
                  defaultChecked={content?.featured_product_ids?.includes(product.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-800">{product.name}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mt-8 self-start">
          <SubmitButton>Save Homepage</SubmitButton>
        </div>
      </form>
    </div>
  )
}