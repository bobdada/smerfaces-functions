import * as nodemailer from "nodemailer";
import admin = require("firebase-admin");

const gmailEmail = encodeURIComponent("noreply.smerafaces@gmail.com");
const gmailPassword = encodeURIComponent("smerafaces@123");
const mailTransport = nodemailer.createTransport(
  `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`
);

export async function sendMail(
  email: string,
  password: string | null
): Promise<void> {
  let actionCodeSettings = {
    url: `https://admin.smerafaces.com?email=${encodeURIComponent(email)}`,
    handleCodeInApp: true,
  };

  const loginLink = await admin
    .auth()
    .generateSignInWithEmailLink(email, actionCodeSettings);

  let html = `
  <p>Hi, Welcome to Smerafaces</p>  
  <p><a href="${loginLink}">Click here</a> to be redirect to Smerafaces Admin Dashboard Panel. <em>This Link expires within 24 hours of this email</em>.</p>
  <p>Thank You.</p>
  `;

  if (password) {
    html = `
    <p>Hi, Welcome to Sewa360</p>  
    <p>Your sign in password for  Smerafaces Admin Dashboard for your ${email} account is <strong>${password}</strong>. <em> Please make sure to change the password on first sign in.</em></p>
    <p><a href="${loginLink}">Click here</a> to be redirect to Smerafaces Admin Dashboard Panel. <em>This Link expires within 24 hours of this email</em>.</p>
    <p>Thank You.</p>
    `;
  }

  const mailOptions = {
    from: `Smerafaces <noreply.smerafaces@gmail.com>`,
    to: email,
    subject: "",
    // text: ""
    html: html,
  };

  mailOptions.subject = `Welcome to Smerafaces`;
  // mailOptions.text = `
  // Dear ${name},
  // <b>Welcome</b>

  // -----------------------
  // ${message}
  // -----------------------
  // `;

  return mailTransport
    .sendMail(mailOptions)
    .then(() => {
      console.log("New welcome email sent to:", email);
    })
    .catch((error: any) => {
      console.log("error bhayo" + error);
    });
}

// interface MailParams {
//   to: string;
//   cc?: string[];
//   bcc?: string[];
//   subject: string;
//   body: string;
// }

// export function sendEmail(params: MailParams) {
//   const mailOptions = {
//     from: `Sewa360 <noreply.sewa360@gmail.com>`,
//     to: params.to,
//     cc: (params.cc || []).join(","),
//     bcc: (params.bcc || []).join(","),
//     subject: params.subject,
//     html: params.body,
//   };
//   return mailTransport
//     .sendMail(mailOptions)
//     .then(() => {
//       console.log("New welcome email sent to:", params.to);
//       return;
//     })
//     .catch((error: any) => {
//       console.log("error bhayo" + error);
//       throw error;
//     });
// }
