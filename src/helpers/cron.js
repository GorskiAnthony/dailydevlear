// At 19:30 on every day-of-week from Monday through Sunday.
const CRON = "0 30 19 * * 1/1";
// Test CRON Task every 5 seconds
const CRON_TEST = "*/5 * * * * *";
module.exports = { CRON, CRON_TEST };
