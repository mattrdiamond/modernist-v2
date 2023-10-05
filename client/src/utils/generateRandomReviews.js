import { v4 as uuidv4 } from "uuid";
const goodReviews = [
  {
    reviewId: 1,
    name: "Mia",
    headline: `A Versatile Must-Have`,
    reviewText: `This {category} is simply exceptional. Its versatile design seamlessly complements my home decor, making it a must-have for any room. The attention to detail in its construction is evident, and it exudes both quality and style. It feels incredibly durable, and its timeless appeal adds a touch of sophistication to any space. My living area has been transformed, thanks to this {category}. If you're searching for a versatile piece that blends seamlessly with your style, look no further. {product} is a game-changer!`,
  },
  {
    reviewId: 2,
    name: "George",
    headline: `My favorite {category}`,
    reviewText: `The {product} is an absolute must-have! It effortlessly enhances any space with its unique charm. The quality is truly impressive, and I'm sure it will last for years to come. Whether you're looking to furnish a room, brighten it up, or add a stylish touch, this {category} can do it all. Don't miss out on this exceptional find!`,
  },
  {
    reviewId: 3,
    name: "Paul",
    headline: `Game Changer!`,
    reviewText: `The {product} has remarkable design and functionality that make it a standout addition to any room. It's become the focal point of my home, and I can't get enough of it. If you're searching for a game-changing addition that elevates your space, look no further.`,
  },
  {
    reviewId: 4,
    name: "Don",
    headline: `A touch of class`,
    reviewText: `This {category} is pure class! It effortlessly elevates any room with its exquisite design. I couldn't be more pleased. If you're in search of a game-changing {category} for your space, {product} is the ultimate choice!`,
  },
  {
    reviewId: 5,
    name: "Wendy",
    headline: `Modern elegance`,
    reviewText: `I love this {category}! It's the epitome of modern elegance and sleek minimalism. It effortlessly brings a contemporary and fashionable flair to any space. Not only does its design captivate, but the speedy delivery and exceptional customer service exceeded my expectations. Modernist is my go-to for amazing modern designs!`,
  },
  {
    reviewId: 6,
    name: "Janine",
    headline: `Perfect for my living room!`,
    reviewText: `Wow! I love this {category}. It completes my room's design perfectly. Solid modern pick! Don't miss out on this remarkable {category}!`,
  },
  {
    reviewId: 7,
    name: "Kevin",
    headline: `Still loving this {category}`,
    reviewText: `We purchased the {product} almost 2 years ago and loved it at first sight. Not only aesthetically beautiful it is functional as well. All sides of this {category} are very attractive. My only negative is that the materials could be better quality. That would not discourage me from buying this {category}. Also, they may have improved this since our purchase.`,
  },
  {
    reviewId: 8,
    name: "Shaydee",
    headline: `The perfect {category} for my space`,
    reviewText: `This is a gorgeous, sturdy, well made {category} that I get tons of compliments on! We purchased this {category} to go in a small space in our home. We wanted something well made, on the smaller side, and not too much design, yet unique. When it arrived we were so glad it hit all the criteria. We have had it for 6 months and it still looks brand new.`,
  },
  {
    reviewId: 9,
    name: "Jessy",
    headline: `Love!`,
    reviewText: `I've been looking for a {category} like this for a long time! The craftsmanship is amazing, it's super sturdy and I get tons of complements on it. It's surprisingly light. Super stylish in our modern space. Beyond happy with my purchase!`,
  },
  {
    reviewId: 10,
    name: "MissMoira",
    headline: `Worth the Wait`,
    reviewText: `I purchased two of these for my living room. While it took awhile to receive them due to shipping delays I'm glad I didn't cancel the order. The {category} is beautiful and casual and great quality. I'm thinking about ording one for my rental space. Highly recommend the {product}!`,
  },
  {
    reviewId: 11,
    name: "Lollie",
    headline: `Beautiful {category} suitable for many vibes!`,
    reviewText: `I moved into a new apartment and needed some additional things to make it look cozy. I purchased this {category} for a bonus space. It has a elegant vibe but is also very chic. I can see this {category} in homes with anything from modern and clean decor to eclectic and maximalist. This is definitely a piece you will want to take with you wherever you go for many, many years.`,
  },
  {
    reviewId: 12,
    name: "Elizabeth",
    headline: `Perfect little {category}!`,
    reviewText: `I bought this {category} in late summer and had to wait until late December to get it but it is exactly what I was looking for. These are the perfect fit for our space. We have a cat (that loves to scratch everything) and a toddler so we were very excited when we found the {product} is durable, cute, and easy to clean! So happy I found this. Thanks Modernist!`,
  },
  {
    reviewId: 13,
    name: "MissFire",
    headline: `Amazing {category}`,
    reviewText: `This {category} is awesome... the design really pops in any type of decor and looks amazing, everybody fights over calling dibbs on it... its just that good!! if you feel its too rustic for your style you have no idea what your missing out on... i have it paired with modern furniture and really makes the contrast that every room needs.... the quality is great considering the price point... for a good reason its always out of stock and on backorder... i wish i had bought 2`,
  },
  {
    reviewId: 14,
    name: "rsj1994",
    headline: `Stylish, chic {category}`,
    reviewText: `I bought the {product} last Summer and have been loving it ever since. Everyone that sees this {category}, loves it. I was initially concerned about the quality because the price was so great, but it ended up being really well made. Hands down one of my favorite purchases. I hope to get another one for when I have a larger living space!`,
  },
  {
    reviewId: 15,
    name: "Shopjackieo",
    headline: `Great Buy!`,
    reviewText: `I have to be honest that I was on the fence with this purchase because I worried that it was going to be too big. The {product} is awesome and I could not have been more wrong! A friend recommended it to me, and I immediately loved it. Don't hesitate!`,
  },
  {
    reviewId: 16,
    name: "loveandlilly",
    headline: `LOVE!`,
    reviewText: `This {category} is a dream! Stylish, modern, and always gets compliments. I was on the fence, but finally pulled the plug and bought two for my new home and am so happy I did. Great quality - can't recommend them enough.`,
  },
  {
    reviewId: 17,
    name: "katienathan",
    headline: `My favorite {category}`,
    reviewText: `I bought this a few months ago to add some more style to my space, and boy am I happy. The modern upgrade on this {category} makes it easy to match with a variety of styles and it is so fashionable and sleek! Very happy.`,
  },
  {
    reviewId: 18,
    name: "Annelise",
    headline: `Super cool {category}`,
    reviewText: `Love how cute this {category} looks and yet is it super functional as well. It's a perfect upgrade to any room. Highly recommend it!`,
  },
  {
    reviewId: 19,
    name: "Alice",
    headline: `Such a deal!`,
    reviewText: `I bought the {product} over a year ago and it is beautiful to look at front, side and back views! The design is modern and timeless... and people ask about it all the time. Such a great purchase that we bought another one!`,
  },
  {
    reviewId: 20,
    name: "Sylvia",
    headline: `Really unique`,
    reviewText: `I bought the {product} a week ago and it’s a really unique {category}. It’s very modern and adds interest and warmth to the room. It’s very versatile and can be used in a traditional, beachy, or boho setting. Love it!`,
  },
  {
    reviewId: 21,
    name: "Salma",
    headline: `Stylish {category} at an affordable price`,
    reviewText: `I purchased this {category} a month ago, and it’s a stylish, and nicely sized for a very affordable price. It also looks great. Our neighbors saw it delivered and rushed over to ask where we bought it. I definitely recommend this {category}.`,
  },
  {
    reviewId: 22,
    name: "Pedro",
    headline: `Modern and timeless`,
    reviewText: `We added this {category} to our tiny Brooklyn apartment and it really spruced up the place. It is well made, stylish and works well in any space. Good size for apartment living. So happy with our purchase!`,
  },
  {
    reviewId: 23,
    name: "Aaron",
    headline: `Can't beat the price`,
    reviewText: `We got the {product} a few months ago and it’s great. You can’t beat the price and it gets a lot of compliments. Fits in perfectly with my eclectic style. Love it!`,
  },
  {
    reviewId: 24,
    name: "Juki",
    headline: `Beautiful {category}!`,
    reviewText: `This {category} was on backorder for a few months and it made me think about canceling but I am so happy—it was totally worth the wait!! It is the coolest looking {category}, and it works perfectly in my apartment! I get compliments on it every time someone comes over—including two of my friends who are both designers! It looks much pricier than what it is, and fits it with many different styles, in my opinion. Love love love it!`,
  },
  {
    reviewId: 25,
    name: "Lauren",
    headline: `Lots of complements on this {category}`,
    reviewText: `I bought this {category} about a year ago. Took a little while to get it but boy was it worth it! It is darling. It is ultra-modern, which is a perfect fit for my home. Would definitely purchase again.`,
  },
  {
    reviewId: 26,
    name: "Gail",
    headline: `Beautiful`,
    reviewText: `I love the look of this {category} even more in person. Have had this {category} for several months now. The quality and construction is top notch. Gorgeous. My only complaint is that the color is a bit darker than the photos. Other than that, you can't go wrong with the {product}.`,
  },
  {
    reviewId: 27,
    name: "mzarismith",
    headline: `Statement piece`,
    reviewText: `I really love this {category}. It is very good looking and has a lot of detail for a {category} at this price point. I was a little worried about the size, but it ended up fitting my space perfectly. Super happy with my purchase.`,
  },
  {
    reviewId: 28,
    name: "Alex",
    headline: `Wow!`,
    reviewText: `We got the {product} on backorder, and love how it fits in our room. It looks great, warms up our modern-looking apartment, and is the perfect {category} for our small room. The only complaint is that there was a small dent on the side, but you can barely see it from far away.`,
  },
  {
    reviewId: 29,
    name: "Anna",
    headline: `Hip, modern {category}`,
    reviewText: `I love the shape and style of this {category}. I have it in our rental space and it really warms up the room. It brings the whole room together, it is the perfect amount of modern. It is substantial in design/construction and does not feel flimsy like some others I have seen. I can also say from doing substantial research this {category} is a great value!`,
  },
  {
    reviewId: 30,
    name: "Aliza",
    headline: `Beautiful design and well made`,
    reviewText: `I just received the {product} and it is even more beautiful than online. I generally do not like to buy things without seeing them in person first but I have always been happy with Modernist's quality so I was confident that the {category} would meet my expectations. It not only met my expectations, but exceeded them!`,
  },
  {
    reviewId: 70,
    name: "Maheen",
    headline: `Love this {category}!`,
    reviewText: `Beauitful amazing quality {category}. Looks exactly like in the photos and the color matches perfectly to what is shown online. Really happy with it, definitely a statement piece.`,
  },
  {
    reviewId: 71,
    name: "Camille",
    headline: `Unique {category}`,
    reviewText: `The {product} is beautifully designed with a unique and innovative style. Exquisite to look at. I do not have enough accolades and adjectives to express how grandiose and wonderful this {category} is. Just a quality {category} from top to bottom, and I can't stop admiring it. Beautiffffuuulll!`,
  },
  {
    reviewId: 72,
    name: "Tanya",
    headline: `Gorgeous`,
    reviewText: `Absolutely gorgeous {category}! Modernist helped me through the whole ordering process. And most importantly, it was packed very very well and arrived with absolutely no damage. Very happy with my new {category}!`,
  },
  {
    reviewId: 73,
    name: "Susie",
    headline: `Show stopper`,
    reviewText: `Really beautiful {category} that makes the room. The color goes really well with my space, and I've received a ton of complements on it. I highly recommend the {product}! Overall, incredibly happy with this purchase!`,
  },
];
const badReviews = [
  {
    reviewId: 31,
    name: "Debbie",
    headline: `SO Beautiful, but falling apart`,
    reviewText: `This is a beautiful {category}. I was incredibly impressed when I bought it and was entertaining more places I could put one! However we have had it less than a month and pieces of the material are coming off every day. I don't know if we got a defective product because reviews overall seemed so positive. I'm very sad.`,
  },
  {
    reviewId: 32,
    name: "Nicole",
    headline: `Stylish but defective`,
    reviewText: `This is a great looking {category}. Unfortunately mine was defective, so it completely fell apart after 3 months of light use, making it unusable. Before you use your {category}, make sure you don't have any defects.`,
  },
  {
    reviewId: 33,
    name: "Mary",
    headline: `Beautiful {category} with defective parts`,
    reviewText: `Love the look and style of the {product} - so much so that we were planning on purchasing a second. There is a defect in the back of mine, causing it to completely fall apart. Will have to contact Modernist for a replacement.`,
  },
  {
    reviewId: 34,
    name: "Jimmy",
    headline: `Nothing like the online picture`,
    reviewText: `The color of the {product} was not what I expected. Much darker than the picture. Could be a cool {category}, but it doesn't work in my space. I'm bummed. Will be returning.`,
  },
  {
    reviewId: 35,
    name: "Ayzia",
    headline: `All different colors`,
    reviewText: `Bought the {product} last year and it was perfect. Ordered a second, but this time it was a different color and there were imperfections all over. Assuming this is a production error since some are very dark, others light and others are blotchy.`,
  },
  {
    reviewId: 36,
    name: "Terri",
    headline: `Nice {category} but defective`,
    reviewText: `Love the look of this {category}! Only problem is that the material is defective and it's starting to fall apart in one spot. I will be returning this {category}.`,
  },
  {
    reviewId: 37,
    name: "Sydney",
    headline: `Lovely {category} but not as pictured.`,
    reviewText: `The {product} is really nice. It arrived very well packaged, however some of the material is coming off. Seems like whoever packaged it didn’t notice this. I like this {category} but I’m in the process of returning it now. For the price I paid, I could not justify keeping it with defects.`,
  },
  {
    reviewId: 38,
    name: "Stephanie",
    headline: `Looks great, but...`,
    reviewText: `Like, however much darker than website photo. I also expected it to be smaller. Unfortunately, this will not work in my space. Sadly, I will be returning.`,
  },
  {
    reviewId: 39,
    name: "Millah",
    headline: `Looks modern`,
    reviewText: `This is a modern addition to my apartment. The only disappointing part is that I found some weird discoloration that looks like a line across the center. The line makes it look cheap. I still love the size and color. I didn’t mind too much as it went with my home.`,
  },
  {
    reviewId: 40,
    name: "Sherree",
    headline: `Just OK`,
    reviewText: `The {product} is a little flimsy- which for some reason I didn’t anticipate. It’s cool & looks nice- but a little overpriced for what it is.`,
  },
  {
    reviewId: 41,
    name: "Rose",
    headline: `Bigger than Expected!`,
    reviewText: `Although it's much larger than I expected, it's beautiful. It went on sale in between my order and delivery but Modernist ignored my request for a credit. Now if I could get the {category} at the sale price, I'd be very happy!`,
  },
  {
    reviewId: 42,
    name: "Rafi",
    headline: `Decent {category}`,
    reviewText: `I've had this {category} for quite long time and I love it. It surley makes a statement, but is not screaming look at me. Elegant, natural form and modern. Over time I'm starting to see some wear, so it is no longer perfect and the quality isn't top notch, but I love it anyway.`,
  },
  {
    reviewId: 43,
    name: "Dennis",
    headline: `Beautiful {category}! However, not made all that well`,
    reviewText: `I love the {product}! It’s beautiful and compliments my home nicely. I paired it with another Modernist piece and they look amazing together. The {category} is modern and luxurious. My only complaint is that it’s not made all that well. There is pieces of material that stick out a little. Just wish it was made more precisely so you can’t see it sticking out. Not that noticeable unless you’re up real close.`,
  },
  {
    reviewId: 44,
    name: "Shar",
    headline: `Darker color than pictured`,
    reviewText: `This {category} looks much darker than the picture. I love the style and shape, but wish it was a bit brighter. I expected a bit more considering the price.`,
  },
  {
    reviewId: 45,
    name: "Beth",
    headline: `Great {category}`,
    reviewText: `I bought this a few months ago. It is a great {category} but is definitely darker than I would have thought! It's starting to grow on me. Still would order again.`,
  },
  {
    reviewId: 46,
    name: "Ning P",
    headline: `Beautiful unique {category}`,
    reviewText: `I agree that the {product} is a statement piece. Very unique and seems well made. There was a scratch on the side itself when we first got it. But customer service was very helpful and have delivered the replacement on time. Lowered my rating because the people who delivered the replacement were not very polite.`,
  },
  {
    reviewId: 47,
    name: "Liber",
    headline: `I found the one`,
    reviewText: `I purchased the {category} in Feb, just got it delivered a few days ago. I had purchased 2 other products from different stores, returned them because they just weren't the right fit. Saw this one and fell in love!! It looks even more gorgeous in person. It’s perfect! Lowered my rating because after patiently waiting to receive it, I noticed it was scratched. I’m really sad about it. Will try to get it replaced.`,
  },
  {
    reviewId: 48,
    name: "Mark",
    headline: `Unique, Yet Not As I'd Hoped`,
    reviewText: `The {category} is definitely a great size and unique shape but the color is not what I expected. It’s definitely shinier than the photos. I purchased this because I thought it would pop against soot-colored walls. It doesn’t. Unless you have white or very light walls, or a lot of natural sunlight, I don’t recommend it.`,
  },
  {
    reviewId: 49,
    name: "Rebecca",
    headline: `Perfect for any room`,
    reviewText: `This {category} is really modern and cool. I love the texture and materials; however, I am lowering my rating because the top has some defects. Overall, I'm still very happy with this {category}.`,
  },
  {
    reviewId: 50,
    name: "Jordan",
    headline: `Love the design, but not the color`,
    reviewText: `The {product} looks great in my home and has gotten lots of compliments. My only complaint is that it is darker than it appears in the photos. Would still recommend.`,
  },
  {
    reviewId: 51,
    name: "Paula",
    headline: `Sophisticated yet modern`,
    reviewText: `I love the shape of this {category}! My only issue is that the color is definitely not as advertised. It almost has an antique-y vibe. Wish it looked more like the pictures. I contemplated returning it but, like many other reviewers, decided to keep it and work with it.`,
  },
  {
    reviewId: 52,
    name: "Dave",
    headline: `Too big`,
    reviewText: `The {category} looks good but was expecting a smaller size. Not too bad For price. Looks a litte odd in my tiny studio apartment. Might have to return.`,
  },
  {
    reviewId: 53,
    name: "Missie",
    headline: `Great Bones!`,
    reviewText: `I saw this eye catching {category} online and it immediately caught my eye. It has landed in a perfect spot in my client's home. I was struck by its organic shape and movement. Lowered my rating because it was delivered to the wrong address.`,
  },
  {
    reviewId: 54,
    name: "Kevin",
    headline: `Love this {category}`,
    reviewText: `I looked at the {product} online for weeks and finally ordered with the input from a designer friend. It is a statement piece and adds much to our home. I would have given 5 stars, but it arrived damaged. Now I have to try and exchange for another one.`,
  },
  {
    reviewId: 55,
    name: "Bruno",
    headline: `Wonderfully modern`,
    reviewText: `This {category} is great quality, elegant, and has a really unique style. We got it to go in our guestroom and it looks great *except* that the finish is a bit too dark. I was expecting a bright color to add a pop of contrast to our room. I'll still keep it--haven't found anything else comparable in size and style.`,
  },
  {
    reviewId: 56,
    name: "Miller",
    headline: `Not a bad {category}`,
    reviewText: `I like it. The price feels appropriate for the materials and design. I don't love the color in daylight. It makes it feel a bit cheap. I'm going to try it in another room to see if I like it better. The product photos were a bit misleading. Overall I'm happy but wish a little more thought was given to the color.`,
  },
  {
    reviewId: 57,
    name: "Lisa",
    headline: `Nice but problematic`,
    reviewText: `I ordered two of the {product} and am disappointed that they do not even remotely match in color. I understand that they are natural materials but if you are hoping to use two of them together, it is a wild card if the colors will mesh, mine do not. Also, my order took forever to arrive, which was annoying.`,
  },
  {
    reviewId: 58,
    name: "Dawn",
    headline: `Not like the photo`,
    reviewText: `I fell in love with the {product} when I first saw the photos. It looked like the perfect addition to my new home. When it arrived, it was much more faded in color and the size was larger than I expected. I really wanted to love this {category}. I'm sad to say I will be returning it.`,
  },
  {
    reviewId: 59,
    name: "Leigh",
    headline: `Beautiful {category}, but not perfect.`,
    reviewText: `This is a beautiful {category} that definitely makes a statement. It’s well made, but the color tends to be a bit more washed out than I expected. Based on the color, I'm not sure I would have spent this amount for shipping if I had to do it over again. It also has some minor imperfections. We will make it work and try to work around the color.`,
  },
  {
    reviewId: 60,
    name: "Tony",
    headline: `Almost Perfect!`,
    reviewText: `This {category} is really pretty, but it has some issues. It has a modern look and I love the vibe, but the material is starting to fade. We've only had it for a few weeks and it's already starting to show some signs of aging. I'm bummed, because I thought this was the perfect {category} for our space.`,
  },
];

