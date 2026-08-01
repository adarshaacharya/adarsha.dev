import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "react-email";

type NewsletterWelcomeEmailProps = {
  siteUrl: string;
  unsubscribeUrl: string;
};

const colors = {
  background: "#f8f7f3",
  surface: "#ffffff",
  foreground: "#29303d",
  muted: "#687181",
  border: "#e5e1d9",
  accent: "#b87524",
};

export function NewsletterWelcomeEmail({
  siteUrl = "https://adarsha.dev",
  unsubscribeUrl = "https://adarsha.dev/newsletter/unsubscribe?token=preview-token",
}: NewsletterWelcomeEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>You’re subscribed to new writing from Adarsha Acharya.</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={masthead}>
            <Row>
              <Column>
                <Link href={siteUrl} style={brand}>
                  adarsha.dev
                </Link>
              </Column>
              <Column style={editionColumn}>
                <Text style={edition}>Newsletter</Text>
              </Column>
            </Row>
          </Section>

          <Section style={content}>
            <Heading as="h1" style={heading}>
              You’re on the list.
            </Heading>
            <Text style={lead}>
              Thanks for subscribing. I’ll send you an email when I publish
              something new.
            </Text>
            <Text style={copy}>
              Usually that means writing about TypeScript, AI, or the parts of
              building software that are harder to fit into a post.
            </Text>
            <Link href={`${siteUrl}/blog`} style={button}>
              Read the latest writing
            </Link>
          </Section>

          <Hr style={rule} />

          <Section style={footer}>
            <Text style={signoff}>
              Adarsha Acharya
              <br />
              Kathmandu, Nepal
            </Text>
            <Text style={unsubscribe}>
              Didn’t mean to subscribe?{" "}
              <Link href={unsubscribeUrl} style={footerLink}>
                Unsubscribe
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

NewsletterWelcomeEmail.PreviewProps = {
  siteUrl: "https://adarsha.dev",
  unsubscribeUrl:
    "https://adarsha.dev/newsletter/unsubscribe?token=preview-token",
} satisfies NewsletterWelcomeEmailProps;

const body = {
  backgroundColor: colors.background,
  color: colors.foreground,
  fontFamily: "Arial, Helvetica, sans-serif",
  margin: "0",
  padding: "32px 12px",
};

const container = {
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: "6px",
  margin: "0 auto",
  maxWidth: "560px",
  overflow: "hidden",
};

const masthead = {
  padding: "24px 32px",
};

const brand = {
  color: colors.accent,
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
};

const edition = {
  color: colors.muted,
  fontSize: "14px",
  margin: "0",
};

const editionColumn = {
  textAlign: "right" as const,
};

const content = {
  padding: "52px 32px 44px",
};

const heading = {
  color: colors.foreground,
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "42px",
  fontWeight: "400",
  letterSpacing: "-1.2px",
  lineHeight: "1.08",
  margin: "0 0 24px",
};

const lead = {
  color: colors.foreground,
  fontSize: "17px",
  lineHeight: "1.65",
  margin: "0 0 16px",
};

const copy = {
  color: colors.muted,
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 32px",
};

const button = {
  backgroundColor: colors.foreground,
  borderRadius: "3px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "42px",
  padding: "0 20px",
  textDecoration: "none",
};

const rule = {
  borderTop: `1px solid ${colors.border}`,
  margin: "0",
};

const footer = {
  padding: "24px 32px 28px",
};

const signoff = {
  color: colors.muted,
  fontSize: "12px",
  lineHeight: "1.6",
  margin: "0 0 18px",
};

const unsubscribe = {
  color: colors.muted,
  fontSize: "11px",
  lineHeight: "1.6",
  margin: "0",
};

const footerLink = {
  color: colors.muted,
  textDecoration: "underline",
};

export default NewsletterWelcomeEmail;
