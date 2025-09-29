import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type React from 'react'
import { SubmitButton } from '@/components/admin/submit-button'
import { BackButton } from '@/components/admin/back-button'

// --- Server Action (No changes needed here) ---
async function updateProduct(productId: string, formData: FormData) {
  'use server'

  const supabase = await createClient()

  const productData: { [key: string]: any } = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    insp: formData.get('insp') as string,
    price: parseFloat(formData.get('price') as string),
    category: formData.get('category') as string,
    in_stock: formData.get('in_stock') === 'on',
    featured: formData.get('featured') === 'on',
  };

  const notesTop = (formData.get('notes_top') as string).split(',').map(s => s.trim())
  const notesMiddle = (formData.get('notes_middle') as string).split(',').map(s => s.trim())
  const notesBase = (formData.get('notes_base') as string).split(',').map(s => s.trim())
  productData.notes = { top: notesTop, middle: notesMiddle, base: notesBase }

  productData.ingredients = (formData.get('ingredients') as string).split(',').map(s => s.trim())
  productData.sizes = [{ size: '50ml', price: productData.price }]
  
  const imageFile = formData.get('image_url') as File
  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name}`
    const { error } = await supabase.storage.from('product-images').upload(fileName, imageFile)
    if (error) throw new Error(`Image upload failed: ${error.message}`)

    const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(fileName)
    productData.image_url = publicUrlData.publicUrl
    productData.thumbnail_url = publicUrlData.publicUrl
  }

  const { error } = await supabase.from('products_detailed').update(productData).eq('id', productId)
  if (error) throw new Error(`Database update failed: ${error.message}`)

  revalidatePath('/admin')
  revalidatePath(`/products/${productData.slug}`)
  redirect('/admin')
}

// --- The Edit Page Component with Modern Styling ---
export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: product } = await supabase
    .from('products_detailed')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!product) {
    notFound()
  }
  
  const updateProductWithId = updateProduct.bind(null, product.id)
  
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: '40px 60px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '900px',
      margin: '40px auto',
      backgroundColor: 'white',
    },
    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      borderBottom: '1px solid #eaeaea',
      paddingBottom: '20px',
      marginBottom: '40px',
    },
    header: {
      fontSize: '28px',
      fontWeight: 600,
      color: '#111',
      margin: 0,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '25px',
      border: '1px solid #eaeaea',
      borderRadius: '8px',
    },
    sectionHeader: {
      fontSize: '18px',
      fontWeight: 500,
      color: '#333',
      margin: 0,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    },
    gridTriple: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '20px',
    },
    label: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontSize: '14px',
      fontWeight: 500,
      color: '#444',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '15px',
      boxSizing: 'border-box',
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '15px',
      color: '#333',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <BackButton />
        <h1 style={styles.header}>Edit: <span style={{ color: '#555' }}>{product.name}</span></h1>
      </div>

      <form action={updateProductWithId} style={styles.form}>
        
        <div style={styles.section}>
          <h2 style={styles.sectionHeader}>Basic Information</h2>
          <div style={styles.grid}>
            <label style={styles.label}>Name <input name="name" required defaultValue={product.name} style={styles.input} /></label>
            <label style={styles.label}>Slug <input name="slug" required defaultValue={product.slug} style={styles.input} /></label>
            <label style={styles.label}>Price (EGP) <input name="price" type="number" step="0.01" required defaultValue={product.price} style={styles.input} /></label>
            <label style={styles.label}>Category <input name="category" required defaultValue={product.category || ''} style={styles.input} /></label>
          </div>
          <label style={styles.label}>Description <textarea name="description" defaultValue={product.description || ''} style={{...styles.input, minHeight: '120px', resize: 'vertical'}} /></label>
          <label style={styles.label}>Inspiration <input name="insp" defaultValue={product.insp || ''} style={styles.input} /></label>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionHeader}>Images</h2>
          <div>
            <p style={{margin: '0 0 10px 0', fontSize: '14px', fontWeight: 500, color: '#444'}}>Current Main Image:</p>
            <img src={product.image_url} alt={product.name} width="100" height="100" style={{ border: '1px solid #eee', borderRadius: '6px', objectFit: 'cover' }} />
          </div>
          <label style={styles.label}>Upload New Main Image (optional) <input name="image_url" type="file" accept="image/*" style={styles.input} /></label>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionHeader}>Details</h2>
          <label style={styles.label}>Ingredients (comma-separated) <input name="ingredients" defaultValue={product.ingredients?.join(', ')} style={styles.input} /></label>
          <div style={styles.gridTriple}>
            <label style={styles.label}>Top Notes <input name="notes_top" defaultValue={product.notes?.top?.join(', ')} style={styles.input} /></label>
            <label style={styles.label}>Middle Notes <input name="notes_middle" defaultValue={product.notes?.middle?.join(', ')} style={styles.input} /></label>
            <label style={styles.label}>Base Notes <input name="notes_base" defaultValue={product.notes?.base?.join(', ')} style={styles.input} /></label>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionHeader}>Status</h2>
          <div style={{ display: 'flex', gap: '30px' }}>
            <label style={styles.checkboxLabel}><input name="in_stock" type="checkbox" defaultChecked={product.in_stock} style={{ width: '16px', height: '16px' }} /> In Stock?</label>
            <label style={styles.checkboxLabel}><input name="featured" type="checkbox" defaultChecked={product.featured} style={{ width: '16px', height: '16px' }} /> Featured?</label>
          </div>
        </div>
        
        <SubmitButton>
          Save Changes
        </SubmitButton>
      </form>
    </div>
  )
}