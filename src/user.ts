import * as functions from "firebase-functions";
import { modifyUserCount } from "./count";
import admin = require("firebase-admin");

export const userGroup = {
  onUserAdded: functions.firestore
    .document("/users/{uid}")
    .onCreate(async (snap, context) => {
      await modifyUserCount(true, snap);
    }),

  onUserUpdated: functions.firestore
    .document("/users/{uid}")
    .onUpdate(async (snap, context) => {
      const afterData = snap.after.data();
      const beforeData = snap.before.data();

      if (beforeData.displayName !== afterData.displayName) {
        await Promise.all(
          (
            await admin
              .firestore()
              .collection("posts")
              .where("uid", "==", context.params.uid)
              .get()
          ).docs.map((d) => {
            return d.ref.update({
              user_name: afterData.displayName,
            });
          })
        );
      }
    }),

  onUserDeleted: functions.firestore
    .document("/users/{userId}")
    .onDelete(async (snap, context) => {
      await modifyUserCount(false, snap);
    }),
  disableUser: functions.https.onCall(async (snap, context) => {
    if (!context.auth!.token.super_admin && !context.auth!.token.admin)
      return {
        success: false,
        error: "You are not authorized to do this action.",
      };

    const { uid, disabled } = snap;

    try {
      await admin.auth().updateUser(uid, {
        disabled: disabled,
      });
      await admin.firestore().collection("users").doc(uid).update({
        disabled: disabled,
      });
    } catch (e) {
      return {
        success: false,
        error: "User doesn't exist with this uid: " + uid,
      };
    }
    return {
      success: true,
      error:
        "User's property has been changed. Disabled value is now" + disabled,
    };
  }),
  deleteUser: functions.https.onCall(async (snap, context) => {
    if (!context.auth!.token.super_admin && !context.auth!.token.admin)
      return {
        success: false,
        error: "You are not authorized to do this action.",
      };

    const { uid } = snap;

    try {
      await admin.auth().deleteUser(uid);
      await admin.firestore().collection("users").doc(uid).delete();
      (
        await admin
          .firestore()
          .collection("posts")
          .where("uid", "==", uid)
          .get()
      ).docs.map((d) => d.ref.delete());
    } catch (e) {
      return {
        success: false,
        error: "User doesn't exist with this uid: " + uid,
      };
    }
    return {
      success: true,
      error: "User has been deleted",
    };
  }),
  promoteUser: functions.https.onCall(async (data, context) => {
    if (!context.auth!.token.super_admin)
      return {
        success: false,
        error: "You are not authorized to do this action.",
      };

    try {
      const uid = data.uid;
      await admin.auth().setCustomUserClaims(uid, {
        admin: true,
      });
      await admin.firestore().collection("users").doc(uid).update({
        admin: true,
      });
      return {
        success: true,
        message: "User " + uid + " has been promoted to admin",
      };
    } catch (e) {
      return {
        success: false,
        error: e.message,
      };
    }
  }),
};
