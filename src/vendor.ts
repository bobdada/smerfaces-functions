import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import { modifyCompanyCount } from "./count";
import { sendMail } from "./mail";
import { response } from "./index";

export function generatePassword() {
  return Math.random().toString(36).slice(-8);
}

export async function addVendorToDb(user: any, userKey: string) {
  const userRef = admin.firestore().collection("vendors").doc(userKey);
  await userRef.set(user);
  return userRef;
}

export const vendorGroup = {
  createVendor: functions.https.onCall(async (data, context) => {
    try {
      console.log("GRP FN VITRA ------>>>>> VENDOR DATA", data);

      if (context.auth!.token.super_admin === false) {
        return response(false, "Insufficient permissions");
      }

      const password = generatePassword();

      const user = await admin.auth().createUser({
        email: data.email,
        password: password,
      });

      console.log(
        `user created with email ${data.email} and password ${password}`
      );

      const uid = user.uid;
      await admin.auth().setCustomUserClaims(uid, {
        vendor: true,
      });

      await addVendorToDb(
        {
          ...data,
          key: uid,
          blocked: false,
          createdAt: new Date().getTime(),
          tempPassword: password,
        },
        uid
      );

      await sendMail(data.email, password);
      return response(true, "success");
    } catch (e) {
      return response(false, e.message);
    }
  }),

  // updateVendor: functions.https.onCall(async (data, context) => {
  //   try {
  //     if (context.auth!.token.super_admin === false) {
  //       return response(false, "Insufficient permissions");
  //     }

  //     console.log(context.auth!.token.firebase.identities);

  //     const userRef = await admin
  //       .firestore()
  //       .collection("vendors")
  //       .doc(data.key);

  //     const oldUser = (await userRef.get()).data();

  //     await userRef.collection("history").add({
  //       ...data,
  //       editedDate: new Date().getTime(),
  //       editingUserKey: context.auth!.uid,
  //     });

  //     console.log("status", data.blocked, oldUser!.blocked);

  //     if (data.blocked !== oldUser!.blocked) {
  //       if (data.blocked === "true") {
  //         console.log("reached block user");
  //         await admin.auth().updateUser(data.key, {
  //           disabled: true,
  //         });
  //       } else if (data.blocked === "false") {
  //         console.log("reached unblock user");

  //         await admin.auth().updateUser(data.key, {
  //           disabled: false,
  //         });
  //       }
  //     }

  //     if (data.email !== oldUser!.email) {
  //       await admin.auth().updateUser(data.key, {
  //         email: data.email,
  //       });
  //     }

  //     await userRef.update({
  //       ...oldUser,
  //       ...data,
  //     });

  //     return response(true, "success");
  //   } catch (e) {
  //     return response(false, e.message);
  //   }
  // }),

  // onCompanyAdded: functions.firestore
  //   .document("/companies/{companyId}")
  //   .onCreate(async (snap: any, context: any) => {
  //     await modifyCompanyCount(true, snap);
  //     const companies = await admin
  //       .firestore()
  //       .collection("companies")
  //       .where("category", "==", snap.data().category)
  //       .get();
  //     if (companies.size > 0)
  //       await admin
  //         .firestore()
  //         .collection("categories")
  //         .doc(snap.data().category)
  //         .update({
  //           active: true,
  //         });
  //     else
  //       await admin
  //         .firestore()
  //         .collection("categories")
  //         .doc(snap.data().category)
  //         .update({
  //           active: false,
  //         });
  //     await snap.ref.update({
  //       label: snap.data().name.toLowerCase(),
  //     });
  //   }),

  // onCompanyDeleted: functions.firestore
  //   .document("/companies/{companyId}")
  //   .onDelete(async (snap: any, context: any) => {
  //     await modifyCompanyCount(false, snap);
  //   }),

  // addCompanyAdmin: functions.https.onCall(async (data, context) => {
  //   if (context.auth!.token.super_admin === false) {
  //     console.log("NOT SUPER ADMIN");
  //     return {
  //       success: false,
  //       error: "You are not authorized to do this action.",
  //     };
  //   }

  //   try {
  //     const uid = data.userId;

  //     await admin.auth().setCustomUserClaims(uid, {
  //       admin: true,
  //     });

  //     return {
  //       success: true,
  //       message:
  //         "User " +
  //         uid +
  //         " has been added as admin for company" +
  //         data.companyId,
  //     };
  //   } catch (e) {
  //     console.log("ERRORRRRRR", e);
  //     return {
  //       success: false,
  //       error: e.message,
  //     };
  //   }
  // }),
};
