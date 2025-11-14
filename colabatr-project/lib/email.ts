import { Resend } from "resend"
import { SendVerificationRequestParams } from "next-auth/providers"

const resendClient = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationRequest(params: SendVerificationRequestParams) {
  const { identifier: email, url, provider } = params
  const { from } = provider

  try {
    await resendClient.emails.send({
      from: from!,
      to: email,
      subject: "Your Login Link for Colabatr",
      html: `<p>Click the link below to sign in:</p><p><a href="${url}"><b>Sign in to Colabatr</b></a></p>`,
    })
  } catch (error) {
    console.error("Resend email error:", error)
  }
}
