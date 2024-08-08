import "./style.css";
import { Clerk } from "@clerk/clerk-js";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const clerk = new Clerk(clerkPubKey);

window.addEventListener("load", async () => {
  await clerk.load();

  const signinbutton = document.getElementById("sign-in");

  if (clerk.user) {
    const userButtonDiv = document.getElementById("profileContainer");
    signinbutton?.remove();

    if (userButtonDiv) {
      clerk.mountUserButton(userButtonDiv as HTMLDivElement);
    }
  } else {
    const signinbutton = document.getElementById("sign-in");
    signinbutton?.addEventListener("click", () => {
      clerk.openSignIn();
    });
  }
});
