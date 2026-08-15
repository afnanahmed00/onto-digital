import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import LegalSection from "@/components/legal/LegalSection";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | ONTO DIGITAL",
  description:
    "Privacy Policy for ONTO DIGITAL and information about how website inquiries and submitted information are handled.",
};

const LAST_UPDATED = "August 15, 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout heading="PRIVACY POLICY" lastUpdated={LAST_UPDATED}>
      <LegalSection number="01" title="INTRODUCTION">
        <p>
          This Privacy Policy explains how {SITE.name} (&quot;we&quot;,
          &quot;us&quot; or &quot;our&quot;) handles information in
          connection with the website at{" "}
          <a href={SITE.website} target="_blank" rel="noreferrer">
            {SITE.website}
          </a>{" "}
          (the &quot;Website&quot;). It describes what the Website currently
          does — and does not — collect, based on the actual functionality
          in place at the time of writing.
        </p>
        <p>
          By using the Website, you agree to the practices described in this
          policy. If you do not agree with any part of this policy, please
          do not use the Website or submit information through it.
        </p>
      </LegalSection>

      <LegalSection number="02" title="INFORMATION WE COLLECT">
        <p>
          The Website is primarily an informational, marketing and
          project-inquiry website. We do not currently require account
          creation, logins, payments or file uploads, so we do not collect
          information tied to those features.
        </p>
        <p>
          The main way we receive personal information directly from you is
          when you voluntarily submit the contact form described below. We
          may also receive limited technical information automatically
          through normal web server and hosting operation (for example,
          request logs used for security and reliability purposes), but the
          Website does not currently run a dedicated analytics or tracking
          system, as explained in Section 07.
        </p>
      </LegalSection>

      <LegalSection number="03" title="INFORMATION SUBMITTED THROUGH THE CONTACT FORM">
        <p>
          When you submit the contact form on the Website, we may receive
          the following information that you choose to provide:
        </p>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company name</li>
          <li>Selected service</li>
          <li>Budget information</li>
          <li>Project details</li>
        </ul>
        <p>
          Fields marked as optional on the form (such as email, company,
          budget and project details) are not required to submit an
          inquiry. The form is processed through a Next.js API route on our
          server, which forwards the submitted information as an email
          using Resend, an email delivery service (see Section 06). If you
          provide an email address, you may also receive an automatic
          confirmation email acknowledging that we received your inquiry.
        </p>
      </LegalSection>

      <LegalSection number="04" title="HOW WE USE INFORMATION">
        <p>
          Information submitted through the contact form is used to:
        </p>
        <ul>
          <li>respond to your inquiry;</li>
          <li>understand your project requirements;</li>
          <li>communicate with you as a potential or existing client;</li>
          <li>provide the services or information you have requested; and</li>
          <li>maintain a record of communication related to your inquiry.</li>
        </ul>
        <p>
          We do not sell your information, and we do not share it with
          advertisers or use it for advertising purposes.
        </p>
      </LegalSection>

      <LegalSection number="05" title="EMAIL COMMUNICATION">
        <p>
          If you submit the contact form with an email address, we may email
          you directly to discuss your inquiry, and you may receive an
          automatic confirmation email. We use this contact information only
          to communicate with you about your inquiry, and we do not use it
          to add you to a marketing or newsletter list unless you separately
          ask us to.
        </p>
      </LegalSection>

      <LegalSection number="06" title="SERVICE PROVIDERS / THIRD PARTIES">
        <p>
          We use Resend as a third-party email delivery provider to send
          contact-form notifications and confirmation emails on our behalf.
          Submitted contact-form information is transmitted to Resend for
          the sole purpose of delivering these emails. We do not control
          Resend&apos;s own data handling practices beyond this use, and we
          encourage you to review Resend&apos;s own privacy documentation if
          you would like more detail about how they process email data.
        </p>
        <p>
          Aside from Resend, we do not currently share contact-form
          information with any other third party, database, CRM or
          marketing platform. We may introduce additional service providers
          in the future (for example, a CRM or scheduling tool), in which
          case this policy will be updated to reflect that.
        </p>
      </LegalSection>

      <LegalSection number="07" title="WEBSITE ANALYTICS AND COOKIES">
        <p>
          Based on the Website&apos;s current implementation, the Website
          does not use a dedicated analytics or advertising tracking system,
          such as Google Analytics or Meta Pixel, and it does not set
          cookies for advertising or cross-site tracking purposes.
        </p>
        <p>
          We may introduce website analytics or similar tools in the future
          to help us understand how the Website is used. If we do, this
          Privacy Policy will be updated beforehand to describe what is
          collected and, where required, how you can manage your
          preferences.
        </p>
      </LegalSection>

      <LegalSection number="08" title="DATA SECURITY">
        <p>
          We take reasonable measures designed to protect information
          submitted through the Website. However, no internet transmission
          or storage system can be guaranteed to be completely secure, and
          we cannot guarantee the absolute security of information you
          submit to us.
        </p>
      </LegalSection>

      <LegalSection number="09" title="DATA RETENTION">
        <p>
          We retain contact-form inquiries and related email communication
          for as long as reasonably necessary to respond to your inquiry,
          maintain business records and comply with applicable legal
          obligations. If you would like us to delete information you have
          submitted, you may contact us using the details in Section 14 and
          we will take reasonable steps to do so, subject to any legitimate
          business or legal reasons for retaining it.
        </p>
      </LegalSection>

      <LegalSection number="10" title="YOUR RIGHTS AND CHOICES">
        <p>
          Depending on your location, you may have rights regarding
          information you have submitted to us, such as the right to
          request access to, correction of, or deletion of that
          information. You can exercise these choices by contacting us
          directly at{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We will respond
          to reasonable requests on a best-effort basis.
        </p>
      </LegalSection>

      <LegalSection number="11" title="EXTERNAL LINKS">
        <p>
          The Website may contain links to third-party destinations,
          including our WhatsApp contact link, our Instagram profile, and
          links to external websites we have built for clients. These
          third-party destinations operate independently of us and have
          their own privacy practices. We are not responsible for the
          content or privacy practices of any third-party site or service
          you access through a link on the Website, and we encourage you to
          review their respective policies.
        </p>
      </LegalSection>

      <LegalSection number="12" title="CHILDREN'S PRIVACY">
        <p>
          The Website is intended for business audiences and is not directed
          at children. We do not knowingly collect personal information
          from children. If you believe a child has provided us with
          personal information, please contact us so we can address it.
        </p>
      </LegalSection>

      <LegalSection number="13" title="CHANGES TO THIS PRIVACY POLICY">
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes to the Website, its functionality, or applicable legal
          requirements. The &quot;Last updated&quot; date at the top of this
          page indicates when this policy was last revised. We encourage
          you to review this page periodically.
        </p>
      </LegalSection>

      <LegalSection number="14" title="CONTACT US">
        <p>
          If you have any questions about this Privacy Policy or how your
          information is handled, please contact us:
        </p>
        <ul>
          <li>{SITE.name}</li>
          <li>{SITE.address}</li>
          <li>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
          <li>
            <a href={SITE.website} target="_blank" rel="noreferrer">
              {SITE.website}
            </a>
          </li>
        </ul>
      </LegalSection>
    </LegalPageLayout>
  );
}
