import faker from "faker";

const initialCount = 500;
/**
 * generate dammy users
 * @returns {object} name,email,job
 */
export const generateUsers = (count = initialCount) => {
  return [...Array(count)].map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    job: faker.name.jobTitle()
  }));
};
