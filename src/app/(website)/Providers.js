"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function Providers({ children }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
      <ProgressBar
        height="4px"
        color="red"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </GoogleReCaptchaProvider>
  );
}
