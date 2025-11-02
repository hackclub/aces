# Security Report: Potential PII Leaks

**Report Date:** 2025-11-02  
**Repository:** hackclub/aces  
**Analysis Type:** Personally Identifiable Information (PII) Exposure Assessment

---

## Executive Summary

This report documents potential Personally Identifiable Information (PII) leaks and data privacy concerns within the Aces hackathon website. The analysis covers external API integrations, form submissions, and data collection mechanisms that may expose user information.

---

## Identified PII Leak Risks

### 1. **RSVP Form - External Data Collection** (HIGH RISK)

**Location:** `src/pages/index.tsx` (Lines 107-110, within Button component at lines 106-114)

**Description:**  
The RSVP button redirects users to an external Hack Club form at `https://forms.hackclub.com/aces-rsvp` with a referral parameter that may track user sources.

**Potential PII Collected:**
- User name
- Email address
- Phone number
- Location/address information
- Any other information collected by the Hack Club form system

**Risk Assessment:**
- **Severity:** HIGH
- **Likelihood:** CERTAIN (form is actively collecting data)

**Code Reference:**
```tsx
<Button
  href={
    "https://forms.hackclub.com/aces-rsvp" +
    (ref ? `?ref=${ref}` : "")
  }
  color={"rose"}
>
  RSVP
</Button>
```

**Concerns:**
1. No visible privacy policy on the main page
2. Users are not informed about what data will be collected before clicking RSVP
3. Referral tracking (`ref` parameter) allows identification of traffic sources
4. External form system may have its own data retention and sharing policies

**Recommendations:**
- Add a privacy policy link on the homepage
- Display a notice before form submission about data collection
- Document what PII is collected and how it's used
- Ensure GDPR/CCPA compliance for international users
- Implement clear data retention policies

---

### 2. **Referral Tracking Parameter** (MEDIUM RISK)

**Location:** `src/pages/index.tsx` (Lines 68-74, within useEffect hook at lines 64-79)

**Description:**  
The site extracts and validates a `ref` query parameter from the URL that can be used to track referral sources.

**Potential PII Exposure:**
- User referral chains can be tracked
- May reveal social graphs or relationships
- Can be used for user behavior profiling

**Risk Assessment:**
- **Severity:** MEDIUM
- **Likelihood:** HIGH (when referral links are shared)

**Code Reference:**
```tsx
const rawRef = router.query["ref"];
let currRef = rawRef ? (rawRef as string) : null;

if (currRef && !/^\d+$/.test(currRef)) {
  currRef = null;
}
```

**Concerns:**
1. Referral parameters persist in URLs and can be shared
2. May track user recruitment networks
3. No opt-out mechanism for tracking
4. Could reveal information about who referred whom

**Recommendations:**
- Document referral tracking in privacy policy
- Consider anonymizing referral codes
- Implement time-limited referral tokens
- Provide opt-out mechanism

---

### 3. **External RSVP Count API** (MEDIUM RISK)

**Location:** `src/components/RSVP.tsx` (Line 6, API URL in useSWR hook spanning lines 6-9)

**Description:**  
The site fetches RSVP count from an external API at `https://aces.femboyin.tech/count`.

**Potential PII Exposure:**
- API may log client IP addresses
- Request headers may contain user agent and other identifying information
- Potential for cross-origin tracking

**Risk Assessment:**
- **Severity:** MEDIUM
- **Likelihood:** HIGH (API called on every page load)

**Code Reference:**
```tsx
const { data, error } = useSWR("https://aces.femboyin.tech/count", fetcher, {
  refreshInterval: 60000,
  revalidateOnFocus: false,
});
```

**Concerns:**
1. Third-party API endpoint with unknown data retention policies
2. No HTTPS verification in code (though URL uses HTTPS)
3. Automatic refresh every 60 seconds may accumulate logs
4. Domain ownership should be verified to ensure organizational control

**Recommendations:**
- Document API data handling practices
- Verify API operator's privacy policies
- Consider moving to official Hack Club infrastructure
- Implement request authentication to prevent abuse
- Add error handling to prevent information leakage

---

### 4. **GitHub API Commit Information** (LOW RISK)

**Location:** `src/pages/api/git.ts`

**Description:**  
The site fetches and displays commit information from GitHub's public API.

**Potential PII Exposure:**
- Commit author names
- Commit author email addresses (if public)
- Commit timestamps revealing work patterns

**Risk Assessment:**
- **Severity:** LOW
- **Likelihood:** HIGH (displayed in footer on all pages)

**Code Reference:**
```tsx
const githubRes = await fetch(`https://api.github.com/repos/hackclub/aces/commits/${branch}`)
```

**Concerns:**
1. Exposes contributor information publicly
2. May reveal developer identities and work patterns
3. Email addresses in commit metadata may be exposed

**Recommendations:**
- Already using public repository data (acceptable risk)
- Ensure contributors are aware their information is displayed
- Consider using GitHub API with authentication for rate limiting

---

### 5. **Client-Side State Management** (LOW RISK)

**Location:** Various components using React state

**Description:**  
The application uses client-side state management but does not appear to persist sensitive data.

**Potential PII Exposure:**
- URL query parameters persist in browser history
- State values could be logged by browser extensions or debugging tools

**Risk Assessment:**
- **Severity:** LOW
- **Likelihood:** LOW

**Observations:**
- No localStorage or sessionStorage usage detected
- No cookies being set by the application
- State is ephemeral and not persisted

**Recommendations:**
- Continue avoiding persistent storage of user data on client side
- Sanitize URL parameters to prevent XSS attacks

---

### 6. **Third-Party CDN Content** (LOW RISK)

**Location:** `src/components/Meta.tsx`, `next.config.ts`

**Description:**  
The site loads images from `https://hc-cdn.hel1.your-objectstorage.com/`.

