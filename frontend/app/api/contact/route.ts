import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        success: false,
        message: "Invalid request data.",
      },
      { status: 400 }
    );
  }

  try {
    const {
      fullName,
      email,
      phone,
      company,
      service,
      budget,
      projectDetails,
    } = body as Record<string, string | undefined>;

    // Required fields
    if (!fullName?.trim() || !phone?.trim() || !service?.trim()) {
      return Response.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "ONTO DIGITAL <onboarding@resend.dev>",
      to: ["ontodigital.in@gmail.com"],
      subject: `New Project Inquiry — ${fullName}`,
      html: `
        <h2>New Project Inquiry</h2>

        <p><strong>Full Name:</strong> ${fullName}</p>

        <p><strong>Email:</strong> ${
          email || "Not provided"
        }</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Company:</strong> ${
          company || "Not provided"
        }</p>

        <p><strong>Service:</strong> ${service}</p>

        <p><strong>Budget:</strong> ${
          budget || "Not provided"
        }</p>

        <p><strong>Project Details:</strong></p>

        <p>${projectDetails || "Not provided"}</p>

        <hr />

        <p>
          This inquiry was submitted through the ONTO DIGITAL website.
        </p>
      `,
    });

    if (error) {
      console.error("Resend error:", error.message);

      return Response.json(
        {
          success: false,
          message: "Unable to send your message.",
        },
        { status: 500 }
      );
    }

    // Client auto-reply — best effort only. The admin notification above has
    // already been sent, so a failure here must not turn the request into a
    // failure response; it just means the client doesn't get a confirmation.
    if (email?.trim()) {
      const { error: clientError } = await resend.emails.send({
        from: "ONTO DIGITAL <onboarding@resend.dev>",
        to: [email.trim()],
        subject: "Thanks for contacting ONTO DIGITAL",
        html: `
          <p>Hi ${fullName},</p>

          <p>Thank you for reaching out to ONTO DIGITAL.</p>

          <p>We've received your project inquiry and will review it shortly.</p>

          <p>Our team will get back to you as soon as possible.</p>

          <p>Regards,<br />ONTO DIGITAL</p>
        `,
      });

      if (clientError) {
        console.error("Resend client auto-reply error:", clientError.message);
      }
    }

    return Response.json({
      success: true,
      message: "Your message has been sent successfully.",
      data,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}