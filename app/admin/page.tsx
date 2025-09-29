import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import { DeleteProductButton } from '@/components/admin/delete-product-button'
 
// --- Server Action for Signing Out (no change) ---
async function handleSignOut() {
  "use server"
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect('/login')
}

// In: app/admin/page.tsx

async function deleteProduct(productId: string) {
  "use server"
  const supabase = createClient()
  const BUCKET_NAME = 'product-images'

  const { data: product, error: fetchError } = await supabase
    .from('products_detailed')
    .select('image_url, gallery_images')
    .eq('id', productId)
    .single()

  if (fetchError || !product) {
    console.error('Error fetching product for deletion:', fetchError?.message)
    return { error: 'Could not find product to delete.' }
  }

  const filesToDelete: string[] = []
  
  const getPathFromUrl = (url: string | null): string | null => {
    if (!url) return null;
    try {
      const urlObject = new URL(url);
      return urlObject.pathname.split(`/${BUCKET_NAME}/`)[1];
    } catch (e) {
      return null;
    }
  }

  const mainImagePath = getPathFromUrl(product.image_url)
  if (mainImagePath) {
    filesToDelete.push(mainImagePath)
  }
  
  if (product.gallery_images && product.gallery_images.length > 0) {
    // THE FIX IS HERE: Add the type '(url: string)'
    product.gallery_images.forEach((url: string) => {
      const galleryPath = getPathFromUrl(url);
      if (galleryPath) filesToDelete.push(galleryPath);
    })
  }

  if (filesToDelete.length > 0) {
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(filesToDelete)
    
    if (storageError) {
      console.error('Error deleting images from storage:', storageError.message)
    }
  }

  const { error: deleteError } = await supabase
    .from('products_detailed')
    .delete()
    .eq('id', productId)

  if (deleteError) {
    console.error('Error deleting product from database:', deleteError.message)
    return { error: 'Could not delete product from database.' }
  }

  revalidatePath('/admin')
}
export default async function AdminPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: products } = await supabase
    .from('products_detailed')
    .select('*')
    .order('name', { ascending: true })

  return (
    <div className="w-full max-w-7xl mx-auto p-6 sm:p-8 md:p-12 font-sans bg-white">
      {/* --- Header --- */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome, {user.email}!</p>
        </div>
        <form action={handleSignOut}>
          <button type="submit" className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full sm:w-auto">
            Sign Out
          </button>
        </form>
      </header>
      
      <main className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
          <Link href="/admin/homepage">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-5 rounded-lg transition-colors">
              Edit Homepage
            </button>
          </Link>
          <Link href="/admin/products/new">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
              Create New Product
            </button>
          </Link>
        </div>

        {/* --- Product Table --- */}
        <div className="overflow-x-auto bg-white rounded-lg shadow ring-1 ring-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-sm text-gray-600">Name</th>
                <th className="p-4 font-semibold text-sm text-gray-600">Price</th>
                <th className="p-4 font-semibold text-sm text-gray-600">Featured</th>
                <th className="p-4 font-semibold text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{product.name}</td>
                  <td className="p-4 text-gray-600">{formatPrice(product.price)}</td>
                  <td className="p-4 text-gray-600">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {product.featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-4 text-sm">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-blue-600 hover:text-blue-800 font-medium">
                      Edit
                    </Link>
                    <DeleteProductButton 
                    productId={product.id} 
                    deleteAction={deleteProduct} 
                  />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
} 