// Customer testimonials, shared by the homepage carousel and the /reviews page.
// The first eight are the ones shown on heymarket.com (same order).
// url: where the review was published (HubSpot Marketplace or Salesforce AppExchange), as
// linked from heymarket.com. A. Farnsworth has no source link on heymarket.com.
// source: where the review came from; drives the logo on each /reviews card.
export type ReviewSource = "hubspot" | "salesforce" | "heymarket";
export type Testimonial = { title: string; body: string; author: string; role: string; source: ReviewSource; url?: string };

export const siteTestimonials: Testimonial[] = [
  {
    title: "Couldn't recommend highly enough",
    body: "Heymarket has been a game-changer for our business and is so much easier to use than other texting platforms we've tried. The Salesforce integration is very easy to use. Heymarket's integration and automation has allowed us to do things we didn't even know were possible.",
    author: "A. Farnsworth",
    source: "heymarket",
    role: ""
  },
  {
    title: "Heymarket is THE business messaging solution",
    body: "We are able to get clients answers in an expedited manner, increasing our customer experience as a whole. Highly recommend over other business messaging applications that integrate with HubSpot.",
    author: "A. Ravenelle",
    source: "hubspot",
    role: "",
    url: "https://ecosystem.hubspot.com/marketplace/apps/heymarket/reviews"
  },
  {
    title: "Amazing software and even better client support",
    body: "Huge fan of Heymarket and the entire integration with Salesforce. The software itself is great but attaching it to salesforce with the ease and professional client relationship, it's a tool we will continue to use and grow with.",
    author: "S. Taver",
    source: "salesforce",
    role: "",
    url: "https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000FMaZuUAL&tab=r&revId=a6H3u000000gHP8EAM"
  },
  {
    title: "Best SMS tool on the market",
    body: "Heymarket has been a fantastic tool for our business. It's like having a team wide email inbox for managing SMS comms with users and customers. Today we are successfully managing our entire SMS channel through Heymarket!",
    author: "M. Heard",
    source: "hubspot",
    role: "",
    url: "https://ecosystem.hubspot.com/marketplace/apps/heymarket/reviews"
  },
  {
    title: "Great automation and support!",
    body: "Heymarket’s HubSpot integration works really well and allows us to automate a lot of things for our sales team (and sales teams always need easy and automated things, right?). Plus, the technical support is awesome!",
    author: "A. DiSalvo",
    source: "hubspot",
    role: "",
    url: "https://ecosystem.hubspot.com/marketplace/apps/heymarket/reviews"
  },
  {
    title: "Best SMS integration",
    body: "Heymarket allowed us to integrate with various platforms (Apple Messaging, SMS, Facebook and Slack) and bring all of that communications into HubSpot. It allows us to have two way communication and storing all of the communication in a single place.",
    author: "S. Pinnaka",
    source: "hubspot",
    role: "Technology",
    url: "https://ecosystem.hubspot.com/marketplace/apps/heymarket/reviews"
  },
  {
    title: "Great customer service and easy to use",
    body: "This app was very easy to set up with clear instructions and our users are pleased with their visibility into messaging and the speed. Customer service was excellent and very responsive to questions during and after setup.",
    author: "L. Finkelstein",
    source: "salesforce",
    role: "",
    url: "https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000FMaZuUAL&tab=r&revId=a6HHu000000WfLlMAK"
  },
  {
    title: "Amazing support and features",
    body: "I had a fantastic experience with Heymarket from start to finish. The team at Heymarket is simply outstanding and always ready to assist. Their service is top-notch, and I wholeheartedly recommend it to anyone in need of an SMS integration solution.",
    author: "T. Clarkson",
    source: "hubspot",
    role: "Healthcare",
    url: "https://ecosystem.hubspot.com/marketplace/apps/heymarket/reviews"
  }
];
