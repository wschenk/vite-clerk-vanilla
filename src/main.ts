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

  // Example of a api query to a backend
  const mainButton = document.getElementById("main-button");

  mainButton?.addEventListener("click", async () => {
    const token = await clerk.session?.getToken();
    const results = document.getElementById("results");
    if (!token || !results) {
      if (results) {
        results.textContent = "Error: Unable to get authentication token";
      }
      return;
    }

    const response = await fetch("http://localhost:9292/private", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
    results.textContent = JSON.stringify(data);
  });
});
