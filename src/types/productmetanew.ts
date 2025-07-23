export type NewProductMeta = {
  meta_title?: string
  meta_description: string
}

export async function fetchProductMeta(productId: string): Promise<NewProductMeta | null> {
  try {
    const res = await fetch(`https://bk.darkhorse-ny.com/product-details?id=${productId}`);

    if (!res.ok) {
      console.error('HTTP error:', res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    console.log('API response:', json);

    if (json.success && json.data) {
      const { meta_title, meta_description } = json.data;
      return { meta_title, meta_description };
    } else {
      console.warn('API returned success=false or no data');
    }
  } catch (error) {
    console.error('Error fetching product meta:', error);
  }

  return null;
}