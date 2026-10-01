// Every fact on this site comes from sundae.com (captured 2026-10-01) — see
// business-studio/clients/sundae/research/sundae-com/. Items Sundae must confirm are
// marked CONFIRM. The chatbot's knowledge base is generated from this file (kb.ts),
// so editing a fact here updates the site and the assistant together.

export const CONTACT = {
  sellerPhone: "1-800-214-4426",
  sellerTel: "tel:18002144426",
  investorPhone: "1-833-833-0042",
  investorTel: "tel:18338330042",
  email: "info@sundae.com",
  fundingEmail: "funding@sundae.com",
  marketplace: "https://marketplace.sundae.com/",
  liveOfferForm: "https://sundae.com/get-offer",
  introCall: "https://calendly.com/vwhite-sundae/connect",
  referral: "https://referral.sundae.com/",
  careers: "https://sundae.bamboohr.com/careers",
  reviewsIo: "https://www.reviews.io/company-reviews/store/sundae-com",
  bbb: "https://www.bbb.org/us/ca/san-francisco/profile/real-estate/sundae-inc-1116-895506",
  eventSite: "https://site-sundae-event.vercel.app",
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/SundaeHQ" },
    { name: "Instagram", href: "https://www.instagram.com/sundaehq/" },
    { name: "X", href: "https://twitter.com/SundaeHQ" },
    { name: "YouTube", href: "https://www.youtube.com/channel/UCcYk3-zCAMogCmTowaNqESg" },
  ],
};

export const RATING = { score: "4.85", count: 536, source: "Reviews.io" };

// CONFIRM: sundae.com says "up to $20,000" (home, LA page) and "up to $10,000" (seller FAQ).
export const CASH_ADVANCE_MAX = "$20,000";

export const STATS = [
  { value: 20000, suffix: "+", label: "property investors on the Sundae marketplace" },
  { value: 22, suffix: "+", label: "offers per listing, on average" },
  { value: 8000, suffix: "+", label: "sellers our team has helped get offers" },
  { value: 0, prefix: "$", label: "in fees paid to Sundae by sellers" },
];

export const PROMISE = [
  { title: "No hidden fees", img: "/media/ill/promise-fees.png", body: "No agent fees, commissions, or surprise costs so you can keep more money in your pocket." },
  { title: "Sell as-is", img: "/media/ill/promise-asis.png", body: "No clean up or repairs. No showings, open houses or uncertainty. You can sell as-is without listing your home on the market or doing any work." },
  { title: "Close with certainty", img: "/media/ill/promise-close.png", body: `We work on your timeline to complete the closing process and provide support with up to a ${CASH_ADVANCE_MAX} cash advance before closing.` },
];

export const STEPS = [
  { n: "01", title: "Tell us about your property", body: "Speak with a local Market Expert to find out if Sundae is a good fit for your property.", img: "/media/ill/house-thinking.png" },
  { n: "02", title: "Get a cash offer", body: "We’ll visit your property and make you a competitive cash offer on the spot!", img: "/media/ill/step-offer.png" },
  { n: "03", title: "Move at your pace", body: `Close as quickly as 10 days or as long as 60 — up to you! You may also be eligible for up to a ${CASH_ADVANCE_MAX.replace(",000", "K")} cash advance.`, img: "/media/ill/house-sold.png" },
];

// The marketplace process in detail (seller FAQ: "How does the selling process work?")
export const MARKETPLACE_STEPS = [
  { title: "Tell us about your property", body: "Fill out our form or speak with a Sundae local expert to find out if Sundae is a good fit for your property." },
  { title: "We’ll prepare your listing", body: "Let us do the work. We’ll prepare your listing for auction with photos, a 3D tour and order a home inspection as needed." },
  { title: "Review your offers within days", body: "Competition drives multiple offers and a fair price on our marketplace. We’ll present the highest offer to you." },
  { title: "Sell as-is and move at your pace", body: "Close in as little as 10 days or within 60 days. You may also be eligible for a cash advance." },
];

export const SITUATIONS = [
  { icon: "/media/icons/icon-tools.svg", label: "Property is dated or in need of repairs" },
  { icon: "/media/icons/retirement_icon.png", label: "Downsizing or relocation due to retirement" },
  { icon: "/media/icons/structural_issues_icon.png", label: "Structural issues, unpermitted work or condemned houses" },
  { icon: "/media/icons/icon-home.svg", label: "Inheriting a property you can’t keep" },
  { icon: "/media/icons/icon-wallet.svg", label: "Financial distress such as medical bills or foreclosure" },
  { icon: "/media/icons/icon-trolley.svg", label: "Sudden or unexpected life events" },
  { icon: "/media/icons/icon-warning.svg", label: "Vacant or problematic rental house" },
  { icon: "/media/icons/icon-dmg-house.svg", label: "Damage from natural disasters" },
];

export const DIFFERENCE = {
  sundae: [
    "Zero fees to Sundae to sell your home",
    "Highest off-market price",
    "Sell as-is — no cleanup, repairs, or showings",
    `You may be eligible for up to a ${CASH_ADVANCE_MAX} cash advance before closing`,
    "Close in just 10 days, or move at your pace, up to 60 days",
  ],
  traditional: [
    "6% of purchase price plus other fees",
    "Long sales timeline, often 2–3+ months",
    "Clean up and repair hassle",
    "Showings and open houses",
    "Price haggling and unpredictable offer",
  ],
  investor: [
    "Hidden fees at close",
    "Lower prices, zero transparency",
    "High-pressure sales tactics, often not trustworthy",
    "High risk they’ll back out, costing you time and money",
    "Small-scale local operators, not a trusted brand",
  ],
};

