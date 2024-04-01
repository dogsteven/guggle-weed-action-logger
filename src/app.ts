import { inspect } from "util";
import { createClient } from "redis";

inspect.defaultOptions.depth = null;

(async () => {
  const client = createClient();

  await client.connect();

  await client.subscribe("guggle-weed-action-log", (messageText) => {
    const message = JSON.parse(messageText, (key, value) => {
      if (key === "timestamp") {
        return new Date(value);
      }

      return value;
    });

    console.log(message);
  });

  function loop() {
    process.nextTick(loop);
  }
})();