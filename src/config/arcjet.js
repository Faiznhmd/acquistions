// import arcjet, { shield, detectBot, slidingWindow } from '@arcjet/node';

// const aj = arcjet({
//   // Get your site key from https://app.arcjet.com and set it as an environment
//   // variable rather than hard coding.
//   key: process.env.ARCJET_KEY,
//   rules: [
//     // Shield protects your app from common attacks e.g. SQL injection
//     shield({ mode: 'LIVE' }),
//     // Create a bot detection rule
//     detectBot({
//       mode: 'LIVE', // Blocks requests. Use "DRY_RUN" to log only
//       // Block all bots except the following
//       allow: [
//         'CATEGORY:SEARCH_ENGINE', // Google, Bing, etc
//         // Uncomment to allow these other common bot categories
//         // See the full list at https://arcjet.com/bot-list
//         //"CATEGORY:MONITOR", // Uptime monitoring services
//         'CATEGORY:PREVIEW', // Link previews e.g. Slack, Discord
//       ],
//     }),
//     // Create a token bucket rate limit. Other algorithms are supported.
//     slidingWindow({
//       mode: 'LIVE',
//       interval: '2s',
//       max: 5,
//     }),
//   ],
// });

// export default aj;

import arcjet, { shield, detectBot, slidingWindow } from '@arcjet/node';

let aj;

if (process.env.NODE_ENV === 'test') {
  // Dummy Arcjet client for tests — avoids warnings and blocking
  aj = {
    protect: async () => ({
      isDenied: () => false, // always allow
      reason: {},
    }),
  };
} else {
  // Normal Arcjet initialization for dev or prod
  aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
      shield({ mode: 'LIVE' }),
      detectBot({
        mode: 'LIVE',
        allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW'],
      }),
      slidingWindow({
        mode: 'LIVE',
        interval: '2s',
        max: 5,
      }),
    ],
  });
}

export default aj;
