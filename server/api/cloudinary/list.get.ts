import { v2 as cloudinary } from 'cloudinary'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const perPage = parseInt(query.perPage as string) || 20
  const nextCursor = query.nextCursor as string | undefined

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  const result = await cloudinary.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('uploaded_at', 'desc')
    .max_results(perPage)
    .next_cursor(nextCursor)
    .execute()

  return {
    resources: result.resources,
    nextCursor: result.next_cursor || null,
    totalCount: result.total_count,
  }
})
