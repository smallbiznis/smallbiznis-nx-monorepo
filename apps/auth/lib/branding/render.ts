
export function renderBrandingCss(branding: any) {
  return `
    :root {
      --sb-primary: ${branding.primaryColor};
      --sb-secondary: ${branding.secondaryColor};
      --sb-accent: ${branding.accentColor};
      --sb-background: ${branding.backgroundColor};
      --sb-text: ${branding.textColor};
      --sb-logo-url: url('${branding.logoUrl}');
    }

    body {
      background: var(--sb-background);
      color: var(--sb-text);
    }
  `;
}