// sundae.com/sell/california/los-angeles comparison table
export const COMPARE_TABLE = {
  cols: ["Sundae", "Traditional MLS", "Single cash buyer"],
  rows: [
    ["Best for", "Properties that need repairs", "Properties that are move-in ready", "Properties that need repairs"],
    ["Time to sell", "10–60 days", "30–60 days", "Varies"],
    ["Sell as-is", "Yes", "Typically requires cleaning, repairs, staging, and showings", "Yes"],
    ["Fees", "None to Sundae", "Yes", "May have hidden fees at close"],
    ["Access / showings", "1-time access", "May have multiple open houses, inspections, appraisals", "Can require multiple inspections"],
    ["Contingencies", "None", "Varies", "Buyer may cancel at any time"],
    ["Cash advance", `Up to ${CASH_ADVANCE_MAX}`, "Varies", "Varies"],
  ],
};

export type Testimonial = { name: string; place: string; title: string; quote: string; img?: string };
export const TESTIMONIALS: Testimonial[] = [
  { name: "Royce & Lee B.", place: "San Bernardino, CA", img: "/media/people/royce-and-lee.jpg", title: "Took the burden of selling off us", quote: "One of the benefits of Sundae was that they took much of the burden of selling the house off of us. Sundae sold our house in under a month. We appreciated that Sundae represented our interest." },
  { name: "Roy & Blanche", place: "Bothell, WA", img: "/media/people/roy-and-blanche.jpg", title: "Thought of preparing to get the house ready was overwhelming", quote: "We’d been thinking about selling the house for quite some time but just the thought of preparing to get the house ready for sale was overwhelming. When Sundae proposed their as-is program, that made a lot of sense for us." },
  { name: "Margie W.", place: "Arlington, TX", img: "/media/people/margie.jpg", title: "There was a lot of stuff that needed to be done", quote: "My sister and I shared responsibilities in taking care of my mom. She had passed away so we didn’t want a whole, long drawn out situation. We already knew none of us had the money or the time to put into the house because there was a lot of stuff that needed to be done." },
  { name: "Andrew H.", place: "Inland Empire, CA", title: "My life has changed remarkably since selling with Sundae.", quote: "My life has changed remarkably since selling with Sundae. Not having the weight of the uncompleted home hanging over my head is really a game changer." },
  { name: "Shelley D.", place: "Oakland, CA", title: "I couldn’t recommend you enough!", quote: "I’ve recommended you to several people, two of whom are actually going to use Sundae to sell their homes, plus I already have a friend who is about to close. I couldn’t recommend you enough!" },
  { name: "Oscar S.", place: "Sacramento, CA", title: "I was somewhat baffled at how easy it was.", quote: "It was the smoothest transaction I’ve ever done, and I’ve done about 5 houses in my lifetime. I was somewhat baffled at how easy it was. I was waiting for more paperwork, but none ever came. Everything was extremely simple and easy." },
  { name: "Ferdinand S.", place: "San Diego, CA", img: "/media/people/ferdinand.jpg", title: "This company is legit.", quote: "This company is legit... the process was smooth, straightforward and painless. Sundae definitely treated me more than fair and I recommend them to anyone trying to sell their place with no renovations and showings!" },
  { name: "Stan M.", place: "Sacramento, CA", title: "Things turned out great.", quote: "Well, at first I didn’t believe it, but that’s the way it turned out. I had him explain that to me, because I thought ‘how could somebody bid on a property and not physically inspect it themselves before making an offer?’ but it worked out great… Three of the offers I received were, in my opinion, absurdly high. But, I went with one of them and things turned out great." },
  { name: "Camille S.", place: "San Diego, CA", title: "Was really cool to see a pool of buyers bid on my home.", quote: "I really liked that you guys put the house out to your network of investors. It was really cool to see a pool of buyers bid on my home, I thought that was amazing. Having the ability to see all of the offers from investors on your marketplace made this a truly unique selling experience for me." },
];

