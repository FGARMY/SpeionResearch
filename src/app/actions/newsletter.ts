"use server";

export async function subscribeToNewsletter(email: string) {
  // 1. Basic validation
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // 2. Mocking a delay for the network request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log(`New subscriber: ${email}`);

  // 3. This is where you would connect to Beehiiv / Substack / Mailchimp API.
  // Example:
  // const res = await fetch('https://api.newsletter.com/v1/subscribers', {
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${process.env.NEWSLETTER_API_KEY}` },
  //   body: JSON.stringify({ email })
  // });
  
  // For now, we return success so the UI can show the confirmation.
  return { 
    success: true, 
    message: "Welcome to the Lab! You've been subscribed to Speion Research updates." 
  };
}
