# Todo - <jake@claritycoders.com>

## Use storybook.js

1. Installation of storybook.js [DONE]

### [How to set CI/CD pipeline for Storybook's integration tests](https://storybook.js.org/docs/writing-tests/test-runner#run-against-non-deployed-storybooks)

1. Integrating a CI/CD pipeline for integration tests in storybook. [DONE]
2. Make sure after sucessful run of test only storybook will be deployed on github pages.[DONE]
3. Your project token was added to the script via the --project-token flag. If you're running Chromatic via continuous integration, we recommend setting the **CHROMATIC_PROJECT_TOKEN** environment variable in your CI environment. You can then remove the --project-token from your package.json script.[DONE]

### [Storybook interaction testing](https://storybook.js.org/docs/writing-tests/interaction-testing#run-code-before-the-component-gets-rendered)

### [Storybook visual testing](https://storybook.js.org/docs/writing-tests/visual-testing)

### [Storybook test coverage](https://storybook.js.org/docs/writing-tests/interaction-testing#the-coverage-addon-doesnt-support-instrumented-code)

### [Stories for existing components](https://www.youtube.com/watch?v=vn-mz2iRDBs)

1. Add color theme in the storybook. [DONE]
2. Add typography in the storybook. [DONE]
3. Add icongraphy in the storybook. [DONE]
4. Write story for `<Input>` with simple HTML `<input/>` component.
5. Write story for Formik's `<Field>` component.[DONE]
6. Check the benefits against [https://storybook.js.org/docs/get-started/why-storybook#benefits]
7. Publish storybook on github pages with the help of [https://storybook.js.org/docs/sharing/publish-storybook] [DONE]
8. Write story for `<Label>` component.[DONE]
9. Write story for `<Button>` component.[DONE]
10. Write story for `<Alert>` component.[DONE]
11. Write story for `<ErrorAlert>` component.[DONE]
12. Write story for `<sign up>` component.[DONE]
13. Write story for `<Login>` component.[DONE]
14. Not able to understand how to mock ReCaptcha in the interaction tests of `<Login>` and `<sign up>` components in storybook. [NotPossible]
15. Write story for `<Popover>` component.[DONE]

## [Github Actions](https://www.youtube.com/watch?v=r-iLBNaCTDk)

1. Create a repository for this project. [DONE]
2. Set a github action to test the application when a pull request is created.[DONE]
3. Set a github action to test whether the build of application is successful with the changes in the new branch.[DONE]
4. Add restriction in the github account, so that no one could can make a pull request without passing the github actions for pull requests. Check video.[DONE]

## Test cases

1. Test cases for registration page. [DONE]
2. Test cases for login page. [DONE]
3. Add recaptcha test case.[DONE]
4. Updating test cases for the extra code and code files written for server-side integration. [DONE]
5. Write test cases for `<InfoPopover>` component made to show tooltips. [DONE]

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

## Password Policy

1. **Minimum Password Length** - Passwords must be at least 8 characters long (AWS supports up to 128 characters). [DONE]
2. **Character Composition** -

   1. Passwords must include at least 1 Upper Case letter. A-Z. [DONE]
   2. Passwords must include at least 1 Lower Case letter. a-z. [DONE]
   3. Passwords must include at least 1 Number - 0-9. [DONE]
   4. Passwords must include at least 1 Special characters: !@#$%^&\*()\_+-=[]{}|;:',.<>?/`~ [DONE]

3. Add a tooltip to show the information about password requirements.[DONE]

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

1. Integrate reCaptcha's logic in the server action function.[DONE]
2. Integrate login via Github authentication via auth.js. [DONE]
   1. If we want the control to land over some other page then we can use `redirect()` in options.ts.[DONE]
   2. Set a new route (/chat) where authorized user will land[DONE]. Print the session object on this page.[DONE]
   3. Track session on chat page. If a user is signed out and if he tries to access the chat page then control should be redirected to login page.[DONE]
   4. If user is signed in then whenever user will try to access the login page then control will be redirected to home page.[DONE]
   5. If user is signed in then whenever user will try to access the sign up page then control will be redirected to home page.[DONE]
   6. Handle the error cases that could appear if user will refuse from Github authentication. Clicking "cancel" button instead of "Authorize" on github page. [DONE]
   7. Showing an error message on login page when there is something wrong with social login. [DONE]
3. Integrate login via Google authentication via auth.js.[DONE]
4. [Knowledge]: Auth.js automatically lands the control over the URL from where the authorization request started. If we don't use the second argument of the `signIn` function.
5. Add .env.example. [DONE]
6. Add a header into whole website that will show [DONE]
   1. Sign in and sign up buttons when user is not signed in. [DONE]
   2. Sign out button when user is signed in. [DONE]
7. Added social auth buttons on registration page. [DONE]
8. Change the layout of login page for big screens. [DONE]
9. Need to take errors out of the login.tsx and into parent page. [DONE]
10. Create API for login.
11. Call login API from server action function.

## ReCAPTCHA

1. Put reCaptcha siteKey in .env variable. [NotPossible]
2. Put reCaptcha secret in .env variable. [DONE]

Work on responsiveness of the forms.[DONE]

## What to do when this project will be deployed in cloud?

1. <https://www.google.com/u/0/recaptcha/admin/site/706344925/settings> - update domain at this address for reCaptcha.

## Normal website feature

1. If a user is trying to access any page that is visible to authorized users then we will ask user to login and then redirect him to that page.
2. If a user is trying to access any feature like 'save to favourites' etc. which can be used by authorized users only then we will ask user to login and then perform that action directly.

## Shell Scripts

1. Added shell script to record the build statistics output in a text file. [DONE]

## Authentication

1. Use <http://kinde.com> for authentication.[MAYBE]

## Deployment on AWS Amplify

1. Deploy application on AWS Amplify.

## Artificial Intelligence course

1. [Lang chain](https://v2.scrimba.com/the-official-langchainjs-course-c02t)

## Localization & Internationalization

1. <https://mail.google.com/mail/u/0/#search/nathan/FMfcgzGxSbkzXWTjFcBFwRPHbXnbJFMV>

## OWASP

1. Demonstrated ability to write secure code, follow secure coding practices, and understand common vulnerabilities (e.g., OWASP Top Ten).

## Accessibility tests

1. Check how to correct all the accessibility test in storybook. [DONE]
2. Checked accessibility issue with `<InfoPopover>` component. [DONE]

## Next version (Spent time but not able to implement it. So, will implement these points in next version)

1. Implement authentication via middleware. Is it really necessary? [Ask_community]
2. Use error handling methods that are prescribed by Auth.js. I am currently handling auth errors via middleware. Not able to implement it via auth.ts file's callback. [Ask_community]
3. If user has signed in via social login and we don't have his account sign uped with us then we will ask him to sign up with a username and password.

## AI Model

1. Chat GPT
2. Perplexity
3. Copilot

## Update readme.md with the required information. [INPROGRESS]

1. Information about various commands in the script. [DONE]
2. All the links - <https://ankurnecessary.github.io/final-project> [DONE]
3. About the tech stack. [DONE]
4. About the libraries. [DONE]
5. Incorporating ESLint as a git hook. [INPROGRESS]
6. Add ESLint in CI.
7. Add a script in package.json that will impersonate all the commands that run in CI.