// Verbatim from reviews.io (store sundae-com). Includes the critical ones — never curated to 5★ only.
export const REVIEWS = [
  { stars: 5, name: "Sharon L.", date: "2023-05-11", text: "I can honestly say that I had a true \"5-star\" experience with Sundae. It was a difficult time for us, as both of our parents had died within the past 6 months and we were trying to sell their home. I knew I couldn't handle the renovations needed to sell on the open market, or the waiting and uncertainty that comes with a traditional sale. … From the first phone call, I knew there was something different, and something special, about Sundae. Rob took the time to answer all of my questions, and the entire process was easy and transparent. No surprises from Sundae. Everything went exactly as they said. … when comparing the final offer from the Sundae's set of bidders to that of that \"other TV company\"....my Sundae offer was over $100,000 MORE than that other companies offer." },
  { stars: 5, name: "Michelle R.", date: "2023-05-26", text: "Sundae was nothing short of a miracle for our family. My Dad was selling his home of 50+ years and I lived 1000 miles away. It was so overwhelming to think about downsizing, cleaning, repairs, all the logistics. Getting a cash offer, on an as-is basis, on our timeline was unbelievable. Our representative Tabor was professional, positive, and understood my Dad's concerns and helped him navigate the bidding process. I highly recommend Sundae for peace of mind and ease of process." },
  { stars: 5, name: "Richard P.", date: "2023-07-31", text: "I am completely satisfied with my experience with Sundae. Steve did an outstanding job explaining the process to me and was available every step of the way to answer any questions I had. I was very pleasantly surprised to receive considerably more than I was expecting from the sale of my house. The entire process ran very smoothly and I had no problems whatsoever." },
  { stars: 5, name: "Lois H.", date: "2023-07-04", text: "A friend saw Dr. PHIL talking about Sundae on his show and called me. I was so pleased with the response that I got to my research. TABOR Campbell was so easy to work with and explained every step so there were no hang ups, no surprises. I am so glad to recommend them to anyone wanting an easy process to sell their home." },
  { stars: 5, name: "Patricia S.", date: "2023-03-03", text: "As a real estate investor, I was very happy with the speed, professionalism, and lack red tape to get my property reviewed and up for offers. To have multiple offers within 48hrs of offering was fantastic. Thanks Clint!" },
  { stars: 5, name: "Kyle M.", date: "2023-04-12", text: "The process was very easy for what I was facing (a home that was NOT well maintained). I was pleased with the quickness of the process, the responsiveness of the entire Sundae team to all my questions, and the amount of the offer that they were able to secure for my father's home." },
  { stars: 5, name: "Rebecca M.", date: "2023-05-14", text: "So much thanks to Angela for a flawless sale of our home of 37 years. We couldn't be more happy with the entire process. We actually got a very good price due to the lack of closing costs." },
  { stars: 5, name: "John S.", date: "2023-01-30", text: "I liked that Sundae sent a home inspector and took pictures to post with the offers. Jarrett was working for me (I felt) not the buyer. It went fast! So very good." },
  { stars: 4, name: "Edward A.", date: "2023-09-13", text: "I'm pretty happy with how the sale of my home went with Sundae, they got me a fair price from a buyer quickly. Whitney Dewbrew was great and navigated me through this process like a pro, she was a godsend for me and was a tremendous help. Thanks Sundae!" },
  { stars: 5, name: "Kelly T.", date: "2023-03-17", text: "Tabor met me at one of my Rental Properties. I was not a good fit for the Sundae program but Tabor was gracious about discussing my options and gave me a good contact to solve a problem that didn't benefit him at all." },
  { stars: 3, name: "Anonymous", date: "2023-03-18", text: "The agent we worked with was good. We were very disappointed with the photos they were not accurate in replicating the value of our home. Make home look very small and cluttered like a trailer. Would have preferred use our own photos." },
  { stars: 5, name: "Raymond M.", date: "2023-03-11", text: "First class and transparent. It was very easy and stress free. Thanks Justin" },
];

export const STORIES = [
  { title: "From Tragedy to Triumph", body: "Sundae was able to help turn hard times into one that strengthened their family bond.", href: "https://sundae.com/customer-stories/from-tragedy-to-triumph/" },
  { title: "A Helping Hand at a Time of Need", body: "Read how Sundae helped these sisters sell the house they inherited in a stress-free fashion.", href: "https://sundae.com/customer-stories/a-helping-hand-at-a-time-of-need/" },
  { title: "Stress-Free Selling Made Simple", body: "See how Sundae turned the daunting task of selling a home into a stress-free process.", href: "https://sundae.com/customer-stories/stress-free-selling-made-simple/" },
  { title: "A Seamless Selling Experience", body: "Sundae customers sat down to speak with Dr. Phil about their experience selling as-is with Sundae.", href: "https://sundae.com/customer-stories/a-seamless-selling-experience/" },
  { title: "California Landlord Decides to Cash In", body: "Here's why one landlord decided to sell his rental property through Sundae.", href: "https://sundae.com/customer-stories/california-landlord-decides-to-cash-in/" },
  { title: "A Fresh Start After Selling", body: "See why Sundae stood out to this homeowner who was looking to sell her home so she could relocate.", href: "https://sundae.com/customer-stories/a-fresh-start-after-selling/" },
];

export const PRESS = [
  { name: "Yahoo", src: "/media/press/yahoo.svg" },
  { name: "Dr. Phil", src: "/media/press/drphil.svg" },
  { name: "CNN", src: "/media/press/cnn.svg" },
  { name: "Fox", src: "/media/press/fox.png" },
  { name: "Forbes", src: "/media/press/forbes.svg" },
  { name: "NBC", src: "/media/press/nbc.png" },
];

