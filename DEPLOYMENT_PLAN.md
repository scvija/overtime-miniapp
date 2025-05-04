# Farcaster Mini-App Deployment Plan (from User Input)

This guide outlines the process for deploying the Overtime Markets mini-app from a local environment to Vercel and publishing it as a test version for Warpcast/Farcaster.

## Step-by-Step Guide

### 1. Prepare Your App for Deployment

Ensure the app is ready for production deployment.

*   **Verify Frame SDK Integration**:
    *   Confirm `sdk.actions.ready()` is called in `src/pages/Root/App.tsx`.
    *   Check the browser console for the "Frame SDK ready signal sent" message during testing.
    *   *(Self-correction note: The plan suggests `import { actions } from '@farcaster/frame-sdk'; actions.ready();`. We previously established `import sdk from '@farcaster/frame-sdk'; sdk.actions.ready();` works. Stick to the working implementation.)*
*   **Optimize for Production**:
    *   Run `npm run build` to create a production build in the `dist` folder.
    *   Test the build locally with `npm run preview`.
*   **Environment Variables**:
    *   Ensure required environment variables (`VITE_APP_WALLET_CONNECT_PROJECT_ID`, `VITE_APP_INFURA_PROJECT_ID`, etc.) are defined in a `.env.production` file or configured in Vercel.
*   **Add Mini App Metadata**:
    *   Add OpenGraph-inspired meta tags to `index.html`:
        ```html
        <meta property="fc:miniapp:title" content="Overtime Markets" />
        <meta property="fc:miniapp:description" content="Bet on sports with Overtime Markets" />
        <meta property="fc:miniapp:image" content="<URL_TO_PREVIEW_IMAGE>" />
        <meta property="fc:miniapp:action" content="Launch App" />
        <meta property="fc:miniapp:action:url" content="<YOUR_DEPLOYED_URL>" />
        ```
    *   *(Note: Placeholder URLs need to be replaced later)*
    *   Alternatively, create `public/.well-known/farcaster.json` (covered in Step 3). Meta tags are sufficient for initial testing.

### 2. Deploy to Vercel

*   **Set Up Vercel Account**: Sign up/log in at [vercel.com](https://vercel.com/).
*   **Install Vercel CLI**: `npm install -g vercel`
*   **Deploy the App**:
    *   Navigate to the project directory.
    *   Run `vercel`.
    *   Configure: Framework (Vite), Build Command (`npm run build`), Output Directory (`dist`), Root Directory (`./`).
    *   Add environment variables in Vercel's dashboard or via CLI (e.g., `vercel env add VITE_APP_WALLET_CONNECT_PROJECT_ID your_value`).
*   **Verify Deployment**:
    *   Visit the Vercel URL provided after deployment.
    *   Check console for "Frame SDK ready signal sent".

### 3. Publish as a Farcaster Mini App

*   **Create Manifest File (Recommended)**:
    *   Create `public/.well-known/farcaster.json` with content:
        ```json
        {
          "name": "Overtime Markets",
          "description": "A sports betting mini-app for Farcaster users",
          "icon": "<URL_TO_ICON>",
          "url": "<YOUR_DEPLOYED_URL>",
          "version": "1.0.0",
          "capabilities": {
            "wallet": true,
            "social": false // Adjust based on actual social features
          }
        }
        ```
    *   *(Note: Placeholder URLs/values need replacement. Set `social` based on capabilities.)*
*   **Configure Vercel to Serve Manifest**:
    *   Ensure `public/.well-known/farcaster.json` is deployed. If needed, add `vercel.json`:
        ```json
        {
          "rewrites": [
            {
              "source": "/.well-known/farcaster.json",
              "destination": "/.well-known/farcaster.json"
            }
          ]
        }
        ```
    *   Redeploy (`vercel --prod`).
*   **Test in Warpcast Previewer**: Use the deployed URL in the previewer. Verify metadata and functionality.
*   **Publish for Testing**:
    *   Share the app's deployed URL in a Warpcast post.
    *   Verify the rich embed renders correctly (using meta tags or manifest).
    *   Test launching the app from the embed.

### 4. Additional Considerations

*   **Caching**: Set appropriate `Cache-Control` headers if serving dynamic images.
*   **Wallet Integration**: Verify Farcaster's wallet connector works seamlessly (the plan suggests a specific connector `farcasterFrame` from `@farcaster/frame-wagmi-connector`, which might need investigation/installation if different from the standard Frame SDK integration).
*   **Transition to Frames V2**: Consider for future production versions.

### 5. Troubleshooting

*   Check CORS, HTTPS issues, manifest URL validity, browser console errors.

### 6. Next Steps

*   Test with users, iterate, enhance features, consider Frames V2 migration, monitor performance.

---
*Self-correction note applied regarding Frame SDK usage based on previous findings.* 