export const constants = {
  sessionStatus: {
    off: 0, // on startup for eliminating inactive->active glitch
    active: 1,
    inactive: 2,
  },
};

export const storageConstants = {
  token: "token",
};

export const availablePages = {
  login: "/login",
  universities: "/universities",
  schools: "/schools",
  lyceums: "/lyceums",
};
