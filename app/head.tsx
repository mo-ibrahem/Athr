export default function Head() {
  return (
    <>
      <link rel="icon" href="/atthr.svg" sizes="any" />
      <link rel="apple-touch-icon" href="/atthr.svg" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://athreg.com",
            "logo": "https://athreg.com/atthr.svg"
          }),
        }}
      />
    </>
  )
}