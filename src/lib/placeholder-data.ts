import { Talent, BlogPost, Message } from './definitions';

export const talents: Talent[] = [
  {
    id: 'patricia-wambui',
    name: 'Patricia Wambui',
    category: 'Actress',
    bio: 'Award-winning actress from Kenya, known for her captivating performances in both theatre and film. Patricia has a passion for storytelling that reflects the African experience.',
    email: 'patricia@wcta.africa',
    phone: '+254700000000',
    socials: {
      instagram: 'https://instagram.com/patricia',
      twitter: 'https://twitter.com/patricia',
    },
    portfolio: [
      { image: 'talent-1-portfolio-1', caption: 'Film Premiere 2024' },
      { image: 'talent-1-portfolio-2', caption: 'On the set of "Nairobi Half Life"' },
    ],
    profileImage: 'talent-1-profile',
    approved: true,
    createdAt: '2025-11-10T00:00:00Z',
  },
  {
    id: 'david-ochieng',
    name: 'David Ochieng',
    category: 'Artist',
    bio: 'A contemporary visual artist whose work explores themes of identity and urbanization in modern Africa. His vibrant murals have gained international acclaim.',
    email: 'david@wcta.africa',
    phone: '+254711111111',
    socials: {
      instagram: 'https://instagram.com/david',
    },
    portfolio: [
      { image: 'talent-2-portfolio-1', caption: 'Live painting at Nyege Nyege Festival' },
    ],
    profileImage: 'talent-2-profile',
    approved: true,
    createdAt: '2025-10-25T00:00:00Z',
  },
  {
    id: 'aisha-khan',
    name: 'Aisha Khan',
    category: 'Model',
    bio: 'An international fashion model who has graced the runways of Paris, Milan, and New York. Aisha is a strong advocate for diversity and inclusion in the fashion industry.',
    email: 'aisha@wcta.africa',
    phone: '+254722222222',
    socials: {
      instagram: 'https://instagram.com/aisha',
      tiktok: 'https://tiktok.com/@aisha',
    },
    portfolio: [
      { image: 'talent-3-portfolio-1', caption: 'Vogue Arabia Cover Shoot' },
    ],
    profileImage: 'talent-3-profile',
    approved: true,
    createdAt: '2025-09-15T00:00:00Z',
  },
   {
    id: 'samuel-maina',
    name: 'Samuel Maina',
    category: 'Content Creator',
    bio: 'A popular YouTuber and content creator known for his witty commentary and engaging travel vlogs across Africa. He has a knack for capturing the continent\'s hidden gems.',
    email: 'samuel@wcta.africa',
    phone: '+254733333333',
    socials: {
      instagram: 'https://instagram.com/samuel',
      twitter: 'https://twitter.com/samuel',
    },
    portfolio: [
       { image: 'talent-5-portfolio-1', caption: 'Filming in the Maasai Mara' },
    ],
    profileImage: 'talent-5-profile',
    approved: false,
    createdAt: '2026-01-05T00:00:00Z',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'blog001',
    slug: 'the-rise-of-african-creatives',
    title: 'The Rise of African Creatives',
    content: `
<p>Africa’s creative economy is booming, and the world is taking notice. From Nollywood to the vibrant art scenes in Nairobi and Lagos, African talent is reshaping global culture. This surge is not just a trend; it's a movement driven by a new generation of artists, filmmakers, musicians, and designers who are telling their own stories with authenticity and flair.</p>
<p>At W. Chloe, we are at the forefront of this revolution, nurturing and promoting the continent's brightest stars. Our mission is to provide a platform for these voices to be heard, connecting them with brands and audiences worldwide. The digital age has broken down geographical barriers, allowing a creative from Kampala to collaborate with a brand in New York seamlessly.</p>
<h2>Challenges and Opportunities</h2>
<p>While the opportunities are immense, challenges remain. Access to funding, infrastructure, and global markets are hurdles many African creatives face. Agencies like ours play a crucial role in bridging these gaps, offering management, mentorship, and strategic partnerships. By investing in talent, we are investing in the future of Africa's cultural landscape.</p>
<p>The global demand for diverse and authentic content is higher than ever. African creatives offer a fresh perspective, rich in cultural heritage and contemporary innovation. This is Africa's time, and the creative industry is leading the charge.</p>
`,
    author: 'W. Chloe Admin',
    publishedAt: '2025-11-10T00:00:00Z',
    tags: ['Africa', 'Creativity', 'Entertainment'],
    featuredImage: 'blog-1-featured',
  },
  {
    id: 'blog002',
    slug: 'navigating-the-digital-art-scene',
    title: 'Navigating the Digital Art Scene',
    content: `
<p>The art world has been radically transformed by digital technology. For artists, this means new tools for creation and new avenues for exhibition and sales, such as NFTs and online galleries. However, navigating this digital landscape can be daunting.</p>
<p>Success in the digital art world requires more than just talent. Artists must be savvy marketers, community builders, and technologists. Building a strong online presence on platforms like Instagram and Behance is essential for visibility. Engaging with followers and other artists helps build a community around your work.</p>
<h2>The Role of an Agency</h2>
<p>This is where a creative agency can be a game-changer. At W. Chloe, we help our artists develop a cohesive digital strategy. From managing social media to launching NFT collections, we provide the expertise and support needed to thrive online. Our goal is to empower artists to focus on what they do best: creating.</p>
`,
    author: 'Jane Doe',
    publishedAt: '2025-10-20T00:00:00Z',
    tags: ['Digital Art', 'NFTs', 'Technology'],
    featuredImage: 'blog-2-featured',
  },
  {
    id: 'blog003',
    slug: 'behind-the-scenes-a-day-with-a-top-model',
    title: 'Behind the Scenes: A Day with a Top Model',
    content: `
<p>What is a day in the life of a top model really like? It's not all glamour and runways. It's early mornings, long hours, and relentless dedication. We spent a day with one of our top models, Aisha Khan, to give you a glimpse behind the curtain.</p>
<p>Her day started at 5 AM with a workout, followed by a healthy breakfast. By 7 AM, she was on set for a major fashion campaign. The day was a whirlwind of makeup, wardrobe changes, and endless poses under hot lights. What viewers see as a single, perfect shot is the result of hours of work by a whole team.</p>
<p>In the evening, Aisha attended a casting call for an upcoming fashion week. The life of a model is a constant hustle, but for those with the passion and resilience, the rewards are immeasurable. It's a testament to the hard work that goes into making the magic happen.</p>
`,
    author: 'W. Chloe Admin',
    publishedAt: '2025-09-30T00:00:00Z',
    tags: ['Fashion', 'Modeling', 'Lifestyle'],
    featuredImage: 'blog-3-featured',
  },
];

export const messages: Message[] = [
  {
    id: 'msg001',
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Booking Inquiry for Patricia Wambui',
    message: 'We’d like to feature Patricia in our upcoming ad campaign for a new line of sustainable products. Please let us know her availability and rates.',
    createdAt: '2025-11-10T10:00:00Z',
    read: false,
  },
  {
    id: 'msg002',
    name: 'BrandCorp',
    email: 'contact@brandcorp.com',
    subject: 'Collaboration with David Ochieng',
    message: 'We are launching a new creative space in downtown Nairobi and would love for David Ochieng to create a mural. His style is a perfect fit for our brand. We would be honored to work with him.',
    createdAt: '2025-11-09T15:30:00Z',
    read: false,
  },
  {
    id: 'msg003',
    name: 'Fan Mail',
    email: 'fan@gmail.com',
    subject: 'Message for Aisha Khan',
    message: 'Aisha is such an inspiration! Her work and advocacy are changing the game. Thank you for representing such amazing talent.',
    createdAt: '2025-11-08T12:00:00Z',
    read: true,
  },
];
