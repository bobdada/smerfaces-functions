import * as moment from "moment";
import * as admin from "firebase-admin";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";

export const modifyUserCount = async (add: boolean, snap: DocumentSnapshot) => {
  const todaysDate = moment().format("YYYY_M_D");
  let fullDate = todaysDate;
  const userRef = admin.database().ref("/stats/users/total_users");
  let userCount = (await userRef.once("value")).val() || 0;

  if (add) {
    userCount++;
  } else if (userCount > 0) {
    userCount--;
  }

  await userRef.set(userCount);

  if (!add) {
    const createdDate = snap.data()!.creationTime;
    fullDate = moment(createdDate).format("YYYY_M_D");
  }

  if (todaysDate === fullDate) {
    const todaysUsersCountRef = admin
      .database()
      .ref("/stats/users/users_each_day")
      .child(`users_${todaysDate}`);

    let count = (await todaysUsersCountRef.once("value")).val() || 0;

    if (add) {
      count++;
    } else if (count > 0) {
      count--;
    }

    await todaysUsersCountRef.set(count);
  }
  return {
    success: true,
    message: "user successfully deleted",
  };
};

export const modifyCompanyCount = async (
  add: boolean,
  snap: DocumentSnapshot
) => {
  const todaysDate = moment().format("YYYY_M_D");
  let fullDate = todaysDate;
  const companyRef = admin.database().ref("/stats/companies/total_companies");

  let companyCount = (await companyRef.once("value")).val() || 0;

  if (add) companyCount++;
  else if (companyCount > 0) {
    companyCount--;
  }
  await companyRef.set(companyCount);

  if (!add) {
    const createdDate = snap.data()!.creationTime;
    fullDate = moment(createdDate).format("YYYY_M_D");
  }

  if (todaysDate === fullDate) {
    const ref = admin
      .database()
      .ref("/stats/companies/companies_each_day/")
      .child(`companies_${todaysDate}`);

    let count = (await ref.once("value")).val() || 0;

    if (add) count++;
    else if (count > 0) count--;

    await ref.set(count);
  }

  return {
    success: true,
  };
};
