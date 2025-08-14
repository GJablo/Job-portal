import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://590fb0e41a8094dbf28f17c73690236d@o4509839762718720.ingest.us.sentry.io/4509839768944640",
  integrations: [Sentry.mongooseIntegration()],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
