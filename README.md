# Set up the Project

### Fork this repository and open it locally using  github desktop or type into terminal
```bash
git clone https://github.com/Siser-Pratap/vidverse.git
```
### Install dependencies and dev dependencies in terminal
```bash 
npm i 
```
### Setup your env file in the main project
##### .env
```bash
MONGODB_URL = your Database link
JWT_SECRET = your jwt secret key
```


## Getting Started

##### First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open Port 3000 [http://localhost:3000](http://localhost:3000) with your browser to see the result


#### API Endpoints (use Postman with json inputs to check )
(1) Signup : [/api/users/signup](/api/users/signup) 

(2) Login : [/api/users/login](/api/users/login) 





You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