function transformCategory(category) {
  switch (category) {
    case "sofas":
      return "sofa";
    case "bedding":
      return "bed";
    case "chairs":
      return "chair";
    case "decor":
      return "piece";
    case "lighting":
      return "lighting";
    case "tables":
      return "table";
    default:
      return category;
  }
}

function randomDate() {
  const currentDate = new Date();
  const daysAgo = Math.floor(Math.random() * 150) + 1;
  currentDate.setDate(currentDate.getDate() - daysAgo);
  return currentDate.toISOString();
}

function generateRatings(averageRating, n) {
  if (averageRating < 1 || averageRating > 5) {
    throw new Error("Average rating must be between 1 and 5.");
  }

  const ratings = new Array(n).fill(averageRating);

  for (let i = 0; i < n; i++) {
    const minAdjustment = Math.max(1 - ratings[i], -0.5);
    const maxAdjustment = Math.min(5 - ratings[i], 0.5);

    // Introduce more randomness by using a smaller range for adjustments
    const randomAdjustment =
      Math.random() * (maxAdjustment - minAdjustment) + minAdjustment * 0.5;
    ratings[i] += randomAdjustment;
  }

  return ratings.map((rating) => Math.round(rating)); // Round ratings to the nearest integer
}

export function generateRandomReviews(
  productId,
  averageRating,
  reviewCount,
  productName,
  category
) {
  const ratings = generateRatings(averageRating, reviewCount);

  const selectedReviews = [];
  const usedReviewIds = new Set();

  while (selectedReviews.length < reviewCount) {
    const rating = ratings[selectedReviews.length];
    const selectedArray = rating >= 3.75 ? goodReviews : badReviews;
    const randomIndex = Math.floor(Math.random() * selectedArray.length);

    const selectedReview = selectedArray[randomIndex];
    const reviewId = selectedReview.reviewId;

    // Ensure reviewId is unique
    if (!usedReviewIds.has(reviewId)) {
      usedReviewIds.add(reviewId);

      const name = selectedReview.name;
      const categoryName = transformCategory(category);
      const headline = selectedReview.headline
        .replace(/{category}/g, categoryName)
        .replace(/{product}/g, productName.toLowerCase());
      const reviewText = selectedReview.reviewText
        .replace(/{category}/g, categoryName)
        .replace(/{product}/g, productName.toLowerCase());

      const review = {
        // reviewId,
        productId,
        reviewId: uuidv4(),
        rating: rating,
        name,
        headline,
        reviewText,
        createdAt: randomDate(),
      };

      selectedReviews.push(review);
    }
  }

  // Sort the selectedReviews array from newest to oldest based on createdAt
  selectedReviews.sort((a, b) =>
    new Date(b.createdAt)
      .toISOString()
      .localeCompare(new Date(a.createdAt).toISOString())
  );

  return selectedReviews;
}
