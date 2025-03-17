export default function imgixLoader({ src, width, quality }) {
  // If src is a relative path (local/public image), return as-is
  if (!src.startsWith('http')) {
    return src;
  }

  // Process external images (Imgix URLs)
  try {
    const url = new URL(src);
    const params = url.searchParams;
    params.set('auto', params.getAll('auto').join(',') || 'format,compress');
    params.set('fit', params.get('fit') || 'max');
    params.set('w', params.get('w') || width.toString());
    params.set('q', (quality || 50).toString());

    return url.href;
  } catch (error) {
    console.error("Invalid image URL:", src, error);
    return src; // Fallback to original src if URL fails
  }
}