export type Market = { slug: string; name: string; state: string; blurb: string; img?: string; liveUrl: string };
export const MARKETS: Market[] = [
  { slug: "los-angeles", name: "Los Angeles", state: "California", img: "/media/loc/los-angeles.jpg", blurb: "We cover the L.A. metro area including nearby cities in Orange and Los Angeles Counties.", liveUrl: "https://sundae.com/sell/california/los-angeles/" },
  { slug: "orange-county", name: "Orange County", state: "California", img: "/media/loc/orange-county.png", blurb: "Sundae serves homeowners in Orange County, including the cities of Anaheim, Santa Ana, Huntington Beach, Irvine, and Mission Viejo.", liveUrl: "https://sundae.com/sell/california/orange-county/" },
  { slug: "inland-empire", name: "Inland Empire", state: "California", img: "/media/loc/inland-empire.jpg", blurb: "San Bernardino, Riverside, and Ontario and other cities in Riverside and San Bernardino Counties.", liveUrl: "https://sundae.com/sell/california/inland-empire/" },
  { slug: "san-diego", name: "San Diego", state: "California", img: "/media/loc/san-diego.jpg", blurb: "From Oceanside to the border, Sundae helps sell homes throughout the San Diego metro area.", liveUrl: "https://sundae.com/sell/california/san-diego/" },
  { slug: "sacramento", name: "Sacramento", state: "California", img: "/media/loc/sacramento.jpg", blurb: "We offer our services to the state’s capital city of Sacramento and the seven-county metro area.", liveUrl: "https://sundae.com/sell/california/sacramento/" },
  { slug: "oakland", name: "Oakland", state: "California", img: "/media/loc/oakland.jpg", blurb: "From Berkeley down to Fremont, we serve Oakland and the surrounding cities in the East Bay region.", liveUrl: "https://sundae.com/sell/california/oakland/" },
  { slug: "las-vegas", name: "Las Vegas", state: "Nevada", img: "/media/loc/las-vegas.jpg", blurb: "From North Las Vegas down to Henderson, we serve Las Vegas and the surrounding communities across the greater Las Vegas Valley.", liveUrl: "https://sundae.com/sell/nevada/las-vegas/" },
  { slug: "salt-lake-city", name: "Salt Lake City", state: "Utah", img: "/media/loc/salt-lake-city.jpg", blurb: "From Ogden down to Provo, we serve Salt Lake City and the surrounding cities along the Wasatch Front.", liveUrl: "https://sundae.com/sell/utah/salt-lake-city/" },
  { slug: "oklahoma-city", name: "Oklahoma City", state: "Oklahoma", img: "/media/loc/oklahoma-city.jpg", blurb: "From Edmond down to Norman, we serve Oklahoma City and the surrounding communities across the Oklahoma City metro area.", liveUrl: "https://sundae.com/sell/oklahoma/oklahoma-city/" },
  { slug: "tampa", name: "Tampa", state: "Florida", img: "/media/loc/tampa.jpg", blurb: "From Clearwater to Brandon, we serve Tampa and the surrounding communities across the Tampa area.", liveUrl: "https://sundae.com/sell/florida/tampa/" },
  { slug: "nashville", name: "Nashville", state: "Tennessee", blurb: "From Franklin up to Hendersonville, we serve Nashville and the surrounding communities across the Nashville metro area.", liveUrl: "https://sundae.com/sell/tennessee/nashville/" },
  { slug: "charleston", name: "Charleston", state: "South Carolina", img: "/media/loc/charleston.jpg", blurb: "From Mount Pleasant to Summerville, we serve Charleston and the surrounding communities across the Charleston metro area.", liveUrl: "https://sundae.com/sell/south-carolina/sell-my-house-fast-in-charleston-sc-sundae/" },
];

// Cities listed on sundae.com/sell/california/los-angeles (subset shown on the page; full list lives there).
export const LA_CITIES = ["Acton", "Agoura Hills", "Alhambra", "Altadena", "Arcadia", "Artesia", "Avalon", "Azusa", "Baldwin Park", "Bell Gardens", "Bellflower", "Beverly Hills", "Burbank", "Calabasas", "Canoga Park", "Canyon Country"];

export const LEADERS = [
  { name: "Josh Stech", role: "Co-Founder & CEO", img: "/media/team/josh-stech.jpg", bio: [
    "Josh Stech is CEO and Co-Founder of Sundae, a marketplace that connects home sellers directly with property investors. Josh started Sundae to help homeowners get a better outcome when selling off-market. With a career at the intersection of technology and residential real estate, he’s seen first hand the opportunity to create a new type of business that wins by doing the right thing for the seller.",
    "Prior to starting Sundae, Josh was Founding Partner and SVP of Sales at LendingHome, an online mortgage bank specializing in short-term residential bridge loans. During his five years at LendingHome, Josh helped the company outperform veteran business in LendingHome’s category as the company scaled to 350 employees and $150M in venture funding.",
    "Prior to LendingHome Josh was Co-Founder and CFO of Purpose Built Investments (PBI), a residential real estate private equity firm. Josh launched three investment funds for PBI focused on buying, renovating, and selling houses as well as bridge lending, executing more than 1,200 transactions.",
    "Josh graduated with honors from Stanford with a BA in Economics, BA in Spanish, and an MA in Latin American Studies with a focus in Economic Policy. He wrote his honors thesis on the long-term impact of the subprime lending crisis on the Latino community. Josh lives in San Diego with his wife, three children, and their two dogs.",
  ] },
  { name: "Andrew Swain", role: "Co-Founder", img: "/media/team/andrew-swain.jpg", bio: [
    "Andrew is an experienced executive with expertise in finance and marketplaces. Prior to founding Sundae, Andrew was CFO at LendingHome, the category-leading online mortgage bank specializing in short-term residential bridge loans. Prior to LendingHome, Andrew served as CFO at Airbnb, helping the vacation rental marketplace scale during a period of hypergrowth.",
    "Previously, Andrew held a series of roles at Intuit, including VP of Finance for the Intuit Consumer Division and General Manager of the company’s prepaid debit card business, after also leading Intuit’s Corporate Strategy and Development Group. Before joining Intuit, Andrew was a Principal at The Boston Consulting Group, where he specialized in Corporate Strategy and Operations. He holds an MBA from Harvard Business School.",
  ] },
  { name: "Victoria White", role: "Vice President, Membership", img: "/media/team/victoria-white.png", bio: [
    "Victoria is the Vice President of Membership at Sundae, where she leads the company’s sales strategy and drives revenue growth in one of the most competitive real estate landscapes. Her expertise spans sales leadership, team development, and operational efficiency, enabling her to build and scale high-performing teams while optimizing customer satisfaction and retention.",
    "Prior to joining Sundae, Victoria built and led an award-winning team at Redfin, where her team completed 480 transactions and generated $280 million in sales volume within the first 12 months. Before that, she spent over a decade in sales leadership, specializing in real estate, retail, and marketplace growth.",
  ] },
  { name: "Chad Crammer", role: "Senior Vice President, Marketing", img: "/media/team/chad-crammer.jpg", bio: [
    "Chad leads marketing at Sundae, where he oversees the company’s acquisition strategy, brand, creative, lifecycle marketing, and growth operations. He brings more than 20 years of experience building and scaling performance marketing programs across financial services, real estate, and direct-to-consumer businesses.",
    "Prior to joining Sundae, Chad served as Vice President of Acquisition, Creative, and Content at Finance of America and American Advisors Group (AAG). Earlier, he spent more than a decade at Havas Edge, leading integrated acquisition and media strategy for brands including DraftKings, Vistaprint, Tripadvisor, St. Jude Children’s Research Hospital, American Home Shield, and Aetna.",
  ] },
  { name: "Sarah Sanders", role: "Controller / Director of Finance", img: "/media/team/sarah-sanders.jpg", bio: [
    "Sarah serves as Director of Finance at Sundae, where she oversees the company’s accounting operations, financial reporting, close processes, and internal controls. Since joining Sundae in 2023, she has held several accounting leadership roles before being promoted to Director of Finance.",
    "Prior to Sundae, she spent nearly five years at Vacasa, where she managed revenue accounting, lease accounting, and financial reporting during a period of significant growth, including the company’s transition to the public markets.",
  ] },
  { name: "Sam Johnson", role: "Director of Revenue Operations", img: "/media/team/sam-johnson.jpg", bio: [
    "Sam is the Director of Revenue Operations at Sundae, where he oversees the company’s revenue systems infrastructure, operations, and internal technology stack — the systems that power lead flow, customer engagement, reporting, telephony, CRM administration, and cross-functional business operations.",
    "Before joining Sundae in 2025, Sam managed installations of electronic health record technology at Epic Systems and later ran live medical broadcast technology with Alta. He holds a BS in Neuroscience from Lafayette College and an MBA from the Rady School of Management at UC San Diego.",
  ] },
];

