import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import LegalSection from "@/components/legal/LegalSection";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | ONTO DIGITAL",
  description:
    "Terms and Conditions governing the use of the ONTO DIGITAL website and related information.",
};

const LAST_UPDATED = "August 15, 2026";

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout heading="TERMS & CONDITIONS" lastUpdated={LAST_UPDATED}>
      <LegalSection number="01" title="INTRODUCTION">
        <p>
          These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of
          the website at{" "}
          <a href={SITE.website} target="_blank" rel="noreferrer">
            {SITE.website}
          </a>{" "}
          (the &quot;Website&quot;), operated by {SITE.name} (&quot;we&quot;,
          &quot;us&quot; or &quot;our&quot;) from Hyderabad, India.
        </p>
      </LegalSection>

      <LegalSection number="02" title="ACCEPTANCE OF TERMS">
        <p>
          By accessing or using the Website, you agree to be bound by these
          Terms. If you do not agree with these Terms, please do not use the
          Website.
        </p>
      </LegalSection>

      <LegalSection number="03" title="WEBSITE USE">
        <p>
          You agree to use the Website only for lawful purposes and in a way
          that does not infringe the rights of, or restrict or inhibit the
          use of, the Website by anyone else. You agree not to attempt to
          gain unauthorized access to the Website, its underlying systems,
          or any data that is not intended for you.
        </p>
      </LegalSection>

      <LegalSection number="04" title="SERVICES AND INFORMATION">
        <p>
          The Website describes the services offered by {SITE.name},
          including web design, web development, and related digital
          services. Content on the Website is provided for general
          informational purposes and does not itself constitute a binding
          offer. Specific project scope, deliverables, timelines and pricing
          are agreed separately between {SITE.name} and a client, outside of
          this Website, before any work begins.
        </p>
      </LegalSection>

      <LegalSection number="05" title="PROJECT INQUIRIES">
        <p>
          Submitting the contact form or otherwise reaching out to us
          expresses interest in our services and does not, on its own,
          create a contract, project engagement, or obligation on either
          side. Any actual engagement, along with its specific terms, will
          be agreed separately in writing.
        </p>
      </LegalSection>

      <LegalSection number="06" title="INTELLECTUAL PROPERTY">
        <p>
          Unless otherwise stated, the Website&apos;s content — including
          text, graphics, layout and design — is owned by or licensed to{" "}
          {SITE.name} and is protected by applicable intellectual property
          laws. You may view and use the Website for your own personal or
          business informational purposes, but you may not reproduce,
          distribute or create derivative works from the Website&apos;s
          content without our prior permission.
        </p>
        <p>
          Ownership of intellectual property relating to work delivered for
          a specific client project is addressed separately in the terms
          agreed for that project, and is not governed by this Website
          document.
        </p>
      </LegalSection>

      <LegalSection number="07" title="USER-SUBMITTED INFORMATION">
        <p>
          When you submit information through the contact form, you confirm
          that the information you provide is your own or that you are
          authorized to share it, and that it is accurate to the best of
          your knowledge. Please see our{" "}
          <a href="/privacy-policy">Privacy Policy</a> for details on how
          submitted information is handled.
        </p>
      </LegalSection>

      <LegalSection number="08" title="EXTERNAL LINKS">
        <p>
          The Website may link to third-party destinations, including our
          WhatsApp contact link, our Instagram profile, and external
          websites built for clients. We do not control and are not
          responsible for the content, terms, or practices of any linked
          third-party destination. Accessing a linked destination is at
          your own risk and subject to that destination&apos;s own terms.
        </p>
      </LegalSection>

      <LegalSection number="09" title="AVAILABILITY AND ACCURACY">
        <p>
          We aim to keep the Website accurate and available, but we do not
          guarantee that the Website will be uninterrupted, error-free, or
          available at all times. Content on the Website may be updated,
          changed or removed without prior notice.
        </p>
      </LegalSection>

      <LegalSection number="10" title="LIMITATION OF LIABILITY">
        <p>
          To the fullest extent permitted by applicable law, {SITE.name}{" "}
          shall not be liable for any indirect, incidental or consequential
          loss or damage arising from your use of, or inability to use, the
          Website. The Website and its content are provided on an
          &quot;as is&quot; and &quot;as available&quot; basis, without
          warranties of any kind except as required by applicable law.
        </p>
      </LegalSection>

      <LegalSection number="11" title="THIRD-PARTY SERVICES">
        <p>
          The Website relies on third-party infrastructure and services to
          operate, including hosting and Resend for email delivery of
          contact-form submissions. We are not responsible for outages,
          errors or issues that originate from these third-party services
          and are outside of our reasonable control.
        </p>
      </LegalSection>

      <LegalSection number="12" title="CHANGES TO THESE TERMS">
        <p>
          We may update these Terms from time to time to reflect changes to
          the Website or applicable legal requirements. The &quot;Last
          updated&quot; date at the top of this page indicates when these
          Terms were last revised. Continued use of the Website after an
          update constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection number="13" title="GOVERNING LAW">
        <p>
          These Terms are intended to be interpreted in accordance with
          applicable laws of India, reflecting that {SITE.name} operates
          from Hyderabad, India. This is general guidance only, and it does
          not constitute a definitive statement of legal jurisdiction or
          venue. You should obtain appropriate legal advice regarding the
          laws and jurisdiction applicable to your business or use of the
          Website.
        </p>
      </LegalSection>

      <LegalSection number="14" title="CONTACT US">
        <p>
          If you have any questions about these Terms, please contact us:
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