**Potential PII Exposure:**
- CDN may log request IP addresses
- Image loads can be used for tracking

**Risk Assessment:**
- **Severity:** LOW
- **Likelihood:** MEDIUM

**Recommendations:**
- Standard CDN practice, acceptable risk
- Ensure CDN provider has appropriate privacy policies
- Consider using privacy-focused CDN options

---

## Data Flow Analysis

### Inbound Data Flows
1. **User Browser → Aces Website** - Standard HTTPS traffic
2. **User Browser → RSVP Form** - External form submission (HIGH PII risk)
3. **User Browser → RSVP Count API** - Automated requests for count display

### Outbound Data Flows
1. **Aces Website → GitHub API** - Fetching public commit data
2. **Aces Website → External RSVP Count API** - Fetching RSVP statistics
3. **RSVP Form → Hack Club Backend** - PII submission (name, email, etc.)

---

## Missing Privacy Controls

1. **No Privacy Policy** - Users are not informed about data collection practices
2. **No Cookie Consent Banner** - May be required for EU/GDPR compliance
3. **No Data Subject Rights** - No clear mechanism for users to:
   - Access their data
   - Request data deletion
   - Opt-out of tracking
   - Export their information
4. **No Terms of Service** - No legal agreement governing data usage
5. **No Data Breach Notification Plan** - No documented incident response

---

## Compliance Considerations

### GDPR (General Data Protection Regulation)
- ✗ No privacy policy or data processing notice
- ✗ No consent mechanism for data collection
- ✗ No data subject rights implementation
- ✗ Unclear data retention policies
- ✗ No Data Protection Officer identified

### CCPA (California Consumer Privacy Act)
- ✗ No "Do Not Sell My Information" option
- ✗ No privacy notice at collection
- ✗ No consumer rights disclosure

### COPPA (Children's Online Privacy Protection Act)
- ⚠️ **WARNING:** Hack Club events often involve minors
- ✗ No parental consent mechanism for children under 13
- ✗ No age verification on RSVP form

**Required COPPA Compliance Actions:**
1. **Age Gate Implementation** - Add date of birth field on RSVP form
2. **Parental Consent Mechanism** - For children under 13 (ages 0-12):
   - Collect parent/guardian email address
   - Send parental consent request email with:
     - Clear disclosure of data collection practices
     - What information will be collected from child
     - How information will be used
     - Option to review child's information
     - Option to refuse further collection/use
     - Link to privacy policy
   - Verify parental consent before allowing participation
3. **Parental Rights** - Allow parents to:
   - Review child's personal information
   - Direct deletion of child's information
   - Refuse further collection or use
4. **Age-Appropriate Language** - Ensure privacy notices are understandable by minors

---

## Recommendations by Priority

### Critical (Implement Immediately)
1. **Add Privacy Policy** - Document all data collection and usage
2. **Add Cookie/Tracking Consent** - Implement consent banner for EU users
3. **COPPA Compliance** - Add age gate or parental consent for minors
4. **Data Retention Policy** - Define how long RSVP data is kept

### High Priority
1. **Move RSVP API to Hack Club Infrastructure** - Reduce third-party dependencies
2. **Add Privacy Notice at RSVP** - Inform users before they submit data
3. **Implement Referral Tracking Disclosure** - Be transparent about tracking
4. **Document Data Flows** - Create comprehensive data mapping

### Medium Priority
1. **Add Data Subject Access Request (DSAR) Process** - Allow users to request/delete data
2. **Security Headers** - Implement CSP, HSTS, and other security headers
3. **Audit External API Privacy** - Verify `aces.femboyin.tech` data handling
4. **Rate Limiting** - Prevent abuse and excessive data collection

### Low Priority
1. **Privacy-Enhancing Technologies** - Consider differential privacy or anonymization
2. **Security.txt** - Add security contact information
3. **Regular Privacy Audits** - Schedule periodic reviews

---

## Conclusion

While the Aces website does not directly collect large amounts of PII, it facilitates PII collection through external forms and third-party APIs. The primary concerns are:

1. **Lack of transparency** about data collection practices
2. **External RSVP form** collecting PII without clear privacy notice
3. **Potential COPPA violations** if minors submit data without parental consent
4. **Referral tracking** without disclosure or consent

The most critical action is to implement a privacy policy and ensure compliance with COPPA for minor participants, as Hack Club events typically involve high school students.

---

## Disclaimer

This report is based on static code analysis as of 2025-11-02. Actual data collection practices may vary based on:
- External form implementations
- Server-side logging configurations
- Third-party API behaviors
- CDN and hosting provider policies

A comprehensive security audit should include:
- Runtime analysis and network monitoring
- Review of backend systems and databases
- Third-party vendor assessments
- Penetration testing
- GDPR/CCPA compliance audit

---

**Report Prepared By:** GitHub Copilot Security Analysis  
**Review Status:** Initial Assessment  
**Next Review Date:** Recommended within 90 days or before next major feature release
