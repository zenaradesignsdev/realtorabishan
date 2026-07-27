export interface Testimonial {
  name: string
  meta: string
  timeAgo: string
  quote: string
}

/**
 * Verbatim, verified Google reviews (provided directly by the client — not
 * scraped or generated). Keep exact wording; do not paraphrase or invent
 * additional reviews.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Eknoor Kaur',
    meta: '6 reviews · 2 photos',
    timeAgo: '2 months ago',
    quote:
      "Finding the right apartment can feel overwhelming, but working with Abishan made the entire process a breeze. From our very first conversation, he took the time to truly listen to what I was looking for and it showed. Instead of flooding me with irrelevant listings, he carefully filtered through the options and only showed me places that actually matched my needs. It was clear he respected my time and genuinely wanted to find the right fit, not just close a deal. I found my perfect place without the usual stress, and I have Abishan to thank for that. I'd recommend him without hesitation to anyone looking for a realtor who actually listens.",
  },
  {
    name: 'Kishan Modi',
    meta: 'Local Guide · 31 reviews · 6 photos',
    timeAgo: '3 months ago',
    quote:
      'Great experience with Abishan. The process was fast and smooth. I viewed the place, made a decision, and signed the lease all in the same day. He was very responsive and made sure everything will be ready before move-in. I would definitely recommend him to anyone looking for a good apartment to rent.',
  },
  {
    name: 'Manoj Kumar',
    meta: '9 reviews',
    timeAgo: '3 months ago',
    quote:
      'Working with Abishan was a great experience from start to finish. He was professional, responsive, and truly understood what I was looking for. His guidance made the entire process smooth and stress-free, and I always felt well-informed at every step.',
  },
  {
    name: 'Steffi Tio',
    meta: '7 reviews · 1 photo',
    timeAgo: '3 months ago',
    quote:
      'Really enjoyed working with Abishan. He was quick to respond, communicated everything clearly, and had a very easygoing approach that made the experience smooth. Highly recommend!',
  },
  {
    name: 'Appu S',
    meta: '3 reviews · 2 photos',
    timeAgo: '3 months ago',
    quote:
      'It was awesome working with Abishan. I just called him, told him what I needed and my budget. Everything went smoothly and it was all done within a week. I was super happy. Thanks a bunch!',
  },
]