export const VALUES = [
  { title: "One team", body: "Winning together. Recognizing that diverse teams create the best results and the most fun." },
  { title: "Relentlessly customer focused", body: "Obsessed with understanding and solving the problems sellers of distressed property face." },
  { title: "Empathetic in all we do", body: "We care passionately about helping people at their moment of need, and helping each other be better. We believe profit comes from doing the right thing." },
  { title: "In pursuit of the truth", body: "We push beyond symptoms to understand root causes. We balance quantitative metrics and qualitative feedback and always face our reality head-on." },
  { title: "Transparent", body: "Honest with each other and customers. We deliver on our promises." },
  { title: "Innovative", body: "Building simple, elegant solutions that allow us to help the most number of customers possible." },
  { title: "Decisive", body: "Willing to make decisions in the face of limited information. Not afraid to be wrong." },
];

export const STORY = [
  { title: "We started Sundae to help sellers get a fair price for their house, as-is.", body: "For far too long, homeowners without the time or resources to get a house market-ready have been taken advantage of when it comes time to sell if the house needs some love. We think this isn’t fair and we started Sundae to change this.", img: "/media/ill/house-heart.png" },
  { title: "Selling with an agent is time-consuming and costly.", body: "Getting a house ready to sell with a real estate agent can take a lot of time and money for repairs, improvements, and cleaning-up. Even after these investments, selling with an agent requires time and patience. You have to keep your home clean and available for showings with no certainty of when your house might sell and for how much.", img: "/media/ill/house-thinking.png" },
  { title: "Selling off-market lets you skip the hassle so you can move on quickly.", body: "If you don’t have the time or resources to get a house market-ready, an alternative to the traditional sales process is to sell your house “off-market.” Off-market buyers will purchase the home as-is so you don’t have to do any work, repairs, or showings.", img: "/media/ill/two-boxes.png" },
  { title: "Predatory property investors have given off-market buyers a bad name.", body: "Many off-market buyers prey on sellers who are dealing with difficult situations like job loss, divorce or a death in the family. They find homeowners who need to sell quickly and then take advantage of their situation. The buyer’s goal is to offer the lowest possible price because every dollar they don’t give to the seller goes into their pocket.", img: "/media/ill/house-shark.png" },
  { title: "Sundae provides a new way to sell off-market.", body: "Sundae is the only marketplace connecting home sellers with a large network of local investors, ensuring that homeowners get the highest possible off-market price for their home. The Sundae marketplace creates competition among investors bidding on your home, thereby ensuring that you receive the highest offer an investor is willing to pay.", img: "/media/ill/handshake.png" },
];

