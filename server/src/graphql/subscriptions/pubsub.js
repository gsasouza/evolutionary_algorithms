import { PubSub } from "graphql-subscriptions";

export const EVENTS = {
  RESULT: {
    NEW: "NEW_RESULT"
  }
};

const pubSub = new PubSub();

export default pubSub;
