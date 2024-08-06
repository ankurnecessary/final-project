# Todo

## Use storybook.js

1. Installation of storybook.js [INPROGRESS]

## [Github Actions](https://www.youtube.com/watch?v=r-iLBNaCTDk)

1. Create a repository for this project. [DONE]
2. Set a github action to test the application when a pull request is created.[DONE]
3. Set a github action to test whether the build of application is successful with the changes in the new branch.[DONE]

## Test cases

1. Test cases for registration page. [DONE]
2. Test cases for login page. [DONE]
3. Add recaptcha test case.[DONE]
4. Updating test cases for the extra code and code files written for server-side integration. [DONE]

## Prisma

1. Install prisma.[DONE]
   Steps to install prisma and migrating schema to tables.
   1. `npm i prisma -D`
   2. `npx prisma` - Whether prisma is installed.
   3. `npx prisma init` - Set schema.prisma file.
   4. set database_url in .env
   5. Write some models in prisma.schema
   6. `npx prisma migrate dev --name country` - Generates prisma-client and migration files as per prisma.schema. It also generates tables in the database.
2. Create database tables via prisma schema. [DONE]

## Integration of next auth

## Integrate React Query

## Registration form

1. Add a country autocomplete field in the registration form.
2. Integrate reCaptcha's logic in the server action function. [DONE]
3. Registration page - Add a message to show that recaptcha validation is unsuccessful. [DONE]
4. Login page - Add a message to show that recaptcha validation is unsuccessful. [DONE]
5. Test cases for the code added to handle recaptcha at server-side. [DONE]
6. How can we incorporate the React 19 concepts well in the existing code?
7. Create API for registration.
8. Call registration API from server action function.
9. Integrate email verification upon registration.
   1. Send email to user with verification code / link.

## Login form

1. Integrate reCaptcha's logic in the server action function.
2. Create API for login.
3. Call login API from server action function.

## ReCAPTCHA

1. Put reCaptcha siteKey in .env variable. [NotPossible]
2. Put reCaptcha secret in .env variable. [DONE]

Work on responsiveness of the forms.

## What to do when this project will be deployed in cloud?

1. <https://www.google.com/u/0/recaptcha/admin/site/706344925/settings> - update domain at this address for reCaptcha.

## Normal website feature

1. If a user is trying to access any page that is visible to authorized users then we will ask user to login and then redirect him to that page.
2. If a user is trying to access any feature like 'save to favourites' etc. which can be used by authorized users only then we will ask user to login and then perform that action directly.
