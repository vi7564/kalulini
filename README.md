# Kalulini Boys High School

## Firebase role-based access

The portal uses Firebase Authentication email/password and requires **administrator approval for every new account**. Signing up creates a Firebase Authentication account and submits an access request; the server clears its role claims, marks its Firestore profile `pending`, and disables the Auth account. Pending, rejected, or suspended accounts cannot establish a portal session. A request is not active until an administrator approves it and assigns its role.

Authorization is enforced by the Firebase role claim **and** the matching active Firestore profile; client-provided roles are not trusted. The server also verifies a revocable HTTP-only session cookie for every `/portal/*` page. Firestore access is deny-by-default in [firestore.rules](./firestore.rules), and [storage.rules](./storage.rules) requires an active role for admission files.

### Review and manage account access

An active `ADMIN` or `SUPER_ADMIN` signs in and opens **Role requests** (`/portal/admin/role-requests`). The administrator can approve or reject pending requests, activate a role for an approved account, change an active account's role, or deactivate an account. Only a `SUPER_ADMIN` can assign or manage `ADMIN`, `SUPER_ADMIN`, or `PRINCIPAL` access. Student and parent roles require selecting a verified student record; teacher access requires a verified teacher record. Users must sign in again after approval, reactivation, or a role change.

These management endpoints use the Firebase Admin SDK on the trusted Next.js server. Configure Application Default Credentials (ADC) for the server runtime and ensure `NEXT_PUBLIC_FIREBASE_PROJECT_ID` points to the Firebase project. On Google Cloud, use a dedicated runtime service account with the minimum required Firebase Auth and Firestore permissions. For local development, configure ADC on the machine running Next.js; never put a service-account key in the repository or expose it to browser code. If ADC is not configured, signup requests, session creation, and account management will return an error rather than grant access.

| Role | Firestore access |
| --- | --- |
| Admin | Manage students, teachers, users, payments, settings, and school content. |
| Principal | Read school records; review admissions and publish announcements. |
| Teacher | Read assigned classes; create and update their own class grades, attendance, and assignments. |
| Student | Read their own student record, grades, attendance, and fee payments. |
| Parent | Read the linked student's record, grades, attendance, and fee payments. |

Published announcements are publicly readable. Applicants can create and manage only their own draft applications. Rules do not grant users access to collections not explicitly listed.

### Configure the Firebase web app

Copy `.env.example` to `.env.local` and fill in the Firebase **web app** settings from Firebase Console → Project settings → Your apps. These public web settings are separate from the Firebase Admin SDK service-account credential.

Enable Email/Password under Firebase Console → Authentication → Sign-in method. Users create their own Firebase Authentication account through `/signup`; an administrator then approves the resulting request.

### Deploy Firebase rules

Install or run the Firebase CLI, select the Firebase project, and deploy the rules:

```powershell
npx firebase-tools login
npx firebase-tools use --add
npx firebase-tools deploy --only firestore:rules,storage
```

Deploy both rule sets before enabling account or admission workflows. Admission document uploads require an approved, active Applicant account. Birth Certificate and KCPE/KPSEA files are limited to PDF, JPG, or PNG up to 5 MB and stored in Firebase Storage under the applicant's UID.

Alternatively, publish `firestore.rules` in Firebase Console → Firestore Database → Rules, and `storage.rules` in Firebase Console → Storage → Rules. Signup requires the Firestore rules; admission document uploads require the Storage rules.

### Bootstrap the first administrator

The first administrator must be provisioned by a trusted operator because the in-app approval screen itself requires an active administrator. Create the person's Firebase Authentication account, then use the role-assignment script from a trusted environment with Firebase Admin SDK ADC. Keep credentials outside the repository, never put them in `.env.local`, and do not commit them. In PowerShell, configure ADC and the project ID (or use `gcloud auth application-default login` if Google Cloud CLI is installed):

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = 'C:\path\outside\the\repo\service-account.json'
$env:GOOGLE_CLOUD_PROJECT = 'your-firebase-project-id'
node scripts/set-firebase-rrole changes.

```powershell
node scripts/set-firebase-role.mjs <uid> TEACHER --teacher-id=<teacher-document-id> "--assigned-classes=Form 3 East,Form 4 West"
node scripts/set-firebase-role.mjs <uid> STUDENT --student-id=<student-document-id>
node scripts/set-firebase-role.mjs <uid> PARENT --student-id=<linked-student-document-id>
```

Supported roles are `ADMIN`, `SUPER_ADMIN`, `PRINCIPAL`, `TEACHER`, `STUDENT`, `PARENT`, `STAFF`, and `APPLICANT`. Student and parent links must reference a verified student document. Teacher IDs must match a document in `teachers`; class assignments must match each managed record's `classKey` (for example, `Form 3 East`). The Admin SDK bypasses Firestore rules, so only trusted operators should run provisioning scripts.
ole.mjs <uid> ADMIN
```

This trusted bootstrap script synchronizes the custom role claim and active Firestore profile. It is not a public API; protect the credentials used to run it. After the first administrator is active, use the admin portal for routine account approvals and 