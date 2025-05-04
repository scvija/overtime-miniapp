# Farcaster Frame Integration Plan for Overtime Sportsbook Fork

This document outlines the understanding of the existing Overtime Sportsbook frontend codebase and a plan to integrate Farcaster Frame functionality.

## Codebase Analysis Summary

*   **Tech Stack**: React, Vite, TypeScript, Redux, React Query, Wagmi v2, RainbowKit, Particle Network, styled-components, react-router-dom v5, i18next.
*   **Architecture**: Well-structured application with clear separation of concerns (components, pages, hooks, redux, queries, constants, etc.). Uses a central `Root` component for providers (`src/pages/Root/Root.tsx`) and an `App` component for routing and core wallet/network logic synchronization (`src/pages/Root/App.tsx`). Pages are lazy-loaded and wrapped in a common `DappLayout`.
*   **Key Features (from routes/components)**: Sports market browsing, single market view, bet slip/ticket management, user profile, P&L tracking, liquidity provision, promotions, Overdrop feature, SEO pages, Particle Network social logins, potential Biconomy gas abstraction.
*   **Wallet Integration**: Sophisticated handling of both standard wallets (via RainbowKit/Wagmi) and social logins (via Particle Network), including logic to keep their states synchronized and handle network mismatches.

## Integration Plan

1.  **Setup (`package.json`, `src/pages/Root/Root.tsx`)**:
    *   Add `@farcaster/frame-sdk` dependency.
    *   Identify the earliest point *after* essential providers (Wagmi, QueryClient) are initialized in `src/pages/Root/Root.tsx`. This seems to be inside the `App` component rendered within `RainbowKitProvider`.
    *   Consider a new context provider or a hook specifically for Frame interactions, initialized near the top level of `App.tsx`.

2.  **Frame SDK Initialization (`src/pages/Root/App.tsx` or a dedicated hook/context)**:
    *   Use `useEffect` to call `sdk.actions.ready()` once the app is mounted, similar to the POC.
    *   Decide how frame-specific context (like user FID, signed payload) will be managed. A React Context might be suitable.

3.  **Warpcast-Specific Logic**:
    *   **Conditional Rendering**: Detect if running inside a Warpcast frame (via SDK, URL params, etc.). Based on this:
        *   Potentially simplify `DappLayout` or render a frame-specific layout.
        *   Hide irrelevant elements.
        *   Adapt the wallet connection flow.
    *   **Wallet Connection**:
        *   Use the frame-provided verified address instead of showing the RainbowKit modal.
        *   Integrate the frame address with Wagmi's `useAccount`. Investigate injecting this info (custom connector? SDK guidance?).
        *   Frame disconnect might just clear frame state.
    *   **Transaction Signing**:
        *   Adapt `useWriteContract` calls (e.g., in `Markets.tsx`, `Ticket.tsx`) to use the Frame SDK's signing method when in frame context.

4.  **Frame-Specific UI/UX (`Markets.tsx`, `Ticket.tsx`, etc.)**:
    *   **Focus**: Potentially focus on a *specific* market passed via context/URL.
    *   **Simplicity**: Streamline UI for the smaller frame view (e.g., simplified bet slip).
    *   **Feedback**: Ensure clear loading/success/error states for frame actions.

5.  **Testing**:
    *   Run locally (`npm run start`).
    *   Use Warpcast Mini-App Preview tool pointed to the local dev server.
    *   Test core flows: loading (`sdk.ready`), frame context detection, using frame address, frame transaction signing.

## Refined First Steps:

1.  Install `@farcaster/frame-sdk`.
2.  Modify `src/pages/Root/App.tsx` to include a basic `useEffect` that calls `sdk.actions.ready()`.
3.  Run the app locally (`npm run start`).
4.  Open the Warpcast Mini-App Previewer and point it to the local dev server URL.
5.  Verify app loads in previewer without errors and `ready` signal is sent. 