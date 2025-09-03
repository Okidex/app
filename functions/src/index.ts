
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onDocumentCreated, onDocumentUpdated} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {getAuth} from "firebase-admin/auth";
import { Resend } from 'resend';

// This will be securely loaded from the environment secrets you set.
const RESEND_API_KEY = process.env.EMAIL_PROVIDER_API_KEY;
const SENDER_EMAIL = "notifications@okidex.com";

initializeApp();
const resend = new Resend(RESEND_API_KEY);


/**
 * Sends an email using the Resend API.
 */
async function sendEmail(
  recipientEmail: string,
  subject: string,
  body: string,
) {
  logger.info(`Sending email to ${recipientEmail} with subject: ${subject}`);
  if (!RESEND_API_KEY) {
    logger.error(
      "Resend API key (EMAIL_PROVIDER_API_KEY) is not set. Cannot send email.",
    );
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
        from: `Okidex <${SENDER_EMAIL}>`,
        to: [recipientEmail],
        subject: subject,
        html: body,
    });

    if (error) {
      logger.error("Failed to send email via Resend:", error);
      return;
    }

    logger.info("Email sent successfully via Resend.", data);
  } catch (error) {
    logger.error("An exception occurred while sending email:", error);
  }
}

/**
 * Triggered when a new connection document is created.
 * Sends an email notification to the user who received the request.
 */
export const onNewConnection = onDocumentCreated(
  "connections/{connectionId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.log("No data associated with the event");
      return;
    }

    const data = snapshot.data();
    const recipientId = data.recipientId; // The user receiving the request
    const senderId = data.senderId; // The user who sent the request

    try {
      // Get sender's and recipient's user data
      const db = getFirestore();
      const senderDoc = await db.collection("users").doc(senderId).get();
      const senderName = senderDoc.data()?.name ?? "Someone";

      const recipientAuthUser = await getAuth().getUser(recipientId);
      const recipientEmail = recipientAuthUser.email;

      if (!recipientEmail) {
        logger.error(`Recipient ${recipientId} does not have an email.`);
        return;
      }

      // Send the email
      const subject = "You have a new connection request on Okidex!";
      const body = `Hi there, <br/><br/>
        ${senderName} has sent you a connection request on Okidex. Log in to your dashboard to review it.
        <br/><br/>
        Thanks,<br/>The Okidex Team`;

      await sendEmail(recipientEmail, subject, body);
    } catch (error) {
      logger.error("Error sending new connection notification:", error);
    }
  },
);

/**
 * Triggered when a new message document is created.
 * Sends an email notification to the recipient of the message.
 */
export const onNewMessage = onDocumentCreated(
  "messages/{messageId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.log("No data associated with the event");
      return;
    }

    const data = snapshot.data();
    const recipientId = data.recipientId;
    const senderId = data.senderId;
    const messageText = data.text;

    // Don't send a notification if a user is messaging themselves.
    if (senderId === recipientId) {
      return;
    }

    try {
      const db = getFirestore();
      const senderDoc = await db.collection("users").doc(senderId).get();
      const senderName = senderDoc.data()?.name ?? "Someone";

      const recipientAuthUser = await getAuth().getUser(recipientId);
      const recipientEmail = recipientAuthUser.email;

      if (!recipientEmail) {
        logger.error(`Recipient ${recipientId} does not have an email.`);
        return;
      }

      const subject = `You have a new message from ${senderName} on Okidex`;
      const body = `Hi there, <br/><br/>
        You have a new message from ${senderName}:
        <br/><br/>
        <em>"${messageText}"</em>
        <br/><br/>
        Log in to your dashboard to reply.
        <br/><br/>
        Thanks,<br/>The Okidex Team`;

      await sendEmail(recipientEmail, subject, body);
    } catch (error) {
      logger.error("Error sending new message notification:", error);
    }
  },
);


/**
 * Triggered when a founder responds to an investment challenge.
 * Sends an email notification to the investor who posted the challenge.
 */
export const onNewChallengeResponse = onDocumentUpdated(
  "challenges/{challengeId}",
  async (event) => {
    if (!event.data) {
      logger.log("No data associated with the event");
      return;
    }

    const before = event.data.before.data();
    const after = event.data.after.data();

    const beforeResponses = before.responses || [];
    const afterResponses = after.responses || [];

    // Check if a new founder UID was added to the responses array
    if (afterResponses.length > beforeResponses.length) {
      const newResponderId = afterResponses.find(
        (id: string) => !beforeResponses.includes(id),
      );

      if (!newResponderId) return;

      const investorId = after.investorId;

      try {
        const db = getFirestore();
        const auth = getAuth();

        // Get responder (founder) and investor data
        const responderDoc = await db.collection("users").doc(newResponderId).get();
        const responderName = responderDoc.data()?.name ?? "A founder";
        const responderBusiness = responderDoc.data()?.profile?.businessName ?? "their startup";

        const investorUser = await auth.getUser(investorId);
        const investorEmail = investorUser.email;

        if (!investorEmail) {
          logger.error(`Investor ${investorId} does not have an email.`);
          return;
        }

        const subject = `A founder has responded to your Challenge!`;
        const body = `Hi there,<br/><br/>
          <b>${responderName}</b> from <b>${responderBusiness}</b> has responded to your investment challenge: "${after.aiTitle}".
          <br/><br/>
          You can view their full profile in your Okidex dashboard to see if it's a good fit.
          <br/><br/>
          Thanks,<br/>The Okidex Team`;

        await sendEmail(investorEmail, subject, body);
      } catch (error) {
        logger.error("Error sending challenge response notification:", error);
      }
    }
  },
);
