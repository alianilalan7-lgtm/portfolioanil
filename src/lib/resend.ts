import { Resend } from "resend";

// Lazily construct the Resend client so that importing this module (e.g. during
// `next build` page-data collection) never throws when RESEND_API_KEY is absent.
// The client is created on first use (at request time) instead of at module load.
let client: Resend | null = null;

function getResend(): Resend {
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY);
  }
  return client;
}

export const resend = {
  get emails() {
    return getResend().emails;
  },
};
