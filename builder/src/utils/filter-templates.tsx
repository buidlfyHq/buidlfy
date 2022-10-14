export const filterTemplates = (inReview: boolean, listed: boolean) => {
  if (listed) {
    return { badge: "Listed", list: false };
  } else if (inReview) {
    return { badge: "In Review", list: false };
  } else {
    return { badge: "Unlisted", list: true };
  }
};