export const MEMBERSHIP = {
  headline: "Stop building. Start scaling.",
  sub: "Add a zero to your real estate business.",
  intro: "Led by Co-founder & CEO Josh Stech, Sundae Membership helps experienced real estate operators leverage a proven system purpose-built for acquisition, conversion, and maximizing profit.",
  market: { title: "The market has changed. The opportunity has not.", body: "Finding profitable deals is harder. Margins are tighter. Scale with systems already built, tested, and refined in real markets." },
  engine: [
    { title: "Generate more leads", body: "Build a stronger acquisition engine with proven marketing, smarter targeting, and data-driven optimization.", img: "/media/membership-leads.png" },
    { title: "Close more deals", body: "Convert more opportunities through faster response, automated follow-up, and proven sales workflows.", img: "/media/membership-close.png" },
    { title: "Maximize profit", body: "Create more value from every opportunity with buyer reach, capital solutions, and shared operating expertise.", img: "/media/membership-marketplace.png" },
  ],
  youBring: ["Local expertise", "Relationships", "Leadership", "Execution"],
  sundaeBrings: ["Marketing", "Technology", "Automation", "Capital", "Buyer reach"],
  together: ["More deals", "Better conversion", "Higher profit", "Less complexity"],
  fit: [
    "Proven real estate operating experience",
    "Ready to scale without building every system yourself",
    "Focused on long-term business growth",
    "Committed to continuous improvement",
    "Value collaboration and shared learning",
    "Capacity to convert new opportunities into profitable deals",
  ],
  steps: [
    { title: "Start with a conversation", body: "Tell us about your business, market, operating history, and growth goals." },
    { title: "Confirm mutual fit", body: "We'll evaluate qualifications, territory availability, and where Sundae can create the most leverage." },
    { title: "Build your growth plan", body: "Align on the systems, support, and priorities that will help you acquire, convert, and maximize more effectively." },
  ],
  why: [
    { title: "$100M+ in marketing investment", body: "Reaching homeowners since 2018" },
    { title: "National brand", body: "Built to earn homeowner trust" },
    { title: "End-to-end technology", body: "Purpose-built systems from lead to transaction" },
    { title: "Capital + buyer reach", body: "More ways to maximize every opportunity" },
    { title: "Operator community", body: "Shared expertise and ongoing optimization" },
  ],
};

export const EVENT = {
  title: "Private Dinner & Dialogue with Josh Stech",
  when: "Thursday, October 8, 2026 · 6:00 PM",
  where: "The Courtyard at Shade Hotel, Manhattan Beach",
  address: "1221 N Valley Dr, Manhattan Beach, CA 90266",
  body: "Join Sundae Co-Founder & CEO Josh Stech and fellow Los Angeles real estate operators for dinner and a conversation about market trends, where the industry is heading, and how to build a stronger acquisition business in a harder market. Food and drinks are served. Seats are limited.",
  past: "Previous edition: Sacramento investors dinner at Echo & Rig, September 2026.",
};

export type QA = { q: string; a: string };
export const SELLER_FAQ: { group: string; items: QA[] }[] = [
  { group: "Getting started", items: [
    { q: "What is Sundae?", a: "Sundae buys homes in all conditions to help homeowners move forward faster and avoid the hassles of the traditional selling process. That means no repairs, no showings, and no agent fees so you can keep more money in your pocket. From offer to closing, our team guides you through a simple, transparent process designed to make selling your home easier." },
    { q: "What makes Sundae different?", a: "Our goal is to make the process of selling a house in any condition easy and worry-free through a fair marketplace. With Sundae you get the latest technology to produce a detailed property profile of your house (photo gallery, 3D tour, video walkthrough and floorplan); hundreds of investors viewing your property without showings; and a team of experts with 35+ years of local experience who have helped over 8,000 sellers get offers on their property." },
    { q: "Is Sundae an iBuyer?", a: "No. Unlike iBuyers, we specialize in properties that need repairs and advertise them to hundreds of investors so that you get competitive offers vs one offer. Many of our customers come to us after being rejected by an iBuyer because their property requires too much work. Most iBuyers provide an offer before seeing the house, which means the net offer almost always changes later on. Sundae won't give you an offer until our local Market Expert has viewed the house and we have a list of final offers from our investors." },
    { q: "Does Sundae charge any fees to sellers?", a: "You pay zero fees and no closing costs to Sundae when you sell your house on our marketplace. A seller may be responsible for other fees such as HOA fees or paying off the remainder of their mortgage." },
    { q: "How do I know I'm getting the highest possible price for my house?", a: "We prepare your listing with all the important information an investor needs to make the best offer and advertise it to hundreds of property investors. These investors then participate in the auction and place offers on your house. The competitive auction process gives you confidence that you got the highest and best offer from every investor." },
    { q: "How does Sundae make money without charging any seller fees?", a: "Sundae makes money primarily through transaction-based buyer premiums, paid subscription services for property investors, and additional services we offer to our property investors (such as title, escrow, and brokerage services)." },
    { q: "How would you define a house that needs updates or repairs?", a: "Typically: houses that haven’t been remodeled in 10 or more years; houses that require substantial repairs to the structure or major systems (roof, plumbing, electrical or foundation) that aren’t fully functional; and houses that contain materials that are not up to code or have been proven to be unhealthy. These repairs may typically cost anywhere between $20,000 – $60,000 or more, depending on the condition and location." },
  ] },
  { group: "Selling", items: [
    { q: "What terms do your offers come with?", a: "Offers in our marketplace are non-contingent cash offers in as-is condition. When we say as-is, it really means as-is. No cleanings, repairs, or updates required. The offer is the final amount you will get, minus any mortgage and other liens you may owe on it. You don’t pay any fees or commissions to Sundae." },
    { q: "Do investors generally pay cash on your marketplace?", a: "Some of our investors pay with all-cash, while some finance their purchase. However, the financing that investors opt in for is not a traditional mortgage, and the funds are available much faster. You can close in as little as 10 days once the offer has been accepted and signed by both parties." },
    { q: "What is in the Property Profile Sundae prepares?", a: "We typically take high quality photos, order a home inspection, a preliminary title report, a 3D tour, and a floor plan, all of which are included in your Property Profile, plus the standard real estate disclosures each seller completes before going live on the marketplace. We’ll send you a copy you can download." },
    { q: "Does Sundae have to visit the property to make an offer?", a: "Yes, we need to visit the property once to take photos, make a 3D video tour, and create a home inspection report so that we can prepare your listing and start getting offers." },
  ] },
  { group: "Offers", items: [
    { q: "How long does it take to get an offer?", a: "We provide offers four business days after a home inspection takes place and we receive your completed seller disclosures. During those four business days, property investors on our marketplace place offers on your house. We bring your highest non-contingent cash offers to you and you select the final offer." },
    { q: "How long do I have to consider offers?", a: "Offers are valid for three business days and then must be accepted or rejected." },
    { q: "How does Sundae estimate the range where my offers will fall?", a: "Your local Market Expert models an after-repair value for your property, then factors in the costs an investor would incur like a construction budget, holding costs, and resale costs, and reviews offers on other properties on our marketplace. Investors ultimately dictate their own offer price, which could be below or above the range we predict." },
    { q: "What happens if I don’t receive any offers?", a: "On average, our sellers receive 22+ offers when they list on our marketplace. If your house does not receive any offers, we will keep the property active on our marketplace as long as you are comfortable, to reach more potential buyers." },
  ] },
  { group: "Closing", items: [
    { q: "How does closing work when you sell through Sundae?", a: "Sundae assigns you a dedicated Closing Manager who talks you through the steps and works with you to resolve any issues. In most cases, all you’ll need to do is sign some paperwork. We take care of the details with escrow, title and the investor purchasing your property." },
    { q: "How fast can you close?", a: "We can close in as little as 10 days or up to 60 days." },
    { q: "Can I live in the house after I sell it?", a: "You can live in the house for up to 30 days after you close at no additional cost. To ensure you leave the property at the agreed date, some of your proceeds are released after this is confirmed. Tell your Market Expert about your situation in advance so investors know before they make a non-contingent offer." },
    { q: "Do I have to clean out the property?", a: "No. Our investors buy the property in as-is condition, which means no cleanings or repairs are required. You are allowed to leave as much personal property as you want and will not be responsible for any expenses." },
  ] },
  { group: "Marketplace", items: [
    { q: "How many investors are on the Sundae marketplace?", a: "We have over 20,000 property investors across the United States." },
    { q: "How is Sundae’s marketplace different from the MLS?", a: "The MLS is best for selling a property in market-ready condition. Sundae is best for houses that need repairs and need to be sold as-is without showings, repairs, cleanings, talking to multiple buyers, and paying agent commissions. Sundae's marketplace creates investor competition through an auction process." },
    { q: "Will investors have my contact information?", a: "No. We will not share any of your contact information with the investors on our marketplace. We bring all the offers directly to you. If an investor contacts you directly, let your local Market Expert know — we want to protect you from low-ball offers and bait-and-switch tactics." },
    { q: "Do I have to agree to an investor showing?", a: "No, Sundae is the only point of contact that will step foot on your property. Some sellers decide to hold a brief one-time investor showing to drive up offers — that’s a decision you and your Market Expert make together." },
    { q: "I’ve already received an off-market offer from an investor. What do you recommend?", a: "Refer them to Sundae’s marketplace! This puts them in competition with hundreds of other investors, which is a good strategy for driving up offers." },
  ] },
];

