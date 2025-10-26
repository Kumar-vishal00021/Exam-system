"use client";

import React, { useEffect, useRef } from "react";


// Put your publisher ID here once (same as in layout.tsx)
const AD_CLIENT = "ca-pub-5005896729722611";

export default function AdUnit({
  adSlot,
  type = "display",
  layoutKey,
  format,
  fullWidthResponsive = true,
  wrapperStyle,
  className,
}) {
  const insRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // only push if this ad slot hasn’t been filled already
      if (insRef.current && !insRef.current.getAttribute("data-adsbygoogle-status")) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.warn("AdSense error", err);
    }
  }, []); // run once on mount only

  return (
    <div className={className} style={wrapperStyle}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={type === "display" ? format ?? "auto" : "fluid"}
        {...(type === "infeed" && layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
        {...(fullWidthResponsive ? { "data-full-width-responsive": "true" } : {})}
      />
    </div>
  );
}

// Display (horizontal, vertical, square)
// <AdUnit adSlot="1234567890" type="display" wrapperStyle={{ width: "100%", maxWidth: 1020 }} />
// <AdUnit adSlot="1234567890" type="display" wrapperStyle={{ width: 300 }} />
// <AdUnit adSlot="1234567890" type="display" wrapperStyle={{ width: 336 }} />
//
// In-Feed
// <AdUnit adSlot="1234567890" type="infeed" layoutKey="-gw-3+1f-3d+2z" wrapperStyle={{ width: "100%" }} />
//
// In-Article
// <AdUnit adSlot="1234567890" type="inarticle" wrapperStyle={{ width: "100%" }} /> 
