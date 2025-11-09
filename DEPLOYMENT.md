# Deployment Guide - Netlify Next.js Runtime

## Migration Complete ✅

Successfully migrated from static export to Netlify's Next.js runtime.

## Environment Variables Required

Add these to your **Netlify dashboard** (Site settings → Environment variables):

```bash
# Anthropic Claude API
ANTHROPIC_API_KEY=sk-ant-api03-...

# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://merry-oryx-12818.upstash.io
UPSTASH_REDIS_REST_TOKEN=ATISAAIncDI1ZjZmZjBlOGY2MTY0Y2UxOGQ5YjNmNWNlOThiMDcyZHAyMTI4MTg

# Resend API (Contact Form)
RESEND_API_KEY=re_...
```

## What Changed

### 1. Configuration
- ✅ Removed static export settings
- ✅ Configured for Netlify's Next.js runtime
- ✅ Image optimization via Netlify CDN

### 2. Contact Form
- ✅ Converted from Netlify Forms to Server Action
- ✅ Email delivery via Resend API
- ✅ Rate limiting: 5 submissions/hour per IP
- ✅ Server-side validation

### 3. Server Actions
- ✅ `askDave` - AI chat (10 requests/hour)
- ✅ `submitContactForm` - Contact form (5 requests/hour)
- ✅ Separate rate limiters for each action

### 4. Images
- ✅ Next.js Image optimization enabled
- ✅ Automatic WebP/AVIF conversion
- ✅ CDN caching via Netlify

## Build Output

```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.25 kB  249 kB
├ ○ /_not-found                          232 B    244 kB
└ ○ /success                             202 B    244 kB
```

## Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Migrate to Netlify Next.js runtime"
   git push
   ```

2. **Add Environment Variables**
   - Go to Netlify dashboard
   - Site settings → Environment variables
   - Add all variables listed above

3. **Deploy**
   - Netlify will auto-deploy on push
   - Or manually trigger: Site overview → Trigger deploy

4. **Verify**
   - ✅ Images load correctly
   - ✅ Contact form sends emails
   - ✅ Ask Dave AI chat works
   - ✅ Rate limiting active

## Expected Errors Fixed

- ✅ `/_next/image` 400 errors - Fixed (image optimization now works)
- ✅ Server Action not found - Fixed (proper runtime configuration)
- ✅ 404 errors - Fixed (Next.js routing handles all routes)

## Performance

- **Images**: Optimized on-demand, cached globally
- **Server Actions**: Edge functions with rate limiting
- **Bundle Size**: ~244 KB first load (optimized)

## Troubleshooting

### Contact form not working
- Check `RESEND_API_KEY` is set in Netlify
- Verify domain is verified in Resend dashboard

### Ask Dave not responding
- Check `ANTHROPIC_API_KEY` is set in Netlify
- Verify Upstash Redis credentials

### Images not loading
- Check Netlify Next.js plugin is installed
- Verify images exist in `/public/images/`

## Support

For issues, check:
1. Netlify function logs (Site → Functions)
2. Browser console for client errors
3. Build logs for compilation issues