export const INVESTOR_FAQ: { group: string; items: QA[] }[] = [
  { group: "Getting started", items: [
    { q: "How do I join Sundae?", a: "We offer a self-service sign-up at marketplace.sundae.com." },
    { q: "How do you source your properties?", a: "Sundae engages in extensive direct advertising to homeowners who are motivated to sell in as-is condition — TV commercials, radio spots, search engine marketing, and direct mail campaigns, to name a few. We do the work of finding sellers and securing purchase contracts so you don’t have to." },
    { q: "What types of properties are available?", a: "Most investment opportunities are single-family homes, but we often have other residential property types such as condos, townhomes, and multi-family up to four-plexes." },
  ] },
  { group: "Placing an offer", items: [
    { q: "How are offers placed?", a: "We accept offers over two rounds. In the first round, buyers can place as many offers as they want leading up to the deadline. The top 3 offers are invited to participate in round two. Round two is highest and best: only one offer can be placed and the offer position is blind." },
    { q: "Besides price, what are the other terms?", a: "All offers are made without contingencies, so complete your due diligence before placing your offer. Each opportunity lists key terms like closing date, seller rent back, HOA dues, solar panels, and whether in-person showings are available." },
    { q: "How does Asking Price work?", a: "Asking price is our tool to give you certainty in a transaction. If you are the top offer at or above asking, you win. Period. Offers below asking are welcome — there is just no guarantee you’ll transact below asking." },
    { q: "Can I revoke or change my offer?", a: "Lowering or rescinding offers is not allowed — it threatens the integrity of the process and is unfair to investors using AutoOffer. Failure to perform on offers placed through the marketplace results in account deactivation. Offers can be increased any time before the round-one deadline." },
    { q: "Can I see other investors’ offers?", a: "No. In round one you always know whether you are in the top three. In round two, only one highest-and-best offer is placed and the offer position is blind. There is no counter-offer process." },
  ] },
  { group: "Financing", items: [
    { q: "Can I use a conventional loan?", a: "Most marketplace properties close in under 30 days and don’t allow access to third-party vendors like appraisers, which makes conventional mortgages impossible for most lenders. If your lender can accommodate the stated terms, talk to your Investor Advisor." },
    { q: "Does Sundae provide financing?", a: "Yes. Sundae’s lending service offers investors low, competitive rates and a quick pre-approval, underwriting, and funding process — also available for properties sourced outside the marketplace. Reach out to your Investor Advisor or funding@sundae.com. Loans are for business purposes only and subject to underwriting." },
  ] },
  { group: "Fees & closing", items: [
    { q: "What fees am I responsible for when I buy on Sundae’s marketplace?", a: "All fees are disclosed in the portal when placing an offer. The winning buyer is responsible for all closing costs, including buyer and seller escrow fees and a third-party home inspection report ordered by Sundae. Sundae charges a $1,000 Admin Fee, and a $250/day fee for late closings (if the delay is at your request)." },
    { q: "Is an Earnest Money Deposit required?", a: "Yes. Accepted offers require an EMD that is credited toward the purchase, shown on the offer confirmation screen and deposited with escrow or title. It is due within 24 hours of your offer being accepted. If the sale falls through for reasons beyond the buyer's control the EMD may be returned; if the buyer defaults it may be forfeited to the seller." },
  ] },
];

