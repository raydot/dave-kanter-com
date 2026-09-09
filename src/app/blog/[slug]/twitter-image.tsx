import { size, contentType, generateImageStaticParams, renderPostImage } from './_og-image'

export { size, contentType }
export const revalidate = 3600
export const generateStaticParams = generateImageStaticParams

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return renderPostImage(slug)
}
