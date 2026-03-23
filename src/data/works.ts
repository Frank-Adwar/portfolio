/**

 * Routes: `/works` (index) and `/works/:slug` (case study + live preview).

 */

export type PreviewMode = 'live' | 'static'



/** Still from a built site — hero, section, footer, etc. Replace files in `public/works/gallery/`. */

export type GallerySnapshot = {

  src: string

  label: string

}



export type WorkItem = {

  id: string

  /** URL segment for `/works/:slug` */

  slug: string

  title: string

  /** Short line under the title (role / stack) — Kento-style meta */

  category: string

  description: string

  /** Live URL — “Check it out” opens this. */

  href: string

  /**

   * `live` — iframe embed on home carousel + detail (real deploy).

   * `static` — hero image only (Awwwards-style card); no full-site iframe. Replace `previewSrc` with a PNG/WebP of the hero.

   */

  previewMode?: PreviewMode

  /** Poster for live slides; full hero shot for `previewMode: 'static'`. */

  previewSrc?: string

  /** Gallery page: multiple crops of the same site. */

  gallerySnapshots: GallerySnapshot[]

}



export const works: WorkItem[] = [

  {

    id: '1',

    slug: 'earth-alliance',

    title: 'Earth Alliance',

    category: 'Environmental · Next.js',

    description:

      'Environmental storytelling and a clear path to engagement — built for the web.',

    href: 'https://environment-m527.vercel.app/',

    previewMode: 'live',

    previewSrc: '/works/earth-alliance.svg',

    gallerySnapshots: [
      { src: '/works/gallery/earth-alliance-hero.png', label: 'Home hero' },
      {
        src: '/works/gallery/earth-alliance-01-initiatives.png',
        label: 'Conservation initiatives',
      },
      {
        src: '/works/gallery/earth-alliance-02-restoration.png',
        label: 'Ecosystem restoration',
      },
      { src: '/works/gallery/earth-alliance-03-contact.png', label: 'Contact' },
    ],

  },

  {

    id: '2',

    slug: 'wild-safari',

    title: 'Wild Safari',

    category: 'Experience · Web',

    description:

      'An immersive safari experience — storytelling and layout built for the browser.',

    href: 'https://safari-vcpy.vercel.app/',

    previewMode: 'live',

    previewSrc: '/works/wild-safari.svg',

    gallerySnapshots: [
      { src: '/works/gallery/wild-safari-hero.png', label: 'Home hero' },
      {
        src: '/works/gallery/wild-safari-01-home-grid.png',
        label: 'Featured grid',
      },
      {
        src: '/works/gallery/wild-safari-02-lodges.png',
        label: 'Lodges & camps',
      },
      {
        src: '/works/gallery/wild-safari-03-travel-info.png',
        label: 'Travel info',
      },
    ],

  },

]



export function getWorkBySlug(slug: string | undefined): WorkItem | undefined {

  if (!slug) return undefined

  return works.find((w) => w.slug === slug)

}