export const CASH_ADVANCE_STEPS = [
  "After you sign the Purchase Agreement, your Closing Manager sends it to the Escrow Company within one business day and lets you know when escrow is open.",
  "Once escrow is open, the Escrow Company requests the buyer’s Earnest Money Deposit and sends the Escrow Instructions to you and the buyer to sign.",
  "Once the Preliminary Title Report items are reviewed (no action needed on your part), the Title Company confirms whether the sale is ‘clear to close’ and whether there are sufficient seller proceeds to cover the Cash Advance.",
  "If all checks out, the Escrow Company sends an Estimated Closing Statement for you to review electronically, or a hard copy can be delivered to your home.",
  "Congrats! Once escrow receives the final paperwork, you are eligible to receive your Cash Advance.",
];

export const PARTNERS = [
  { name: "Caring Transitions", img: "/media/partners/caring-transitions.png", href: "https://www.caringtransitionsswlv.com/", area: "Southwest Las Vegas", body: "A total solution for senior relocation, downsizing, and liquidation needs — a customized plan that manages all the stressful aspects of a transition." },
  { name: "Clear Home Solutions", img: "/media/partners/clear-home-solutions.jpg", href: "https://www.clearhomesolutions.com/", area: "Los Angeles, Ventura, Santa Barbara and Northern Orange Counties (CA)", body: "Experts who project-manage your move — downsizing, packing, movers, unpacking, selling and donating items. Sundae takes care of your home; Clear Home Solutions takes care of everything in it." },
  { name: "Sunshine Retirement Living", img: "/media/partners/sunshine-retirement.png", href: "https://www.sunshineretirementliving.com", area: "Communities across 16 states including California and Texas", body: "Retirement communities with a family-oriented, people-centered mindset: independent living, assisted living, memory care, and respite care." },
];

export const SCAM_GUIDES = [
  { title: "What Is Real Estate Wholesaling?", body: "This sales tactic typically gives the seller far less than market value of their home.", href: "https://sundae.com/blog/real-estate/what-is-real-estate-wholesaling/" },
  { title: "How to Avoid ‘We Buy Houses’ Scams", body: "Understand how off-market buyers work and learn to spot red flags.", href: "https://sundae.com/blog/sell/how-to-avoid-we-buy-houses-scams/" },
  { title: "Watch Out for This Tactic Used by Predatory Home Buyers", body: "Not all offers you get will represent the final amount you’ll see in your bank account.", href: "https://sundae.com/blog/sell/watch-out-for-this-tactic-used-by-predatory-home-buyers/" },
  { title: "How to Spot and Avoid Real Estate Scams", body: "The top schemes and shady behaviors scammers use.", href: "https://sundae.com/blog/sell/how-to-spot-and-avoid-real-estate-scams/" },
  { title: "What Is a Fair Offer Price When Selling a Home?", body: "How to judge a fair offer when selling in as-is condition.", href: "https://sundae.com/blog/sell/what-is-a-fair-offer-price-when-selling-a-home/" },
  { title: "Selling My House As-Is: A Complete Guide", body: "Avoid the hassle of getting the house market-ready by selling as-is.", href: "https://sundae.com/blog/sell/selling-a-house-as-is/" },
];

export const DRPHIL = {
  quote1: "Sundae’s mission and mine, to help people, are a natural fit. Sundae is focused on removing the guesswork from what can be the most stressful part of selling: getting the best outcome.",
  quote2: "Sundae’s model is unique. It protects you, the seller, from predators and pressure. It empowers you and puts you in control when those are traits that might seem unattainable.",
  checklist: "https://sundae.com/wp-content/uploads/2022/05/COL_22-04-28-How-to-Avoid-Scams-Checklist.pdf",
  disclosure: "Dr. Phillip C. McGraw is a paid spokesperson for Sundae and made this content in partnership with the company.",
};

export const LEGAL = {
  dre: "Sundae Funding, Inc. dba Sundae · CA DRE #02088298 · Broker of record Marc Geredes, #954840",
  cfl: "Sundae Funding, Inc. is a licensed finance lender with the California Department of Financial Protection and Innovation, CFL #60DBO-122336. Loans made or arranged pursuant to a California Financing Law license. Business-purpose loans only, in CA, CO, GA, FL, TN, TX and WA.",
  fees: "Typical seller fees do not include payoff of loans, prorated/property taxes, HOA charges, or payoff of other secured liens against property. At Sundae, although sellers typically pay no commission fees, we do receive a commission from the buyer which is deducted from the gross offer. The information shown is solely an estimate based on data currently available to Sundae and not, in any way, a promise of an actual offer to be received from Sundae's marketplace.",
  homelove: "Sundae, Inc. and/or the HomeLove Companies (including Home Love 3 LP) may act as principals buying and selling real property for investment purposes, may present offers to sellers whether or not a property is listed on the Sundae Marketplace, and may repair, rehab and resell properties for a potential profit.",
  noAdvice: "Sundae Companies do not provide legal, tax, or investment advice.",
};
