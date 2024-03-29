'use client';

export function Analytics() {
  const token = process.env.NEXT_PUBLIC_BEAM_ANALYTICS_TOKEN;
  if (!token) {
    return null;
  }
  return (
    // need to be update
    <script
      src="https://beamanalytics.b-cdn.net/beam.min.js"
      data-token={token}
      async
    />
  );
}
