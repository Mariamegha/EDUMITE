# Google OAuth Setup Guide

## 📋 Prerequisites
- Supabase project created
- Google Cloud Console access

---

## 🔧 Step 1: Configure Supabase Dashboard

### **Disable Email Confirmation**

1. Go to your Supabase Dashboard
2. Navigate to **Authentication → Settings**
3. Scroll to **Email Auth**
4. **Disable** the following:
   - ❌ **Confirm email** (turn OFF)
   - ❌ **Secure email change** (turn OFF - optional)
5. Click **Save**

### **Enable Google OAuth Provider**

1. Still in **Authentication → Settings**
2. Scroll to **Auth Providers**
3. Find **Google** provider
4. Click **Enable**
5. Keep this page open (you'll add credentials in Step 2)

---

## 🔐 Step 2: Google Cloud Console Setup

### **Create OAuth Credentials**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to **APIs & Services → Credentials**
4. Click **+ CREATE CREDENTIALS → OAuth client ID**
5. If prompted, configure **OAuth consent screen** first:
   - User Type: **External**
   - App name: **EDUMITE**
   - User support email: Your email
   - Developer contact: Your email
   - Add scopes: `email`, `profile`, `openid`
   - Add test users (yourself) if in development
   - Click **Save and Continue**

### **Configure OAuth Client**

6. Back to **Create OAuth client ID**:
   - Application type: **Web application**
   - Name: **EDUMITE Web Client**

7. **Authorized JavaScript origins**:
   ```
   http://localhost:8080
   https://your-domain.com
   ```

8. **Authorized redirect URIs**:
   ```
   https://YOUR_SUPABASE_PROJECT_REF.supabase.co/auth/v1/callback
   ```
   
   To find your Supabase callback URL:
   - Go to Supabase Dashboard → Authentication → Settings
   - Copy the **Callback URL** shown under Google provider
   - Should look like: `https://abcdefghijklmn.supabase.co/auth/v1/callback`

9. Click **CREATE**
10. Copy **Client ID** and **Client Secret**

---

## 🔗 Step 3: Connect Google to Supabase

1. Return to **Supabase Dashboard → Authentication → Settings → Google**
2. Paste your **Client ID** (from Google Cloud Console)
3. Paste your **Client Secret** (from Google Cloud Console)
4. Click **Save**

---

## ✅ Step 4: Update Environment Variables

Add to your `.env` file (optional, for reference):

```env
# Google OAuth is now configured in Supabase Dashboard
# No additional env vars needed in your app
```

---

## 🧪 Step 5: Test Google OAuth

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Navigate to `/login` or `/register`

3. Click **"Sign in with Google"** button

4. You should be redirected to Google's OAuth consent screen

5. After authorizing, you'll be redirected back to `/dashboard`

6. Check Supabase Dashboard → Authentication → Users to verify the user was created

---

## 🚨 Important Notes

### **Email Verification Disabled**
- Users can sign up without confirming their email
- Instant access after registration
- Good for development, consider re-enabling for production

### **Google OAuth Benefits**
- No password management
- Verified email from Google
- Faster registration
- Better user experience

### **Production Checklist**
- [ ] Update authorized origins with production domain
- [ ] Update redirect URIs with production callback URL
- [ ] Move OAuth consent screen from Testing to Production
- [ ] Consider re-enabling email confirmation for email/password signups
- [ ] Add privacy policy and terms of service links

---

## 🔍 Troubleshooting

### "Redirect URI mismatch" error
- Verify callback URL in Google Console matches Supabase exactly
- Check for trailing slashes
- Ensure HTTPS in production

### "Access blocked: This app's request is invalid"
- OAuth consent screen not configured
- Missing scopes (email, profile, openid)
- App not published (add yourself as test user)

### User not created in database
- Check Supabase RLS policies
- Verify database triggers are working
- Check Supabase logs for errors

### Email already exists error
- User signed up with email/password first
- Google account uses same email
- Supabase doesn't auto-link accounts
- User should use same sign-in method

---

## 📚 Additional Resources

- [Supabase Google OAuth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)

---

**✨ Google OAuth is now integrated into EDUMITE!**
